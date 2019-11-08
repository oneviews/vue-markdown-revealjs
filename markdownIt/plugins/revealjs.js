// fork and modify from https://github.com/ynohat/markdown-it-revealjs
const SEP = '---'

module.exports = md => {
  function isSep(token) {
      return token.type === 'hr' && token.markup === SEP
  }

  function cover(state) {
    return new state.Token('cover', '', 0)
  }

  function nextDivider(tokens, start) {
    for (let i = start; i < tokens.length; i++) {
      if (isSep(tokens[i])) {
        return i
      }
    }
    return -1
  }

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
      return new state.Token('slide_open', 'section', 1)
  }

  function slideClose(state) {
      return new state.Token('slide_close', 'section', -1)
  }

  function contentOpen(state) {
    var token = new state.Token('content_open', 'div', 1)
    token.block = true
    token.attrs = [
        ['class', 'slide-content']
    ]
    return token
  }

  function contentClose(state) {
      return new state.Token('content_close', 'div', -1)
  }

  md.core.ruler.push('revealjs', state => {
    let divIdx = 0
    for (let i = 0;;i++) {
      divIdx = nextDivider(state.tokens, divIdx)
      if (i === 0) {
        state.tokens.unshift(contentOpen(state))
        state.tokens.unshift(slideOpen(state))
        state.tokens.unshift(slideClose(state))
        state.tokens.unshift(cover(state))
        state.tokens.unshift(slideOpen(state))
        if (divIdx === -1) break
        divIdx += 5
      }
      if (divIdx === -1) break
      let tags = []
      tags.push(contentClose(state))
      tags.push(slideClose(state))
      tags.push(slideOpen(state))
      tags.push(contentOpen(state))
      state.tokens.splice(divIdx, 1, ...tags)
    }

    state.tokens.push(contentClose(state))
    state.tokens.push(slideClose(state))

    state.tokens.unshift(slidesOpen(state))
    state.tokens.unshift(presentationOpen(state))
    state.tokens.push(slidesClose(state))
    state.tokens.push(presentationClose(state))
  })

  md.renderer.rules.cover = () => { return '<SlidesCover />\n' }
}
