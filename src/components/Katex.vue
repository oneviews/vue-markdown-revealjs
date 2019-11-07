<template lang="pug">
  span(v-html="html")
</template>

<script>
import katex from 'katex'

export default {
  props: ['latex', 'mode'],
  computed: {
    html() {
      const displayMode = this.mode === 'display'
      const options = { displayMode, throwOnError: false }
      return katex.renderToString(this.latex, options)
    }
  }
}
</script>