const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify/composer')(require('uglify-es'), console);

gulp.task('watch', function() {
	return gulp.watch(['src/*.js'], gulp.series('build'));
});

gulp.task('build', function() {
	return gulp.src(['src/core.js', 'src/*.js'], { sourcemaps: false })
		.pipe(concat('jquery-nano.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build', { sourcemaps: false }));
});
