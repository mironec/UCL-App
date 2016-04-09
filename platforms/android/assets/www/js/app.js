// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
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
      if(next.name == "login" && LoginService.loggedIn){
        console.log($state);
        event.preventDefault();
        $state.go('menu.home');
      }
    });

  $http.get('data/servicesData.json').success(function(data) {
        $rootScope.servicesData = data;
  });
}])