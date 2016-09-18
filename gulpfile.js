'use-strict';

const autoprefixer = require('autoprefixer');
      babel = require('babelify');
      browserify = require('browserify');
      buffer = require('vinyl-buffer');
      chalk = require('chalk');
      eslint = require('gulp-eslint');
      fontAwesome = require('node-font-awesome');
      gulp = require('gulp');
      htmlhint = require('gulp-htmlhint');
      notify = require('gulp-notify');
      plumber = require('gulp-plumber');
      postcss = require('gulp-postcss');
      sass = require('gulp-sass');
      shell = require('gulp-shell');
      source = require('vinyl-source-stream');
      sourcemaps = require('gulp-sourcemaps');
      uglify = require('gulp-uglify');
      watch = require('gulp-watch');
      webserver = require('gulp-webserver');
   

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
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
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