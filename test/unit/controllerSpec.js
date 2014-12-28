'use strict';

describe('Yellowhammer controllers', function() {

  describe('MainCtrl', function(){

    beforeEach(module('Yellowhammer'));

    it('should be able to log in to S3', inject(function($controller) {    
      var scope = {}, ctrl = $controller('MainCtrl', {$scope:scope});
      

      expect(scope.creds.secretKey).not.toBeUndefined();
    }));

    xit('can retrieve bucket files', inject(function($controller) {
      var empty = scope.files.length;

      scope.retrieveBucketFiles();

      var files = scope.files.length;

      expect(files).not.toBe(empty);
    }));

    it('can upload a new file to S3', inject(function($controller) {
      var scope = {}, ctrl = $controller('MainCtrl', {$scope:scope});
    }));


  });
}); // end of 'Yellowhammer Controllers'