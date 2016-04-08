angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope, $http, $state, $rootScope) {
    /*$http.get('data/services.json').success(function(data) {
        $scope.services = data;
    });*/
	$scope.services = $rootScope.servicesData;

	for(var i=0;i<$scope.services.length;i++){
		var o = $scope.services[i];
		o.sref = o.href.substring(o.href.lastIndexOf('/'),o.href.lastIndexOf('.'));
	}

    $scope.clicked = function(service){
    	$state.go('menu.service', {serviceId: service.sref});
    }
})
        

      
.controller('loginCtrl', function($scope, $state, LoginService) {
	$scope.init = function(){
		$scope.loginErrorShown=false;
		$scope.form = {};
	};

	$scope.login = function(){
		LoginService.login($scope.form.email, $scope.form.password).then(
			function(resolve){$scope.loginErrorShown=false; $state.go('menu.home')},
			function(reject){$scope.loginError="Error logging in! "+(reject||''); $scope.loginErrorShown=true;}
		);
	};
})

.controller('menuCtrl', function($scope, $state, LoginService) {
	$scope.loginService = LoginService;

	$scope.init = function(){
		$scope.loginButtonText = (LoginService.isLoggedIn() ? "LOG OUT" : "LOG IN");
	};

	$scope.loginButtonClick = function(){
		if(!LoginService.isLoggedIn()) $state.go('login');
		else{
			LoginService.setLoggedIn(false);
		}
	};
})

.controller('serviceCtrl', function($scope, $rootScope, $stateParams){
	$scope.service = {};

	for(var i=0;i<$rootScope.servicesData.length;i++){
		if($rootScope.servicesData[i].sref == $stateParams.serviceId){
			$scope.service.data = $rootScope.servicesData[i].data;
			$scope.service.title = $rootScope.servicesData[i].name;
		}
	}
})
   
.controller('signUpCtrl', function($scope, SignupService, $ionicPopup, $state) {
	$scope.form = {};
	$scope.signupError = "";
	$scope.signupErrorShown = false;

	$scope.signUp = function(){
		SignupService.signUp($scope.form.email, $scope.form.password, $scope.form.name, $scope.form.country).then(
			function(resolve){
				$scope.signupErrorShown = false;

				var alertPopup = $ionicPopup.alert({
					title: "Success",
					template: "Successfully signed up. Please proceed to log in."
				});

				alertPopup.then(function(res){$state.go('login');});
			},
			function(reject){
				$scope.signupError = "Error signing up! "+(reject||'');
				$scope.signupErrorShown = true;
			}
		);
	};
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
 