angular.module('starter.controllers', ['starter.services', 'ui.calendar'])

// イベント情報リスト用コントローラ
.controller('EventCtrl', function($scope, $ionicPopup, $ionicLoading, $cordovaGeolocation, EventService) {
  // 検索文字列設定
  $scope.searchKey = "";
  $scope.clearSearch = function() {
    $scope.searchKey = null;
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
      updateCalInfo();
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
      updateCalInfo();
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
      updateCalInfo();
    });
  };

  // 検索距離の指定
  $scope.distance = 100000;
  $scope.changeDistance = function() {
    EventService.find($scope.searchKey,$scope.searchStartDate,$scope.searchEndDate,$scope.distance,$scope.latitude,$scope.longitude).then(function(events) {
      $scope.events = events;
      updateCalInfo();
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
      updateCalInfo();
    });
  };
  
  // 初期表示のための検索
  var firstSearch = function() {
    EventService.findAll().then(function(events) {
      $scope.events = events;
      updateCalInfo();
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
  var updateCalInfo = function() {
    $scope.eventSources = EventService.getCalendarInfo();
    //    $('#eventCalendar').fullCalendar('refetchEvents');
  };

  // Google Map初期呼出
  $scope.mapCreated = function(map) {
    $scope.map = map;
    $scope.markers = new Array();
    EventService.findAll().then(function(events) {
      for(var i=0; i<events.length; i++) {
	  $scope.addMarker(events[i].location.geo.latitude,events[i].location.geo.longitude,events[i].name,'#/tabs/map/'+events[i].id);
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

    $cordovaGeolocation.getCurrentPosition().then(function(pos){
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (err) {
      // 現在地取得失敗
      alert('現在地取得失敗: ' + err.message);
      $scope.loading.hide();
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

// イベント詳細情報用コントローラ
.controller('EventDetailCtrl', function($scope, $stateParams, EventService) {
  EventService.findById($stateParams.eventId).then(function(event) {
    $scope.event = event;
  });
    });
