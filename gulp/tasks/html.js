import gulp from 'gulp';
import browserSync from 'browser-sync';

gulp.task('html', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest(global.dest));
});

gulp.task('html-watch', ['html'], () => {
  browserSync.reload();
});