const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './extension/popup.js',
  output: {
    filename: 'popup.bundle.js',
    path: path.resolve(__dirname, 'extension'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
  ],
  mode: 'production', // Or 'development' based on your environment
  devtool: 'source-map', // Avoid eval() in source maps to comply with CSP
};


