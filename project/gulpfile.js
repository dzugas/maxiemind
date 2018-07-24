var gulp         = require('gulp'),
    postcss      = require('gulp-postcss'),
    sass         = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    browser      = require('browser-sync'),
    sourcemaps   = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'))
        .pipe(browser.stream({match: '**/*.css'}));
});

gulp.task('serve', ['sass'], function(){
  browser.init({
	  	server: {
            baseDir: "build"
        }
  	});
});

 gulp.task('default', ['serve'], function() {    
  gulp.watch(['src/sass/**/*.scss'], ['sass']);  
  gulp.watch('build/*.html').on('change', browser.reload);
});