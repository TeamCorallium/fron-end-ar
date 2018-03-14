module.exports = function(grunt) {
    // Grunt T-Shirts
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration will be written here
        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './libs',
                    cleanTargetDir: true
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/app.js': ['dist/app.js']
                },
                options: {
                    mangle: false
                }
            }
        },

        cssmin: {
            dist: {
                src: ['dist/css.css'],
                dest: 'dist/css.css'
            }
        },

        html2js: {
            dist: {
                src: ['HTML/*.html', 'HTML/views/*.html'],
                dest: 'tmp/templates.js'
            }
        },

        clean: {
            temp: {
                src: ['tmp']
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
                    'bower_components/bootstrap-hover-dropdown/bootstrap-hover-dropdown.js',
                    'bower_components/sticky-kit/jquery.sticky-kit.js',
                    'bower_components/jquery.appear.js/jquery.appear.js',
                    'bower_components/slick.js/slick/slick.js',
                    'bower_components/swiper/dist/js/swiper.jquery.js',
                    'bower_components/jquery.stellar/jquery.stellar.js',
                    'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/angular-cookies/angular-cookies.js',
                    'bower_components/ng-timeago/ngtimeago.js',
                    'bower_components/sweetalert/dist/sweetalert-dev.js',
                    'bower_components/angular-notification-icons/dist/angular-notification-icons.js',
                    'bower_components/oclazyload/dist/ocLazyLoad.js',
                    'bower_components/angular-growl-v2/build/angular-growl.js',
                    'bower_components/angular-translate/angular-translate.js',
                    'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                    'bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
                    'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                    'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
                    'bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
                    'bower_components/ng-emoticons/src/ng-emoticons.js',
                    'bower_components/angular-ui-switch/angular-ui-switch.js',
                    'bower_components/spin.js/spin.js',
                    'bower_components/angular-loading-spinner/angular-loading-spinner.js',
                    'bower_components/angular-ui-carousel/dist/ui-carousel.js',
                    'bower_components/slick-carousel/slick/slick.js',
                    'bower_components/angular-slick-carousel/dist/angular-slick.min.js',
                    'HTML/assets/*.js',
                    'HTML/assets/js/*.js',
                    'HTML/assets/js/services/*.js',
                    'HTML/assets/js/controllers/*.js',
                    'HTML/assets/js/filters/*.js',
                    'node_modules/ng-file-upload/dist/ng-file-upload.js'
                ],
                dest: 'dist/app.js'
            },
            css: {
                src: [
                    'bower_components/ng-emoticons/src/ng-emoticons.css',
                    'bower_components/animate.css/animate.css',
                    'bower_components/slick.js/slick/slick-theme.css',
                    'bower_components/swiper/dist/css/swiper.css',
                    'bower_components/magnific-popup/dist/magnific-popup.css',
                    'bower_components/sweetalert/dist/sweetalert.css',
                    'bower_components/ng-img-crop/compile/minified/ng-img-crop.css',
                    'bower_components/slick-carousel/slick/slick.css',
                    'bower_components/slick-carousel/slick/slick-theme.css',
                    'bower_components/slick.js/slick/slick.css',
                    'HTML/assets/css/*.css',
                ],
                dest: 'dist/css.css'
            }
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8080
                }
            }
        },

        watch: {
            dev: {
                files: ['Gruntfile.js', 'HTML/assets/*.js', 'HTML/assets/js/*.js', 'HTML/assets/*.html', 'HTML/assets/views/*.html'],
                tasks: ['html2js:dist', 'concat:dist', 'concat:css', 'cssmin:dist', 'clean:temp'],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: ['Gruntfile.js', 'HTML/assets/*.js', 'HTML/assets/js/*.js', 'HTML/assets/*.html', 'HTML/assets/views/*.html'],
                tasks: ['html2js:dist', 'concat:dist', 'concat:css', 'cssmin:dist', 'clean:temp', 'uglify:dist'],
                options: {
                    atBegin: true
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    src: ['index.html'],
                    dest: '/'
                }, {
                    src: ['dist/**'],
                    dest: 'dist/'
                }, {
                    src: ['HTML/assets/**'],
                    dest: 'assets/'
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('dev', ['bower', 'connect:server', 'html2js:dist', 'concat:dist', 'concat:css', 'cssmin:dist', 'clean:temp']);
    grunt.registerTask('test', ['bower']);
    grunt.registerTask('minified', ['bower', 'connect:server', 'html2js:dist', 'concat:dist', 'concat:css', 'cssmin:dist', 'clean:temp', 'uglify:dist']);
    grunt.registerTask('package', ['bower', 'html2js:dist', 'concat:dist', 'concat:css', 'cssmin:dist', 'uglify:dist',
        'clean:temp', 'compress:dist'
    ]);

};