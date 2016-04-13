"use strict";

describe('App.run tests', function(){
	var LoginService, $rootScope, $httpBackend, $state, $injectoris;

	beforeEach(function(){
		module('app.templates');
		module('app', function($provide){
			$provide.value('LoginService',{isLoggedIn: jasmine.createSpy()});
		});
	});

	beforeEach(inject(function(_LoginService_, _$rootScope_, _$templateCache_){
		LoginService = _LoginService_;
		$rootScope = _$rootScope_;
	}));

	beforeEach(inject(function($injector){
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.when('GET', 'data/servicesData.json').respond('[{"name":"Example service","href":"/example.html","subPages":["/example1.html","example2.html"]},{"name":"Example service - 1","href":"/example1.html","subPages":[],"parent":"example.html"},{"name":"Example service - 2","href":"/example2.html","subPages":[],"parent":"example.html"}]');
	}));

	afterEach(function(){
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('something',function(){
		it('should attach the correct sref', function(){
			$httpBackend.flush();
			expect($rootScope.servicesData[0].sref).toEqual('example');
			expect($rootScope.servicesData[1].sref).toEqual('example1');
			expect($rootScope.servicesData[2].sref).toEqual('example2');
		});	
	});
});