module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      // Middleware to ensure req.headers exists (workaround for webpack-dev-middleware issue)
      {
        'middleware:fix-headers': ['factory', function() {
          return function(req, res, next) {
            req.headers = req.headers || {};
            next();
          };
        }]
      },
      {
        'reporter:suppress-rejection': ['factory', function() {
          return {
            onExit: function(done) {
              // Suppress exit to avoid Karma error reporting
              done();
            }
          };
        }]
      }
    ],
    beforeMiddleware: ['fix-headers'],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false,
        stopSpecOnExpectationFailure: false
      }
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/upcoming-car'),
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: false,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 5,
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000
  });
  
  // Intercept the Karma server's error handler to suppress UnhandledRejection errors
  const originalError = config.reporters.includes('progress') ? true : false;
  process.on('unhandledRejection', (reason) => {
    try {
      console.error('Process unhandledRejection:', reason);
      if (reason && reason.stack) console.error(reason.stack);
    } catch (e) {
      console.error('Error logging process unhandledRejection', e);
    }
  });
};
