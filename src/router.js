import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import Slides from './views/Slides.vue'
import store from './store'

Vue.use(VueRouter)

const slideRoutes = store.state.slides.map(slide => {
  return {
    path: `/${slide.slug}`,
    component: Slides,
  }
})

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ...slideRoutes,
    {
      path: '*',
      component: NotFound,
    }
  ]
})

export default router
