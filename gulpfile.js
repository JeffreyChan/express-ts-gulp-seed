const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const nodemon = require("gulp-nodemon");
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tscConfig = require('./tsconfig.json');
const tslint = require('gulp-tslint');

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('dist/**/*');
});

// TypeScript Server compile
gulp.task('compile', function () {
    return gulp
        .src(['src/**/*.ts'])
        .pipe(sourcemaps.init())          // <--- sourcemaps
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write("."))      // <--- sourcemaps
        .pipe(gulp.dest("dist"));
});

gulp.task('copy:assets', function () {
    return gulp.src(['src/**/*', "index.html", '!src/**/*.ts'])
        .pipe(gulp.dest('dist'))
});

gulp.task('nodemon', function () {
    nodemon({ script: "dist/index.js" });
});

gulp.task("watch", function () {
    return gulp.watch('src/**/*.*', ['compile']);
});

gulp.task('tslint', function () {
    return gulp.src('src/**/*.ts')
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task('build', function (callback) {
    runSequence('clean', 'compile', 'copy:assets', 'watch', 'nodemon', callback);
});

gulp.task('default', ['build']);