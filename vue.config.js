const path = require('path')

const resolve = function(dir){
  return path.join(__dirname,dir)
}

module.exports = {
  publicPath: '/vue-learn',
  devServer: {
    port: 8090,
    open: true
  },
  chainWebpack(config){
    // 1 默认配置排除icons目录
    config.module.rule('svg')
      .exclude.add(resolve('./src/assets/svg'))

    // 2 新增一个规则
    config.module.rule('icons')
      .test(/.svg$/)
      .include.add(resolve('./src/assets/svg')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({symbolId: 'icon-[name]'})
  }

}