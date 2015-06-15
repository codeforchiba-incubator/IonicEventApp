// Ionic Starter App
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
  if (window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
       templateUrl: "templates/map.html",
       controller: 'MapCtrl'
     }
   }
 })

  .state('app.calendar', {
    url: "/calendar",
    views: {
      'menuContent': {
        templateUrl: "templates/calendar.html",
        controller: 'CalendarCtrl'
      }
    }
  })

  .state('app.event-index', {
    url: '/event',
    views: {
      'menuContent': {
        templateUrl: 'templates/event-index.html',
        controller: 'EventIndexCtrl'
      }
    }
  })

  .state('app.event-detail', {
    url: '/event/:eventId',
    views: {
      'menuContent': {
        templateUrl: 'templates/event-detail.html',
        controller: 'EventDetailCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/event');
});

