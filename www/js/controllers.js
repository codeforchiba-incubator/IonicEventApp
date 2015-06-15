angular.module('starter.controllers', ['starter.services', 'ui.calendar'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

// カレンダー(fullcalendar)
.controller('CalendarCtrl', function($scope, $ionicModal, $timeout, EventService) {
  $scope.eventSources = [];
  $scope.uiConfig = {
    calendar:{
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      height: 500,
      lang: 'ja',
      scrollTime: '10:00:00',
      buttonIcons: false, 
      weekNumbers: false,
      editable: false,
      eventLimit: true,
      events: EventService.getCalendarInfo()
    }
  };
})

// Google Map
.controller('MapCtrl', function($scope, $ionicLoading, EventService) {
  // 初期呼出
  $scope.mapCreated = function(map) {
    $scope.map = map;
    $scope.markers = new Array();
    EventService.findAll().then(function(events) {
      for(var i=0; i<events.length; i++) {
	  $scope.addMarker(events[i].location.geo.latitude,events[i].location.geo.longitude,events[i].name,'#/app/event/'+events[i].id);
      }
    });
  };

  // 現在地に移動
  $scope.centerOnMe = function() {
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: '現在地を取得しています',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      alert('現在地取得失敗: ' + error.message);
    });
  };

  // マーカーの追加
  $scope.addMarker = function(glat, glong, title, url){
      var markerPosition = new google.maps.LatLng(glat, glong);
      var marker = new google.maps.Marker({
	      position: markerPosition,
	      map: $scope.map,
	      title: title,
	      icon: 'http://maps.google.co.jp/mapfiles/ms/icons/blue-dot.png'
	  });

      var infoWindow = new google.maps.InfoWindow({
	      content: '<div class="infoWindow padding"><a href="' + url + '">' + title + '</a></div>'
	  });

      // add event listener for marker
      google.maps.event.addListener(marker, 'click', function(){
	      if($scope.openInfoWindow){
		  $scope.openInfoWindow.close();
	      }
	      $scope.openInfoWindow = infoWindow;
	      $scope.openInfoWindow.open($scope.map, marker);
	  });

      $scope.markers.push(marker);
  };
})

// イベント
.controller('EventIndexCtrl', function($scope, EventService) {
  $scope.searchKey = "";
  $scope.clearSearch = function() {
    $scope.searchKey = "";
    findAllEvents();
  }

  $scope.search = function() {
    EventService.findByString($scope.searchKey).then(function(events) {
      $scope.events = events;
    });
  }

  var findAllEvents = function() {
    EventService.findAll().then(function(events) {
      $scope.events = events;
    });
  }

  findAllEvents();
})

.controller('EventDetailCtrl', function($scope, $stateParams, EventService) {
  EventService.findById($stateParams.eventId).then(function(event) {
    $scope.event = event;
  });
});
