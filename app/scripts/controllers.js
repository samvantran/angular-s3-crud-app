angular.module('Yellowhammer', [])
.controller('MainCtrl', ['$scope', function($scope) {

  $scope.uploadProgress = 0;
  $scope.creds = {};

  AWS.config.update({
    accessKeyId:     '',
    secretAccessKey: '',
  });

  var bucket = new AWS.S3({ params:{ Bucket: 'yh.interview' }})

  $scope.listBucketContents = function() {

    bucket.listObjects({ Prefix: "samtran" }, function(err, data) {
    if (err) {
      console.log(err)
    }
    if (data) {
      console.log(data)
    }});
  }

  $scope.uploadFile = function() {

    bucket.putObject({
      Key: "samtran/equation", // filename
      ACL: "public-read", // must include this exactly as is, this is what allows you to get the uploaded file from your browser
      Body: "some text or an encoded image or something" // this is the content of the file
      }, function(err, data) {
        if (err)  { console.log(err);  }
        if (data) { console.log(data); }
    })
  }
}]);