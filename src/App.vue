<template lang="pug">
  #app
    router-view
</template>

<style src="../node_modules/reveal.js/css/reset.css"></style>
<style src="./styles/base.styl" lang="stylus"></style>
<style lang="stylus">
.fade-enter
	transform translate(-100px, 0)
	opacity 0
.fade-enter-to
	opacity 1
.fade-enter-active
	transition all 1s 0s ease
.fade-leave
	transform translate(0, 0)
	opacity 1
.fade-leave-to
	transform translate(100px, 0)
	opacity 0
.fade-leave-active
	transition all .5s 0s ease
</style>