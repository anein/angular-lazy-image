// modules
var webpack = require( 'webpack' );
//pugins
var ngAnnotatePlugin = require( 'ng-annotate-webpack-plugin' );
//
var config = {
  context: __dirname,
  entry: "./src/lazy.module.js",
  output: {
    filename: "angular.lazyimage.min.js",
    path: "./build"
  },
  module: {
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
      },
      // SCSS LOADER
      // Reference: https://github.com/jtangelder/sass-loader
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loader: "style-loader!css-loader!sass-loader"
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ngAnnotatePlugin( {
      add: true
    } )
  ]
};

module.exports = config;
