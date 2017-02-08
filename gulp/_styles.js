'use strict';

import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import unCSS from 'gulp-uncss';
import cleanCSS from 'gulp-clean-css';
import lost from 'lost';
import * as conf from './_conf';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

/**
 * Compile the SASS files into CSS.
 */
let buildStyles = () => {
  let onError = function(error) {
    $.notify.onError({
      title: '<%= error.message %>',
      sound: 'Frog',
      icon: path.join(__dirname, 'help/error.png'),
      contentImage: path.join(__dirname, 'help/sass.png'),
      time: 3000,
      onLast: true
    })(error);

    this.emit('end');
  };
  return gulp.src(conf.paths.styles.src)
    .pipe($.sassGlob())
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      includePaths: [
      ]
    }).on('error', $.sass.logError))
    .pipe(unCSS({
      html: [conf.paths.styles.html, conf.paths.styles.partials]
    }))
    .pipe($.postcss(
      [lost()]
    ))
    .pipe($.rucksack({
      fallbacks: true,
      autoprefixer: true
    }))
    .pipe(gulp.dest(conf.paths.styles.dist))
    .pipe($.rename({
      suffix: '.min'
    }))
    .pipe(cleanCSS())
    .pipe($.sourcemaps.write('./', { debug: true }))
    .pipe(gulp.dest(conf.paths.styles.dist))
    .pipe($.notify({
      title: 'Styles task completed',
      message: 'All Sass files are compiled into CSS and minified.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/sass.png'),
      time: 1000,
      onLast: true
    }));
};

gulp.task('styles', () => {
  return buildStyles();
});

gulp.task('styles-reload', () => {
  return buildStyles()
    .pipe(browserSync.stream());
});
