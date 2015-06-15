angular.module('starter.services', ['ngResource'])
// イベント
.factory('EventService', function($q, $resource) {
    var events = $resource('./data/events.json').query();

    // We use promises to make this api asynchronous. This is clearly not necessary when using in-memory data
    // but it makes this service more flexible and plug-and-play. For example, you can now easily replace this
    // service with a JSON service that gets its data from a remote server without having to changes anything
    // in the modules invoking the data service since the api is already async.
    return {
        findAll: function() {
            var deferred = $q.defer();
            deferred.resolve(events);
            return deferred.promise;
        },

        findById: function(eventId) {
            var deferred = $q.defer();
            var event = events[eventId - 1];
            deferred.resolve(event);
            return deferred.promise;
        },

        findByString: function(searchKey) {
            var deferred = $q.defer();
            var results = events.filter(function(element) {
                var fullString = element.name + " " + element.description;
                return fullString.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise;
        },

        getCalendarInfo: function() {
	    var json = "[";
            for(var i=0; i<events.length; i++) {
		if(i==events.length-1) {
		    json = json + "{\"title\":\"" + events[i].name + "\"," +
			"\"start\":\"" + events[i].startDate + "\"," +
			"\"end\":\"" + events[i].endDate + "\"," +
			"\"url\":\"#/app/event/" + events[i].id + "\"" +
			"}";
		} else {
		    json = json + "{\"title\":\"" + events[i].name + "\"," +
			"\"start\":\"" + events[i].startDate + "\"," +
			"\"end\":\"" + events[i].endDate + "\"," +
			"\"url\":\"#/app/event/" + events[i].id + "\"" +
			"},";
		}
	    }
	    json = json + "]";
	    
            return JSON.parse(json);
        }
    }
});