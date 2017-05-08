/**
 * Load plugins
 */
var gulp = require('gulp'),
  notifier = require('node-notifier'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  include = require('gulp-include'),
  uglify = require('gulp-uglify'),
  htmlExtend = require('gulp-html-extend'),
  imagemin = require('gulp-imagemin'),
  runSequence = require('run-sequence'),
  del = require('del');

/**
 * Configuration
 */
var project = {
  configuration: { //Configuration of plugins
    rename: {
      suffix: '.min', //Suffix for compressed files
    },
    plumber: {
      errorHandler: sendError, //Error handler for plumber
    },
    htmlExtend: {
      annotations: false,
      verbose: false,
    },
    include: {
      hardFail: true, //Force error message
    }
  },
  paths: {
    src: './src/', //Work folder
    dest: './dist/', //Final folder
    sass: {
      folder: 'assets/css/', //Final css folder
      files: 'assets/sass/**/*.scss', //Files to watch
    },
    js: {
      folder: 'assets/js/', //Final js folder
      files: 'assets/js/**/*.js', //Files to watch
      excludeFiles: 'assets/js/**/_*.js', //Don't move file include (begin with _)
    },
    vendors: {
      folder: 'vendors/', //Final vendors folder
      files: 'vendors/**/*.*', //Move these files/folder
    },
    html: {
      folder: '', //Final html folder
      files: '{,pages/**/,templates/**/}*.html', //Files to watch
      excludeFiles: '{,pages/**/,templates/**/}_*.html', //Don't move file include (begin with _)
    },
    img: {
      folder: 'assets/img/', //Final img folder
      files: 'assets/img/**/*.{png,jpg,jpeg,gif,svg}', //Files to watch
    },
    fonts: {
      folder: 'assets/fonts/', //Final fonts folder
      files: 'assets/fonts/*.*', //Files to watch
    },
    extra: {
      folder: '', //Final extra folder
      files: '**/*.{ico,htaccess,txt,php,json,mp4,mp3}', //Files to watch
    },
    maps: '/maps', //Sourcemaps folder
  }
};

/*
Error handler send notification
*/
function sendError(error) {
  notifier.notify({
    'title': error.plugin.toUpperCase(),
    'message': error.message
  });
  if (error.plugin != "gulp-sass") {
    console.log(error.toString());
  }
  this.emit('end');
}

/*
Error handler send notification
*/
gulp.task('sass', function () {
  return gulp.src(project.paths.src + project.paths.sass.files)
    .pipe(plumber(project.configuration.plumber))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(rename(project.configuration.rename))
    .pipe(sourcemaps.write(project.paths.maps))
    .pipe(gulp.dest(project.paths.dest + project.paths.sass.folder));
});

/*
Tasks
*/

gulp.task('js', function () {
  return gulp.src([project.paths.src + project.paths.js.files, '!' + project.paths.src + project.paths.js.excludeFiles])
    .pipe(plumber(project.configuration.plumber))
    .pipe(sourcemaps.init())
    .pipe(include(project.configuration.include))
    .pipe(uglify())
    .pipe(rename(project.configuration.rename))
    .pipe(sourcemaps.write(project.paths.maps))
    .pipe(gulp.dest(project.paths.dest + project.paths.js.folder));
});

gulp.task('vendors', function () {
  return gulp.src(project.paths.src + project.paths.vendors.files)
    .pipe(gulp.dest(project.paths.dest + project.paths.vendors.folder));
});

gulp.task('html', function () {
  return gulp.src([project.paths.src + project.paths.html.files, '!' + project.paths.src + project.paths.html.excludeFiles])
    .pipe(plumber(project.configuration.plumber))
    .pipe(htmlExtend(project.configuration.htmlExtend))
    .pipe(gulp.dest(project.paths.dest + project.paths.html.folder));
});

gulp.task('img', function () {
  return gulp.src(project.paths.src + project.paths.img.files)
    .pipe(imagemin())
    .pipe(gulp.dest(project.paths.dest + project.paths.img.folder));
});

gulp.task('fonts', function () {
  return gulp.src(project.paths.src + project.paths.fonts.files)
    .pipe(gulp.dest(project.paths.dest + project.paths.fonts.folder));
});

gulp.task('extra', function () {
  return gulp.src(project.paths.src + project.paths.extra.files, {
      dot: true
    })
    .pipe(gulp.dest(project.paths.dest + project.paths.extra.folder));
});

gulp.task('clean', function () {
  return del(project.paths.dest);
});

gulp.task('rebuild', function () {
  return runSequence('clean', 'default');
});

gulp.task('default', ['sass', 'js', 'vendors', 'html', 'img', 'fonts', 'extra']);

gulp.task('watch', function () {
  gulp.watch(project.paths.src + project.paths.sass.files, ['sass']);
  gulp.watch(project.paths.src + project.paths.js.files, ['js']);
  gulp.watch(project.paths.src + project.paths.vendors.files, ['vendors']);
  gulp.watch(project.paths.src + project.paths.html.files, ['html']);
  gulp.watch(project.paths.src + project.paths.img.files, ['img']);
  gulp.watch(project.paths.src + project.paths.fonts.files, ['fonts']);
  gulp.watch(project.paths.src + project.paths.extra.files, ['extra']);
});
