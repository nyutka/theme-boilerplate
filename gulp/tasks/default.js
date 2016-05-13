'use strict';
var gulp = require('gulp');

gulp.task('default', ['watch']);
gulp.task('build', ['webpack', 'images', 'fonts', 'sass:includes', 'sass:vendor', 'html']);