const gulp          = require("gulp");
const pug           = require("gulp-pug");
const sass          = require("gulp-sass");
const notify        = require("gulp-notify");
const cssmin        = require("gulp-clean-css");
const imageop       = require("gulp-image-optimization");


gulp.task("compile-html", function(){
  gulp.src("source/html/*.pug")
    .pipe(pug())
    .on("error", notify.onError({title:"Erro at compile HTML", message:"<%= error.message %>"}))
    .pipe(gulp.dest("build"));
  });

gulp.task("compile-sass", function () {
	return gulp.src("source/scss/style.scss")
			.pipe(sass())
			.on("error", notify.onError({title:"Error at compile CSS", message:"<%= error.message %>"}))
			.pipe(gulp.dest("source/css"))
});

gulp.task("copy-fonts", function() {
    gulp.src(["source/scss/modules/font-awesome/fonts/*","source/fonts/*"])
        .on("error", notify.onError({title:"Error at Copy Fonts", message:"<%= error.message %>"}))
        .pipe(gulp.dest("build/css/fonts"));
});

gulp.task("minify-css", function(){
  return gulp.src("source/css/style.css")
    		.pipe(cssmin({compatibility: "ie8"}))
            .on("error", notify.onError({title:"Error at minify CSS", message:"<%= error.message %>"}))
   			.pipe(gulp.dest("build/css"));
});

gulp.task("optimize-images", function(cb) {
    gulp.src(["source/img/**/*.png","source/img/**/*.jpg","source/img/**/*.gif","source/img/**/*.jpeg"]).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .on("error", notify.onError({title:"Error at optimize IMAGES", message:"<%= error.message %>"}))
    .pipe(gulp.dest("build/img")).on("end", cb).on("error", cb);
});

gulp.task("compile-js", function() {
    gulp.src("source/js/*")
        .on("error", notify.onError({title:"Error at Compile Javascript", message:"<%= error.message %>"}))
        .pipe(gulp.dest("build/js"));
});

gulp.task("watch", function() {
    gulp.watch("source/html/**/*",      ["compile-html"]);
    gulp.watch("source/scss/**/*",      ["compile-sass"]);
    gulp.watch("source/fonts/*",        ["copy-fonts"]);
    gulp.watch("source/css/style.css",  ["minify-css"]);
    gulp.watch("source/img/**/*",       ["optimize-images"]);
    gulp.watch("source/js/*",           ["compile-js"]);
});

gulp.task("default",["compile-html","compile-sass","copy-fonts","minify-css","optimize-images","compile-js","watch"]);