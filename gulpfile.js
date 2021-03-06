var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	minifyHTML = require('gulp-minify-html'),
	concat = require('gulp-concat');

var jsSources, sassSources, htmlSources, env, outputDir;

if(env === 'development') {
	outputDir = 'builds/development/';
} else {
	outputDir = 'builds/production/'
}


env = process.env.NODE_ENV || 'production';

htmlSources = [outputDir + '*.html'];
jsSources = [
	'components/scripts/require.js',
	'components/scripts/affix.js',
	'components/scripts/alert.js',
	'components/scripts/button.js',
	'components/scripts/carousel.js',
	'components/scripts/collapse.js',
	'components/scripts/dropdown.js',
	'components/scripts/modal.js',
	'components/scripts/tooltip.js',
	'components/scripts/popover.js',
	'components/scripts/scrollspy.js',
	'components/scripts/tab.js',
	'components/scripts/transition.js',
	'components/scripts/typed.js'
];

sassSources = [
	'components/sass/style.scss'
];

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass:  'components/sass',
			image: outputDir +'images',
			style: 'expanded'
		}))
		.on('error',gutil.log)
		.pipe(gulpif(env === 'production', minifyCSS()))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['js']),
	gulp.watch(sassSources, ['compass']),
	gulp.watch('components/sass/bootstrap/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
});

gulp.task('default', ['js', 'compass', 'html', 'connect', 'watch']);

gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src('builds/development/*.html')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});