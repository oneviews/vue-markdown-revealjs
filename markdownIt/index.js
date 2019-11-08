const markdownIt = require('markdown-it')

const Prism = require('prismjs')
require('prismjs/components/prism-bash')
require('prismjs/components/prism-javascript')
require('prismjs/components/prism-julia')
require('prismjs/components/prism-python')

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (code, lang) => {
    if (lang && Prism.languages[lang]) {
      try {
        return `<pre class="language-${lang}"><code>${Prism.highlight(code, Prism.languages[lang], lang)}</code></pre>`
      } catch (e){
        return false
      }
    }
    return `<pre class="language-plain"><code>${md.utils.escapeHtml(code)}</code></pre>`
  }
})

md.use(require('markdown-it-emoji'))
md.use(require('markdown-it-sub'))
md.use(require('markdown-it-sup'))
md.use(require('markdown-it-mark'))
md.use(require('markdown-it-underline'))
md.use(require('markdown-it-imsize'))
md.use(require('markdown-it-attrs'), {
  leftDelimiter: '{{',
  rightDelimiter: '}}'
})
md.use(require('./plugins/katex'))
md.use(require('./plugins/revealjs'))

const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  if (tokens[idx].attrs[0][1].match('http')) {
    const tIdx = tokens[idx].attrIndex('target')
    if (tIdx < 0) {
      tokens[idx].attrPush(['target', '_blank'])
    } else {
      tokens[idx].attrs[tIdx][1] = '_blank'
    }

    const rIdx = tokens[idx].attrIndex('rel')
    if (rIdx < 0) {
      tokens[idx].attrPush(['rel', 'noopener noreferrer'])
    } else {
      tokens[idx].attrs[rIdx][1] = 'noopener noreferrer'
    }
  }
  return defaultRender(tokens, idx, options, env, self)
}

md.renderer.rules.emoji = (token, idx) => {
  return `<span class="emoji emoji_${token[idx].markup}">${token[idx].content}</span>`
}

module.exports = md