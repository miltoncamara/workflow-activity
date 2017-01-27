var gulp = require("gulp");
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var del = require('del');

gulp.task("clean:css", function () {
    del('./dist/css')
});

gulp.task("clean:html", function () {
    del('./dist/*.html')
});

gulp.task("sass", ["clean:css"], function () {
    return gulp.src("./source/scss/style.scss")
        .pipe(sass(/*{ outputStyle: 'compressed' }*/).on('error', sass.logError))
        .pipe(gulp.dest("./dist/css/"));
});

gulp.task("html", ["clean:html"], function () {
    return gulp.src("./source/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("background", function () {
    gulp.watch("./source/scss/**/*.scss", ["sass"]);
    gulp.watch("./source/**/*.html", ["html"]);
});

gulp.task("default", ['background']);