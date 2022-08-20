module.exports = {
  lintOnSave: false,
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'), // This line must in sass option
      },
    },
  }
};
