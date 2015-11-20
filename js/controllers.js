/*davichoso@gmail.com*/
(function() {
angular.module('clinica.controllers', [])

  .controller('HomeController', ['$scope','calendarService', function($scope,calendarService){    

  $scope.calendar=[];

  calendarService.getCalendar(function(success)
  	{
  		
  		$scope.calendar.splice(0, $scope.calendar.length);
      $scope.calendar = success.days
  	},function(){});

  $scope.save = function() {
  	 calendarService.setCalendar({'calendar':$scope.calendar},function(success)
      {
         // $scope.calendar = success.days
      }
      ,function(){});
    
  };

}])
})();
