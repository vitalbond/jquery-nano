const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify/composer')(require('uglify-es'), console);

function watch() {
	return gulp.watch(['src/*.js'], gulp.series(build));
}

function build() {
	return gulp.src(['src/core.js', 'src/*.js'], { sourcemaps: false })
		.pipe(concat('jquery-nano.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build', { sourcemaps: false }));
}

module.exports.watch = watch;
module.exports.build = build;
