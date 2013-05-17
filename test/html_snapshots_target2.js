'use strict';

var grunt = require('grunt');
var fs = require('fs');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.html_snapshots = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  target2: function(test) {
    test.expect(3);
    
    grunt.file.read('test/expected/target2').split('\n').forEach(function(line){
      test.equal(false, fs.existsSync(line), line+" should not exist");
    });

    test.done();
  }
};
