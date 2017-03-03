var gulp           = require('gulp'),
	browserSync    = require('browser-sync').create(),
	uglify         = require('gulp-uglify'),
	rename         = require('gulp-rename'),
	sass           = require('gulp-sass'),
	browserify     = require('gulp-browserify'),
	plumber        = require('gulp-plumber'),
	cleanCSS       = require('gulp-clean-css'),
	imagemin       = require('gulp-imagemin'),
    imageminWebp   = require('imagemin-webp'),
    htmlmin        = require('gulp-htmlmin');


// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });
});

//Styles
gulp.task('styles', function () {
	gulp.src('scss/*.scss')
		.pipe(plumber())
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(gulp.dest('css/'))
		.pipe(browserSync.stream());
});

// Browserify
gulp.task('scripts', function() {
    // Single entry point to browserify 
    gulp.src('app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
    	.pipe(rename('bundle.js'))
        .pipe(gulp.dest('js/'))
});

//Watch Task
gulp.task('watch', function() {
	gulp.watch("scss/*.scss", ['styles']);
	gulp.watch("*.js", ['scripts']);
    gulp.watch("css/*.css").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', browserSync.reload);
})


// Default Task
gulp.task('default', ['styles', 'scripts', 'serve', 'watch']);


//////////////////////////////////////////////////////////
///                      Build Task                    ///
//////////////////////////////////////////////////////////

// Build Server
gulp.task('build-serve', function() {
    browserSync.init({
        server: "./dist"
    });
});

//CSS
gulp.task('css', function() {
  	gulp.src('css/*.css')
    	.pipe(cleanCSS({compatibility: 'ie8'}))
    	.pipe(gulp.dest('dist/css'));
});

//Html
gulp.task('html', function () {
	gulp.src('*.html')
		.pipe(htmlmin({
            collapseWhitespace: true, 
            removeComments: true
            }))
        .pipe(gulp.dest('dist/'));
});

//Images
gulp.task('image', () =>
    gulp.src('img/*')
        .pipe(imagemin({
            use: [imageminWebp({quality: 50})]
            }))
        .pipe(gulp.dest('dist/img'))
);

//Uglify
gulp.task('js', function () {
	gulp.src('js/bundle.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

//Build Task
gulp.task('build', ['css', 'html', 'js', 'image', 'build-serve']);
