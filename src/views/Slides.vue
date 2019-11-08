<template lang="pug">
  .slides-container
    .buttons
      a.button(href="/")
        | Home
      .button(@click="printSlide")
        | Print
      .button(@click="toggleBorder")
        | Border
      .button(@click="toggleAspect")
        | {{ aspect }}
    SlidesBody(:print="print" :aspect="aspect" :class="{border: border}")
    iframe.printer-window(v-if="!print" style="{visibility: hidden, height: 0, width: 0}")
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
  },
  methods: {
    toggleBorder() {
      this.border = !this.border
    },
    toggleAspect() {
      this.aspect = this.aspect === '4:3' ? '16:10' : this.aspect === '16:10' ? '16:9' : '4:3'
    },
    printSlide() {
      document.querySelector('.printer-window').src = `${window.origin}${window.location.pathname}?print-pdf&aspect=${this.aspect}`
    },
  },
  mounted() {
    if (!this.print) {
      const el = document.querySelector('.printer-window')
      el.onload = () => {
        el.contentWindow.print()
      }
    }
  }
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