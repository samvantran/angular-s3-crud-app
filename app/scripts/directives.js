'use strict';

var yhDirectives = angular.module('yhDirectives', []);

yhDirectives.directive('loginSection', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/login-panel.html'
  };
});

yhDirectives.directive('uploadForm', function() {
  return {

    restrict: 'E', 
    templateUrl: 'partials/upload-form.html'
  };
});

yhDirectives.directive('fileListing', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/file-listing.html'
  };
});