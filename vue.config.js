module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://northwind-api-production.up.railway.app',
        pathRewrite: { '^/api' : '' }
      }
    }
  }
};
