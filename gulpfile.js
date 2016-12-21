const 	gulp = require('gulp'),
		pug = require('gulp-pug'),
		live = require('gulp-live-server'),
		deps = require('gulp-web-dependencies');

gulp.task('compile', function() {
	gulp.src('src/**/*.pug')
		.pipe(pug())
		.pipe(deps({
			dest: 'dist/',
			prefix: '/vendor'
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('serve', function() {
	const server = live.static('dist', 3000);
	server.start();

	gulp.watch(['dist/**/*.html'], function(file) {
		server.notify.apply(server, [file]);
	});
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.pug', ['compile']);
});

gulp.task('default', [ 'compile', 'watch', 'serve' ]);