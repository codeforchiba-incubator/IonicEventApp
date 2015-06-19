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
  // スタイルの設定
  $ionicConfigProvider.tabs.style("standard");
  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.views.transition("ios");
  $ionicConfigProvider.navBar.alignTitle("center");
  $ionicConfigProvider.navBar.positionPrimaryButtons('left');
  $ionicConfigProvider.navBar.positionSecondaryButtons('right');
  $ionicConfigProvider.backButton.previousTitleText(false).text('');

  // 下記URLでない場合の遷移先を指定
  $urlRouterProvider.otherwise('/tabs/events');

  // ルーティング
  $stateProvider

  .state('app', {
    url: "",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

  .state('app.help', {
    url: '/help',
    views: {
      'menuContent': {
        templateUrl: 'templates/help.html'
      }
    }
  })

  .state('app.tabs', {
    url: '/tabs',
    abstract: true,
    views: {
      'menuContent': {
        templateUrl: 'templates/tabs.html'
      }
    }
  })

  .state('app.tabs.events', {
    url: '/events',
    views: {
      'events': {
        templateUrl: 'templates/events.html',
        controller: 'EventCtrl'
      }
    }
  })
  .state('app.tabs.event', {
    url: '/events/:eventId',
    views: {
      'events': {
        templateUrl: 'templates/event.html',
        controller: 'EventDetailCtrl'
      }
    }
  })

  .state('app.tabs.calendar', {
    url: "/calendar",
    views: {
      'calendar': {
        templateUrl: "templates/calendar.html",
        controller: 'EventCtrl'
      }
    }
  })
  .state('app.tabs.calevent', {
    url: '/calendar/:eventId',
    views: {
      'calendar': {
        templateUrl: 'templates/event.html',
        controller: 'EventDetailCtrl'
      }
    }
  })

  .state('app.tabs.map', {
    url: "/map",
    views: {
      'map': {
        templateUrl: "templates/map.html",
        controller: 'EventCtrl'
      }
    }
  })
  .state('app.tabs.mapevent', {
    url: '/map/:eventId',
    views: {
      'map': {
        templateUrl: 'templates/event.html',
        controller: 'EventDetailCtrl'
      }
    }
  })
});
