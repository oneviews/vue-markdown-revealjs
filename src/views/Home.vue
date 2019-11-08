<template lang="pug">
  .home
    h2 SLIDES
    SlidesList
</template>

<script>
import SlidesList from '@/components/SlidesList.vue'

export default {
  components: {
    SlidesList
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