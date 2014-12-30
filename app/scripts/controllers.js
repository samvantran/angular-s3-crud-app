'use strict';

var yhControllers = angular.module('yhControllers', ['yhServices', 'yhDirectives']);

yhControllers.controller('MainCtrl', ['$scope', '$http', 'dragAndDrop', 
  function($scope, $http, dragAndDrop) {
  
  $scope.files = [];    // S3 bucket files
  $scope.creds = {};    // S3 login credentials
  var s3;               // later used for S3 API interaction

  $scope.loginToS3 = function(prefix, accessKey, secretKey, bucket) {
    $scope.creds.prefix    = prefix;
    $scope.creds.accessKey = accessKey;
    $scope.creds.secretKey = secretKey;
    $scope.creds.bucket    = bucket;

    AWS.config.update({
      accessKeyId:     $scope.creds.accessKey,
      secretAccessKey: $scope.creds.secretKey
    });

    // after logging in successfully, retrieve files associated with the user
    s3 = new AWS.S3({ params:{ Bucket: $scope.creds.bucket }})   
    $scope.retrieveBucketFiles();
  }

  //------------------------------------------------------
  // CRUD ACTIONS
  //------------------------------------------------------

  $scope.retrieveBucketFiles = function() {
    s3.listObjects({ 
      Bucket: $scope.creds.bucket,    // required fields
      Prefix: $scope.creds.prefix
    }, function(err, data) {
      if (err) { console.log(err); }  // error occurred
      else {

        // if file retrieval successful, signify logged in
        if( $scope.isLoggedIn === false ){
          $scope.isLoggedIn = true; 
          $scope.orderProp = '-LastModified';
        }

        // add S3 bucket files to $scope.files and update view
        $scope.files = data.Contents;
        dragAndDrop.activate();
        $scope.$apply();
      }
    })
  }

  $scope.uploadFileToS3 = function() {
    $scope.uploadProgress = 0;
    var file = document.getElementById('fileUpload').files[0];
    
    s3.putObject({
      // required fields to access S3 bucket
      Key:  $scope.creds.prefix + '/' + file.name,  // ex. johndoe/file.jpg
      Body: file,
      ACL:  "public-read"
    }, function(err, data) {
      if (err) { console.log(err); } // error ocurred
      else { 
        $scope.retrieveBucketFiles();

        // Reset the forms & progress bar
        document.getElementById('uploadFileForm').reset();
        document.getElementById('dropbox').innerHTML = '<h2>Drag and Drop Files</h2>'
        setTimeout(function() {
          $scope.uploadProgress = 0;
          $scope.$digest();
        }, 2500);
      }
    }) // this is what updates the progress bar live
    .on('httpUploadProgress',function(progress) {
      $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
      $scope.$digest();
    });
  }

  $scope.editFileName = function() {
    // AWS S3 doesn't allow file name changes so instead, we:
    // 1. GET old file & copy it
    // 2. PUT the copied file back to S3 with new name
    // 3. DELETE old file

    var fileCopy;
    $scope.newFileName = this.newFileName;
    
    // GET old file
    s3.getObject({ 
      Bucket: $scope.creds.bucket, 
      Key:    $scope.oldFileName 
    }, function(err, data) {
      if (err) console.log(err, err.stack);   // error occurred
      else {
        // copy file and PUT it back to S3 with new name
        fileCopy = data;
        s3.putObject({ 
          Key: $scope.creds.prefix + '/' + $scope.newFileName, 
          ACL: "public-read", 
          Body: fileCopy.Body 
        }, function(err, data){
          if (err) console.log(err);
          else { $scope.retrieveBucketFiles(); }  // update view
        })
      }
    });

    // Delete old file
    s3.deleteObject({ 
      Bucket: $scope.creds.bucket, 
      Key:    $scope.oldFileName 
    }, function(err, data){
      if (err) console.log(err);
    })

  } // end of editFileName()

  $scope.deleteFileFromS3 = function(file) {
    var confirmed = confirm("Are you sure you want to delete " + file.Key + "?")
    if (confirmed) {
      s3.deleteObject({
        Bucket: $scope.creds.bucket,
        Key: file.Key
      }, function(err, data) {
        if (err) { console.log(err, err.stack);  } // error occurred
        else     { $scope.retrieveBucketFiles(); }
      });
    } 
  }

  // ------------------------------------------------------
  // MANAGING STATE
  // ------------------------------------------------------

  $scope.newFileName = null;
  $scope.oldFileName = null;
  $scope.isLoggedIn  = false;

  $scope.showEditForm = function(currentFileName) {
    $scope.newFileName = currentFileName.slice(8, (currentFileName).length);
    $scope.oldFileName = currentFileName;
  }

  $scope.isEditing = function(fileName) {
    return fileName === $scope.oldFileName;
  }

  $scope.stopEditing = function() {
    $scope.oldFileName = null;
  }

}]);


yhControllers.controller('FileDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.fileKey = $routeParams.fileKey;
  }]);