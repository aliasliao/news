const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
    entry: [
        './src/main.js',
    ],
    output: {
        publicPath: '/dist',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                    }
                }
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'url-loader?limit=10000&name=[hash:base64:10].[ext]'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        noInfo: true,
        proxy: {
            '!(/)': 'http://localhost:3000'
        }
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
    ],
    performance: {
        hints: false
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.output.path = resolve(__dirname, './dist')
}
