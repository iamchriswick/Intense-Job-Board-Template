'use strict';

import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import * as conf from './_conf';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

/**
 * Minify the image files and place them in dist.
 */
let buildHTML = () => {
  let onError = function(error) {
    $.notify.onError({
      title: '<%= error.message %>',
      sound: 'Frog',
      icon: path.join(__dirname, 'help/error.png'),
      contentImage: path.join(__dirname, 'help/html.png'),
      time: 3000,
      onLast: true
    })(error);

    this.emit('end');
  };
  return gulp.src(conf.paths.html.src)
    .pipe($.injectPartials({
      removeTags: true
    }))
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe($.prettyUrl())
    .pipe(gulp.dest(conf.paths.html.dist))
    .pipe($.notify({
      title: 'HTML task completed',
      message: 'All HTML files are saved.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/html.png'),
      time: 1000,
      onLast: true
    }));
};

gulp.task('html', () => {
  return buildHTML();
});

gulp.task('html-reload', () => {
  return buildHTML()
    .pipe(browserSync.stream());
});
