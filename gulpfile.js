var gulp = require('gulp');
var sass = require('gulp-sass');
var gls = require('gulp-live-server');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Copy Bootstrap core files from node_modules to vendor directory
gulp.task('bootstrap', function() {
    return gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))
})

// Copy jQuery core files from node_modules to vendor directory
gulp.task('jquery', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))
})

// Copy Font Awesome core files from node_modules to vendor directory
gulp.task('fontawesome', function() {
    return gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

// Copy all third party dependencies from node_modules to vendor directory
gulp.task('copy', ['bootstrap', 'jquery', 'fontawesome']);

gulp.task('sass', function () {
  return gulp.src('./src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('images', function () {
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'))
  .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function (){
    gulp.watch('./src/css/*.scss', ['sass']);
    gulp.watch('./src/images/***', ['images']);
    gulp.watch('./index.html', browserSync.reload);
});

gulp.task('default', function (callback) {
  runSequence(['browserSync', 'sass', 'images', 'copy', 'watch'],
    callback
  )
})