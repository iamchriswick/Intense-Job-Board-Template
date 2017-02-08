'use strict';

import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import * as conf from './_conf';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

/**
 * Compile the JS files into scripts.js.
 */
let buildScripts = () => {
  let onError = function(error) {
    $.notify.onError({
      title: '<%= error.message %>',
      sound: 'Frog',
      icon: path.join(__dirname, 'help/error.png'),
      contentImage: path.join(__dirname, 'help/js.png'),
      time: 3000,
      onLast: true
    })(error);

    this.emit('end');
  };
  return gulp.src(conf.paths.scripts.src)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.concat(conf.paths.scripts.file + '.js'))
    .pipe(gulp.dest(conf.paths.scripts.dist))
    .pipe($.uglify())
    .pipe($.rename({
      basename: conf.paths.scripts.file,
      suffix: '.min'
    }))
    .pipe(gulp.dest(conf.paths.scripts.dist))
    .pipe($.notify({
      title: 'JS task completed',
      message: 'All JS files are saved and minified.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/js.png'),
      time: 1000,
      onLast: true
    }));
};

gulp.task('scripts', () => {
  return buildScripts();
});

gulp.task('scripts-reload', () => {
  return buildScripts()
    .pipe(browserSync.stream());
});
