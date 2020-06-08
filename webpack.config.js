const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s?[ac]ss$/,
        // use: cssConfig,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.pug$/,
        use: [ 'html-loader', 'pug-html-loader' ],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        loader: 'file-loader?name=img/[name].[ext]',
      },
    ],
  },
  optimization: {
    minimizer: [ new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({}) ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/view/index.pug',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/img/client', to: 'img/client', toType: 'dir' },
        { from: 'src/img/expertise', to: 'img/expertise', toType: 'dir' },
        { from: 'src/img/main', to: 'img/main', toType: 'dir' },
        { from: 'src/img/our-story', to: 'img/our-story', toType: 'dir' },
        { from: 'src/img/quotation-mark', to: 'img/quotation-mark', toType: 'dir' },
        { from: 'src/img/social', to: 'img/social', toType: 'dir' },
        { from: 'src/img/team', to: 'img/team', toType: 'dir' },
        { from: 'src/img/works', to: 'img/works', toType: 'dir' },
        { from: 'src/img/footer-bcg.png', to: 'img/footer-bcg.png', toType: 'file' },
        { from: 'src/img/footer-btn-logo.png', to: 'img/footer-btn-logo.png', toType: 'file' },
        { from: 'src/img/logo.png', to: 'img/logo.png', toType: 'file' },
        { from: 'src/img/icon/favicon', to: 'img/favicon', toType: 'dir' },
        { from: 'src/img/icon/favicon.ico', to: 'favicon.ico', toType: 'file' },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  mode: isProd ? 'production' : 'development',
  devServer: {
    noInfo: true,
    overlay: true,
    contentBase: path.join(__dirname, 'src'),
  },
};

module.exports = (env, options) => {
  const production = options.mode === 'production';
  config.devtool = production ? false : 'cheap-module-source-map';
  return config;
};
