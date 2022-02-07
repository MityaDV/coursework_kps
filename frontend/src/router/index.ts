import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LiveChat from '../views/LiveChat.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Chat',
    component: LiveChat,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
