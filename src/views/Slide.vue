<template lang="pug">
  .slide
    SlideBody(:slug="slug")
</template>

<script>
import SlideBody from '../components/SlideBody.vue'

export default {
  components: { SlideBody },
  data() {
    return {
      slug: this.$route.path.slice(1,)
    }
  }
}
</script>

<style lang="stylus">
.slide
  .body
    @import '../styles/slide.styl'
    // font-size 36px
</style>