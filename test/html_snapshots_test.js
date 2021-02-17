/**
 * Test the task
 */
/* global Promise */

const grunt = require('grunt');
const { pathExists } = require('./utils');

exports.html_snapshots = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },

  target1: function(test) {
    test.expect(3);

    const results = [];

    grunt.file.read('test/expected/target1').split('\n').forEach(line => {
      results.push(pathExists(line).then(exists => {
        test.equal(true, exists, `${line} should exist`);
      }));      
    });

    Promise.all(results).finally(() => {
      test.done();
    });
  },

  target2: function(test) {
    test.expect(3);
    
    const results = [];

    grunt.file.read('test/expected/target2').split('\n').forEach(line => {
      results.push(pathExists(line).then(exists => {
        test.equal(false, exists, `${line} should not exist`);
      }));
    });

    Promise.all(results).finally(() => {
      test.done();
    });
  }
};
