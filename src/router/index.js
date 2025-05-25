import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue'
import EchoView from '@/views/Echo.vue';
import GenderView from '@/views/Gender.vue';
import LotusView from '@/views/Lotus.vue';
import MuuView from '@/views/Muu.vue';
import CaterpillarView from '@/views/Caterpillar.vue';
import CowView from '@/views/Cow.vue';
import MouseCodeView from '@/views/MouseCode.vue';
import TurtleView from '@/views/Turtle.vue';
import { useUserStore } from '../stores/user'
import apiClient from '@/api/api'

// 定義路由
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: EchoView, beforeEnter: checkTaskCompleted('echo') },
      { path: 'echo', component: EchoView, beforeEnter: checkTaskCompleted('echo') },
      { path: 'gender', component: GenderView, beforeEnter: checkTaskCompleted('gender') },
      { path: 'lotus', component: LotusView, beforeEnter: checkTaskCompleted('lotus') },
      { path: 'muu', component: MuuView, beforeEnter: checkTaskCompleted('muu') },
      { path: 'caterpillar', component: CaterpillarView, beforeEnter: checkTaskCompleted('caterpillar') },
      { path: 'cow', component: CowView, beforeEnter: checkTaskCompleted('cow') },
      { path: 'mousecode', component: MouseCodeView, beforeEnter: checkTaskCompleted('mouseCode') },
      { path: 'turtle', component: TurtleView, beforeEnter: checkTaskCompleted('turtle') }
    ]
  },
  {
    path: '/task-completion',
    name: 'TaskCompletion',
    component: () => import('@/views/TaskCompletion.vue')
  },
  {
    path: '/task-completed',
    name: 'TaskCompleted',
    component: () => import('@/views/TaskCompleted.vue')
  }
];

// 創建路由instance
// 歷史模式選擇 https://router.vuejs.org/zh/guide/essentials/history-mode.html
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// 路由守衛
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 檢查 URL 參數
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('userId')
  const name = urlParams.get('name')
  const mission = urlParams.get('mission')

  // 如果有 LINE 參數
  if (userId && name && mission) {
    // 保存用戶資訊到 store
    userStore.setUserInfo(userId, name)
    
    // 根據 mission 參數重定向到對應頁面
    const missionRoutes = {
      'echo': '/echo',
      'gender': '/gender',
      'lotus': '/lotus',
      'muu': '/muu',
      'caterpillar': '/caterpillar',
      'cow': '/cow',
      'mousecode': '/mousecode',
      'turtle': '/turtle',
      'task-completed': '/task-completed'
    }

    // 只有在當前路徑不是目標路徑時才重定向
    if (missionRoutes[mission] && to.path !== missionRoutes[mission]) {
      next(missionRoutes[mission])
      return
    }
  }

  next()
})

function checkTaskCompleted(taskKey) {
  return async (to, from, next) => {
    const userStore = useUserStore()
    const userId = userStore.userId
    if (!userId) return next()
    try {
      const { data } = await apiClient.get(`/users/${userId}`)
      if (data[taskKey]) {
        next({ path: '/task-completed' })
      } else {
        next()
      }
    } catch (e) {
      next()
    }
  }
}

export default router;