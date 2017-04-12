const webpackProdConfig = require('./webpack.base.js');
//const webpackDevConfig = require('./webpack.dev.config');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webpack: {
          options: {
            stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
          },
          prod: webpackProdConfig,
          dev: webpackProdConfig
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'mocha_result.txt', 
                    quiet: false,
                    clearRequireCache: false,
                    noFail: false
                },
                src: ['./build/test.js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('default', ['webpack:prod']);
    grunt.registerTask('prod', ['webpack:prod', 'mochaTest']);
    grunt.registerTask('dev', ['webpack:dev', 'mochaTest']);
    grunt.registerTask('test', ['mochaTest']);
};
