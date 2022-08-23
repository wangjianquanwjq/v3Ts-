import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import homeMap from '../views/homeMap.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: homeMap
  },
  {
    path: '/audio',
    name: 'audio',
    component: () => import(/* webpackChunkName: "about" */ '../views/audio.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
