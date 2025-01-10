/**
 * grunt-html-snapshots
 * https://github.com/localnerve/grunt-html-snapshots
 *
 * Copyright (c) 2013 - 2025 Alex Grant
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    test_server1: {
      options: {
        port: 8051
      }
    },

    test_server2: {
      options: {
        port: 8052
      }
    },

    test_server3: {
      options: {
        port: 8051
      }
    },

    // Configuration to be run (and then tested).
    html_snapshots: {
      options: grunt.file.readJSON("test/input/default_options"),

      target1: {
        options: {
          outputDir: "tmp/target1/snapshots",
          port: "<%= test_server1.options.port %>"
        }
      },

      target2: {
        options: {
          outputDir: "tmp/target2/snapshots",
          hostname: "bogus",
          port: "<%= test_server2.options.port %>",
          force: true
        }
      },

      target3: {
        options: {
          source: "test/fixtures/test_robots_sitemap.txt",
          outputDir: "tmp/target3/snapshots",
          port: "<%= test_server3.options.port %>"
        }
      }
    },
    
    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
      target1: ['test/html_snapshots_target1.js'],
      target2: ['test/html_snapshots_target2.js']
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Register the test server
  grunt.registerTask('test_server1', 'serve the test files', function(){
    const options = this.options();
    const server = require('./test/server');
    server.start('./test/server', options.port);
    grunt.log.writeln("running test server on port "+options.port);
    grunt.log.ok();
  });

  grunt.registerTask('html_snapshots_options', 'prepare options for html_snapshots', function(){
    const optionsHelper = require("./test/helpers/options");
    const done = this.async();
    optionsHelper.detector(globalPhantom => {
      if (globalPhantom) {
        var htmlSnapshots = grunt.config.get("html_snapshots");
        htmlSnapshots.options.phantomjs = "phantomjs";
        grunt.config.set("html_snapshots", htmlSnapshots);
      }
      done();
    });
  });

  // Whenever the "test" task is run, run this plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'test_server1', 'html_snapshots_options', 'html_snapshots', 'nodeunit:tests']);
  grunt.registerTask('target1', ['clean', 'test_server1', 'html_snapshots_options', 'html_snapshots:target1', 'nodeunit:target1']);
  grunt.registerTask('target2', ['clean', 'html_snapshots_options', 'html_snapshots:target2', 'nodeunit:target2']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};