/*describe('LoginService', function(){
	beforeEach(module('app'));

	var LoginService;
	var rootScope = {backendLoginUrl: "http://localhost/atos/login.php"};
	var httpBackend;

	beforeEach(inject(function($injector){
		httpBackend = $injector.get('$httpBackend');

		httpBackend.whenPOST(rootScope.backendLoginUrl).respond(
			function(method, url, data){
				var dat = angular.fromJson(data);
				if(dat.name === "name" && dat.pass === "pass")
					return [200, "S abcdefgh"];
				else return [200, "E Error."];
			}
		);

		LoginService = $injector.get('LoginService');
	}));

	describe('Login tests', function(){
		var username = "name";
		var password = "pass";

		afterEach(function() {
			httpBackend.verifyNoOutstandingExpectation();
			httpBackend.verifyNoOutstandingRequest();
		});

		it('should log you in when the server responds with S loginTokenHash', function(){
			httpBackend.expectPOST(rootScope.backendLoginUrl);

			LoginService.login(username, password).then(
				function(resolve){
					expect(resolve).toBeNull();
					expect(LoginService.isLoggedIn()).toEqual(true);
				},
				function(reject){
					expect(true).toEqual(false);
				}
			);

			httpBackend.flush();
		});
	});
});*/