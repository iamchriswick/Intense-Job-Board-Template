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
let buildImages = () => {
  return gulp.src(conf.paths.images.src)
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest(conf.paths.images.dist))
    .pipe($.notify({
      title: 'Images task completed',
      message: 'All images are saved and minified.',
      sound: 'Submarine',
      icon: path.join(__dirname, 'help/check.png'),
      contentImage: path.join(__dirname, 'help/img.png'),
      time: 1000,
      onLast: true
    }));
};

gulp.task('images', () => {
  return buildImages();
});

gulp.task('images-reload', () => {
  return buildImages()
    .pipe(browserSync.stream());
});
