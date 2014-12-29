'use strict';

var app = angular.module('Yellowhammer', []);

app.controller('MainCtrl', ['$scope', function($scope) {

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

    s3 = new AWS.S3({ params:{ Bucket: $scope.creds.bucket }})

    // after logging in successfully, retrieve files associated with the user
    if(s3) { 
      $scope.retrieveBucketFiles(); 
      $scope.isLoggedIn = true; 
      $scope.orderProp = 'Key';
    }
  }

  //------------------------------------------------------
  // CRUD ACTIONS
  //------------------------------------------------------

  $scope.uploadFileToS3 = function() {
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
        var form = document.getElementById('uploadFileForm')
        form.reset();
      }
    })
  }

  $scope.retrieveBucketFiles = function() {
    s3.listObjects({ 
      // required fields to access S3 bucket
      Bucket: $scope.creds.bucket, 
      Prefix: $scope.creds.prefix
    }, function(err, data) {
      if (err) { console.log(err); }  // error occurred
      else {
        // add S3 bucket files to $scope.files and update view
        $scope.files = data.Contents
        $scope.$apply();
      }
    })
  }

  $scope.editFileName = function() {
    // To edit file name in S3: 
    // 1. GET old file & copy it
    // 2. change name
    // 3. DELETE old file
    // 4. PUT new file

    var fileCopy;
    $scope.newFileName = this.newFileName;
    
    // GET old file
    s3.getObject({ 
      Bucket: $scope.creds.bucket, 
      Key:    $scope.oldFileName 
    }, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        // copy to memory & then DELETE old file from S3
        fileCopy = data;
        s3.deleteObject({ 
          Bucket: $scope.creds.bucket, 
          Key:    $scope.oldFileName 
        }, function(err, data){
          if (err) console.log(err);
          else {
            // ADD new file
            s3.putObject({ 
              Key: $scope.creds.prefix + '/' + $scope.newFileName, 
              ACL: "public-read", 
              Body: fileCopy.Body 
            }, function(err, data){
              if (err) console.log(err);
              else {
                $scope.retrieveBucketFiles();
    }})}})}});
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
  $scope.isEditing   = false;
  $scope.isLoggedIn  = false;

  $scope.showEditForm = function(currentFileName) {
    $scope.isEditing = true;
    $scope.newFileName = currentFileName.slice(8, (currentFileName).length);
    $scope.oldFileName = currentFileName;
  }

  $scope.stopEditing = function() {
    $scope.isEditing = false;
  }

}]);

