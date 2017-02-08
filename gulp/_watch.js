'use strict';

import gulp from 'gulp';
import * as conf from './_conf';

gulp.task('watch', ['build'], () => {
  gulp.watch(conf.paths.styles.src, ['styles']);
  gulp.watch(conf.paths.scripts.src, ['scripts']);
  gulp.watch(conf.paths.images.src, ['images']);
  gulp.watch(conf.paths.html.src, ['html']);
  gulp.watch(conf.paths.html.partials, ['html']);
});
