'use strict';
var gulp = require('gulp');
var flatten = require('gulp-flatten');
var config = require('../config').images;

gulp.task('images', function() {
  return gulp.src(config.src)
  	.pipe(flatten())
  	.pipe(gulp.dest(config.dest));
});
