// @ts-check
/* eslint-disable */

const path = require("path");

const USE_SOURCEMAPS = true;

/** @param {string[]} seg */
const root = (...seg) => path.resolve(__dirname, ...seg);

/** @type {(isDev: boolean) => import("webpack").Configuration} */
module.exports = isDev => ({
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: require.resolve("ts-loader"),
          options: {
            transpileOnly: isDev,
            experimentalWatchApi: isDev,
            compilerOptions: {
              sourceMap: USE_SOURCEMAPS,
              baseUrl: root()
              // declaration: USE_SOURCEMAPS,
              // declarationMap: USE_SOURCEMAPS,
            }
          }
        },
        include: [root("stories")]
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: require.resolve("ts-loader"),
          options: {
            transpileOnly: true,
            experimentalWatchApi: isDev,
            compilerOptions: {
              sourceMap: USE_SOURCEMAPS,
              baseUrl: root()
              // declaration: USE_SOURCEMAPS,
              // declarationMap: USE_SOURCEMAPS,
            }
          }
        },
        include: [root("stories")]
      }
    ]
  },
  devtool: isDev
    ? USE_SOURCEMAPS
      ? "inline-source-map"
      : "eval"
    : "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx",  ".js"]
  },
  resolveLoader: {
    // make our custom shiki-loader (syntax highlighter) available
    modules: ["node_modules", path.resolve(__dirname, "loaders")]
  },
  output: {
    // webpack has the ability to generate path info in the output bundle. However, this puts garbage collection pressure on projects that bundle thousands of modules.
    pathinfo: USE_SOURCEMAPS,
    devtoolModuleFilenameTemplate: 'source://[namespace]/[resource-path]?[loaders]',
  },
  mode: isDev ? "development" : "production",
  optimization: isDev
    ? {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
      }
    : {
        minimize: true,
        removeEmptyChunks: true,
        usedExports: true
      }
});
