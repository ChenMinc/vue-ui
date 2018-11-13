module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://216.250.107.28:' + 7001,
        ws: true,
        changeOrigin: true
      }
    }
  }
}
