const path = require('path')

module.exports = {
  entry: {
    background: './src/background',
    infobox: './src/infobox'
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
    extensions: ['.js'],
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
  },

  devtool: 'source-map'
}
