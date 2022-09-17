module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://northwind-api.onrender.com',
        pathRewrite: { '^/api' : '' }
      }
    }
  }
};
