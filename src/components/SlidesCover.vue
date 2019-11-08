<template lang="pug">
  .cover-container
    .content
      h1.title(v-if="attrs.title") {{ attrs.title }}
      h2.subtitle(v-if="attrs.subtitle") {{ attrs.subtitle }}
      p.date(v-if="attrs.date") {{ attrs.date }}
    .credit
      p.author(v-if="attrs.author") {{ attrs.author }}
      p.affiliation(v-if="attrs.affiliation") {{ attrs.affiliation }}
</template>

<script>
export default {
  data () {
    const slug = this.$route.path.slice(1)
    return {
      attrs: require(`../../slides/${slug}/index.md`).attributes,
    }
  },
}
</script>

<style lang="stylus">
.slides > section:first-child
  height 100%

.cover-container
  height 100%
  display grid
  grid-template-areas "content content" ". credit"
  grid-template-columns auto 40%
  grid-template-rows 1fr 20%
  grid-column-gap 10vmin

  .content
    grid-area content
    align-self center
    .title
      font-size 2em
      margin-bottom .4em
    .subtitle
      font-size .9em
      text-decoration none
      margin-bottom .4em
      color $accentColor
    .date
      text-align center
      font-size .8em
      color lighten($textColor, 10%)

  .credit
    width 100%
    grid-area credit
    text-align right
    font-size .9em
    color lighten($textColor, 10%)
</style>
