import gulp from 'gulp';
import eslint from 'gulp-eslint';

// eslint 
gulp.task('lint', () => {
  gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError()); // fail on error for extra strictness
});
