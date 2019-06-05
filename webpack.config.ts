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

interface WebpackEnv {
  production: boolean;
}

module.exports = () => {
  const entries = glob.sync('./src/**/*/index.@(ts|js)', {
    ignore: '**/node_modules/**',
  });

  // Configuration options shared across all entries.
  const shared = {
    mode: 'development',
    devServer: {
      contentBase: path.resolve(__dirname, 'static'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new Dotenv({
        path: './.env.development',
      }),
      new HtmlWebpackPlugin(),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            'file-loader?name=[name].[ext]',
            'extract-loader',
            'html-loader',
          ],
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

  const config = (entry: string) =>
    Object.assign({}, shared, {
      name: entryName(entry),
      entry: entry,
      output: {
        path: distPath(entry),
        filename: '[name].js',
      },
    });

  // Find all entry points and map them to webpack configs.
  return entries.map(config);
};
