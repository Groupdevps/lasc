const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 8080,
    /*proxy: {
        '^/api': {
          target: 'http://52.90.237.148:4000',
          changeOrigin: true
        },
      }*/
  }
})
