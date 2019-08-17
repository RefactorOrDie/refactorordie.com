/* eslint-disable */

const path = require('path');

const USE_SOURCEMAPS = true;
const IS_DEVELOPMENT = false;

/** @param {string[]} seg */
const root = (...seg) => path.resolve(__dirname, ...seg);

/** @type {import("webpack").Configuration} */
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: IS_DEVELOPMENT,
            experimentalWatchApi: IS_DEVELOPMENT,
            compilerOptions: {
              sourceMap: USE_SOURCEMAPS,
              // declaration: USE_SOURCEMAPS,
              // declarationMap: USE_SOURCEMAPS,
            },
          },
        },
        include: [root('stories')],
      },
    ],
  },
  devtool: IS_DEVELOPMENT
    ? (USE_SOURCEMAPS
      ? 'inline-source-map'
      : 'eval')
    : 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    // webpack has the ability to generate path info in the output bundle. However, this puts garbage collection pressure on projects that bundle thousands of modules.
    pathinfo: USE_SOURCEMAPS,
  },
  mode: IS_DEVELOPMENT ? 'development' : 'production',
  optimization: IS_DEVELOPMENT
    ? {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }
    : {
        minimize: true,
        removeEmptyChunks: true,
        usedExports: true,
      },
};
