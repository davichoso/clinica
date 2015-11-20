/*davichoso@gmail.com*/
(function() {
    angular.module("clinica.services", []).factory("calendarService", [ "$http", "$q", function($http, $q) {
        var base = "backend/public/";
        return {            
            setCalendar: function(calendar, success, error) {
                $http.post(base + "calendar", calendar).success(success).error(error);
            },
            getCalendar: function(success, error) {                
                $http.get(base + "calendar").success(success).error(error);
            },
            getYearMonth: function(YearMonth,success, error) {                
                $http.post(base + "calendar/getYearMonth", YearMonth).success(success).error(error);
            }


        };
    } ]);
})();

