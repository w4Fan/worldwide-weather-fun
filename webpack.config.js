var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    entry: {
        app: path.resolve(APP_PATH, 'app.jsx')
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: APP_PATH,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: APP_PATH
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=8192'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url'
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: path.resolve(APP_PATH, 'app.html'),
            inject: 'body'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
};