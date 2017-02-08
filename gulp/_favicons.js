'use strict';

import path from 'path';
import favicons from 'gulp-favicons';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import * as conf from './_conf';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

/**
 * Compile the JS files into scripts.js.
 */
let buildFavicons = () => {
  let onError = function(error) {
    $.notify.onError({
      title: '<%= error.message %>',
      sound: 'Frog',
      icon: path.join(__dirname, 'help/error.png'),
      contentImage: path.join(__dirname, 'help/fav.png'),
      time: 3000,
      onLast: true
    })(error);

    this.emit('end');
  };
  return gulp.src(conf.paths.favicons.src)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe(favicons({
        appName: conf.favicons.name,
        appDescription: conf.favicons.desc,
        developerName: conf.favicons.dev_name,
        developerURL: conf.favicons.dev_url,
        background: conf.favicons.bg,
        path: conf.paths.favicons.path,
        url: conf.favicons.domain,
        display: conf.favicons.standalone,
        orientation: conf.favicons.orientation,
        start_url: conf.favicons.start_url,
        version: conf.favicons.vers,
        logging: false,
        online: false,
        html: conf.paths.favicons.html,
        pipeHTML: true,
        replace: true
    }))
    .pipe(gulp.dest(conf.paths.favicons.dist))
    .pipe($.notify({
      title: 'Favicons task completed',
      message: 'All favicons are created and saved.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/fav.png'),
      time: 1000,
      onLast: true
    }));
};

gulp.task('favicons', () => {
  return buildFavicons();
});
