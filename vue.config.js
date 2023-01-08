const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "UbClick",
    themeColor: "#00DC48",
    msTileColor: "#000000",
    iconPaths: {
      faviconSVG: "img/icons/favicon.png",
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
      maskIcon: "img/icons/logo.png",
      msTileImage: "img/icons/logo.png",
    },
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // configure the workbox plugin
  },
});
