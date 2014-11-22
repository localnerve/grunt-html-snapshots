/**
 * grunt-html-snapshots
 * https://github.com/localnerve/grunt-html-snapshots
 *
 * Copyright (c) 2013, 2014, LocalNerve, Alex Grant
 * Licensed under the MIT license.
 */
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
    var result = html_snapshots.run(options, function(err) {
      var doneArg = force ? undefined : err;
      if (result && !err) {
        grunt.log.ok();
      } else {
        grunt.log.error("html_snapshots failed");
      }
      done(doneArg);
    });

    if (!result) {
      grunt.log.error("html_snapshots failed");
      return force;
    }
    
  });

};