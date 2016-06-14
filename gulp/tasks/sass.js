'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config').sass;
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var rebaseUrls = require('gulp-css-url-fix');
var cssUrls = require('gulp-css-urls');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var isolateFileName = function(url){
	var fileName = url.match('[^/]*$');
	return fileName[0];
}

var getFolderForAssetType = function(file){
	
  var fileWithNoParameters = file.split('?');
  var extension = fileWithNoParameters[0].split('.').pop();

	if (extension === "png" || extension === "jpg" || extension === "gif") {
		return "../images/";
	}  

	if (extension === "otf" || extension === "woff" || extension === "ttf" || extension === "eot" || extension === "woff2" || extension === "svg"){
		return "../fonts/";
	}
	
	return "/";
}
 
gulp.task('sass:includes', function () {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(concat(config.mainBundle))
    .pipe(sass({ includePaths: config.includePaths }).on('error', sass.logError))
    .pipe(cssUrls(function(url) {
    	var file = isolateFileName(url);
      return getFolderForAssetType(file) + file;
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.dest));
});

gulp.task('sass:vendor', function() {
  return gulp.src(config.vendorsSrc)
  	.pipe(sass().on('error', sass.logError))
    .pipe(concatCss(config.vendorBundle))
    .pipe(cssUrls(function(url) {
    	var file = isolateFileName(url);
      return getFolderForAssetType(file) + file;
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.dest));
});