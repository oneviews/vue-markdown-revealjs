import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Slide from './views/Slide.vue'
import NotFound from './views/NotFound.vue'

Vue.use(VueRouter)

const files = require.context('../slides/', true, /index\.md$/)

const slideRoutes = files.keys().map(key => {
  return {
    path: `/${key.split('/').slice(-2, -1)[0]}`,
    component: Slide
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
