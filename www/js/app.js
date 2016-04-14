// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(['$rootScope', '$state', 'LoginService', '$ionicPlatform', '$http', function($rootScope, $state, LoginService, $ionicPlatform, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on( "$stateChangeStart", function(event, next, current) {
      if(next.name == "login" && LoginService.isLoggedIn()){
        event.preventDefault();
        $state.go('menu.home');
      }
    });

  $http.get('data/servicesData.json').success(function(data) {
        $rootScope.servicesData = data;
        for(var i=0;i<$rootScope.servicesData.length;i++){
          var o = $rootScope.servicesData[i];
          o.sref = o.href.substring(o.href.lastIndexOf('/')+1,o.href.lastIndexOf('.'));
        }
  });

  $rootScope.backendUrl = "http://portfolioapp.me.pn"; var b = $rootScope.backendUrl+"/";
  $rootScope.backendLoginUrl = b+"login.php";
  $rootScope.backendSignupUrl = b+"register.php";
  $rootScope.backendRatingUrl = b+"rating.php";
}])