module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webpack: {
            compile: {
                // webpack options
                entry: "./src/index.js",
                output: {
                    path: "./build/",
                    filename: "index.min.js",
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
        }
    });
    grunt.loadNpmTasks('grunt-webpack');

    // Default task(s).
    grunt.registerTask('default', ['webpack']);
};
