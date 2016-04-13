describe('serviceCtrl', function(){
	beforeEach(module('app.templates'));
	beforeEach(module('app'));

	var $controller, $httpBackend, ratingPageHandle;

	var $scope, controller, $rootScope, RatingService;

	var parentService = {service_id: 1,sref:"example",name:"Example service",href:"/example.html",subPages:["/example1.html","example2.html"]};
	var subService1 = {service_id: 2,sref:"example1",name:"Example service - 1",href:"/example1.html",subPages:[],parent:"example.html"};
	var subService2 = {service_id: 3,sref:"example2",name:"Example service - 2",href:"/example2.html",subPages:[],parent:"example.html"};

	beforeEach(inject(function(_$controller_, _$httpBackend_){
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
		ratingPageHandle = $httpBackend.whenGET(/^rating\?service_id=.*$/).respond('');
		$httpBackend.whenGET('data/servicesData.json').respond('');
	}));

	beforeEach(function(){
		$scope = {};
		$rootScope = {servicesData: [parentService,subService1,subService2], backendRatingUrl: 'rating'};
		$stateParams = {serviceSref: "example"};
		RatingService = {sendRating: jasmine.createSpy().and.returnValue({then: function(){}})};
		LoginService = {isLoggedIn: function(){return true}};
		controller = $controller('serviceCtrl', {$scope: $scope, $rootScope: $rootScope, $stateParams: $stateParams, RatingService: RatingService, LoginService: LoginService});
	});

	describe('Ratings', function(){
		beforeEach(function(){
			$httpBackend.expectGET(/^rating\?service_id=.*$/);
			$httpBackend.flush();
		});

		it('should call the RatingService when the form is clicked', function(){
			$scope.form.rating = 5;
			$scope.form.comment = "Great!";

			$scope.submitForm();

			expect(RatingService.sendRating).toHaveBeenCalledWith(1, 5, "Great!");
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