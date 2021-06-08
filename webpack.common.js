const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, './source'),
  build: path.resolve(__dirname, './build'),
  fonts: path.resolve(__dirname, './source/fonts'),
  favicons: path.resolve(__dirname, './source/favicons'),
  blocks: path.resolve(__dirname, './source/blocks'),
  pages: {
    uikit: path.resolve(__dirname, './source/pages/ui-kit'),
    website: path.resolve(__dirname, './source/pages/website'),
  },
};
const pages = {
  uikit: fs.readdirSync(paths.pages.uikit),
  website: fs.readdirSync(paths.pages.website),
};

module.exports = {
  context: paths.src,

  resolve: {
    extensions: ['.js'],
    modules: [paths.src, 'node_modules'],
  },

  entry: {
    main: './scripts/index.js',
  },

  output: {
    filename: 'js/[name].[contentHash].js',
    path: paths.build,
  },

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              basedir: paths.src,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        include: [
          paths.fonts,
          /node_modules/,
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[contentHash].[ext]',
            outputPath: 'assets/fonts/',
          },
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        include: [
          paths.blocks,
          paths.pages.uikit,
          paths.pages.website,
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[contentHash].[ext]',
            outputPath: 'assets/images/',
          },
        },
      },
    ],
  },

  plugins: [
    ...pages.uikit.filter((page) => !/layout/i.test(page))
      .map((page) => new HtmlWebpackPlugin({
        template: `${paths.pages.uikit}/${page}/${page}.pug`,
        filename: `${page}.html`,
      })),
    ...pages.website.filter((page) => !/layout/i.test(page))
      .map((page) => new HtmlWebpackPlugin({
        template: `${paths.pages.website}/${page}/${page}.pug`,
        filename: `${page}.html`,
      })),
    new CopyPlugin({
      patterns: [
        { from: paths.favicons, to: 'assets/favicons/' },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
};
