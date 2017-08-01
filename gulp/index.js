import fs from 'fs';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import browserify from 'browserify';
import babelify from 'babelify';
import staticFs from 'babel-plugin-static-fs';
import vinylSourceStream from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';

const dest = '.debug';

// eslint 
gulp.task('lint', () => {
  gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError()); // fail on error for extra strictness
});

// browserify our js
gulp.task('js', () => {
  const sources = browserify({
    entries: 'src/index.js',
    debug: true
  }).transform(babelify.configure({
    presets: ["es2015"], plugins: [
      [staticFs, {
        onFile: (file) => {
          console.log('Discovered new dependency:', file);
        }
      }]
    ]
  }));

  return sources.bundle()
    .pipe(vinylSourceStream('app.js'))
    .pipe(vinylBuffer())
    .pipe(gulp.dest(dest));
});

// default task
gulp.task('default', ['lint', 'js']);