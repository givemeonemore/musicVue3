/*
 * @Author: zhouran
 * @Date: 2022-07-19 09:43:50
 * @LastEditors: zhouran
 * @LastEditTime: 2022-07-19 16:20:45
 * @Description:
 */
import { Router, createRouter, createWebHashHistory } from 'vue-router';
import findMusicRouter from './modules/findMusic';
import myMusic from './modules/myMusic';
import friend from './modules/friend';
import product from './modules/product';
import musician from './modules/musician';
import download from './modules/download';
import userInfo from './modules/userInfo';

const routerModules = [
  {
    path: '/',
    name: '',
    component: () => import('@/views'),
    redirect: '/findmusic/recommend',
    meta: {
      icon: 'el-icon-menu',
      title: 'message.hscomponents',
      showLink: true,
      savedPosition: true,
      rank: 4,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/HelloWorld.vue'),
    redirect: '',
    meta: {
      icon: 'el-icon-menu',
      title: 'message.hscomponents',
      showLink: true,
      savedPosition: true,
      rank: 4,
    },
  },
  findMusicRouter,
  { ...myMusic },
  friend,
  product,
  musician,
  download,
  userInfo,
];

const router: Router = createRouter({
  // vue 3 中以往的 mode 方式被取消，转而使用以下方式代替：
  // "history": createWebHistory()
  // "hash": createWebHashHistory()
  // "abstract": createMemoryHistory()
  history: createWebHashHistory(),
  routes: routerModules,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number = document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  },
});

export default router;
