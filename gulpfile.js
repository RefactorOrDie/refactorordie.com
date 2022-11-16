// @ts-check
"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const staticSrcPath = "./static-src/";
const staticPath = "./themes/blank/static/";
const assetsPath = "./themes/blank/assets/";

gulp.task("sass", () =>
  gulp
    .src(staticSrcPath + "style/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(assetsPath + "style/"))
);

gulp.task(
  "watch",
  gulp.series("sass", function watchSass() {
    return gulp.watch(staticSrcPath + "style/**/*.scss", gulp.task("sass"));
  })
);

gulp.task("default", gulp.series("sass"));
