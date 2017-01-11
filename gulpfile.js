var gulp = require("gulp");
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var watch = require('gulp-watch');
var del = require('del');

gulp.task("clean", function() {
    del('./dist')
});

gulp.task("sass", ["clean"], function() {
    return gulp.src("./source/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("./dist/css/"));
});

gulp.task("html", ["clean"], function() {
    return gulp.src("./source/**/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("./dist/"));
});

gulp.task("background", function() {
    gulp.watch("./source/scss/*.scss", ["sass"]);
    gulp.watch("./source/**/*.html", ["html"]);
});