const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, './source'),
  dist: path.resolve(__dirname, './dist'),
  scripts: path.resolve(__dirname, './source/scripts'),
  fonts: path.resolve(__dirname, './source/fonts'),
  blocks: path.resolve(__dirname, './source/blocks'),
  pages: {
    website: path.resolve(__dirname, './source/pages/website'),
    uikit: path.resolve(__dirname, './source/pages/ui-kit'),
  },
};
const PAGES = {
  website: fs.readdirSync(PATHS.pages.website),
  uikit: fs.readdirSync(PATHS.pages.uikit),
};

console.log(PAGES);

module.exports = {
  resolve: {
    alias: {
      scripts: PATHS.scripts,
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
    ],
  },

  plugins: [
    // ...PAGES.website.map((page) => new HtmlWebpackPlugin({
    //   template: `${PATHS.pages.website}/${page}.pug`,
    //   filename: `${page}.html`,
    // })),
    new HtmlWebpackPlugin({
      template: `${PATHS.pages.website}/search-room.pug`,
      filename: 'search-room.html',
    }),
  ],
};
