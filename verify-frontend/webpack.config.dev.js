import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import autoprefixer from 'autoprefixer';
import props from './properties/dev.json';

export default {
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  devtool: 'cheap-module-eval-source-map', // more info:https://webpack.js.org/guides/development/#using-source-maps and https://webpack.js.org/configuration/devtool/
  entry: [
    // must be first entry to properly set public path
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    './src/index',
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /config\.js$/,
        use: [{
          loader: 'string-replace-loader',
          query: {
            multiple: [
              { search: 'HASH_CONTRACT_ADDRESS', replace: props.hashContractAddress },
            ],
          },
        }],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } }],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'application/octet-stream' } }],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'image/svg+xml' } }],
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [{ loader: 'file-loader', options: { name: '[name].[ext]' } }],
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { plugins: () => [autoprefixer], sourceMap: true } },
          { loader: 'sass-loader', options: { includePaths: [path.resolve(__dirname, 'src', 'scss')], sourceMap: true } },
        ],
      },
    ],
  },
};