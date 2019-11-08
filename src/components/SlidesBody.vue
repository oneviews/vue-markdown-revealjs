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
      margin: 0,
      center: false,
      hash: true,
      slideNumber: false,
      controls: false,
      hideCursorTime: 3000,
      transition: 'fade',
    })
    if (this.print) {
      require('reveal.js/css/print/pdf.css')
      require('../styles/print.css')
    } else {
      require('../styles/presentation.css')
    }
    Reveal.addEventListener('ready', () => {
      const sections = document.querySelectorAll('.slides section')
      console.log(sections.length)
      let page = 1
      let section = ''
      sections.forEach(el => {
        if (el.firstElementChild.className !== 'cover-container') {
          const firstEl = el.firstElementChild.firstElementChild
          if (firstEl.tagName === 'H2') {
            section = firstEl.innerHTML
          }
          const footer = document.createElement('div')
          footer.className = 'footer'
          const currentSection = document.createElement('div')
          currentSection.className = 'current-section'
          const sectionName = document.createElement('p')
          sectionName.className = 'section-name'
          sectionName.innerHTML = section
          currentSection.append(sectionName)
          const slideName = document.createElement('p')
          slideName.className = 'slide-name'
          slideName.innerHTML = this.fm.attributes.title
          currentSection.append(slideName)
          footer.append(currentSection)
          const pageNumber = document.createElement('span')
          pageNumber.className = 'page-number'
          pageNumber.innerHTML = `${page} / ${sections.length}`
          footer.append(pageNumber)
          el.appendChild(footer)
        }
        page++
      })
    })
  },
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
.footer
  position absolute
  padding 0 1em 0 1em
  height 2em
  width calc(100% - 2em)
  bottom 0
  left 50%
  transform translateX(-50%)
  border-top 1px dotted $mainColor
  // background rgba($accentColor, 0.2)
  .current-section
    position absolute
    padding inherit
    top 50%
    left 50%
    transform translate(-50%, -50%)
    text-align center
    height 2em
    .section-name
      line-height 36px
      font-size .6em
      word-wrap none
      color $mainColor
      text-decoration underline $accentColor solid
      text-underline-position under
    .slide-name
      line-height 36px
      font-size .6em
      word-wrap none
      font-weight bold
      color $mainColor
  .page-number
    position absolute
    padding inherit
    top 50%
    right 0
    transform translateY(-50%)
    font-size 0.75em
    color lighten($textColor, 50%)
</style>