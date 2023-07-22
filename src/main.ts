import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { addDirectives } from '@/directives';
import { createPinia } from 'pinia';
import { useUserInfoStore } from '@/stores/user';
import { getLoginStatus } from '@/api/login';
// 参考 https://www.antdv.com/docs/vue/introduce-cn
import 'ant-design-vue/dist/antd.css'; // antd 样式，按需加载的代码在 vite.config.js
// // 导入公共样式
// import '@/styles/index.scss';

// 路由
const app = createApp(App);
app.use(router);

// pinia
const store = createPinia();
app.use(store);

// 添加自定义指令
addDirectives(app);

// 获取用户信息
const userInfoStore = useUserInfoStore();
const getLogin = async () => {
  const { data }: LoginStatusInterface = await getLoginStatus();
  if (data?.code === 200) {
    userInfoStore.addUserInfo(data);
    app.mount('#app');
  }
};
getLogin();
