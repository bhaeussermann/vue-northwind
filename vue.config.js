module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://northwind-api.up.railway.app',
        pathRewrite: { '^/api' : '' }
      }
    }
  }
};
