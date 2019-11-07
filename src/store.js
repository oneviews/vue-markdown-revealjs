import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

const files = require.context('../slides/', true, /index\.md$/)
const slides = files.keys().map(key => {
  const slide = files(key).attributes
  const slug = key.split('/').slice(-2, -1)[0]
  slide.slug = slug
  return slide
}).sort((a, b) => {
  return moment(b.date, "YYYY/MM/DD").diff(moment(a.date, "YYYY/MM/DD"))
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
