var gulp    = require('gulp'),
    pug     = require('gulp-pug'),
    sass    = require('gulp-sass'),
    watch   = require('gulp-watch'),
    plumber = require('gulp-plumber');

var pathMaps = {
  pugify: {
    src:      'src/pug/pages/**/*.pug',
    dest:     'docs/',
    watch:    'src/pug/**/*.pug',
    basedir:  'src/pug/'
  },

  sassify: {
    src:    'src/sass/index.scss',
    dest:   'docs/css/',
    watch:  'src/sass/**/*.scss'
  }
};

gulp.task('sassify', function() {
  var mapping = pathMaps.sassify;
  return  gulp
          .src(mapping.src)
          .pipe(plumber())
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest(mapping.dest))
});

gulp.task('pugify', function() {
  var mapping = pathMaps.pugify;
  return  gulp
          .src(mapping.src)
          .pipe(plumber())
          .pipe(pug({ basedir: mapping.basedir }))
          .pipe(gulp.dest(mapping.dest))
});

gulp.task('watch', function() {
  for(var taskName in pathMaps) {
    if(pathMaps.hasOwnProperty(taskName)) {
      var mapping = pathMaps[taskName];
      console.log("...watching:", mapping.watch, "->", taskName)
      gulp.watch(mapping.watch, [taskName]);
    }
  }
});

gulp.task('default', ['pugify', 'sassify']);
