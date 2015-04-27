(function() {
    'use strict';

    var gulp = require('gulp'),
        rename = require('gulp-rename'),
        concat = require('gulp-concat-util'),
        karma = require('gulp-karma'),
        jshint = require('gulp-jshint'),
        uglify = require('gulp-uglify'),
        browserify = require('browserify'),
        source = require('vinyl-source-stream'),
        del = require('del'),
        pkg = require('./package.json');

    var banner = '// ' + pkg.name + ' - v' + pkg.version + ' - License ' + pkg.license +
            '\n// ' +  pkg.copyright + ' (c) ' + pkg.author + '\n\n';

    // paths
    var paths = {
        src: './src/' + pkg.name + '.js',
        spec: './test/' + pkg.name + '.spec.js',
        output: './dist'
    };

    gulp.task('hint', function() {
        return gulp.src([ paths.src, paths.spec ])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'));
    });

    gulp.task('browserify:test', [ 'hint' ], function() {
        return browserify({entries:[ paths.spec ]})
            .bundle()
            .pipe(source('temp_spec.js'))
            .pipe(gulp.dest('./'));
    });

    gulp.task('test', [ 'browserify:test' ], function() {
        return gulp.src('./temp_spec.js')
            .pipe(karma({configFile: 'test/karma.conf.js'}));
    });

    gulp.task('build', [ 'test' ], function() {
        // clean browserified spec file
        del('./temp_spec.js');

        return gulp.src(paths.src)
            .pipe(concat.header(banner))
            .pipe(gulp.dest(paths.output))
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.output));
    });

    gulp.task('default', [ 'build' ]);
})();