<template lang="pug">
  .slide-list
    ul
      li(v-for="(slide, key) in slides" :key="key")
        a(:href="`/${slide.slug}`")
        h3 {{ slide.title }}
        p {{ slide.date }}
</template>

<script>
export default {
  computed: {
    slides() {
      return this.$store.state.slides
    }
  }
}
</script>

<style lang="stylus">
.slide-list
  ul
    li
      list-style none
      font-weight 500
      color $mainColor
      padding .5rem
      border-radius 0 .5rem .5rem 0
      border-left 4px solid $mainColor
      background rgba($mainColor, .05)
      transition background .4s
      &:not(:last-child)
        margin-bottom 1rem
      &:hover
        background rgba($accentColor, .05)
      position relative
      a
        position absolute
        top 0
        left 0
        height 100%
        width 100%
      p
        font-size .8em
</style>