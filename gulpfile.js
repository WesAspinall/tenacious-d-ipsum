'use-strict';

const gulp = require('gulp');
      shell = require('gulp-shell');
      sourcemaps = require('gulp-sourcemaps');
      source = require('vinyl-source-stream');
      buffer = require('vinyl-buffer');
      babel = require('babelify');
      browserify = require('browserify');
      chalk = require('chalk');
      watch = require('gulp-watch');
      uglify = require('gulp-uglify');
      sass = require('gulp-sass');
      postcss = require('gulp-postcss');
      autoprefixer = require('autoprefixer');
      fontAwesome = require('node-font-awesome');
      webserver = require('gulp-webserver');
      eslint = require('gulp-eslint');
      htmlhint = require('gulp-htmlhint');
      notify = require('gulp-notify');
      plumber = require('gulp-plumber');
   

var handleError = function(err) {
    notify.onError("Error, check terminal for details.")(err);
    console.log(chalk.white.bgRed(' ------------------------------ '));
    console.log(chalk.white(err.message));
    console.log(chalk.white.bgRed(' ------------------------------ '));
    this.emit('end');
}

gulp.task('sass', () => {
    gulp.src('./src/sass/main.scss')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass({
            includePaths: require('node-neat').with([fontAwesome.scssPath])
        }))
        .on('error', handleError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('fonts', () => {
    gulp.src(fontAwesome.fonts)
        .pipe(gulp.dest('./app/fonts'));
});

gulp.task('style:js', () => {
    return gulp.src('./src/js/**/**.js')
        .pipe(eslint())
        .pipe(eslint.format())
});

gulp.task('hint:html', () => {
    return gulp.src('./app/index.html')
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.failReporter());
});


gulp.task('browserify', () => {
    return browserify('./src/js/main.js', {
            debug: true
        })
        .transform(babel)
        .bundle()
        .on('error', handleError)
        .pipe(source('./main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./app/js'));
});


gulp.task('watch', () => {
    watch('./src/sass/**/*.scss', () => gulp.start('sass'));
    watch(['./src/js/**/*.js', './package.json'], () => gulp.start(['browserify']));
    watch('./app/index.html', () => gulp.start('hint:html'));
    watch('./src/js/**/*.js', () => gulp.start('style:js'));
});


gulp.task('server', function() {
    gulp.src(['app'])
        .pipe(webserver({
            livereload: {
                enable: true, // need this set to true to enable livereload
                filter: function(fileName) {
                    if (fileName.match(/.map$/)) { // exclude all source maps from livereload 
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }));
});

gulp.task('lint', ['style:js', 'hint:html']);

gulp.task('default', [
    'sass',
    'fonts',
    'lint',
    'browserify'
]);

gulp.task('start', ['default', 'watch', 'server']);