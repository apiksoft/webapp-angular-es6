import fs from 'fs';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import modRewrite  from 'connect-modrewrite';
import runSequence from 'run-sequence';

global.dest = '.debug';

// load tasks
const tasks = fs.readdirSync('./gulp/tasks/');
tasks.forEach((task) => {
  require('./tasks/' + task);
});

// clean
gulp.task('clean', function () {
  return gulp.src(global.dest+ '/*', {read: false})
    .pipe(clean());
});

// local development tasks
gulp.task('dev', ['lint', 'javascript', 'sass', 'html']);

// build tasks
gulp.task('build', cb => {
  runSequence('clean', ['lint', 'javascript-build', 'sass-build', 'html'], cb);
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
});