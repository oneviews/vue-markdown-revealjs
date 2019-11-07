<template lang="pug">
  .slide-list
    ul
      li(v-for="(slide, key) in slides" :key="key")
        router-link(:to="`/${slide.slug}`")
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
      padding .5rem
      border-radius 0 .5rem .5rem 0
      border-left 4px solid $mainColor
      background rgba($mainColor, .05)
      &:not(:last-child)
        margin-bottom 1rem
      &:hover
        animation vib 0.4s infinite linear
        @keyframes vib
          0%
            transform rotate(.5deg)
          50%
            transform rotate(-.5deg)
          100%
            transform rotate(.5deg)
</style>