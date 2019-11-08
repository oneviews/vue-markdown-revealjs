<template lang="pug">
  #app
    router-view
</template>

<style src="../node_modules/reveal.js/css/reset.css"></style>
<style src="./styles/base.styl" lang="stylus"></style>
<style lang="stylus">
.slides
	transition filter .3s

.medium-zoom--opened
	.slides
		filter blur(12px)
	.medium-zoom-overlay
		z-index 2 !important
		background transparent !important
	.medium-zoom-image
		z-index 3 !important
</style>