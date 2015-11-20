(function () {

  var app = angular.module('clinica', [
    'ngRoute',    
    'clinica.controllers',
    'clinica.directives',    
    'clinica.services',
    'ngSanitize'
  ]).config(['$routeProvider', function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'HomeController'
      })
      .otherwise({
        redirectTo: '/'
      });

  }])
  .filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
});

})();

