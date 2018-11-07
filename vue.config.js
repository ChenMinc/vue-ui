module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.199.108',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
