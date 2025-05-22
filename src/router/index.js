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

// 定義路由
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/echo',  component: EchoView },
      { path: '/gender',  component: GenderView },
      { path: '/lotus',  component: LotusView },
      { path: '/muu',  component: MuuView },
      { path: '/caterpillar',  component: CaterpillarView },
      { path: '/cow',  component: CowView },
      { path: '/mousecode',  component: MouseCodeView },
      { path: '/turtle',  component: TurtleView }
    ]

  }

];

// 創建路由instance
// 歷史模式選擇 https://router.vuejs.org/zh/guide/essentials/history-mode.html
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;