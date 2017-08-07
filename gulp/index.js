import fs from 'fs';
import gulp from 'gulp';
import gulpClean from 'gulp-clean';
import browserSync from 'browser-sync';
import modRewrite from 'connect-modrewrite';
import runSequence from 'run-sequence';

global.dest = '.debug';

// load tasks
const tasks = fs.readdirSync('./gulp/tasks/');
tasks.forEach((task) => {
  require('./tasks/' + task);
});

// clean
gulp.task('clean', function () {
  return gulp.src(global.dest + '/*', { read: false })
    .pipe(gulpClean());
});

// local development tasks
gulp.task('dev', cb => {
  runSequence('clean', ['lint', 'javascript', 'vendor', 'sass', 'html'], cb);
});

// build tasks
gulp.task('build', cb => {
  runSequence('clean', ['lint', 'javascript-build', 'vendor-build', 'sass-build', 'html'], cb);
});

// default task
gulp.task('default', ['dev'], () => {
  browserSync.init({
    server: {
      baseDir: global.dest,
      middleware: [
        modRewrite([
          '^[^\\.]*$ /index.html [L]'
        ])
      ]
    }
  });
  gulp.watch('./src/**/*.js', ['javascript-watch']);
  gulp.watch('./src/**/*.scss', ['sass-watch']);
  gulp.watch('./src/index.html', ['html-watch']);
  gulp.watch(global.dest + '/css/*.css', function() {
    gulp.src(global.dest + '/css/*.css')
      .pipe(browserSync.reload({ stream:true }));
  });
  // gulp.watch('./src/**/*.json', ['json-watch']);
  // gulp.watch('./src/templates/**/*.html', ['html-templates-watch']);
});