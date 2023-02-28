const webpack = require("webpack");

module.exports = function override(config) {
  config.ignoreWarnings = [/Failed to parse source map/];
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: false,
    events: false,
    path: false,
    stream: require.resolve("stream-browserify"),
    string_decoder: false,
    http: false,
    https: false,
    url: false,
    fs: false,
    net: false,
    tls: false,
    zlib: false,
    bufferutil: false,
    "utf-8-validate": false,
  });
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.resolve.fallback = fallback;
  return config;
};
