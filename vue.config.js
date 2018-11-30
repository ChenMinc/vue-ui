module.exports = {
  assetsDir: 'public',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.199.108:' + 7001,
        ws: true,
        changeOrigin: true
      }
    }
  }
}
