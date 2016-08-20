var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var gutil = require('gulp-util');
var gexit = require('gulp-exit');
var tsify = require("tsify");

gulp.task('default', () => {
  let browserify = createTsBrowserify();
  return _bundle(browserify);
});
gulp.task('watch', () => {return tsBuild(true)});
function tsBuild(watch){
  let watcher = watchify(createTsBrowserify());

  // create rebundle function with exit as optional parameter, this allows us to compile without watching and exit the gulp script
  function rebundle(exit){
    watchBundle = _bundle(watcher);
    if(exit){
      watchBundle.pipe(gexit());
    }
    return watchBundle;
  }
  // if we are watching, add an update event and rebundle with exit false
  if(watch){
    watcher.on('update', function () { // When any files update
        var updateStart = Date.now();
        rebundle();
        gutil.log('Rebundling took:', (Date.now() - updateStart) + 'ms');
    });
    return rebundle(false);
  }
  // no watch rebundle and exit
  else{
    return rebundle(true);
  }
}
function createTsBrowserify(){
  var bundler = browserify({
    debug: true, // Gives us sourcemapping
    cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    })
    .add('index.tsx')
    .plugin(tsify, {typescript: require('typescript')})
    .transform(babel, {extensions: [ '.tsx', '.ts']});
  return bundler;
}
function _bundle(bundler){
  return bundler.bundle()
    .on('error', function (error) { gutil.log(error.toString()); })
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build'));
}
