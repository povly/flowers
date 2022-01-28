let preprocessor = 'sass';
const { src, dest, parallel, series, watch } = require('gulp'),
			browserSync = require('browser-sync').create(),
			concat = require('gulp-concat'),
			uglify = require('gulp-uglify'),
			sass = require('gulp-sass')(require('sass')),
			autoprefixer = require('gulp-autoprefixer'),
			cleancss = require('gulp-clean-css'),
			pug = require('gulp-pug'),
			babel = require('gulp-babel'),
			ttf2woff = require('gulp-ttf2woff'),
			ttf2woff2 = require("gulp-ttftowoff2"),
			changed = require('gulp-changed'),
			image = require('gulp-image');

function optimizeImage(){
	return src('src/images/**/*')
	.pipe(changed('app/img'))
	.pipe(image())
	.pipe(dest('app/img/'))
	.pipe(browserSync.stream())
}

function woff(){
	return src([
		'src/fonts/*.ttf',
	])
	.pipe(changed('app/fonts', {
		extension: '.woff',
	}))
	.pipe(ttf2woff())
	.pipe(dest('app/fonts/'))
	.pipe(browserSync.stream())
}

function woff2(){
	return src([
		'src/fonts/*.ttf',
	])
	.pipe(changed('app/fonts', {
		extension: '.woff2',
	}))
	.pipe(ttf2woff2())
	.pipe(dest('app/fonts/'))
	.pipe(browserSync.stream())
}

function pugg() {
	return src([
		'src/pug/pages/**/*.pug',
	])
	.pipe(pug({pretty: true}))
	.pipe(dest('app/'))
	.pipe(browserSync.stream())
}

function browsersync(){
	browserSync.init({
		server: { baseDir: 'app/' }, 
		notify: false, 
		online: true 
	})
}

function scripts() {
	return src([
		'node_modules/jquery/dist/jquery.min.js',
		'src/js/main.js',
		])
	.pipe(babel({
		presets: ['@babel/preset-env']
	}))
	.pipe(concat('script.min.js'))
	.pipe(uglify({toplevel: true}))
	.pipe(dest('app/js/'))
	.pipe(browserSync.stream())
}

function startwatch() {
	watch(['src/images/**/*'], optimizeImage);
	watch(['src/js/**/*.js', '!src/js/**/*.min.js'], scripts);
	watch(['src/pug/pages/**/*.pug', 'src/pug/includes/**/*.pug', 'src/pug/includes/**/*.pug'], pugg);
	watch('src/' + preprocessor + '/**/*', styles);
	watch('src/**/*.html').on('change', browserSync.reload);
}

function styles() {
	return src('src/' + preprocessor + '/main.' + preprocessor + '')
	.pipe(eval(preprocessor)())
	.pipe(concat('style.min.css'))
	.pipe(autoprefixer({ grid: true }))
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
	.pipe(dest('app/css/'))
	.pipe(browserSync.stream())
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.pugg = pugg;
exports.woff = woff;
exports.woff2 = woff2;
exports.optimizeImage = optimizeImage;

exports.default = parallel(pugg, optimizeImage, woff, woff2, styles, scripts, browsersync, startwatch);