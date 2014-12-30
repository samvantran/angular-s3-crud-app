var yhApp = angular.module('Yellowhammer', [
  'ngRoute',
  'yhAnimations',
  'yhControllers',
  'yhServices',
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