// Karma configuration

module.exports = function (config) {
	config.set({

		// base path, that will be used to resolve files and exclude
		basePath: '',

		// frameworks to use
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',

			'src/**/*.module.js',
			'src/**/*.js'
		],
		exclude: [],

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['junit', 'coverage', 'spec'],

		preprocessors: {
			'src/**/*.js': 'coverage',
			'src/**/*.html': ['ng-html2js']
		},

		//https://github.com/karma-runner/karma-ng-html2js-preprocessor
		ngHtml2JsPreprocessor: {
			moduleName: 'ngHtml2JsTemplates'
		},

		singleRun: true,
		plugins: [
			'karma-jasmine',
			'karma-phantomjs-launcher',
			'karma-coverage',
			'karma-junit-reporter',
			'karma-spec-reporter',
			'karma-ng-html2js-preprocessor'
		],
		junitReporter: {
			outputFile: 'results/test-results.xml'
		},
		coverageReporter: {
			instrumenterOptions: {
				istanbul: {noCompact: true}
			},
			type: 'cobertura',
			dir: 'results/coverage',
			subdir: '.',
			file: 'coverage.xml'
		},

		// web server port
		//port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome (has to be installed with `npm install karma-chrome-launcher`)
		// - ChromeCanary
		// - Firefox (npm install karma-firefox-launcher)
		// - Opera (has to be installed with `npm install karma-opera-launcher`)
		// - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
		// - PhantomJS
		// - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
	});
};
