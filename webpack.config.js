const webpack = require('webpack');

module.exports = () => (
    {
        target: ['web', 'es5'],
        mode: 'production',
        entry: {
            app: ['@babel/polyfill', 'whatwg-fetch', './src/app.js']
        },
        output: {
            path: `${__dirname}/dist`,
            filename: 'js/[name].js',
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        }
    }
);
