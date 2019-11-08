// fork and modify from https://github.com/ynohat/markdown-it-revealjs
const SEP = '---'

module.exports = md => {
  function isSep(token) {
      return token.type === 'hr' && token.markup === SEP
  }

  function cover(state) {
    let token = new state.Token('hr', 'hr', 0)
    token.markup = SEP
    state.tokens.unshift(token)
    token = new state.Token('cover', '', 0)
    state.tokens.unshift(token)
    return true
  }

  function nextDivider(tokens, start) {
    for (let i = start; i < tokens.length; i++) {
      if (isSep(tokens[i])) {
        return i
      }
    }
    return -1
  }

  var openSlides = 0

  function presentationOpen(state) {
      var token = new state.Token('pres_open', 'section', 1)
      token.block = true
      token.attrs = [
          ['class', 'reveal']
      ]
      return token
  }

  function presentationClose(state) {
      return new state.Token('pres_close', 'section', -1)
  }

  function slidesOpen(state) {
      var token = new state.Token('slides_open', 'div', 1)
      token.block = true
      token.attrs = [
          ['class', 'slides']
      ]
      return token
  }

  function slidesClose(state) {
      return new state.Token('slides_close', 'div', -1)
  }

  function slideOpen(state) {
      openSlides++
      return new state.Token('slide_open', 'section', 1)
  }

  function slideClose(state) {
      openSlides--
      return new state.Token('slide_close', 'section', -1)
  }

  function renderOpening(tokens, idx, options, env, slf) {
    return `<${tokens[idx].tag}${slf.renderAttrs(tokens[idx])}>`
  }

  function renderClosing(tokens, idx) {
      return `</${tokens[idx].tag}>`
  }

  md.core.ruler.push('revealjs', state => {
    let divIdx = 0
    for (;;) {
      divIdx = nextDivider(state.tokens, divIdx)
      if (divIdx === -1) {
        break
      }
      if (openSlides === 0) {
        state.tokens.unshift(slideOpen(state))
        divIdx++ // we added a token at the beginning, we need to update divIdx
      }
      let tags = []
      while (openSlides > 0) {
        tags.push(slideClose(state))
      }
      tags.push(slideOpen(state))
      state.tokens.splice(divIdx, 1, ...tags)
    }

    while (openSlides > 0) {
      state.tokens.push(slideClose(state))
    }

    state.tokens.unshift(slidesOpen(state))
    state.tokens.unshift(presentationOpen(state))
    state.tokens.push(slidesClose(state))
    state.tokens.push(presentationClose(state))
  })

  md.renderer.rules.pres_open = renderOpening
  md.renderer.rules.pres_close = renderClosing
  md.renderer.rules.slide_open = renderOpening
  md.renderer.rules.slide_close = renderClosing

  md.core.ruler.after('inline', 'cover', cover)
  md.renderer.rules.cover = () => { return '<SlidesCover />\n' }
}
