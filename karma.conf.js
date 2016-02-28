// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
var config = function karmaConfig( config ) {
  config.set( {
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-jasmine
      // Set framework to jasmine
      'jasmine'
    ],

    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'progress',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage'
    ],

    files: [
      // Grab all files in the app folder that contain .test.
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/angular/angular.js',
      'src/lazy.module.js',
      'src/lazy.test.js'
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'src/lazy.module.js': [ 'webpack', 'sourcemap' ],
      'src/lazy.test.js': [ 'webpack', 'sourcemap' ],
    },

    browsers: [
      // Run tests using PhantomJS2
      'PhantomJS2'
    ],

    singleRun: true,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {
          type: 'text-summary'
        },
        {
          type: 'html'
        }
      ]
    },



    webpack: require( './webpack.config' ),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  } );
};

module.exports = config;
