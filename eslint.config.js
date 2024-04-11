const js = require('@eslint/js');
const globals = require('globals');

module.exports = [{
  ignores: [
    'node_modules/**',
    'tmp/**'
  ]
}, {
  files: [
    '**/*'
  ],
  ...js.configs.recommended,
  languageOptions: {
    globals: {
      ...globals.node
    }
  }
}];
