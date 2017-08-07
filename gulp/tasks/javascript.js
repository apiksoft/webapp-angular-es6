import gulp from 'gulp';
import gulpUglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import babelify from 'babelify';
import pump from 'pump';
import staticFs from 'babel-plugin-static-fs';
import vinylSourceStream from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';

// browserify our js
gulp.task('javascript', () => {
    const sources = browserify({
        entries: './src/index.js',
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
        .pipe(vinylSourceStream('index.js'))
        .pipe(vinylBuffer())
        .pipe(gulp.dest(global.dest + '/js'));
});

gulp.task('javascript-build', ['javascript'], cb => {
    pump([
        gulp.src(global.dest + '/js/*.js'),
        gulpUglify(),
        gulp.dest(global.dest + '/js')
    ],
        cb
    );
});

gulp.task('javascript-watch', ['javascript'], () => {
    browserSync.reload();
});
