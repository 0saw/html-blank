const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: [
    './src/index.js',
    './src/styles/index.scss'
  ],
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[path][name].[ext]',
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !prod,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.ejs')
    }),
    new MiniCssExtractPlugin({}),
  ],
  mode,
  devtool: prod ? false: 'source-map',
  devServer: {
    contentBase: 'docs',
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
