import gulp from 'gulp';

gulp.task('html', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest(global.dest));
});