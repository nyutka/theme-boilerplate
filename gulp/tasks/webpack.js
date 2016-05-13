'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');

var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);

gulp.task('webpack', function(callback) {
    devCompiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true
        }));
        callback();
    });
});
