/**
 * grunt-html-snapshots
 * https://github.com/localnerve/grunt-html-snapshots
 *
 * Copyright (c) 2013 - 2017, LocalNerve, Alex Grant
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {

  var html_snapshots = require('html-snapshots');

  grunt.registerMultiTask('html_snapshots', 'Generate html snapshots.',
  function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: false
    });

    // Report html_snapshot errors but dont fail the task
    var force = options.force;
    delete options.force;

    grunt.verbose.writeflags(options, 'html_snapshots options');

    // Setup for async
    var done = this.async();

    // Take the snapshots
    html_snapshots.run(options)
      .then(function (completed) {
        grunt.log.ok();
      })
      .catch(function (err) {
        grunt.log.error('html_snapshots failed');
        if (force) {
          grunt.log.error(''+err);
        }
        return err;
      })
      .then(function (err) {
        done(force ? undefined : err);
      });
  });

};
