const path = require('path')

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'chai', 'chai-as-promised', 'sinon-chai'],

    files: [
      // Tests
      // (sources files are handled by webpack)
      {pattern: 'test/**/*.test.js', watched: false}
    ],
    // add webpack as preprocessor
    preprocessors: {
      'test/**/*.test.js': ['webpack']
    },

    webpack: {
      module: {
        rules: [

          {
            test: /\.js$/,
            exclude: [
              path.resolve(__dirname, 'node_modules')
            ],
            use: [
              'babel-loader',
              'imports-loader?browser=sinon-chrome/webextensions',
            ]
          }

        ]
      },

      resolve: {
        extensions: ['.js'],
        modules: [
          'node_modules',
          path.resolve(__dirname, 'src')
        ],
      }
    },

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: 'html',
      },
    },

    // test results reporter to use
    reporters: ['dots'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    //                  config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable/disable watching file and executing tests when any file changes
    autoWatch: false,

    // start these browsers
    browsers: ['Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
