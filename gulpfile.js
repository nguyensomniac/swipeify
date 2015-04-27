'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var wrench = require('wrench');

var options = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components'
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
gulp.task('serveprod', function() {
  gulp.start('build');
  connect.server({
    root: './dist',
    port: process.env.PORT || 3000, // localhost:5000
    livereload: false
  });
});