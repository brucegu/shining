module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webpack: {
            tests: {
                // webpack options
                entry: "./tests/cases.js",
                output: {
                    path: "./build/tests",
                    filename: "cases.js",
                },

                module: {
                    loaders: [
                        {
                            test: /\.js?$/,
                            exclude: /(node_modules|bower_components)/,
                            loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                            query: {
                                presets: ['es2015']
                            }
                        }
                    ]
                },

                stats: {
                    // Configure the console output
                    colors: false,
                    modules: true,
                    reasons: true
                },
                // stats: false disables the stats output

                storeStatsTo: "xyz", // writes the status to a variable named xyz
                // you may use it later in grunt i.e. <%= xyz.hash %>

                progress: false, // Don't show progress
                // Defaults to true

                failOnError: false, // don't report error to grunt if webpack find errors
                // Use this if webpack errors are tolerable and grunt should continue

                watch: false, // use webpacks watcher
                // You need to keep the grunt process alive

                keepalive: false, // don't finish the grunt task
                // Use this in combination with the watch option

                inline: false,  // embed the webpack-dev-server runtime into the bundle
                // Defaults to false

                hot: false, // adds the HotModuleReplacementPlugin and switch the server to hot mode
                // Use this in combination with the inline option
            },
            build: {
                // webpack options
                entry: "./src/shining.js",
                output: {
                    path: "./build/product",
                    filename: "shining.js",
                },

                module: {
                    loaders: [
                        {
                            test: /\.js?$/,
                            exclude: /(node_modules|bower_components)/,
                            loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                            query: {
                                presets: ['es2015']
                            }
                        }
                    ]
                },

                stats: {
                    // Configure the console output
                    colors: false,
                    modules: true,
                    reasons: true
                },
                // stats: false disables the stats output

                storeStatsTo: "xyz", // writes the status to a variable named xyz
                // you may use it later in grunt i.e. <%= xyz.hash %>

                progress: false, // Don't show progress
                // Defaults to true

                failOnError: false, // don't report error to grunt if webpack find errors
                // Use this if webpack errors are tolerable and grunt should continue

                watch: false, // use webpacks watcher
                // You need to keep the grunt process alive

                keepalive: false, // don't finish the grunt task
                // Use this in combination with the watch option

                inline: false,  // embed the webpack-dev-server runtime into the bundle
                // Defaults to false

                hot: false, // adds the HotModuleReplacementPlugin and switch the server to hot mode
                // Use this in combination with the inline option
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'mocha_result.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
                    noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
                },
                src: ['./build/tests/cases.js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-webpack');
    // Default task(s).
    grunt.registerTask('default', ['webpack:build']);
    grunt.registerTask('build', ['webpack:build']);
    grunt.registerTask('dev', ['webpack:build', 'webpack:tests', 'mochaTest']);
    grunt.registerTask('test', ['mochaTest']);
};
