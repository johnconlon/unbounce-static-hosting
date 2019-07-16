import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Dotenv from "dotenv-webpack";
import glob from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";
import fs from "fs";

// A dash-separated name for an entry. For example: src/pages/investor/a would be
// pages-investor-a.
const entryName = (entry: string) =>
  path
    .dirname(relativeEntry(entry))
    .split("/")
    .join("-");

// The relative path of an entry, e.g. pages/investor/a
const relativeEntry = (entry: string) =>
  path.relative(path.resolve(__dirname, "src"), entry);

// The absolute dist/output path of an entry
const outputPath = (outputDir: string, entry: string) =>
  path.dirname(path.resolve(__dirname, outputDir, relativeEntry(entry)));

interface WebpackEnv {
  mode: "development" | "production";
}

// The HtmlWebpackPlugin has a bug where multiple configs can't reference
// the same template file :shrugging-man:
// TODO: this is pretty ridiculous, open a PR to fix HtmlWebpackPlugin
// or fork it.
const htmlTemplate = fs.readFileSync(
  path.resolve(__dirname, "src/index.html"),
  "utf8"
);

module.exports = (env: WebpackEnv) => {
  const outputDir = env.mode == "production" ? "dist" : ".build";
  const entries = glob.sync("./src/pages/**/*/index.@(tsx|ts|js)", {
    ignore: "./**/node_modules/**"
  });

  // Configuration options shared across all entries.
  const config = (entry: string) => ({
    name: entryName(entry),
    entry: entry,
    output: {
      path: outputPath(outputDir, entry),
      filename: "[name].js"
    },
    mode: env.mode,
    devServer: {
      contentBase: path.resolve(__dirname, "static")
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css"
      }),
      new Dotenv({
        path: `./.env.${env.mode}`
      }),
      new HtmlWebpackPlugin({
        templateContent: htmlTemplate,
        filename: outputPath(outputDir, entry) + "/index.html"
      })
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            "file-loader?name=[name].[ext]",
            "extract-loader",
            "html-loader"
          ]
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              allowTsInNodeModules: true
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { importLoaders: 1 } },
            "postcss-loader"
          ]
        }
      ]
    }
  });

  // Find all entry points and map them to webpack configs.
  return entries.map(config);
};
