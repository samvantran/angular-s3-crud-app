angular.module('Yellowhammer', [
  'ngRoute',
  'Yellowhammer.services',
  'Yellowhammer.directives'])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'MainCtrl',
    templateUrl: 'templates/main.html',
  })
  .otherwise({
    redirectTo: '/'
  });
});