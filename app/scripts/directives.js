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

// var directives = angular.module('directives', []);

// directives.directive('file', function() {
//   return {
//     restrict: 'AE',
//     scope: {
//       file: '@'
//     },
//     link: function(scope, el, attrs){
//       el.bind('change', function(event){
//         var files = event.target.files;
//         var file = files[0];
//         scope.file = file;
//         scope.$parent.file = file;
//         scope.$apply();
//       });
//     }
//   };
// });