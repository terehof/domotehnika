
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //подгружаем package.json, чтобы использовать его данные

        jshint: { // описываем как будет проверять наш код - jsHint
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true,
                    console: true
                }
            },
            '<%= pkg.name %>': { //вставляем название проекта из package.json
                src: ['src/js/scripts/*.js'] //какие файлы надо проверять
            }
        },
        concat: { //описываем работу плагина конкатенации
            options: {
                stripBanners: true,
            },
            dist: {
                src: [
                    'src/js/lib/jquery-1.11.2.min.js',

                    'src/js/scripts/main.js'
                ], // какие файлы конкатенировать
                dest: 'js/build.js' // куда класть файл, который получиться после процесса конкатенации
            }
        },

        concat_css: {
            options: {
                // Task-specific options go here.
            },
            all: {
                src: ["src/css/*.css"],
                dest: "css/style.css"
            }
        },
        less: {
            development: {
                options: {
                    paths: ["src/css"]
                },
                files: {
                    "src/css/style.css": "src/less/style.less"
                }
            }
        },

        watch: { //описываем работу плагина слежки за файлами.
            scripts: {
                files: ['src/js/scripts/*.js', 'Gruntfile.js'], //следить за всеми js файлами в папке src
                tasks: ['jshint', 'concat'] //при их изменении запускать следующие задачи
            },
            css: {
                files: [ 'src/less/*.less'], //следить за всеми css файлами в папке src
                tasks: ['less', 'concat_css'] //при их изменении запускать следующую задачу
            }
        }
    });

    //подгружаем необходимые плагины
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //регистрируем задачу
    grunt.registerTask('default', [ 'less', 'concat_css', 'jshint', 'concat', 'watch']);
};