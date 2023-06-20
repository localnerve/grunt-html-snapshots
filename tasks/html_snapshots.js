/**
 * grunt-html-snapshots
 * https://github.com/localnerve/grunt-html-snapshots
 *
 * Copyright (c) 2013 - 2023, LocalNerve, Alex Grant
 * Licensed under the MIT license.
 */
const html_snapshots = require('html-snapshots');

module.exports = function (grunt) {
  grunt.registerMultiTask('html_snapshots', 'Generate html snapshots.', function () {
    // Merge task-specific and/or target-specific options with these defaults.
    const options = this.options({
      force: false
    });

    // Report html_snapshot errors but dont fail the task
    const force = options.force;
    delete options.force;

    grunt.verbose.writeflags(options, 'html_snapshots options');

    // Setup for async
    const done = this.async();

    // Take the snapshots
    html_snapshots.run(options)
      .then(() => {
        grunt.log.ok();
      })
      .catch(err => {
        grunt.log.error('html_snapshots failed');
        if (force) {
          grunt.log.error(err);
        }
        return err;
      })
      .then(err => {
        done(force ? undefined : err);
      });
  });
};
