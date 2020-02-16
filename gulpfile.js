'use strict';

const gulp = require('gulp');
const prefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-clean-css');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const del = require('del');

const path = {
    src: {
        html: 'src/*.html',
        style: 'src/styles.scss',
        images: 'src/images/*.svg',
    },
    watch: {
        html: 'src/*.html',
        style: 'src/*.scss',
    },
    build: {
        html: 'docs/',
        css: 'docs/',
        images: 'docs/images/',
    },
    clean: './docs'
};

function clean() {
    return del([path.clean]);
}

function html() {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
}

function styles() {
    return gulp.src(path.src.style)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(concat('app.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css));
}

function images(done) {
    gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images));
    done();
}

function watch() {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.style, styles);
}

var build = gulp.series(clean, html, styles, images);

exports.build = build;
exports.watch = watch;