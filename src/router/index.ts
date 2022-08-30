import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'log',
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue'),
    redirect: { name: 'login', path: "/login" },
    children: [
      {
        path: '/login',
        name: "login",
        component: () => import('../views/login.vue'),
      },
    ]
  },
  {
    path: '/homeMap',
    name: 'homeMap',
    component: () => import(/* webpackChunkName: "about" */ '../views/homeMap.vue')
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
