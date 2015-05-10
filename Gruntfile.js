'use strict';
var path = require('path');

module.exports = function(grunt) {
    var pkg, taskName;
    pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        pkg: pkg,
        dir: {
            bower: 'bower_components',
            components: 'webcomponents',
            js: 'js'
        },
        clean: {
            // delete inside of release directory
            deleteReleaseFolder00: {
                src: [
                    '<%= dir.release %>/',
                    '<%= dir.src %>*/.DS_Store',
                    '<%= dir.src %>*/Thumbs.db'
                ],
            },
            // delete unnecessary files in release
            createRelease: {
                src: [
                    '<%= dir.bower %>/**/AUTHORS',
                    '<%= dir.bower %>/**/.bower.json',
                    '<%= dir.bower %>/**/bower.json',
                    '<%= dir.bower %>/**/gruntfile.js',
                    '<%= dir.bower %>/**/package.json',
                    '<%= dir.bower %>/**/sample.html',
                    '<%= dir.bower %>/**/playground.html',
                    '<%= dir.bower %>/**/README.md',
                    '<%= dir.bower %>/**/benchmark/',
                    '<%= dir.bower %>/**/codereview*',
                    '<%= dir.bower %>/**/*png',
                    '<%= dir.bower %>/**/demo.html',
                    '<%= dir.bower %>/**/index.html',
                    '<%= dir.bower %>/**/examples/**',
                    '<%= dir.bower %>/webaudio-controls'
                ]
            }
        },
        // configuration of localhost
        // check on http://localhost:9001/
        connect: {
            createRelease: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: './',
                    keepalive: true,
                    open: false
                }
            }
        }        
    });
    
    // autoload packages which are listed in pakage.json
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }

    // Grunt command for creating deliver release
    grunt.registerTask('createRelease', ['clean:createRelease']);

    grunt.registerTask('eatwarnings', function() {
        grunt.warn = grunt.fail.warn = function(warning) {
            grunt.log.error(warning);
        };
    });
};