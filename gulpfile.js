var gulp = require('gulp'),
 autoprefixer = require('autoprefixer'),
 sass = require('gulp-sass'),
 postcss = require('gulp-postcss'),
 sourcemaps = require('gulp-sourcemaps'),
 watch = require('gulp-watch'),
 cleanCSS = require('gulp-clean-css'),
 rename = require('gulp-rename'),
 gulpif = require('gulp-if'),
 uglify = require('gulp-uglify'),
 sprity = require('sprity'),
 concat = require('gulp-concat'),
 // hash = require('gulp-hash-filename'),
 browserSync = require('browser-sync').create();

 var jsFiles = [
         "src/js/initial.js",
         "src/js/jquery.easing.1.3.js",
         "src/js/animation.js",
         "src/js/velocity.min.js",
         "src/js/hammer.min.js",
         "src/js/jquery.hammer.js",
         "src/js/global.js",
         "src/js/collapsible.js",
         "src/js/dropdown.js",
         "src/js/modal.js",
         "src/js/materialbox.js",
         "src/js/parallax.js",
         "src/js/tabs.js",
         "src/js/tooltip.js",
         "src/js/waves.js",
         "src/js/toasts.js",
         "src/js/sideNav.js",
         "src/js/scrollspy.js",
         "src/js/forms.js",
         "src/js/slider.js",
         "src/js/cards.js",
         "src/js/chips.js",
         "src/js/pushpin.js",
         "src/js/buttons.js",
         "src/js/transitions.js",
         "src/js/scrollFire.js",
         "src/js/date_picker/picker.js",
         "src/js/date_picker/picker.date.js",
         "src/js/character_counter.js",
         "src/js/carousel.js",
       ];

gulp.task('serve', ['sass','javascript'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("src/sass/**/*.scss", ['sass']);
    gulp.watch(jsFiles,['javascript']);
    gulp.watch("./index.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("src/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer({browsers:['last 7 versions']})]))
        .pipe(cleanCSS())
        .pipe(rename({suffix:'.min',extname:'.css'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("build/css/"))
        .pipe(browserSync.stream());
});
gulp.task('javascript',function(){
  return gulp.src(jsFiles)
         .pipe(sourcemaps.init())
         .pipe(concat('materialize.js'))
         .pipe(rename({suffix: '.min'}))
         .pipe(uglify())
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest("build/js/"))
})
gulp.task('default', ['serve']);
