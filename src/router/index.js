import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue'
import MuuView from '../views/muu.vue';
import TestView from '../views/test.vue'
import CaterpillarView from '@/views/Caterpillar.vue';
import MouseCodeView from '@/views/MouseCode.vue';
import CowView from '@/views/Cow.vue';

// 定義路由
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/muu',  component: MuuView },
      { path: '/test',  component: TestView },
      { path: '/caterpillar',  component: CaterpillarView },
      { path: '/mousecode',  component: MouseCodeView },
      { path: '/cow',  component: CowView }
    ]

  }

];

// 創建路由instance
// 歷史模式選擇 https://router.vuejs.org/zh/guide/essentials/history-mode.html
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// // 設定 Navigation guards
// router.beforeEach((to) => {
//   const accessToken = useTokenStore().accessToken;

//   // 來源不是登錄頁且沒有Token一律攔截去登錄頁
//   if (to.name !== 'Login' && !accessToken) {
//     return { name: 'Login' }
//   }
// })

export default router;