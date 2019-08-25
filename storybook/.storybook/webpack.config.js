// @ts-check
// your app's webpack.config.js
const createCustom = require("../webpack.config.js");

module.exports = async ({ config, mode }) => {
  const isDev = /dev/i.test(mode);
  const custom = createCustom(isDev);
  return {
    ...custom,
    ...config,
    ...(isDev
      ? {}
      : {
          output: {
            ...config.output,
            ...custom.output
          },
          devtool: "source-map"
        }),
    module: { ...config.module, rules: custom.module.rules },
    resolve: { ...config.resolve, extensions: custom.resolve.extensions }
  };
};
