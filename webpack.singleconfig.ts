import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Dotenv from 'dotenv-webpack';
import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// A dash-separated name for an entry. For example: src/pages/investor/a would be
// pages-investor-a.
const entryName = (entry: string) =>
  path
    .dirname(relativeEntry(entry))
    .split('/')
    .join('-');

// The relative path of an entry, e.g. pages/investor/a
const relativeEntry = (entry: string) =>
  path.relative(path.resolve(__dirname, 'src'), entry);

// The absolute dist/output path of an entry
const distPath = (entry: string) =>
  path.dirname(path.resolve(__dirname, 'build', relativeEntry(entry)));

const toEntry = (entries: string[]) => {
  return entries.reduce((accum: {[k: string]: string}, entry: string) => {
    accum[entryName(entry)] = entry;
    return accum;
  }, {});
};

const entries = glob.sync('./src/**/*/index.@(ts|js)', {
  ignore: '**/node_modules/**',
});

// Configuration options shared across all entries.
module.exports = {
  mode: 'development',
  entry: toEntry(entries),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/index.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/index.css',
    }),
    new Dotenv({
      path: './.env.development',
    }),
    new HtmlWebpackPlugin({
      filename: '[name]/index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader'],
      },
      {
        test: /\.tsx?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader'},
          'postcss-loader',
        ],
      },
    ],
  },
};
