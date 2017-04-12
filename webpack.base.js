const path = require('path');

module.exports = {
    // webpack options
    entry: {
        test: "./tests/cases.js",
        src: "./src/shining.js"
    },

    output: {
        path: path.resolve(__dirname, "build/"),
        filename: "[name].js",
    },

    module: {
        rules: [
        {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
            options: {
                presets: ['es2015']
            }
        }
        ]
    },

    stats: {
        // Configure the console output
        colors: true,
        modules: true,
        reasons: true
    },
}
