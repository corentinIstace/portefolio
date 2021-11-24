const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require ('autoprefixer');
const cssnano = require ('cssnano');
const gulp = require ('gulp');
const concat = require ('gulp-concat');
const postcss = require ('gulp-postcss');
const replace = require ('gulp-replace');
const sass = require ('gulp-sass')(require('node-sass'));
const sourcemaps = require ('gulp-sourcemaps');
const uglify = require ('gulp-uglify');
const webp = require('gulp-webp');

const files = {
    htmlPath:"index.html",
    scssPath: 'scss/**/*.scss',
    JsPath: 'js/**/*.js',
    imgPath: 'img/*',
}

function scssTask(){
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('gulp')
    );
}

function jstask(){
    return src (files.JsPath)
        .pipe(concat('concat.js'))
        .pipe(uglify())
        .pipe(dest('gulp'));
}
 
function imgTask(){
    return gulp.src(files.imgPath)
        .pipe(webp({quality: 100}))
        .pipe(gulp.dest('gulp/img'))
}
 
const cbString = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('gulp/.'))
}

function watchTask(){
    watch([files.scssPath, files.JsPath, files.imgPath],
    parallel(scssTask, jstask));

    watch([files.imgPath], 
    series(imgTask));
}

exports.default = series(
    parallel(scssTask, jstask),
    cacheBustTask,
    imgTask,
    watchTask
);