'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Yellowhammer App', function() {

  var LOGIN_CREDENTIALS = { 'ACCESSKEY': '',
                            'SECRETKEY': '',
                            'BUCKET': 'yh.interview'
  }

  it('can log in to S3', function() {
      
    browser.get('app/index.html');

    var fileList = element.all(by.repeater('file in files'));
    expect(fileList.count()).toBe(0);

    var accessKey = element(by.model('creds.accessKey'));
    var secretKey = element(by.model('creds.secretKey'));
    var bucket    = element(by.model('creds.bucket'));
    var button = element(by.id('login-button'))

    accessKey.sendKeys(LOGIN_CREDENTIALS['ACCESSKEY']);
    secretKey.sendKeys(LOGIN_CREDENTIALS['SECRETKEY']);
    bucket.sendKeys(LOGIN_CREDENTIALS['BUCKET']);
    button.click();

    browser.sleep(1500);
    expect(fileList.count()).toBe(4);
  });

  describe('File list view', function() {

    it('should filter the phone list as a user types into the search box', function() {

      var fileList = element.all(by.repeater('file in files'));
      var query = element(by.model('query'));

      expect(fileList.count()).toBe(4);

      query.sendKeys('code');
      expect(fileList.count()).toBe(1);

      query.clear();
      query.sendKeys('omg');
      expect(fileList.count()).toBe(2);
    })

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
