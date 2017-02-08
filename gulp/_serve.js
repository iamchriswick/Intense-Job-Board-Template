'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import * as conf from './_conf';

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch(conf.paths.styles.src, ['styles-reload']);
  gulp.watch(conf.paths.scripts.src, ['scripts-reload']);
  gulp.watch(conf.paths.images.src, ['images-reload']);
  gulp.watch(conf.paths.html.src, ['html-reload']);
  gulp.watch(conf.paths.html.partials, ['html-reload']);
});

// First the build task will be executed with run-sequence. When all task are done, a callback will start the browser-sync task.
gulp.task('serve', ['clean'], () => {
  runSequence('styles','scripts','images','favicons','html', () => {
    gulp.start('browser-sync');
  });
});
