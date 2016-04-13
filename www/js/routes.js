angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl',
    abstract:true
  })

  .state('login', {
    url: '/page4',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signUp', {
    url: '/page5',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('menu.service', {
    url: '/service/:serviceSref',
    views: {
      'side-menu21':{
        templateUrl: 'templates/service.html',
        controller: 'serviceCtrl'
      }
    }
  })

  .state('menu.about', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      }
    }
  })

  .state('menu.clients', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/clients.html',
        controller: 'clientsCtrl'
      }
    }
  })

  .state('menu.contactUs', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contactUs.html',
        controller: 'contactUsCtrl'
      }
    }
  })

  .state('menu.settings', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('menu.termsOfUse', {
    url: '/page10',
    views: {
      'side-menu21': {
        templateUrl: 'templates/termsOfUse.html',
        controller: 'termsOfUseCtrl'
      }
    }
  })

  .state('menu.privacy', {
    url: '/page11',
    views: {
      'side-menu21': {
        templateUrl: 'templates/privacy.html',
        controller: 'privacyCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page4')

  

});