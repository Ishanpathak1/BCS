const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development', // Use 'production' for production builds
  entry: './extension/popup.js', // Entry file for the popup script
  output: {
    path: path.resolve(__dirname, 'extension'),
    filename: 'popup.bundle.js', // Output file
  },
  plugins: [
    new Dotenv(), // Load environment variables from .env file
  ],
  resolve: {
    fallback: {
      crypto: false,
      buffer: false, // Ensure 'buffer' and 'crypto' fallbacks are set
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/, // For JavaScript files
        exclude: /node_modules/, // Exclude node_modules folder
        use: {
          loader: 'babel-loader', // Use Babel to transpile modern JavaScript
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  // Prevent eval-related errors due to CSP
  devtool: 'cheap-module-source-map', // or 'source-map' for more detailed debugging
};





