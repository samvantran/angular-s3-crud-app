var yhApp = angular.module('Yellowhammer', [
  'ngRoute',
  'yhControllers',
  'yhFilters']);

yhApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'app/index.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);