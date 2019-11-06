<template lang="pug">
  .slide(v-html="content")
</template>

<script>
const fm = require("front-matter")
const md = require("markdown-it")({
  html: true,
  typographer: true
})

export default {
  data() {
    console.log(this.$route)
    const file = require(`../../slides/${this.$route.path.slice(1)}/index.md`)
    const res = fm(file.default)
    return {
      attributes: res.attributes,
      content: md.render(res.body)
    }
  }
}
</script>
