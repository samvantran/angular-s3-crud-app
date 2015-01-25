# Angular S3 CRUD app

![sweet picture](http://img1.wikia.nocookie.net/__cb20131125081250/steamtradingcards/images/thumb/b/b5/Gun_Monkeys_Artwork_1.jpg/800px-Gun_Monkeys_Artwork_1.jpg)

_artist: Michael Firman http://www.firmanproductions.com/_

As part of a code challenge, I built an AngularJS CRUD app connected to S3. I spent 7 days on it. At the time, I had no dev experience with Angular or S3. I successfully completed the challenge thanks to Google, StackOverflow, a handful of Angular tutorials, and my own experimentation.

My application can:

- CRUD files to S3
- sort files based on size, name, and last modified
- filter files by text search
- drag and drop files to upload

The application also includes:

- a Grunt build for concatenation and minifying
- some (very weak and lame) Karma/Protractor tests

You'll need S3 credentials to interact with the app. If you don't have any, you can view a demo of the app in action here: [http://youtu.be/EuXg0QgGEoM](http://youtu.be/EuXg0QgGEoM)

Below are the code challenge requirements the company sent me.

---

We're looking for full-stack developers that are hungry to learn and can deliver functioning products. You got this far because we think you have those qualities, so now it's time to prove it. Your task is to write a simple AngularJS application that allows CRUD (create, read, update, delete). You can use the skeleton provided here (but please make a new repository instead of forking this one) or start from scratch. 

#### Requirements
The application should accomplish the following tasks:
- A user can upload a file through the web browser (create)
- A user can view a list of all the files they have uploaded (read) 
- A user can download any file that they have previously uploaded (read)
- A user can change the name of a file they have uploaded (update)
- A user can delete a file that they have uploaded (delete)

Feel free to employ any UI/UX patterns that you like, as long as you can justify your decisions.

#### Bonuses
This should be a challenging exercise on its own, but if you are absolutely crushing it, here are some extras that would make you stand out:
  - tests -- unit tests or integration tests; if you can get a test suite up and running and have a couple of meaningful tests, we will be very impressed
  - styling/design -- it doesn't have to be [worrydream.com](http://www.worrydream.com), but you want users to actually use it
  - a build process -- use gulp or grunt to concatenate your application code with all of your dependencies, minify/uglify, run JSLint, etc
  - extra features -- sorting (by file name, file size, file type, etc); allow a user to add category to their upload and to organize their list by categories; drag-and-drop; file preview thumbnails; something else you think would be cool!
  - put it in a Docker image: [https://docs.docker.com/](https://docs.docker.com/)

It's very likely that you can learn the required Angular in a couple of hours. We want to respect your time, so we'll take a look at incomplete submissions. Code quality matters a lot more than code quantity. The end goal is a product that works and is easy to use. By the way, this is a simplified version of a real task that we are currently working on, so hopefully this gives you an idea of whether you'd like coming to work at Company. 

---------------
## What We're Looking For (roughly in order of importance)

- a functioning application
- readable code -- assume that you'll have to give this codebase over to someone in Australia; use sensible names, don't be too clever, pretend you've never heard of bitwise operators
- well organized code -- e.g. a file structure that makes sense
- maintainable code -- change is the one constant in software development; your design should make an attempt at modularity (components that can be reused, swapped out, etc)
- that you had fun with it -- we love programming and learning new tech, we hope you do too

---------------
## API

We set up an Amazon S3 (Simple Storage Service) bucket for you to work with. Learning Amazon Web Services is a separate adventure, so here's everything you will need to make it work:

1) include the AWS SDK, either directly through the URL https://sdk.amazonaws.com/js/aws-sdk-2.0.27.min.js, or as part of your build process in your bower.json file. Look in the repo for an example.

2) in your application, include these configs
```javascript
AWS.config.update({
    accessKeyId:     '<ACCESS KEY ID>', 
    secretAccessKey: '<SECRET KEY>' // replace these credentials with the keys provided to you
  });
```

3) to add a file to the bucket, you'll need something like this

```javascript
// set up the bucket object
var bucket = new AWS.S3({params: {Bucket: 'yh.interview'}}) 
// add a file
bucket.putObject({
  Key: "YOURNAME/someCoolGif.gif", // this is basically the filename -- replace YOURNAME with your first and last name, lowercase, no spaces
  ACL: "public-read", // must include this exactly as is, this is what allows you to get the uploaded file from your browser
  Body: "some text or an encoded image or something" // this is the content of the file
  }, function(err, data) { // optional -- this is the callback that is executed when the operation is complete; 
                           // highly recommended -- it will be nice to know when it has worked and when it has failed;
                           // the user will probably want to know, too 
    if (err) {
      console.log(err);
    }
    if (data) {
      console.log(data);
    }
  }
)

// list the contents of your bucket
bucket.listObjects({
  Prefix: "YOURNAME" // again replace with your first and last name, lower case, no spaces; must include this key
}, function(err, data) {
  if (err) {
    console.log(err)
  }
  if (data) {
    console.log(data) // you'll want to do something more interesting than console.log with the data
                      // data will be a javascript object that looks something like this:
                      // {
                      //   CommonPrefixes: [],
                      //   Contents: [
                      //    {ETag: "number", Key: "first_filename", LastModified: aDate, Size: 200, StorageClass: "STANDARD"},
                      //    {ETag: "anotherNumber", Key: "second_filename", LastModified: anotherDate, Size: 500, StorageClass: "STANDARD"},
                      //   ],
                      //   IsTruncated: false,
                      //   Marker: "",
                      //   MaxKeys: 1000, 
                      //   Name: "yh.interview",
                      //   Prefix: "YOURNAME"
                      // }
                      // you're probably only going to be interested in Contents, and then the Key attribute from the objects in that array
                      // data.Contents[0].Key will get you "first_filename", the name of the first file in your bucket
  }
});
```
You can access your uploads with a URL: http://yh.interview.s3.amazonaws.com/YOURNAME/filename.jpg. You could, for example, use it in an anchor tag or as the src attribute in an img tag: 
```html
<img src="http://yh.interview.s3.amazonaws.com/YOURNAME/filename.jpg">
```

A question to think about: what if we want to change our service provider? How can we minimize the impact to our application (i.e. change the least amount of code) if we decide to not use AWS anymore? Do not hesitate to get in touch with us if you have questions about this or something doesn't work for you. 

---------------
## Resources

- You'll have to spend some time learning the basics of Angular. Their tutorial is good: [https://docs.angularjs.org/tutorial](https://docs.angularjs.org/tutorial). 
- Egghead.io Angular screencasts: [https://egghead.io/series/angularjs-app-from-scratch-getting-started](https://egghead.io/series/angularjs-app-from-scratch-getting-started)
- npm: [npmjs.org](https://www.npmjs.org). Use libraries. Find the right tool for the job.
- AWS Javascript SDK: [http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html). Go nuts.
