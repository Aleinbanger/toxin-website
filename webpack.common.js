const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, './source'),
  dist: path.resolve(__dirname, './dist'),
  scripts: path.resolve(__dirname, './source/scripts'),
  styles: path.resolve(__dirname, './source/styles'),
  fonts: path.resolve(__dirname, './source/fonts'),
  blocks: path.resolve(__dirname, './source/blocks'),
  pages: {
    uikit: path.resolve(__dirname, './source/pages/ui-kit'),
    website: path.resolve(__dirname, './source/pages/website'),
  },
};
const PAGES = {
  uikit: fs.readdirSync(PATHS.pages.uikit),
  website: fs.readdirSync(PATHS.pages.website),
};

module.exports = {
  resolve: {
    alias: {
      scripts: PATHS.scripts,
      styles: PATHS.styles,
      blocks: PATHS.blocks,
      node_modules: path.resolve(__dirname, './node_modules'),
    },
  },

  entry: {
    main: `${PATHS.scripts}/index.js`,
  },

  output: {
    filename: '[name].[contentHash].js',
    path: PATHS.dist,
  },

  module: {
    rules: [
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        exclude: [
          PATHS.blocks,
          PATHS.pages.uikit,
          PATHS.pages.website,
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets/fonts/',
          },
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        exclude: [
          PATHS.fonts,
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'assets/images/',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    ...PAGES.uikit.filter((page) => !/layout/i.test(page))
      .map((page) => new HtmlWebpackPlugin({
        template: `${PATHS.pages.uikit}/${page}/${page}.pug`,
        filename: `${page}.html`,
      })),
    ...PAGES.website.filter((page) => !/layout/i.test(page))
      .map((page) => new HtmlWebpackPlugin({
        template: `${PATHS.pages.website}/${page}/${page}.pug`,
        filename: `${page}.html`,
      })),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
};
