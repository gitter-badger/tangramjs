'use strict';

if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');

    process.exit(1);
}

var customLaunchers = { // See, https://saucelabs.com/platforms/
    sauceLabsInternetExplorer9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9.0'
    },
    sauceLabsInternetExplorer10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '10.0'
    },
    sauceLabsInternetExplorer11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '11.0'
    },
    sauceLabsChrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Linux',
        version: '42.0'
    },
    sauceLabsFirefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Linux',
        version: '37.0'
    },
    sauceLabsSafari7: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'Mac 10.9',
        version: '7.0'
    },
    sauceLabsSafari8: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'Mac 10.10',
        version: '8.0'
    }
};

module.exports = function (config) {
    config.set({
        autoWatch: false,
        browsers: Object.keys(customLaunchers),
        captureTimeout: 120000,
        colors: true,
        customLaunchers: customLaunchers,
        files: [
            'test/tangram.test.js'
        ],
        frameworks: [
            'browserify',
            'mocha'
        ],
        logLevel: 'LOG_DEBUG',
        preprocessors: {
            'test/tangram.test.js': 'browserify'
        },
        reporters: [
            'saucelabs',
            'spec'
        ],
        sauceLabs: {
            connectOptions: {
                port: 5757
            },
            recordScreenshots: false,
            testName: 'Tangram.js browser test'
        },
        singleRun: true,
        browserify: {
            debug: true
        }
    });
};
