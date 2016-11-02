'use strict';
var gulp = require("gulp");
var path = require("path");
var jshint = require("gulp-jshint");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify")
var concat = require("gulp-concat");
var loadPlugins = require("gulp-load-plugins");
var pump = require("pump");
var notify = require("gulp-notify");
var cleancss = require("gulp-clean-css");
var imagemin = require("gulp-imagemin");

var $ = loadPlugins();

gulp.task("lint", () => {
  gulp.src([
    'webroot/public/bundle.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter("default"))
  .pipe(notify({message: "js lint task is success!"}))
})


//合并压缩js文件
gulp.task("js", () => {
  pump([
    gulp.src([
      'webroot/statics/js/es5-sham.min.js',
      'webroot/statics/js/es5-shim.min.js',
      'webroot/statics/js/es6-sham.min.js',
      'webroot/statics/js/es6-shim.min.js',
      'webroot/statics/js/es7-shim.min.js'
    ]),
    concat("aio.min.js"),
    uglify(),
    gulp.dest("webroot/public"),
  ],function(){
    console.log("js concat and uglify is success!")
  })
})

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  gulp.run("lint","js");
});