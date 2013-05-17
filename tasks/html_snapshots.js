/*
 * grunt-html-snapshots
 * https://github.com/localnerve/grunt-html-snapshots
 *
 * Copyright (c) 2013 Alex Grant
 * Licensed under the MIT license.
 */
var path = require('path');

module.exports = function(grunt) {

  var html_snapshots = require('html-snapshots');

  grunt.registerMultiTask('html_snapshots', 'Generate html snapshots.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: false
    });

    // Report html_snapshot errors but dont fail the task
    var force = options.force;
    delete options.force;

    grunt.verbose.writeflags(options, 'html_snapshots options');

    // setup for async
    var done = this.async();

    // take the snapshots
    var result = html_snapshots.run(options, (function(grunt, done, force){
      return function(nonError) {
        setTimeout(function() {
          var doneArg = force ? undefined : nonError;
          if (nonError === false) {
            grunt.log.error("html_snapshots failed");          
          } else {
            grunt.log.ok();
          }
          done(doneArg);
        }, 100); // sometimes last child process output gets interleaved with OK...
      };
    })(grunt, done, force));

    if (!result) {
      grunt.log.error("html_snapshots failed");
      return force;
    }
    
  });

};
