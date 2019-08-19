// @ts-check
// your app's webpack.config.js
const createCustom = require('../webpack.config.js');

module.exports = async ({ config, mode }) => {
  const custom = createCustom(/dev/i.test(mode))
  return {
    ...config,
    module: { ...config.module, rules: custom.module.rules },
    resolve: { ...config.resolve, extensions: custom.resolve.extensions }
  };
};
