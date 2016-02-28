var config = {

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   */
  entry: {},

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   */
  output: {},

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  devtool: 'inline-source-map',

  /**
   * Modules
   */
  module: {
    /**
     * Preloaders
     */
    preLoaders: [
      // CODE COVERAGE REPORTING
      // Reference: https://github.com/ColCh/isparta-instrumenter-loader
      {
        test: /\.js$/,
        exclude: [ /node_modules/, /\.test\.js$/ ],
        loader: 'isparta-instrumenter'
    } ],
    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     */
    loaders: [
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: [ "es2015" ]
        }
     },
      // HTML LOADER
      // Reference: https://github.com/webpack/html-loader
      {
        test: /\.html$/,
        exclude: /(node_modules|bower_components)/,
        loader: "html"
      }
    ]
  }

};


module.exports = config;
