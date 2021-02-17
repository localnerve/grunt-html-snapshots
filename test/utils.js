/**
 * test utils
 */
const fs = require('fs').promises;

function pathExists (path) {
  return fs.access(path)
    .then(() => true)
    .catch(() => false);
}

module.exports = {
  pathExists
};
