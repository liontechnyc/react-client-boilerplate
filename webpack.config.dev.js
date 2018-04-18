const webpack = require('webpack')
const path = require('path')
// Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// Paths
const SRC    =  path.resolve(__dirname, 'src')
const PUBLIC =  path.resolve(__dirname, 'public')
const DIST   =  path.resolve(__dirname, 'dist')
// Dev Server Port
const PORT = process.env.PORT || 3000

module.exports = {
    devtool: 'cheap-eval-source-map',
    context: SRC,
    entry: { 
        app: SRC + '/app.js',
        // Code splitting for SSR
        router: SRC + '/views'
    },
    output: {
        path: DIST,
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: SRC,
                loader: 'babel-loader',
                options: {
                    babelrc: true,
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true
                }
            },
            {
                test: /\.gql$/,
                include: SRC + '/graph',
                // Parse GraphQL queries into standard GraphQL AST(document objects)
                // https://github.com/apollographql/graphql-tag/blob/master/README.md
                loader: 'graphql-tag/loader'
            },
            {
                test: /\.css$/,
                use: [ 'css-hot-loader' ].concat(
                    ExtractTextPlugin.extract({
                        use: [
                            { loader: 'css-loader', options: { importLoaders: 1 } },
                            { loader: 'postcss-loader' }
                        ],
                        fallback: 'style-loader'
                    })
                )
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                  name: "assets/fonts/[name].[ext]",
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                  limit: 10000,
                  name: 'assets/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                include: path.resolve(__dirname, 'public')
            }
        ]
    },
    plugins: [
        // Globally registered modules
        new webpack.ProvidePlugin({
            'React': 'react'
        }),
        // Bundle all css into a single css bundle
        new ExtractTextPlugin('app.css'),
        // Copy assets to dist env
        new CopyWebpackPlugin([
            {
                from: PUBLIC + '/assets',
                to: DIST + '/assets',
            },
            {
                from: PUBLIC + '/service-worker.js',
                to: DIST,
            }
        ]),
        // Serve HTML template for testing
        new HtmlWebpackPlugin({
            template: PUBLIC + '/index.hbs',
            filename: 'index.html',
        }),
        // Required for React to detect proper env
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        // Enable hot reload support
        new webpack.HotModuleReplacementPlugin(),
        // Prevent rendering when errors are present ... otherwise will be very annoying :(
        new webpack.NoEmitOnErrorsPlugin(),
        // Display module paths helpfull for debugging
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        contentBase: DIST,
        compress: true,
        historyApiFallback: true,
        publicPath: '/',
        host: '0.0.0.0',
        port: PORT,
        hot: true,
        open: true
    }
}