describe('LoginService', function(){
	beforeEach(module('app.templates'));
	beforeEach(module('app'));

	var LoginService;
	var rootScope = {backendLoginUrl: "http://localhost/atos/login.php"};
	var httpBackend, loginPageHandle;

	beforeEach(inject(function($injector){
		httpBackend = $injector.get('$httpBackend');

		loginPageHandle = httpBackend.when('POST', rootScope.backendLoginUrl).respond(
			function(method, url, data){
				var dat = angular.fromJson(data);
				if(dat.email === "name" && dat.pass === "pass") return [200, "S abcdefgh"];
				else return [200, "E Error."];
			}
		);

		httpBackend.whenGET('data/servicesData.json').respond('');

		LoginService = $injector.get('LoginService');
	}));

	describe('Login tests', function(){
		var username = "name";
		var password = "pass";

		beforeEach(function(){
			httpBackend.expectGET('data/servicesData.json');
			httpBackend.flush();
		});

		afterEach(function() {
			httpBackend.verifyNoOutstandingExpectation();
			httpBackend.verifyNoOutstandingRequest();
		});

		it('should log you in when the server responds with S loginTokenHash', function(){
			httpBackend.expectPOST(rootScope.backendLoginUrl);

			LoginService.login(username, password).then(
				function(resolve){
					expect(resolve).not.toBeDefined();
					expect(LoginService.isLoggedIn()).toBe(true);
					expect(LoginService.getLoginToken()).toBe('abcdefgh');
				},
				function(reject){
					expect(true).toBe(false);
				}
			);

			httpBackend.flush();
		});

		it('should not log you in when the server responds with E anything', function(){
			httpBackend.expectPOST(rootScope.backendLoginUrl);

			LoginService.login(username, password+"nonsense").then(
				function(resolve){
					expect(true).toBe(false);
				},
				function(reject){
					expect(LoginService.isLoggedIn()).toBe(false);
					expect(LoginService.getLoginToken()).toEqual('');
				}
			);

			httpBackend.flush();
		});

		it('should not log you in when the server does not respond', function(){
			loginPageHandle.respond(408, '');
			httpBackend.expectPOST(rootScope.backendLoginUrl);

			LoginService.login(username, password).then(
				function(resolve){
					expect(true).toBe(false);
				},
				function(reject){
					expect(LoginService.isLoggedIn()).toBe(false);
					expect(LoginService.getLoginToken()).toEqual('');
				}
			);

			httpBackend.flush();
		});
	});
});