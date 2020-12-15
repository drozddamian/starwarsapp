import path from 'path'
import nodeExternals from 'webpack-node-externals'

module.exports = {
  entry: path.resolve(__dirname) + '/server/server.tsx',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
}
