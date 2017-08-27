const path = require('path')

module.exports = {
  entry: {
    indexer: './src/indexer'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'extension/dist')
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader'
      }

    ]
  },

  resolve: {
    extensions: ['.js']
  },

  devtool: 'source-map'
}