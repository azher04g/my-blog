import { createRouter, createWebHistory } from 'vue-router'

// 引入页面组件
import Home from '@/views/Home.vue'
import Study from '@/views/Study.vue'
import Entertainment from '@/views/Entertainment.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/study', component: Study },
  { path: '/entertainment', component: Entertainment },
  { path: '/profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router