const gulp = require('gulp');

//streams
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// bundlers, watchers, etc.
const babel = require('babelify');
const browserify = require('browserify');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');


//handlebars
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');

//css 
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//font libraries
const fontAwesome = require('node-font-awesome');

//localhost, node server
const webserver = require('gulp-webserver');


//linters
const eslint = require('gulp-eslint');
const htmlhint = require('gulp-htmlhint');

//error handlers
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

const notifyError = () => {
  return plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  });
}

const browserifyError = (err) => {
  notify.onError("Error: <%= error.message %>")(err);
  this.emit('end');
}

//////////////////////////
// styles+fonts+linters// 
////////////////////////
gulp.task('sass', () => {
  gulp.src('./sass/main.scss')
    .pipe(notifyError())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sass({
      includePaths: require('node-neat').with([fontAwesome.scssPath])
    }))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('fonts', () => {
  gulp.src(fontAwesome.fonts)
    .pipe(notifyError())
    .pipe(gulp.dest('./app/fonts'));
});

gulp.task('style:js', () => {
  return gulp.src('./js/**/**.js')
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('hint:html', () => {
  return gulp.src('./app/index.html')
    .pipe(notifyError())
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter());
});


///////////////
// Bundlers //
/////////////
gulp.task('browserify', () => {
  return browserify('./js/main.js', {
      debug: true
    })
    .transform(babel)
    .bundle()
    .on('error', browserifyError)
    .pipe(source('./main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/js'));
});

gulp.task('templates', function(){
  gulp.src('hbs-templates/*')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      noRedeclare: true, // Avoid duplicate declarations 
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./js'));
});


gulp.task('watch', () => {
  watch('./sass/**/*.scss', () => gulp.start('sass'));
  watch('./hbs-templates/**/*', () => gulp.start('templates'));
  watch(['./js/**/*.js', './package.json'], () => gulp.start(['browserify']));
  watch('./app/index.html', () => gulp.start('hint:html'));
  watch('./js/**/*.js', () => gulp.start('style:js'));
});

//////////////////
// server tasks//
////////////////
gulp.task('server', function() {
  gulp.src('app')
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
  'templates',
  'browserify'
]);


//serve
gulp.task('start', ['default', 'watch', 'server']);

