import { createRouter, createWebHistory } from 'vue-router';
import MuuView from '../views/muu.vue';

// 定義路由
const routes = [
  { path: '/muu',  component: MuuView },
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