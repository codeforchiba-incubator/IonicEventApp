// Ionic Starter App
var app = angular.module('starter', ['ionic', 'ionic-datepicker', 'starter.controllers', 'starter.directives', 'ngCordova'])

app.run(function($ionicPlatform) {
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

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  // 戻るボタンの文字を表示しない
  $ionicConfigProvider.backButton.previousTitleText(false).text('');

  // 下記URLでない場合の遷移先を指定
  $urlRouterProvider.otherwise('/app/event');

  // ルーティング
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'EventCtrl'
  })

  .state('app.events', {
    url: '/event',
    views: {
      'events': {
        templateUrl: 'templates/events.html',
        controller: 'EventCtrl'
      }
    }
  })

  .state('app.event', {
    url: '/event/:eventId',
    views: {
      'events': {
        templateUrl: 'templates/event.html',
        controller: 'EventDetailCtrl'
      }
    }
  })

  .state('app.calendar', {
    url: "/calendar",
    views: {
      'calendar': {
        templateUrl: "templates/calendar.html",
        controller: 'EventCtrl'
      }
    }
  })

  .state('app.calevent', {
    url: '/calendar/:eventId',
    views: {
      'calendar': {
        templateUrl: 'templates/event.html',
        controller: 'EventDetailCtrl'
      }
    }
  })

  .state('app.map', {
    url: "/map",
    views: {
      'map': {
        templateUrl: "templates/map.html",
        controller: 'EventCtrl'
      }
    }
  })

  .state('app.mapevent', {
    url: '/map/:eventId',
    views: {
      'map': {
        templateUrl: 'templates/event.html',
        controller: 'EventDetailCtrl'
      }
    }
  })
});
