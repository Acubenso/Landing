'use strict';

const gulp         = require('gulp'),
      browserSync  = require('browser-sync').create(), // сервер для онлайн отслеживания изменений
      sass         = require('gulp-sass'),             // компилирует из sass в css
      plumber      = require('gulp-plumber'),          // выводит ошибки в консоль
      del          = require('del');                   // удаление папок
gulp.task('browser-sync', function() {
  browserSync.init({        // Выполняем browserSync
      server: {             // Определяем параметры сервера
          baseDir: './'  // Директория для сервера - source
      },
      notify: false         // Отключаем уведомления
  });
});
// gulp.task('clean', function(done) {
//   return del.sync('build'),
//   done();
// });
gulp.task('html', function() {
  return gulp.src('./*.html')
  .pipe(plumber())
  //.pipe(gulp.dest('./'))
  .pipe(browserSync.reload({stream: true}));
});
gulp.task('sass', function() {
  return gulp.src('./scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.reload({stream: true}));
});
gulp.task('watch', function() {
  gulp.watch('./*.html', gulp.parallel('html'));
  // gulp.watch('./icons/**/*', gulp.parallel('copy'));
  // gulp.watch('./images/**/*', gulp.parallel('image'));
  gulp.watch('./scss/**/*.scss', gulp.parallel('sass'));
  // gulp.watch("./js/**/*.js", gulp.parallel("build-js"));
});

gulp.task('start', gulp.parallel('html', 'sass', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('html', 'sass'));

