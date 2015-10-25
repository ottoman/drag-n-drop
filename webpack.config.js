
// start with:
// webpack-dev-server --progress --colors -d
//

module.exports = {
  entry: {
    app: './src/main'
  },
  output: {
    // Make sure to use [name] or [id] in output.filename
    //  when using multiple entry points
    path: './dist/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  module: {
    loaders: [
      // fonts
      {
          test: /\.(ttf|eot|svg|woff|woff2)$/,
          loader: 'file-loader?name=../dist/fonts/[name].[ext]'
      },
      // SASS
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      // css
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      // coffee
      {
        test: /\.coffee$/,
        loader: 'coffee-loader'
      },
      { test: /\.(coffee\.md|litcoffee)$/,
        loader: 'coffee-loader?literate'
      },
      // Babel
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          optional: ['runtime'],
          stage: 1
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: [
      'bower_components',
      'node_modules'
    ],
    alias: {

    }
  }
};




