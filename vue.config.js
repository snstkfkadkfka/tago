const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  chainWebpack: config => {
    
    config.plugin('define').tap(definitions => {
      definitions[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = JSON.stringify(false)
      return definitions
    })
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://bikeapp.tashu.or.kr:50041',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/assets/styles/variables.scss";
        @import "@/assets/styles/functions.scss";
        
        `,
      }
    }
  },
  publicPath: "/tago/"
})
