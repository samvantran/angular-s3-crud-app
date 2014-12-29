'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Yellowhammer App', function() {

  describe('Login Process', function() {

    var LOGIN_CREDENTIALS = { 'PREFIX' : '',
                              'ACCESSKEY': '',
                              'SECRETKEY': '',
                              'BUCKET': 'yh.interview'
    }

    it('can log in to S3', function() {
        
      browser.get('app/index.html');

      var fileList = element.all(by.repeater('file in files'));
      var prefix = element(by.model('creds.prefix'));
      var accessKey = element(by.model('creds.accessKey'));
      var secretKey = element(by.model('creds.secretKey'));
      var bucket    = element(by.model('creds.bucket'));
      var button = element(by.id('login-button'))

      expect(fileList.count()).toBe(0);

      prefix.sendKeys(LOGIN_CREDENTIALS['PREFIX']);
      accessKey.sendKeys(LOGIN_CREDENTIALS['ACCESSKEY']);
      secretKey.sendKeys(LOGIN_CREDENTIALS['SECRETKEY']);
      bucket.sendKeys(LOGIN_CREDENTIALS['BUCKET']);
      button.click();

      browser.sleep(1000);
      expect(fileList.count()).toBeGreaterThan(0);
    });
  })
  

  describe('File list view', function() {

    it('should filter the phone list as a user types into the search box', function() {

      var fileList = element.all(by.repeater('file in files'));
      var query = element(by.model('query'));

      query.sendKeys('code');
      expect(fileList.count()).toBe(1);

      query.clear();
      query.sendKeys('works');
      expect(fileList.count()).toBe(2);
    })

    it('should be possible to control file order via the drop down select box', function() {

      var fileNameColumn = element.all(by.repeater('file in files').column('file.Key'));
      var query = element(by.model('query'));

      function getNames() {
        return fileNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.clear();
      query.sendKeys('works'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "holycowthisworks.jpg",
        "omgthisworkstoo.jpg"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="-Size"]')).click();

      expect(getNames()).toEqual([
        "omgthisworkstoo.jpg",
        "holycowthisworks.jpg"
      ]);
    });
  });

  describe('CRUD actions', function() {

    xit('should upload file', function() {
      // having trouble with uploading files, SO solution uses jQuery - will look into that later

      var path = require('path');
      var fileToUpload = 'palau-sunrise.jpg';
      var absolutePath = path.resolve('/Users/svt/Downloads/', fileToUpload);

      element(by.id('uploader-button').sendKeys(absolutePath));
      element(by.id('upload-button').click());
    });

  });
}); // end of Yellowhammer describe
