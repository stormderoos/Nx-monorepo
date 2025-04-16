const { composePlugins, withNx } = require('@nx/webpack');
const path = require('path');

module.exports = composePlugins(withNx(), (config) => {
  config.output = {
    ...config.output,
    filename: 'main.js',
    path: path.resolve(__dirname, '../../dist/apps/data-api'),
  };

  return config;
});