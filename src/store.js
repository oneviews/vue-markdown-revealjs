import Vue from 'vue'
import Vuex from 'vuex'
import fm from 'front-matter'
import moment from 'moment'

Vue.use(Vuex)

const files = require.context('../slides/', true, /index\.md$/)
const slides = files.keys().map(key => {
  const slide = fm(files(key).default).attributes
  const slug = key.split('/').slice(-2, -1)[0]
  slide.slug = slug
  return slide
}).sort((a, b) => {
  return moment(b.date).diff(moment(a.date))
})

export default new Vuex.Store({
  state: {
    slides
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
