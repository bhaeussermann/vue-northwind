module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://northwind-express-api.herokuapp.com',
        pathRewrite: { '^/api' : '' }
      }
    }
  }
};
