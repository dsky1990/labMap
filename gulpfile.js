/**
 * Created by dsky on 9/8/16.
 * gulp task to make development quickly
 * css sprite, imagemin, sass lint && sass to css, pug to html, css、js、html minify
 */

// plugin
const gulp = require('gulp');
const changed = require('gulp-changed'); // changed file
// const concat = require('gulp-concat'); // concat file
// const htmlmin = require('gulp-htmlmin'); // purify html
const babel = require('gulp-babel'); // es6 to js
const eslint = require('gulp-eslint'); // eslint
const browserSync = require('browser-sync').create(); // browserSync
const replace = require('gulp-replace'); // gulp-replace
const stripDebug = require('gulp-strip-debug'); // Strip console, alert, and debugger
const pump = require('pump');
const uglify = require('gulp-uglify');// uglify js

// file path
// const build = 'build/';
const buildHtml = 'build/*.html';
const buildEs6 = 'build/es6/*.es6';
const buildJsSrc = 'build/js';
const buildJs = 'build/js/*.js';
const distJsSrc = 'dist/js';
const dir = './';
const dirHtml = './*.html';

// task
// eslint
gulp.task('eslint', () => gulp.src(buildEs6)
    .pipe(changed(buildEs6))
    .pipe(stripDebug())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
// es6 to js
gulp.task('es6', ['eslint'], () => gulp.src(buildEs6)
    .pipe(changed(buildEs6))
    .pipe(babel())
    .pipe(gulp.dest(buildJsSrc))
);
// js minify
gulp.task('jscompress', () => pump([gulp.src(buildJs), changed(buildJs), stripDebug(), uglify(), gulp.dest(distJsSrc)]));
// replace
gulp.task('replace', () => gulp.src(dirHtml)
    .pipe(replace('css/style.css', 'dist/css/style.min.css'))
    .pipe(gulp.dest(dir))
);
// browser-sync
gulp.task('browser-sync', function browser() {
  browserSync.init({ server: { baseDir: './' } });
  gulp.watch([buildHtml, buildJs]).on('change', browserSync.reload);
});

// watch
// es6
gulp.task('es6-watch', () => gulp.watch(buildEs6, ['es6']));

// develop
gulp.task('watch', ['es6-watch', 'browser-sync']);

// release
gulp.task('release', ['jscompress', 'replace']);
