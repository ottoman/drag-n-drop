
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
      // { test: /\.(woff|woff2)$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      // { test: /\.ttf$/, loader: 'file-loader' },
      // { test: /\.eot$/, loader: 'file-loader' },
      // { test: /\.svg$/, loader: 'file-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.md$/, loader: 'html!markdown' },
      // { test: /\.(jsx|js)$/, loader: 'babel-loader', exclude: /node_modules/ }
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          optional: ['runtime'],
          stage: 1
        }
        // ?stage=1&optional=runtime'
      },
      {
        // Rewrite the file so that it exports the window global.
        test: __dirname + '/node_modules/zepto/zepto.min.js',
        loader: 'exports?window.Zepto'
      },
      // {
      //   // Rewrite the file so that it exports the window global.
      //   test: __dirname + '/node_modules/react-motion/build/react-motion',
      //   loader: 'exports?window.ReactMotion'
      // }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: [
      'bower_components',
      'node_modules'
    ],
    alias: {
      // 'foo-bar': './foo-bar.js'
    }
  },
  devServer: {
    port: 8081
    // contentBase: "./build",
    // noInfo: true, //  --no-info option
    // hot: true,
    // inline: true
  }
};




