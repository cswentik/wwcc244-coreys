module.exports = myTasks;
//tell grunt what we want it to do
//register the package
function  myTasks(grunt) {
    grunt.initConfig({
        browserify: {
            main: {
                src: ['client/app.js'],
                dest: 'dist/app.js'
            }
        },

        copy: {
            main:{
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                          'client/**/*.html'
                    ],
                    dest: 'dist/'
                }]
            },
            vendor: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['node_modules/jquery/dist/jquery.js'],
                        dest: 'dist/vendor/'
                    }
                ]
            }
        },
        clean: {
            all: ['dist/*'],
            vendor: ['dist/vendor/*'],
            main: ['dist/**/*.html', 'dist/**/*.html', '!dist/vendor/**.*']
        },
        watch:{
            main: {
                files: ['client/**/js' , 'client/**/*.html'],
                tasks: ['clean:main','browserify:main', 'copy:main' , ],
                options: {
                    livereload: true
                }
            }
        }
    });
    // it runs in order you tell it to.
    grunt.registerTask('default', ['clean:all', 'build']);
    grunt.registerTask('dev', ['default','watch']);
    grunt.registerTask('build', ['browserify','copy']);
    // grunt.registerTask('test', ['lint', 'prettify']);
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
}