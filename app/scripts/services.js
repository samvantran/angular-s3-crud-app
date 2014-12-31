var yhServices = angular.module('yhServices', []);

yhServices.service('dragAndDrop', function() {
  return {
    activate: function() {
      var dropbox, inputbox;

      dropbox = document.getElementById("dropbox");
      input = document.getElementById('fileUpload');
      dropbox.addEventListener("dragenter", dragenter, false);
      dropbox.addEventListener("dragover", dragover, false);
      dropbox.addEventListener("dragleave", dragleave, false);
      dropbox.addEventListener("drop", drop, false);

      function dragenter (e) {
        e.stopPropagation();
        e.preventDefault();
      }

      function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
        dropbox.style.border = '5px dashed green';
      }

      function dragleave(e) {
        e.stopPropagation();
        e.preventDefault();
        dropbox.style.border = '5px dashed black';
      }

      function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;
        var files = dt.files;
        input.files[0] = files[0];
        dropbox.innerHTML = '<h2>' + files[0].name + '</h2>';
      }
    }
  }
});

yhServices.service('user', ['$rootScope', function($rootScope) {
  this.login = { status: false };
  var self = this;

  return {
    getLoginStatus: function() {
      return self.login.status;
    },
    setLoginToTrue: function() {
      self.login.status = true;
      $rootScope.$broadcast('user::loggedIn');
    }
  };
}]);

yhServices.service('s3Service', ['$rootScope', function($rootScope) {
  this.creds = {  
    prefix:     null,
    accessKey:  null,
    secretKey:  null,
    bucket:     null
  };
  var self = this;

  return {
    getCreds: function() {
      return self.creds;
    },
    setCreds: function(prefix, accessKey, secretKey, bucket) {
      self.creds.prefix    = prefix;
      self.creds.accessKey = accessKey;
      self.creds.secretKey = secretKey;
      self.creds.bucket    = bucket;

      AWS.config.update({
        accessKeyId:     accessKey,
        secretAccessKey: secretKey
      });

      $rootScope.$broadcast('s3creds::changed');
    }
  }
}]);

yhServices.service('uploadForm', function() {
  return {
    reset: function(scope) {
      var dropbox = document.getElementById('dropbox');
      dropbox.innerHTML = '<h2>Drag and Drop Files</h2>';
      dropbox.style.border = '5px dashed black';
      document.getElementById('uploadFileForm').reset();
      setTimeout(function() {
        scope.uploadProgress = 0;
        scope.$digest();
      }, 2500);
    }
  };
});