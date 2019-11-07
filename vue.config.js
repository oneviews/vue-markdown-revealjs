const Mode = require('frontmatter-markdown-loader/mode')
const path = require('path')

module.exports = {
  chainWebpack(config){
    config.module.rule('md')
      .test(/\.md$/)
      .use('frontmatter-markdown-loader')
        .loader('frontmatter-markdown-loader')
        .options({
          mode: [Mode.VUE_COMPONENT],
          vue: {
            root: 'body'
          }
        })
      .end()
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  }
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/palette.styl'),
      ],
    })
}