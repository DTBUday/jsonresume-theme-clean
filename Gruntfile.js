module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
          development: {
            options: {
              paths: ["assets"]
            },
            files: {
              "assets/css/theme.css": "assets/less/theme.less"
            }
          }
        },
        exec: {
            cmd: "node build.js & firefox " + __dirname + "/build/index.html &"
        },
        copy: {
            build: {
                cwd: './assets/icomoon/fonts/',
                src: [ '*' ],
                dest: './build/assets/icomoon/fonts',
                expand: true
            },
        },
        clean: {
            build: {
                src: [ 'build' ]
            }
        }
    });

    // Load the plugin that compiles less to css
    grunt.loadNpmTasks('grunt-contrib-less');

    // Load the plugin to execute shell commands
    grunt.loadNpmTasks('grunt-exec');

    // Load the plugin to clean directories
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Load the plugin to copy files
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default tasks
    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', [
        'clean:build',
        'copy',
        'less',
        'exec'
    ]);
}
