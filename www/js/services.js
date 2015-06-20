angular.module('starter.services', ['ngResource'])

// イベント
.factory('EventService', function($q, $resource) {
    var events = $resource('./data/events.json').query();

    return {
        // 文字列と開始日、終了日でイベント情報を検索する
        find: function(string_s, start_s, end_s, distance_s, latitude_s, longitude_s) {
            var deferred = $q.defer();
            var results = events.filter(function(element) {
		// 距離チェック
	        var currentLatLng = new google.maps.LatLng(latitude_s,longitude_s);
		var objectLatLng = new google.maps.LatLng(element.location.geo.latitude,element.location.geo.longitude);
		var distance = google.maps.geometry.spherical.computeDistanceBetween(currentLatLng,objectLatLng);
		var distanceCheck = distance <= distance_s;

                // 文字列チェック
                var fullString = element.name + " " + element.description;
		if(!string_s) string_s = "";
                var stringCheck = fullString.toLowerCase().indexOf(string_s.toLowerCase()) > -1;

                // 開始日、終了日チェック
                var startDate = new Date(element.startDate);
                var endDate = new Date(element.endDate);
                var start = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()).getTime();
                var end = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate()).getTime();
                var startEndCheck = (end - start_s.getTime()) * (end_s.getTime() - start) > 0;

                return stringCheck && startEndCheck && distanceCheck;
            });
            deferred.resolve(results);
            return deferred.promise;
        },

	findAll: function() {
            var deferred = $q.defer();
            deferred.resolve(events);
            return deferred.promise;
        },

        // eventIdのイベント情報を返す
        findById: function(eventId) {
            var deferred = $q.defer();
            var event = events[eventId - 1];
            deferred.resolve(event);
            return deferred.promise;
        },

        // fullcalendar用にイベント情報を変換する
        getCalendarInfo: function() {
            var calEvents = new Array();
            for(var i=0; i<events.length; i++) {
                var calEvent = new Object();
                calEvent['title'] = events[i].name;
                calEvent['start'] = events[i].startDate;
                calEvent['end'] = events[i].endDate;
                calEvent['url'] = "#/tabs/calendar/" + events[i].id;
                calEvents.push(calEvent);
            }
            return calEvents;
        },

        // Google Mapのマーカー用にイベント情報を変換する
        getMarkerInfo: function() {
          var markers = new Array();
          for(var i=0; i<events.length; i++) {
	      var marker = {
		  id: events[i].id,
		  title: "<a href='#/tabs/map/" + events[i].id + "'>" + events[i].name + "</a>",
		  latitude: events[i].location.geo.latitude,
		  longitude: events[i].location.geo.longitude,
		  show: false,
		  onClick: function() {
		      this.show = !this.show;
		  }.bind(this)
	      };
	      markers.push(marker);
          }
          return markers;
        }
    }
});