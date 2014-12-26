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
      console.log(err) 
    }
    if (data) {
      for(var i = 0; i < data.Contents.length; i++){
        $scope.files.push(data.Contents[i].Key);
      };
      console.log(data);
      afiles = $scope.files
    }})

  $scope.uploadFileToS3 = function() {
    var file = document.getElementById('fileUpload').files[0];
    var fileKey = 'samtran/' + file.name;
    var params = {
      Key: fileKey,
      Body: file,
      ACL: "public-read", // must include as is; allows you to get the uploaded file from browser
    }
    
    newFile = s3.putObject(params, function(err, data) {
      if (err) { console.log(err);  }
      else     { 
        console.log(data);
        $scope.files.push(fileKey)
        var form = document.getElementById('uploadFileForm')
        form.reset();
      }
    })
  }

  $scope.isEditing = false;
  $scope.fileName = null;
  $scope.oldFileName = null;

  $scope.showEditForm = function(currentFileName) {
    $scope.isEditing = true;
    $scope.fileName = currentFileName;
    $scope.oldFileName = currentFileName;
  }

  $scope.stopEditing = function() {
    $scope.isEditing = false;
  }

  $scope.editFileName = function() {
    // To edit file name in S3: GET file, change Key name, PUT object and DELETE old file
    $scope.fileName = this.fileName;
    console.log($scope.fileName);
    console.log($scope.oldFileName);

    var fileCopy;
    var params = {
      Bucket: $scope.creds.bucket,
      Key: $scope.oldFileName                
    };

    s3.getObject(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        fileCopy = data;
        console.log(fileCopy);
        s3.deleteObject({ Bucket: $scope.creds.bucket, Key: $scope.oldFileName }, function(err, data){
          if (err) console.log(err);
          else {
            s3.putObject({ Key: $scope.fileName, ACL: "public-read", Body: fileCopy.Body }, function(err, data){
              if (err) console.log(err);
              else {
                console.log("Successfully edited file!");
                console.log(data)
              }
            })
          }
        })
      }
    });
  }

  $scope.deleteFileFromS3 = function(file) {
    var confirmed = confirm("Are you sure you want to delete " + file + "?")
    if( confirmed ) {
      var params = {
        Bucket: $scope.creds.bucket, /* required */
        Key: file,                   /* required */
      };

      s3.deleteObject(params, function(err, data) {
        if (err) { 
          console.log(err, err.stack); } 
        else { 
          console.log(data);
         }
      });
    }
  }   
}]);

