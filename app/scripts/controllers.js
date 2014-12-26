var app = angular.module('Yellowhammer', []);

app.controller('MainCtrl', ['$scope', function($scope, $q) {

  $scope.files = [];
  $scope.creds = {
    access_key: '',
    secret_key: '',
    bucket:     'yh.interview'
  };

  AWS.config.update({
    accessKeyId:     $scope.creds.access_key,
    secretAccessKey: $scope.creds.secret_key
  });

  var s3 = new AWS.S3({ params:{ Bucket: $scope.creds.bucket }})
  s3.listObjects({ Prefix: "samtran" }, function(err, data) {
    if (err) { 
      alert("Sorry, your upload was not successful. Please check the console for error details");
      console.log(err) 
    }
    if (data) {
      for(var i = 0; i < data.Contents.length; i++){
        $scope.files.push(data.Contents[i]);
      };
      console.log(data);
    }})

  // $scope.updateList = function() {
  //   alert($scope.files.length);
  //   return $scope.files;
  // }

  $scope.uploadFileToS3 = function() {
    var file = document.getElementById('fileUpload').files[0];

    var params = {
      Key: "samtran/" + file.name,
      ACL: "public-read", // must include as is; allows you to get the uploaded file from browser
      Body: file 
    }
    
    s3.putObject(params, function(err, data) {
      if (err) { console.log(err);  }
      else     { console.log(data); }
    })
  }

  $scope.deleteFileFromS3 = function(file) {
    var params = {
      Bucket: $scope.creds.bucket, /* required */
      Key: file.Key,               /* required */
    };

    s3.deleteObject(params, function(err, data) {
      if (err) { console.log(err, err.stack); } // an error occurred
      else     { console.log(data); }           // successful response
    });
  }

}]);