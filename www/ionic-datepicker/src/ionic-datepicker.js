//By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla
// edited by david3080@gmail.com

"use strict";
var app = angular.module('ionic-datepicker', ['ionic', 'ionic-datepicker.templates']);

app.service('DatepickerService', function () {

  this.monthsList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  this.yearsList = [2015, 2016];
});

app.directive('ionicDatepicker', ['$ionicPopup', 'DatepickerService', function ($ionicPopup, DatepickerService) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      ipDate: '=idate',
      disablePreviousDates: '=disablepreviousdates',
      callback: '=callback'
    },
    link: function (scope, element, attrs) {

      var monthsList = DatepickerService.monthsList;
      scope.monthsList = monthsList;
      scope.yearsList = DatepickerService.yearsList;

      scope.currentMonth = '';
      scope.currentYear = '';

      if (!scope.ipDate) {
        scope.ipDate = new Date();
      }

      scope.previousDayEpoch = (+(new Date()) - 86400000);
      var currentDate = angular.copy(scope.ipDate);
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);

      scope.selctedDateString = currentDate.toString();
      scope.weekNames = ['日', '月', '火', '水', '木', '金', '土'];
      scope.today = {};

      var tempTodayObj = new Date();
      var tempToday = new Date(tempTodayObj.getFullYear(), tempTodayObj.getMonth(), tempTodayObj.getDate());

      scope.today = {
        dateObj: tempTodayObj,
        date: tempToday.getDate(),
        month: tempToday.getMonth(),
        year: tempToday.getFullYear(),
        day: tempToday.getDay(),
        dateString: tempToday.toString(),
        epochLocal: tempToday.getTime(),
        epochUTC: (tempToday.getTime() + (tempToday.getTimezoneOffset() * 60 * 1000))
      };

      var refreshDateList = function (current_date) {
        current_date.setHours(0);
        current_date.setMinutes(0);
        current_date.setSeconds(0);
        current_date.setMilliseconds(0);

        scope.selctedDateString = (new Date(current_date)).toString();
        currentDate = angular.copy(current_date);

        var firstDay = new Date(current_date.getFullYear(), current_date.getMonth(), 1).getDate();
        var lastDay = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate();

        scope.dayList = [];

        for (var i = firstDay; i <= lastDay; i++) {
          var tempDate = new Date(current_date.getFullYear(), current_date.getMonth(), i);
          scope.dayList.push({
            date: tempDate.getDate(),
            month: tempDate.getMonth(),
            year: tempDate.getFullYear(),
            day: tempDate.getDay(),
            dateString: tempDate.toString(),
            epochLocal: tempDate.getTime(),
            epochUTC: (tempDate.getTime() + (tempDate.getTimezoneOffset() * 60 * 1000))
          });
        }

        var firstDay = scope.dayList[0].day;

        scope.currentMonthFirstDayEpoch = scope.dayList[0].epochLocal;

        for (var j = 0; j < firstDay; j++) {
          scope.dayList.unshift({});
        }

        scope.rows = [];
        scope.cols = [];

        scope.currentMonth = monthsList[current_date.getMonth()];
        scope.currentYear = current_date.getFullYear();

        scope.numColumns = 7;
        scope.rows.length = 6;
        scope.cols.length = scope.numColumns;
      };

      scope.monthChanged = function (month) {
        var monthNumber = scope.monthsList.indexOf(month);
        currentDate.setMonth(monthNumber);
        refreshDateList(currentDate)
      };

      scope.yearChanged = function (year) {
        currentDate.setFullYear(year);
        refreshDateList(currentDate)
      };

      scope.prevMonth = function () {
        if (currentDate.getMonth() === 1) {
          currentDate.setFullYear(currentDate.getFullYear());
        }
        currentDate.setMonth(currentDate.getMonth() - 1);

        scope.currentMonth = monthsList[currentDate.getMonth()];
        scope.currentYear = currentDate.getFullYear();

        refreshDateList(currentDate)
      };

      scope.nextMonth = function () {
        if (currentDate.getMonth() === 11) {
          currentDate.setFullYear(currentDate.getFullYear());
        }
        currentDate.setMonth(currentDate.getMonth() + 1);

        scope.currentMonth = monthsList[currentDate.getMonth()];
        scope.currentYear = currentDate.getFullYear();

        refreshDateList(currentDate)
      };

      scope.date_selection = {selected: false, selectedDate: '', submitted: false};

      scope.dateSelected = function (date) {
        scope.selctedDateString = date.dateString;
        scope.date_selection.selected = true;
        scope.date_selection.selectedDate = new Date(date.dateString);
      };

      element.on("click", function () {
        if (!scope.ipDate) {
          var defaultDate = new Date();
          refreshDateList(defaultDate);
        } else {
          refreshDateList(angular.copy(scope.ipDate));
        }

        $ionicPopup.show({
          templateUrl: 'date-picker-modal.html',
          title: '<strong>日にちの選択</strong>',
          subTitle: '',
          scope: scope,
          buttons: [
            {
              text: '今日',
              onTap: function (e) {
                var today = new Date();
                var tempEpoch = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                var todayObj = {
                  date: today.getDate(),
                  month: today.getMonth(),
                  year: today.getFullYear(),
                  day: today.getDay(),
                  dateString: today.toString(),
                  epochLocal: tempEpoch.getTime(),
                  epochUTC: (tempEpoch.getTime() + (tempEpoch.getTimezoneOffset() * 60 * 1000))
                };

                scope.selctedDateString = todayObj.dateString;
                scope.date_selection.selected = true;
                scope.date_selection.selectedDate = new Date(todayObj.dateString);
                refreshDateList(new Date());
                e.preventDefault();
              }
            },
            {
              text: '設定',
              type: 'button-positive',
              onTap: function (e) {
                scope.date_selection.submitted = true;

                if (scope.date_selection.selected === true) {
		  // scope.ipDate = angular.copy(scope.date_selection.selectedDate);
		  // scope.callback(scope.ipDate);
		  try {
		    scope.callback(scope.date_selection.selectedDate);
		    scope.ipDate = angular.copy(scope.date_selection.selectedDate);
		  } catch(err) {
		      // callbackエラー
		  }
                } else {
                  e.preventDefault();
                }
              }
            }
          ]
        })
      })
    }
  }
}]);