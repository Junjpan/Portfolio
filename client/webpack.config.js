const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TersePlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    filename: '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
  }, // have to include these lines of code to be able to use react-router-dom.
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: 'react', chunks: 'all' },
        commons: {
          test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    }, // have all the independences inside the vendor bundles
    minimizer: [new OptimizeCssAssetsPlugin(), new TersePlugin(), new UglifyJsPlugin()],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html', // the filename value is the name of the minified HTML that will be generated in the dist folder
      favicon: './src/assets/JunEBug.png', // add the icon to the website tag
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      { test: /\.html$/, use: { loader: 'html-loader' } },
      {
        test: /\.(js|jxs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[hash].[ext]', outputPath: './images' },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};
