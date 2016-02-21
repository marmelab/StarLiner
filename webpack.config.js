var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('webpack-html-plugin');

module.exports = {
    entry: {
        'star-liner': [
            './scss/style.scss',
            './js/star-liner.js'
        ]
    },
    output: {
        path: './build',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') },
        ],
    },
    plugins: [
        new HtmlPlugin({
            template: './index.html',
            inject: true,
            hash: true
        }),
        new ExtractTextPlugin('star-liner.css', {
            allChunks: true
        }),
    ]
};
