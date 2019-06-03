const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack")
const glob = require("glob")

// A dash-separated name for an entry. For example: src/pages/investor/a would be
// pages-investor-a.
const entryName = entry => path.dirname(relativeEntry(entry)).split("/").join("-")

// The relative path of an entry, e.g. pages/investor/a
const relativeEntry = entry => path.relative(path.resolve(__dirname, "src"), entry)

// The absolute dist/output path of an entry
const distPath = entry => path.dirname(path.resolve(__dirname, "dist", relativeEntry(entry)))

// Configuration options shared across all entries.
const shared = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new Dotenv({
      path: './.env.development'
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          "postcss-loader"
        ]
      }
    ]
  }
};

const config = entry =>
  Object.assign(
    {},
    shared,
    {
      name: entryName(entry),
      entry: entry,
      output: {
        path: distPath(entry),
        filename: "[name].js"
      },
    }
  )

// Find all entry points and map them to webpack configs.
const entries = glob.sync("./src/**/*/index.@(ts|js)", { ignore: "**/node_modules/**" })
module.exports = entries.map(config)

