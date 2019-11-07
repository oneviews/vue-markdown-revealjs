function mathInline(state) {
  const start = state.pos
  if (state.src[state.pos] !== '$') {
    return false
  }
  state.pos += 1

  let innerText
  while (state.pos < state.posMax) {
    if (state.src[state.pos] === '$' && state.src[state.pos - 1] !== '/') {
      innerText = state.src.slice(start + 1, state.pos)
      state.pos += 1
      break
    }
    state.pos += 1
  }

  if (!innerText || innerText.length < 1) {
    state.pos = start
    return false
  }

  const token = state.push('math_inline', 'math', 1)
  token.content = innerText

  return true
}

function mathBlock(state, start, end, silent) {
  let pos = state.bMarks[start] + state.tShift[start]
  let max = state.eMarks[start]
  let found = false

  if (pos + 2 > max) {
    return false
  }
  if (state.src.slice(pos, pos + 2) !== '$$') {
    return false
  }

  pos += 2
  let firstLine = state.src.slice(pos, max)

  if (silent) {
    return true
  }
  if (firstLine.trim().slice(-2) === '$$') {
    firstLine = firstLine.trim().slice(0, -2)
    found = true
  }

  let lastPos
  let lastLine
  let next
  for (next = start; !found; ) {
    next += 1
    if (next >= end) {
      break
    }

    pos = state.bMarks[next] + state.tShift[next]
    max = state.eMarks[next]

    if (pos < max && state.tShift[next] < state.blkIndent) {
      break
    }

    if (
      state.src
        .slice(pos, max)
        .trim()
        .slice(-2) === '$$'
    ) {
      lastPos = state.src.slice(0, max).lastIndexOf('$$')
      lastLine = state.src.slice(pos, lastPos)
      found = true
    }
  }

  state.line = next + 1

  const token = state.push('math_block', 'math', 0)
  token.block = true
  token.content =
    (firstLine && firstLine.trim() ? `${firstLine}\n` : '') +
    state.getLines(start + 1, next, state.tShift[start], true) +
    (lastLine && lastLine.trim() ? lastLine : '')
  token.map = [start, state.line]
  return true
}

module.exports = md => {
  const katexInline = latex => {
    return `<Katex latex="${latex}" mode="inline" />`
  }

  const katexBlock = latex => {
    return `<Katex latex="${latex}" mode="display" />`
  }

  md.inline.ruler.after('escape', 'math_inline', mathInline)
  md.block.ruler.after('blockquote', 'math_block', mathBlock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })
  md.renderer.rules.math_inline = (tokens, idx) => {
    return katexInline(tokens[idx].content)
  }
  md.renderer.rules.math_block = (tokens, idx) => {
    return `${katexBlock(tokens[idx].content)}\n`
  }
}
