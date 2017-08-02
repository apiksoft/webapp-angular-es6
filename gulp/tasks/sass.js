import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(gulp.dest(global.dest + '/css'));
});

gulp.task('sass-build', ['sass'], function() {
  return gulp.src(global.dest + '/css/*.css', {base: './'})
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('.'));
});
