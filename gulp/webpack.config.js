var path = require('path');
var webpack = require('webpack');
var config = require('./config').js;
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var main_js = "[name].js";
var main_css = "[name].css";
var vendor_js = "vendor.js";

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '../app/js'),
    entry: {
        main: "./scripts.js",
        vendor: [
            "jquery",
            "underscore",
            "moment",
            "bootstrap",
            "mapbox",
            "theme_module_loader",
            "cssmodal",
            "dotdotdot"
        ]
    },
    resolve: {
        alias: {
            jquery: path.join(__dirname, "../node_modules/jquery/dist/jquery.js"),
            underscore: path.join(__dirname, "../node_modules/underscore/underscore.js"),
            moment: path.join(__dirname, "../node_modules/moment/moment.js"),
            bootstrap: path.join(__dirname, "../node_modules/bootstrap/dist/js/bootstrap.js"),
            mapbox: path.join(__dirname, "../node_modules/mapbox.js"),
            dotdotdot: path.join(__dirname, "../node_modules/dotdotdot/src/js/jquery.dotdotdot.js"),
            theme_module_loader: path.join(__dirname, "../app/js/common/module-loader.js"),
            cssmodal: path.join(__dirname, "../node_modules/css-modal/modal.js")
        },
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                loader: "url?name=images/[hash].[ext],limit=1000"
            },
            {
                test: /\.json$/i,
                loader: "json"
            },
            {
                test: /\.html$/i,
                loader: "raw"
            },
            {
                test: /\.(woff|woff2)$/,
                loader: "url-loader?name=fonts/[hash].[ext],limit=1000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot)$/,
                loader: "file-loader?name=fonts/[hash].[ext]"
            }
        ]
    },
    output: {
        path: config.dest,
        filename: main_js
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.$": "jquery",
            "window.jQuery": "jquery",
            _: "underscore"
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor", vendor_js),
        new ExtractTextPlugin(main_css, {
            allChunks: true
        }),
        new ManifestPlugin(),
        new ChunkManifestPlugin({
            manifestVariable: "webpackManifest"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
