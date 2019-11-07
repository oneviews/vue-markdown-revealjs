<template lang="pug">
  .home
    h2 SLIDES
    SlideList
</template>

<script>
import SlideList from '@/components/SlideList.vue'

export default {
  components: {
    SlideList
  }
}
</script>

<style lang="stylus">
.home
  padding 2rem
  h2
    font-size 1.4rem
    font-weight bold
    margin-bottom 1rem
</style>