var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var jsSources, sassSources, htmlSources;

htmlSources = ['builds/development/*.html'];
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
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass:  'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		}))
		.on('error',gutil.log)
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['js']),
	gulp.watch(sassSources, ['compass']),
	gulp.watch('components/sass/bootstrap/*.scss', ['compass']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task('default', ['js', 'compass', 'html', 'connect', 'watch']);

gulp.task('connect', function(){
	connect.server({
		root: 'builds/development',
		livereload: true
	});
});

gulp.task('html', function(){
	gulp.src(htmlSources)
		.pipe(connect.reload())
});