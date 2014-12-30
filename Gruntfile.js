
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      css: {
        options: {
          separator: ''
        },
        src: ['app/styles/app.css',
              'app/styles/animations.css'
             ],
        dest: 'dist/<%= pkg.name %>.css'
      },
      js: {
        options: {
          separator: ';\n'
        },
        src: ['app/bower_components/jquery/dist/jquery.min.js',
              'app/bower_components/angular/angular.min.js',
              'app/bower_components/angular-route/angular-route.min.js',
              'app/bower_components/angular-animate/angular-animate.min.js',
              'app/bower_components/aws-sdk-js/dist/aws-sdk.min.js',
              'app/scripts/*.js'
             ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        // banner is inserted at top of output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      target: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};