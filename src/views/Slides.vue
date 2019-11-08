<template lang="pug">
  .slides-container
    .buttons
      a.button(href="/")
        i.fas.fa-home
      a.button(:href="url")
        i.fas.fa-desktop(v-if="print")
        i.fas.fa-print(v-else)
      .button(@click="toggleBorder")
        i.far.fa-square
      .button(@click="toggleAspect")
        | {{ aspect }}
    SlidesBody(:print="print" :aspect="aspect" :class="{border: border}")
</template>

<script>
import SlidesBody from '../components/SlidesBody.vue'

export default {
  components: { SlidesBody },
  data() {
    return {
      border: false,
      aspect: 'aspect' in this.$route.query ? this.$route.query['aspect'] : '4:3',
    }
  },
  computed: {
    print() {
      return 'print-pdf' in this.$route.query
    },
    url() {
      return this.print ? this.$route.path : `${this.$route.path}?print-pdf&aspect=${this.aspect}`
    },
  },
  methods: {
    toggleBorder() {
      this.border = !this.border
    },
    toggleAspect() {
      this.aspect = this.aspect === '4:3' ? '16:10' : this.aspect === '16:10' ? '16:9' : '4:3'
    }
  },
}
</script>

<style lang="stylus">
.slides-container
  .buttons
    position fixed
    top 0
    left 0
    z-index 5
    user-select none
    .button
      display inline-block
      margin 0 .5rem
      cursor pointer
      color $accentColor
  .slides-body
    @import '../styles/slide.styl'

@media print
  .slides-container
    .buttons
      display none
</style>