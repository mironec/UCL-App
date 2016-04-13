describe('serviceRating directive', function(){
	var $compile,
		$rootScope;

	beforeEach(module('app.templates'));
	beforeEach(module('app'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;

		_$httpBackend_.whenGET('data/servicesData.json').respond('');
	}));

	it('replaces the element with content',function(){
		var elem = $compile('<service-rating name="username" rating="3" comment="test comment"></service-rating>')($rootScope);
		$rootScope.$digest();
		expect(elem.html()).toContain("test comment");
		expect(elem.html()).toContain("username");
	});
});