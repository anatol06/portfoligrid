var gulp = require('gulp'),
      browserSync = require('browser-sync').create()
      sass = require('gulp-sass');


// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','docs/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.stream());
});

// Move JS Files to docs/js
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest('docs/js'))
        .pipe(browserSync.stream());
});

// Watch Sass & Serv
gulp.task('serve',['sass'], function() {
    browserSync.init({
        notify: false,
        server: "./docs"
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'docs/scss/*.scss'], ['sass']);
    gulp.watch('docs/*.html').on('change', browserSync.reload);
});

// Mov Fonts Folder to docs/fonts
gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('docs/fonts'));
});

// Mov Font Awesome CSS to docs/css
gulp.task('fa', function () {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('docs/css'));
});

// Default Gulp Task
gulp.task('default', ['js', 'serve', 'fa','fonts']);
