var gulp = require( 'gulp' );
var browserify = require( 'browserify' );
var source = require( 'vinyl-source-stream' );
var webserver = require( 'gulp-webserver' );

gulp.task( 'browserify', function(){
  var b = browserify( './src/main.js' )
    .transform( 'babelify', { presets : [ 'es2015' ] } )
    .bundle()
    .pipe( source( 'bundle.js' ) )
    .pipe( gulp.dest( './' ) );
} );

gulp.task( 'watch', function(){
  gulp.watch( './src/**/*', [ 'browserify' ] );
} );

gulp.task( 'webserver', function(){
  gulp.src( './' )
    .pipe( webserver( {
      host : 'localhost',
      port : 8000,
      livereload: {
        enable: true,
        filter: function( _name ) {
          return !( _name.match( /src\// ) );
        }
      }
    } ) );
} );

gulp.task( 'default', [ 'browserify', 'watch', 'webserver' ] );
