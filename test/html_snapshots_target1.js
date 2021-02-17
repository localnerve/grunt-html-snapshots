/**
 * tests, target1
 */
/* global Promise */
const grunt = require('grunt');
const { pathExists } = require('./utils');

exports.html_snapshots = {
  setUp: done => {
    // setup here if necessary
    done();
  },

  target1: test => {
    test.expect(3);

    const results = [];

    grunt.file.read('test/expected/target1').split('\n').forEach(line => {
      results.push(pathExists(line).then(exists => {
        test.equal(true, exists, `${line} should exist`);
      }));
    });

    Promise.all(results).finally(()=> {
      test.done();
    })
  }
};
