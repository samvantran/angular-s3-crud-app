angular.module('Yellowhammer', [])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'MainCtrl',
    templateUrl: 'app/index.html',
  })
  .otherwise({
    redirectTo: '/'
  });
});