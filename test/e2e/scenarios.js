'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Yellowhammer App', function() {

  it('can log in to S3', function() {
      
    browser.get('app/index.html');

    var fileList = element.all(by.repeater('file in files'));
    expect(fileList.count()).toBe(0);

    var accessKey = element(by.model('creds.accessKey'));
    var secretKey = element(by.model('creds.secretKey'));
    var bucket    = element(by.model('creds.bucket'));
    var button = element(by.id('login-button'))

    accessKey.sendKeys('');
    secretKey.sendKeys('');
    bucket.sendKeys('yh.interview');
    button.click();

    browser.sleep(2000);
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
    });
  });
});
