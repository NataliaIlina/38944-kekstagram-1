'use strict';

const del = require('del');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const server = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('build/**/*').pipe(ghPages());
});

gulp.task('style', function() {
  return gulp
    .src('css/*.css')
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('scripts', function() {
  return gulp
    .src('js/main.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, 'iife'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('build/js'));
});

gulp.task('imagemin', ['copy'], function() {
  return gulp
    .src('build/img/**/*.{jpg,png,gif}')
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
      ]),
    )
    .pipe(gulp.dest('build/img'))
    .src('build/photos/**/*.{jpg,png,gif}')
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
      ]),
    )
    .pipe(gulp.dest('build/photos'));
});

gulp.task('copy-html', function() {
  return gulp
    .src('*.{html,ico}')
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

gulp.task('copy', ['copy-html', 'scripts', 'style'], function() {
  return gulp
    .src(['fonts/**/*.{woff,woff2}', 'img/*.*', 'photos/*.*'], { base: '.' })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('js-watch', ['scripts'], function(done) {
  server.reload();
  done();
});

gulp.task('serve', ['assemble'], function() {
  server.init({
    server: './build',
    notify: false,
    open: true,
    port: 3502,
    ui: false,
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html').on('change', e => {
    if (e.type !== 'deleted') {
      gulp.start('copy-html');
    }
  });
  gulp.watch('js/**/*.js', ['js-watch']);
});

gulp.task('assemble', ['clean'], function() {
  gulp.start('copy', 'style');
});

gulp.task('build', ['assemble'], function() {
  gulp.start('imagemin');
});
