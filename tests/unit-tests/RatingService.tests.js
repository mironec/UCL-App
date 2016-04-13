describe('RatingService', function(){
	beforeEach(module('app.templates'));
	beforeEach(module('app'));

	var RatingService;
	var httpBackend, ratingPageHandle, rootScope;
	var database = [];

	beforeEach(inject(function($injector){
		httpBackend = $injector.get('$httpBackend');
		rootScope = $injector.get('$rootScope');

		ratingPageHandle = httpBackend.when('POST', rootScope.backendRatingUrl).respond(
			function(method, url, data){
				var dat = angular.fromJson(data);
				//database.push({rating: dat.rating, comment: dat.comment});
				return [200, '<service-rating name="someone@example.com" rating="5" comment="Great!"></service-rating>'];
			}
		);

		httpBackend.whenGET('data/servicesData.json').respond('');

		RatingService = $injector.get('RatingService');
	}));

	describe('Rating send tests', function(){
		beforeEach(function(){
			httpBackend.expectGET('data/servicesData.json');
			httpBackend.flush();
		});

		afterEach(function() {
			httpBackend.verifyNoOutstandingExpectation();
			httpBackend.verifyNoOutstandingRequest();
		});

		it('should successfully resolve if the request passes through', function(){
			httpBackend.expectPOST(rootScope.backendRatingUrl);

			RatingService.sendRating(5, "Great!").then(
				function(resolve){
					expect(true).toBe(true);
				},
				function(reject){
					expect(true).toBe(false);
				}
			);

			httpBackend.flush();
		});
	});
});