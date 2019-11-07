<script>
import Katex from '../components/Katex.vue'

export default {
  props: ['slug'],
  data () {
    return {
      fm: require(`../../slides/${this.slug}/index.md`),
      templateRender: null
    }
  },
  components: { Katex },
  render (createElement) {
    return this.templateRender ? this.templateRender() : createElement("div", "Rendering");
  },
  created () {
    this.templateRender = this.fm.vue.render;
    this.$options.staticRenderFns = this.fm.vue.staticRenderFns;
  }
}
</script>