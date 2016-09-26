/**
 * Created by alex on 9/12/15.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uncss = require('gulp-uncss');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var nano = require('gulp-cssnano');
var order = require("gulp-order");


/*compile sass and css*/
gulp.task('sass', function () {
    return gulp.src([
        'www/lib/angular-material/modules/scss/angular-material.scss',
        './assets/css/*.css'
        ])
        .pipe(sass())
        .pipe(concat('main.css'))
        // .pipe(uncss({
        //     html: ['./public/index.html', 'partials/*.html', 'http://bundleslang.node.tech']
        // }))
        .pipe(nano())
        .pipe(gulp.dest('./public/css'));
});

/*concatenate js*/
gulp.task('scripts', function() {
    gulp.src([
            './www/lib/angular/angular.js',
            './www/lib/angular-ui-router/release/angular-ui-router.js',
            './www/lib/angular-resource/angular-resource.js',
            './www/lib/angular-material/angular-material.js',
            './www/lib/angular-animate/angular-animate.js',
            './www/lib/angular-aria/angular-aria.js',
            './www/lib/angular-messages/angular-messages.js',
            './www/lib/angular-cookies/angular-cookies.js',
            './www/lib/ng-autocomplete/angucomplete.js',
            './www/lib/angularjs-google-maps/dist/angularjs-google-maps.js',
            './www/lib/firebase/firebase.js',
            './www/lib/angularfire/dist/angularfire.js',
            './assets/NodeTechApp/app.js',
            './assets/NodeTechApp/routes.js',
            './assets/NodeTechApp/services/*.js',
            './assets/NodeTechApp/controllers/*.js',
            './assets/NodeTechApp/directives/*.js'
        ])
        .pipe(order([
            'angular.js',
            'angular-ui-router.js',
            'angular-resource.js',
            'angular-material.js',
            'angular-animate.js',
            'angular-aria.js',
            'angular-messages.js',
            'angular-cookies.js',
            'angucomplete.js',
            'angularjs-google-maps',
            'firebase.js',
            'angularfire.js',
            'app.js',
            'routes.js',
            'services/*.js',
            'controllers/*.js',
            'directives/*.js'
        ]))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('head', function() {
    gulp.src([
            './www/lib/angular/angular.js',
            './www/lib/angular-ui-router/release/angular-ui-router.js',
            './www/lib/angular-resource/angular-resource.js',
            './www/lib/angular-material/angular-material.js',
            './www/lib/angular-animate/angular-animate.js',
            './www/lib/angular-aria/angular-aria.js',
            './www/lib/angular-messages/angular-messages.js',
            './www/lib/angular-cookies/angular-cookies.js',
            './www/lib/firebase/firebase.js',
            './www/lib/angularfire/dist/angularfire.js'
        ])
        .pipe(order([
            'angular.js',
            'angular-ui-router.js',
            'angular-animate.js',
            'angular-aria.js',
            'angular-cookies.js',
            'angular-resource.js',
            'angular-messages.js',
            'angular-material.js',
            'firebase.js',
            'angularfire.js'
        ]))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('head.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('foot', function() {
    gulp.src([
            './www/lib/angularjs-google-maps/dist/angularjs-google-maps.js',
            './assets/NodeTechApp/app.js',
            './assets/NodeTechApp/routes.js',
            './assets/NodeTechApp/services/*.js',
            './assets/NodeTechApp/controllers/*.js',
            './assets/NodeTechApp/directives/blocks/*.js'

        ])
        .pipe(order([
            'angularjs-google-maps.js',
            'app.js',
            'routes.js',
            'services/*.js',
            'controllers/root-controller.js',
            'controllers/login-controller.js',
            'controllers/query-controller.js',
            'directives/**/*.js'
        ]))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('foot.js'))
        .pipe(gulp.dest('./public/js/'));
});

/*compress js*/
gulp.task('compress', function(){
    gulp.src('./public/js/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('foot.js'))
        .pipe(gulp.dest('./public/js/'));
});
