const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "UbClick",
    themeColor: "#5E153A",
    display: "standalone",
   backgroundColor: "#5E153A",
   description: "Pay Less, Get More..",
    orientation: "portrait",
    msTileColor: "#000000",
    iconPaths: {
      faviconSVG: "img/icons/favicon.svg",
      favicon32: "img/icons/android/android-launchericon-48-48.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
      maskIcon: "img/icons/android/android-launchericon-192-192.png",
      msTileImage: "img/icons/android/android-launchericon-512-512.png",
    },
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // configure the workbox plugin
  },
});
