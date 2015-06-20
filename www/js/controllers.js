angular.module('starter.controllers', ['starter.services', 'ui.calendar', 'uiGmapgoogle-maps'])

// イベント情報リスト用コントローラ
.controller('EventCtrl', function($scope, $ionicPopup, $ionicLoading, $cordovaGeolocation, EventService) {
  // 検索文字列設定
  $scope.searchKey = "";
  $scope.clearSearch = function() {
    $scope.searchKey = null;
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };

  // 検索期間の指定
  var currentDate = new Date();
  $scope.searchStartDate = new Date(currentDate.getFullYear(),currentDate.getMonth()-1,currentDate.getDate());
  $scope.searchEndDate = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,currentDate.getDate());
  $scope.startDateSelected = function (startDate) {
    if(startDate > $scope.searchEndDate) {
      var msg = {title: '検索期間不正', template: '検索期間の開始日が終了日より後になってはいけません。'};
      $ionicPopup.alert(msg);
      throw msg;
    }
    EventService.find($scope.searchKey,startDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
    return startDate;
  };
  $scope.endDateSelected = function (endDate) {
    if(endDate < $scope.searchStartDate) {
      var msg = {title: '検索期間不正', template: '検索期間の終了日が開始日より前になってはいけません。'};
      $ionicPopup.alert(msg);
      endDate = $scope.searchEndDate;
      throw msg;
    }
    EventService.find($scope.searchKey,$scope.searchStartDate,endDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };

  // 検索距離の指定
  $scope.distance = 100000;
  $scope.changeDistance = function() {
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };

  // 現在地の緯度経度の設定
  $scope.latitude = 0;
  $scope.longitude = 0;
  $cordovaGeolocation.getCurrentPosition().then(function(position){
    $scope.latitude = position.coords.latitude;
    $scope.longitude = position.coords.longitude;
  }, function (err) {
    // TODO エラー処理
  });

  // 検索
  $scope.search = function() {
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
    });
  };
  
  // 初期表示のための検索
  var firstSearch = function() {
    EventService.findAll().then(function(events) {
      $scope.events = events;
    });
  }
  firstSearch();

  // ui-Calendar用
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

  // Google Map初期呼出
  $scope.map = {
      center: {
	  latitude: 35.613281,
	  longitude: 140.112869
      },
      zoom: 10,
      markers: EventService.getMarkerInfo()
  };
})

// イベント詳細情報用コントローラ
.controller('EventDetailCtrl', function($scope, $stateParams, EventService) {
  EventService.findById($stateParams.eventId).then(function(event) {
    $scope.event = event;
  });
})

// Instagram用コントローラ
.controller('InstafeedCtrl', function($scope, $stateParams, EventService) {
  $scope.feed = new Instafeed({
    get: 'tagged',
    tagName: 'chibalotte',
    clientId: '6c32ef1ca54a4f32a22075a3b90aa2e2',
    sortBy:'most-recent',
    links: false,
    limit: 100,
    resolution: 'low_resolution',
    template: '<li><a href="{{link}}" target="_blank"><img src="{{image}}"/></a><br/>{{caption}}<br/>like:{{likes}}</li>'
  });
  $scope.feed.run();

  $scope.next = function() {
      feed.next();
  };
});
