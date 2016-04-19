angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope, $http, $state, $rootScope) {
    /*$http.get('data/services.json').success(function(data) {
        $scope.services = data;
    });*/
	$scope.services = $rootScope.servicesData;
	$scope.serviceFilter = function(val){return val.parent===undefined;};

    $scope.clicked = function(service){
    	$state.go('menu.service', {serviceSref: service.sref});
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

.controller('serviceCtrl', function($scope, $rootScope, $stateParams, LoginService, RatingService, $ionicPopup, $http, $state){
	$scope.loginService = LoginService;
	$scope.form = {};
	$scope.submitForm = function(){
		RatingService.sendRating($scope.service.service_id, $scope.form.rating, $scope.form.comment).then(
			function(resolve){
				$scope.ratingSection = resolve;
				$scope.form.rating = 0;
				$scope.form.comment = '';
			},
			function(reject){
				var alertPopup = $ionicPopup.alert({
					title: "Error",
					template: "Error submitting rating: "+reject
				});

				alertPopup.then(function(res){});
			}
		);
	};
	$scope.service = {};
	$scope.subClick = function(service){
		$state.go('menu.service', {serviceSref: service.sref});
	};

	for(var i=0;i<$rootScope.servicesData.length;i++){
		if($rootScope.servicesData[i].sref == $stateParams.serviceSref){
			$scope.service.data = $rootScope.servicesData[i].data;
			$scope.service.title = $rootScope.servicesData[i].name;
			$scope.service.service_id = $rootScope.servicesData[i].service_id;
			$scope.service.subPages = $rootScope.servicesData[i].subPages;
			for(var j = 0;j<$scope.service.subPages.length;j++){
				var href = $scope.service.subPages[j];
				for(var k = 0;k<$rootScope.servicesData.length;k++){
					var s = $rootScope.servicesData[k];
					if(s.href == href && (s.disabled === undefined || s.disabled === false)){
						$scope.service.subPages[j]=s;
					}
				}
			}
		}
	}

	$http.get($rootScope.backendRatingUrl+'?service_id='+$scope.service.service_id).then(function(response){
		if(response.data.substring(0,2) == 'E ') $scope.ratingSection='';
		else $scope.ratingSection = response.data;
	},function(reject){});
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
 