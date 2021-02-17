/**
 * options.js
 *
 * A test helper to detect which html-snapshots options to use
 * 
 * phantomjs
 * If a global phantomjs is defined, decorates html-snapshots options to specify that global
 * In some test environments (travis), local phantomjs will not install if a global is found.
 */

const spawn = require("child_process").spawn;

module.exports = {

  // for now, callback is passed true if global phantomjs should be used
  detector: callback => {
    // try to run phantom globally
    const cp = spawn("phantomjs", ["--version"]);

    // if it fails, use local per the defaults
    cp.on("error", () => {
      callback(false);
    });

    // if it succeeds, use the global
    cp.on("exit", code => {
      if (code === 0) {
        callback(true);
      }
    });
  }
};