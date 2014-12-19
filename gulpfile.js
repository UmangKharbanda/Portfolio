var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat');

var jsSources, sassSources;

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
});

gulp.task('default', ['js', 'compass']);