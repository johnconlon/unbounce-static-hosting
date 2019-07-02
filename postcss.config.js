module.exports = {
  plugins: [
    require("postcss-preset-env")({
      importFrom: "src/node_modules/sundaelib/css/globals.css"
    }),
    require("postcss-color-mod-function"),
  ],
}
