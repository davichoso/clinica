(function() {
    angular.module("clinica.directives", []).directive("calendar", [ "calendarService", function(calendarService) {
        return {
            restrict: "E",
            templateUrl: "directives/calendar.html",
            scope: {
                month: "@month",
                year: "@year"
            },
            controller: function($scope) {         
                $scope.dat = {
                    days: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],
                    months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],                  
                };
                // calculo de ultimo dia del mes
                var d = new Date($scope.year,($scope.month), 0);
                var lastday =  parseInt(moment(d).format('DD'));

                var d = new Date($scope.year,($scope.month), 1);
                var firstDay = d.getDay();
                var month=[];          
                var tr =[];
                for (var i = 0; i < lastday; i++) {
                    if (i === 0 && firstDay > 0) {
                        for (var j = 0; j < firstDay; j++)
                        {
                             tr.push({'s':false,'d':j,'f':$scope.year+"-"+$scope.month+"-"+(i+1)});         
                        }
                    }
                    tr.push({'s':true,'d':(i+1),'f':$scope.year+"-"+$scope.month+"-"+(i+1)});                    
                    if ((i + firstDay + 1) % 7 === 0) {
                       month.push(tr);
                       tr=[];
                    }
                    if (i + 1 === lastday) {
                        var rest = (49 - (firstDay + i + 1)) % 7;
                        for (var j = 0; j < rest; j++) {
                             tr.push({'s':false,'d':j,'f':$scope.year+"-"+$scope.month+"-"+(i+1)});         
                        }
                        month.push(tr);
                    }
                }
                $scope.monthdata=month;


                $scope.save = function() {
                     calendarService.setCalendar({'calendar':$scope.calendar},function(success)
                    {
                       // $scope.calendar = success.days
                    }
                    ,function(){});
                  
                };





            }
        };
    } ]).directive("uniqueEmail", [ "$http", function($http) {
        var toId;
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, elem, attr, ctrl) {
                //cuando el scope cambia ver el email.
                scope.$watch(attr.ngModel, function(value) {
                    // si hay antes un clear
                    if (value) {
                        if (toId) clearTimeout(toId);
                        //un pequeño delay para no hacer muchos requets cuando teclea
                        toId = setTimeout(function() {
                            // llamo al api rest { isValid: true } o { isValid: false }
                            $http.get("api/rest/usuarios/email/?email=" + value).success(function(data) {
                                //seteo la validez
                                ctrl.$setValidity("uniqueEmail", data.isValid);
                                scope.userForm.nivel.$setPristine();
                            });
                        }, 200);
                    }
                });
            }
        };
    } ]);
})();