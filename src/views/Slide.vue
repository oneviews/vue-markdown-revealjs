<template lang="pug">
  .slide
    component(:is="component")
</template>

<script>
export default {
  data() {
    const slug = this.$route.path.slice(1,)
    const fm = require(`../../slides/${slug}/index.md`)
    return {
      attributes: fm.attributes,
      component: fm.vue.component
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>