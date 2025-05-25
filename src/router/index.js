import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue'
import EchoView from '@/views/Echo.vue';
import GenderView from '@/views/Gender.vue';
import LotusView from '@/views/Lotus.vue';
import MuuView from '../views/Muu.vue';
import CaterpillarView from '@/views/Caterpillar.vue';
import CowView from '@/views/Cow.vue';
import MouseCodeView from '@/views/MouseCode.vue';
import TurtleView from '@/views/Turtle.vue';
import { useUserStore } from '../stores/user'

// 定義路由
const routes = [
  {
    path: '/',
    redirect: '/echo'
  },
  {
    path: '/echo',
    component: EchoView
  },
  {
    path: '/gender',
    component: GenderView
  },
  {
    path: '/lotus',
    component: LotusView
  },
  {
    path: '/muu',
    component: MuuView
  },
  {
    path: '/caterpillar',
    component: CaterpillarView
  },
  {
    path: '/cow',
    component: CowView
  },
  {
    path: '/mousecode',
    component: MouseCodeView
  },
  {
    path: '/turtle',
    component: TurtleView
  }
];

// 創建路由instance
// 歷史模式選擇 https://router.vuejs.org/zh/guide/essentials/history-mode.html
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 路由守衛
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 檢查 URL 參數
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('userId')
  const name = urlParams.get('name')
  const mission = urlParams.get('mission')

  // 如果有 LINE 參數，且不是已經重定向過的路由
  if (userId && name && mission && !to.query.redirected) {
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
      'turtle': '/turtle'
    }

    if (missionRoutes[mission]) {
      // 添加 redirected 標記到查詢參數
      next({
        path: missionRoutes[mission],
        query: { ...to.query, redirected: 'true' }
      })
      return
    }
  }

  next()
})

export default router;