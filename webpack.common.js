const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    covid: './src/covid.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      chunks: ['app']
    }),
    new HTMLWebpackPlugin({
      template: 'covid.html',
      filename: 'covid.html',
      chunks: ['covid']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/'),
          to: path.resolve(__dirname, 'dist/assets/'),
        },
      ],
    }),
  ],
};
