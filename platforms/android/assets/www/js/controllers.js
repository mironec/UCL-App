angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope, $http, $state) {
    $http.get('data/services.json').success(function(data) {
        $scope.services = data;
    });

    $scope.clicked = function(service){
    	$state.go('menu.service', {serviceId: service.href});
    	//$location.path('/'+service.href);
    	//console.log(service.href);
    }
})
        

      
.controller('loginCtrl', function($scope, $state, LoginService) {
	/*if(LoginService.loggedIn){
		$state.go('menu.home');
	}*/

	$scope.init = function(){

	}

	$scope.login = function(){
		LoginService.setLoggedIn(true);
		$state.go('menu.home');
	};
})

.controller('menuCtrl', function($scope, $state, LoginService) {
	$scope.loginService = LoginService;

	$scope.init = function(){
		$scope.loginButtonText = (LoginService.isLoggedIn() ? "LOG OUT" : "LOG IN");
	}
	$scope.loginButtonClick = function(){
		if(!LoginService.isLoggedIn()) $state.go('login');
		else{
			LoginService.setLoggedIn(false);
		}
	}
})

.controller('serviceCtrl', function($scope, $rootScope, $stateParams){
	$scope.service = {};

	for(var i=0;i<$rootScope.servicesData.length;i++){
		if($rootScope.servicesData[i].href == $stateParams.serviceId){
			$scope.service.data = $rootScope.servicesData[i].data;
			$scope.service.title = $rootScope.servicesData[i].name;
		}
	}
})
   
.controller('signUpCtrl', function($scope) {

})
   
.controller('aboutCtrl', function($scope) {

})
   
.controller('clientsCtrl', function($scope) {

})
   
.controller('contactUsCtrl', function($scope) {

})
   
.controller('settingsCtrl', function($scope) {

})
   
.controller('termsOfUseCtrl', function($scope) {

})
   
.controller('privacyCtrl', function($scope) {

})
 