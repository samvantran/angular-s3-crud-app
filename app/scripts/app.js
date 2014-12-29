var yhApp = angular.module('Yellowhammer', [
  'ngRoute',
  'yhControllers',
  'yhFilters']);

yhApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/s3-file-list.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);