var gulp = require('gulp'); 
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var clean = require('gulp-clean');

var paths = {
  scripts: [ './public/**/*.js' ],
  html: [
    './public/**/*.html',
    '!./public/index.html'
  ],
  index: './public/index.html',
  fonts: ['./public/assets/lib/bootstrap/**/*.svg',
    './public/assets/lib/bootstrap/**/*.eot',
    './public/assets/lib/bootstrap/**/*.ttf',
    './public/assets/lib/bootstrap/**/*.woff',
    './public/assets/lib/bootstrap/**/*.otf'],
  build: './build/'
}

gulp.task('clean', function(){
  gulp.src( paths.build, { read: false } )
    .pipe(clean());
});

gulp.task('copy', [ 'clean' ], function() {
  gulp.src(paths.html.concat(paths.fonts))
    .pipe(gulp.dest(paths.build));
});

gulp.task('usemin', [ 'copy' ], function(){
  gulp.src( paths.index )
    .pipe(usemin({
      css: [ minifyCss(), 'concat' ],
      js: [ ngmin(), uglify() ]
    }))
    .pipe(gulp.dest( paths.build ));
});

gulp.task('build', ['usemin']);