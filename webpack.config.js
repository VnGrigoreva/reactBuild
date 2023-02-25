const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PORT = process.env.PORT || 3002;
const fs = require('fs');

const moduleFileExtensions = ['wasm', 'mjs', 'js', 'jsx', 'ts', 'tsx', 'json'];

const useTypeScript = fs.existsSync(__dirname, 'tsconfig.json');

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      mode: 'local',
      getLocalIdent: getCSSModuleLocalIdent,
    },
    importLoaders: 2,
    sourceMap: false,
  },
};

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: 'global',
    importLoaders: 2,
    sourceMap: false,
  },
};

const PostCSSLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      ident: 'postcss',
      sourceMap: false,
      plugins: () => [
        autoprefixer({
          flexbox: 'no-2009',
        }),
      ],
    },
  },
};

const styleLoader = MiniCssExtractPlugin.loader;

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~styles': path.resolve(__dirname, './src/styles'),
    },
    extensions: moduleFileExtensions.map((ext) => `.${ext}`).filter((ext) => useTypeScript || !ext.includes('ts')),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [styleLoader, CSSLoader, PostCSSLoader, 'sass-loader'],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          styleLoader,
          {
            loader: 'css-modules-typescript-loader?modules',
            options: {
              mode: process.env.CI ? 'verify' : 'emit',
            },
          },
          CSSModuleLoader,
          PostCSSLoader,
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  devtool: 'source-map',
  devServer: {
    port: PORT,
    hot: true,
    open: true,
  },
  target: process.env.NODE_ENV === "development" ? ["web"] : ["browserslist"],
};
