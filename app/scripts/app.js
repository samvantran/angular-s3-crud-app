var yhApp = angular.module('Yellowhammer', [
  'ngRoute',
  'yhAnimations',
  'yhControllers',
  'yhServices',
  'yhDirectives',
  'yhFilters']);

yhApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/file-list.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);