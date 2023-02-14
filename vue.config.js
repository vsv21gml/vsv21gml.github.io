const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "./wedding"),
  publicPath: '/wedding/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/styles/_var.scss";`,
      },
    },
  },
  devServer: {
    disableHostCheck: true,
  },
};
