const { dependencies, federatedModuleName } = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const singletonDeps = [
  'lodash',
  'axios',
  'redux',
  'react',
  'react-dom',
  'react-router-dom',
  'react-redux',
  'react-promise-middleware',
  '@patternfly/react-core',
  '@patternfly/react-charts',
  '@patternfly/react-table',
  '@patternfly/react-icons',
  '@patternfly/react-tokens',
  '@redhat-cloud-services/frontend-components',
  '@redhat-cloud-services/frontend-components-utilities',
  '@redhat-cloud-services/frontend-components-notifications'
];
const fileRegEx = /\.(png|woff|woff2|eot|ttf|svg|gif|jpe?g|png)(\?[a-z0-9=.]+)?$/;
const srcDir = path.resolve(__dirname, './src');

module.exports = (_env, argv) => {
  const isProduction = argv.mode === 'production';
  // Moved multiple entries to index.tsx in order to help speed up webpack
  const entry = path.join(srcDir, 'Bootstrap', 'index.tsx');

  return {
    stats: {
      excludeAssets: fileRegEx,
      colors: true,
      modules: false,
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    entry,
    output: {
      filename: isProduction ? '[chunkhash].bundle.js' : '[name].bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: path.join(__dirname, 'src'),
          use: [
            {
              loader: 'ts-loader',
            }
          ]
        },
        {
          test: /\.css|s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ],
        },
        {
          test: fileRegEx,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(srcDir, 'index.html'),
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[id].[contenthash].css' : '[name].css',
        chunkFilename: isProduction ? '[id].[contenthash].css' : '[id].css',
        ignoreOrder: true, // Enable to remove warnings about conflicting order
      }),
      new webpack.container.ModuleFederationPlugin({
        name: federatedModuleName,
        filename: 'remoteEntry.js',
        exposes: {
          './Panels/Topics.patternfly':
            './src/Panels/Topics/FederatedView.patternfly',
          './Panels/CreateTopic.patternfly':
            './src/Panels/Topics/FederatedCreateView.patternfly',
        },
        shared: {
          ...dependencies,
          ...singletonDeps.reduce((acc, dep) => {
            acc[dep] = { singleton: true, requiredVersion: dependencies[dep] };
            return acc;
          }, {})
        }
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, './tsconfig.json'),
        }),
      ],
    },
    devServer: {
      historyApiFallback: true,
      port: 8002,
      disableHostCheck: true
    },
  };
};