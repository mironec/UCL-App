describe('serviceCtrl', function(){
	beforeEach(module('app.templates'));
	beforeEach(module('app'));

	var $controller, $httpBackend, ratingPageHandle;

	var $scope, controller, $rootScope, RatingService, $ionicPopup;

	var parentService = {service_id: 1,sref:"example",name:"Example service",href:"/example.html",subPages:["/example1.html","example2.html"]};
	var subService1 = {service_id: 2,sref:"example1",name:"Example service - 1",href:"/example1.html",subPages:[],parent:"example.html"};
	var subService2 = {service_id: 3,sref:"example2",name:"Example service - 2",href:"/example2.html",subPages:[],parent:"example.html"};

	beforeEach(inject(function(_$controller_, _$httpBackend_, _$ionicPopup_){
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
		$ionicPopup = _$ionicPopup_;
		spyOn($ionicPopup, 'alert').and.callThrough();

		ratingPageHandle = $httpBackend.whenGET(/^rating\?service_id=.*$/).respond('');
		$httpBackend.whenGET('data/servicesData.json').respond('');
	}));

	beforeEach(function(){
		$scope = {};
		$rootScope = {servicesData: [parentService,subService1,subService2], backendRatingUrl: 'rating'};
		$stateParams = {serviceSref: "example"};
		RatingService = {sendRating: jasmine.createSpy().and.returnValue({then: function(){}})};
		LoginService = {isLoggedIn: function(){return true}};
		controller = $controller('serviceCtrl', {$scope: $scope, $rootScope: $rootScope, $stateParams: $stateParams, RatingService: RatingService, LoginService: LoginService, $ionicPopup: $ionicPopup});
	});

	describe('Ratings', function(){
		var ratingServiceReturn = function(isError, value){
			if(isError) RatingService.sendRating = jasmine.createSpy().and.returnValue({then: function(resFunc, rejFunc){rejFunc(value);}});
			else RatingService.sendRating = jasmine.createSpy().and.returnValue({then: function(resFunc, rejFunc){resFunc(value);}});
		};
		var RATING_SERVICE_RETURN_ERROR = true, RATING_SERVICE_RETURN_NORMAL = false;

		beforeEach(function(){
			$httpBackend.expectGET(/^rating\?service_id=.*$/);
			$httpBackend.flush();

			$scope.form.rating = 5;
			$scope.form.comment = "Great!";
		});

		it('should call the RatingService when the form is clicked', function(){
			$scope.submitForm();

			expect(RatingService.sendRating).toHaveBeenCalledWith(1, 5, "Great!");
		});

		it('should empty the form when a correct response is received', function(){
			ratingServiceReturn(RATING_SERVICE_RETURN_NORMAL, 'response2');
			$scope.submitForm();

			expect($scope.form.rating).toEqual(0);
			expect($scope.form.comment).toEqual('');
		});

		it('should not empty the form when an error is received', function(){
			ratingServiceReturn(RATING_SERVICE_RETURN_ERROR, 'an error');
			$scope.submitForm();

			expect($scope.form.rating).toEqual(5);
			expect($scope.form.comment).toEqual('Great!');
		});

		it('should update the ratingSection when a correct response is received', function(){
			ratingServiceReturn(RATING_SERVICE_RETURN_NORMAL, 'response2');
			$scope.submitForm();

			expect($scope.ratingSection).toEqual('response2');
		});

		it('should leave the ratingSection as is when an error is received', function(){
			$scope.ratingSection = 'example';

			ratingServiceReturn(RATING_SERVICE_RETURN_ERROR, 'an error');
			$scope.submitForm();

			expect($scope.ratingSection).toEqual('example');
		});

		it('should show an alert when an error is received', function(){
			ratingServiceReturn(RATING_SERVICE_RETURN_ERROR, 'an error');
			$scope.submitForm();

			expect($ionicPopup.alert).toHaveBeenCalled();
		});

		it('should not show an alert when a correct response was received', function(){
			ratingServiceReturn(RATING_SERVICE_RETURN_NORMAL, 'response2');
			$scope.submitForm();

			expect($ionicPopup.alert).not.toHaveBeenCalled();
		});
	});

	describe('Ratings with simulated Backend', function(){
		it('should set ratingSection to the response',function(){
			ratingPageHandle.respond('response');
			$httpBackend.expectGET(/^rating\?service_id=.*$/);
			$httpBackend.flush();
			expect($scope.ratingSection).toEqual('response');
		});

		it('should set ratingSection to empty if an error occurred',function(){
			ratingPageHandle.respond('E error.');
			$httpBackend.expectGET(/^rating\?service_id=.*$/);
			$httpBackend.flush();
			expect($scope.ratingSection).toEqual('');
		});
	});
});