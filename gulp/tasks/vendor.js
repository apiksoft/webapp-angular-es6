import gulp from 'gulp';
import gulpUglify from 'gulp-uglify';
import gulpConcat from 'gulp-concat';
import pump from 'pump';

const filename = 'vendor.js'

gulp.task('vendor', function () {
    return gulp.src([
        './node_modules/angular/angular.js'
    ])
        .pipe(gulpConcat(filename))
        .pipe(gulp.dest(global.dest + '/js'));
});

gulp.task('vendor-build', ['vendor'],  cb => {
    pump([
        gulp.src(global.dest + '/js' + filename),
        gulpUglify(),
        gulpConcat(filename),
        gulp.dest(global.dest + '/js')
    ],
        cb
    );
});
