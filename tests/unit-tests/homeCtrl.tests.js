describe('homeCtrl', function(){
	beforeEach(module('app'));

	var $controller;

	beforeEach(inject(function(_$controller_){$controller = _$controller_;}));

	describe('Services list', function(){
		var $scope, controller, $rootScope, $state;

		var parentService = {name:"Example service",href:"/example.html",subPages:["/example1.html","example2.html"]};
		var subService1 = {name:"Example service - 1",href:"/example1.html",subPages:[],parent:"example.html"};
		var subService2 = {name:"Example service - 2",href:"/example2.html",subPages:[],parent:"example.html"};

		beforeEach(function(){
			$scope = {};
			$rootScope = {servicesData: [parentService,subService1,subService2]};
			$state = jasmine.createSpyObj('$state spy', ['go']);
			controller = $controller('homeCtrl', {$scope: $scope, $rootScope: $rootScope, $state: $state});
		})

		it('should filter out services with parents', function(){
			expect($scope.serviceFilter(subService1)).toEqual(false);
			expect($scope.serviceFilter(subService2)).toEqual(false);
		});

		it('should not filter out services without parents', function(){
			expect($scope.serviceFilter(parentService)).toEqual(true);
		});

		it('should attach the correct sref', function(){
			expect($scope.services[0].sref).toEqual('example');
			expect($scope.services[1].sref).toEqual('example1');
			expect($scope.services[2].sref).toEqual('example2');
		});

		it('should go to the correct state', function(){
			$scope.clicked(parentService);
			expect($state.go).toHaveBeenCalledWith(jasmine.any(String),{serviceId: parentService.sref});
		});
	});
});