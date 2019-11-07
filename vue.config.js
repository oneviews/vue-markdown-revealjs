const Mode = require('frontmatter-markdown-loader/mode')
const path = require('path')
const md = require('./markdownIt')

module.exports = {
  chainWebpack(config){
    config.module.rule('md')
      .test(/\.md$/)
      .use('frontmatter-markdown-loader')
        .loader('frontmatter-markdown-loader')
        .options({
          mode: [Mode.VUE_RENDER_FUNCTIONS],
          vue: { root: 'body' },
          markdownIt: md
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