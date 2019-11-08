<script>
import SlidesCover from './SlidesCover.vue'
import Katex from './Katex.vue'
import Reveal from 'reveal.js/js/reveal'
import 'reveal.js/css/reveal.css'

export default {
  props: ['print', 'aspect'],
  components: { SlidesCover, Katex },
  data () {
    const slug = this.$route.path.slice(1)
    return {
      fm: require(`../../slides/${slug}/index.md`),
      templateRender: null,
      height: 1080,
      width: { '4:3': 1440, '16:10': 1728, '16:9': 1920 },
      padding: 10,
    }
  },
  render (createElement) {
    return this.templateRender ? this.templateRender() : createElement('div', 'Rendering')
  },
  watch: {
    aspect() {
      Reveal.configure({
        width: this.width[this.aspect],
        height: this.height,
      })
    }
  },
  created () {
    this.templateRender = this.fm.vue.render
    this.$options.staticRenderFns = this.fm.vue.staticRenderFns
    document.title = this.fm.attributes.title
  },
  mounted() {
    Reveal.initialize({
      width: this.width[this.aspect],
      height: this.height,
      margin: 0.1,
      hash: true,
      slideNumber: this.print ? false : 'c/t',
      controls: false,
      hideCursorTime: 3000,
      transition: 'fade',
    })
    if (this.print) require('reveal.js/css/print/pdf.css')
  }
}
</script>

<style lang="stylus">
.reveal
  height 100vh
  font-size 36px
  .slides
    text-align left
    section
      box-sizing border-box
  .progress
    height 5px
    color $mainColor
.slides-body.border
  .reveal
    .slides
      outline 4px solid $accentColor
</style>