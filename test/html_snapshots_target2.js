/**
 * tests, target2
 */
const grunt = require('grunt');
const { pathExists } = require('./utils');

exports.html_snapshots = {
  setUp: done => {
    // setup here if necessary
    done();
  },

  target2: test => {
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
