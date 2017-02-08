'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import * as conf from './_conf';

import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

gulp.task('clean', () => {
  return gulp.src(`${conf.dirs.dist}`)
		.pipe($.clean({read: false}));
});

gulp.task('build', ['clean'], () => {
  runSequence('styles','scripts','images','favicons','html');
});
