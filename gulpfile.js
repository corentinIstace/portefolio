const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require ('autoprefixer');
const cssnano = require ('cssnano');
const gulp = require ('gulp');
const concat = require ('gulp-concat');
const postcss = require ('gulp-postcss');
const replace = require ('gulp-replace');
const sass = require ('gulp-sass')(require('sass'));
const sourcemaps = require ('gulp-sourcemaps');
const uglify = require ('gulp-uglify');
const webp = require('gulp-webp');

const files = {
    htmlPath:"index.html",
    scssPath: 'scss/**/*.scss',
    JsPath: 'js/**/*.js',
    imgPath: 'img/*',
    svgPath: 'img/*.svg',
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

function svgTask(){
    return gulp.src(files.svgPath)
        .pipe(webp({quality: 100}))
        .pipe(gulp.dest('gulp/svg'))
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

    watch([files.imgPath, files.svgPath], 
    series(imgTask, svgTask));
}

exports.default = series(
    parallel(scssTask, jstask),
    cacheBustTask,
    imgTask,
    svgTask,
    watchTask
);