var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autofix = require('gulp-autoprefixer');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mock = require('./mock/index');

gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(autofix({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./src/css/'))
});

gulp.task('server', function() {
    return gulp.src('./src/')
        .pipe(server({
            port: 8888,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') {
                    res.end('');
                    return;
                }

                if (/\/api/.test(req.url)) {
                    res.end(mock(req.url));
                } else {
                    var pathname = url.parse(req.url).pathname;
                    pathname = /(\.js|\.css|\.html|\.gif|\.jpg|\.png)$/.test(pathname) ? pathname : 'index.html';
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});

gulp.task('watch', function() {
    return gulp.watch('./src/sass/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'server', 'watch'));