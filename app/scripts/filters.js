
angular.module('yhFilters', []).filter('sizeCheck', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});