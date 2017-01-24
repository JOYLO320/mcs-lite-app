var path              = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack           = require('webpack');
var I18nPlugin        = require('i18n-webpack-plugin');
var ISPRODUCTION = process.env.NODE_ENV === 'production';
var languages = {
  en: null,
  'zh-CN': require('./locale/zh-CN'),
  'zh-TW': require('./locale/zh-TW')
};

module.exports =  Object.keys(languages).map(function(language) {
  var devtool = 'source-map';
  var plugins = [
    new ExtractTextPlugin('[name].css'),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new I18nPlugin(languages[language])
  ];

  if (ISPRODUCTION) {
    devtool = null;
    plugins = plugins.concat([
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin()
    ]);
  } else {
    plugins = plugins.concat(new webpack.HotModuleReplacementPlugin());
  }

  return {
    name: language,
    entry: path.join(__dirname, '/js/oauth.jsx'),
    output: {
      publicPath: 'http://127.0.0.1:8080/build/',
      path: path.join(__dirname, '/build/'),
      filename: language + '.oauth.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel-loader']
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }
      ]
    },
    plugins: plugins,
    devtool: devtool,
    node: {
      __dirname: true
    }
  };
});

module.exports.output = {
  publicPath: 'http://127.0.0.1:8080/build/'
};

module.exports.devServer = {};
