var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('build', function () {
  gulp.src('ext/src/browser_action/text2city/index.js')
  .pipe(browserify({
    insertGlobals: true,
    exclude: [
      'WNdb',
      'lapack'
    ]
  }))
  .pipe(rename('text2city.js'))
  .pipe(gulp.dest('ext/src/browser_action'))
});

gulp.task('watch', ['build'], function () {
  gulp.watch('ext/src/browser_action/text2city/**/*.js', ['build']);
});

gulp.task('default', ['build'], function () {});
