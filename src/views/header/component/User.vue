<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Dropdown, Menu, Avatar } from 'ant-design-vue';
import { UserOutlined, MailOutlined, CrownOutlined } from '@ant-design/icons-vue';
import { useUserInfoStore } from '@/stores/user';
import { logout } from '@/api/login';
import Login from '@/views/login';

const router = useRouter();
const userInfoStore = useUserInfoStore();
const userInfo = userInfoStore.getUserInfo;
const props = defineProps<{ haveUserInfo }>();

const userAvator = userInfo?.profile?.avatarUrl;
console.log();

// 添加用户信息
const handleAddUserInfo = () => {
  userInfoStore.addUserInfo({
    avatarUrl: 'http://p1.music.126.net/i0qi6mibX8gq2SaLF1bYbA==/2002210674180198.jpg',
  });
};

// 路由跳转操作
const handleRouteChange = (routePath) => {
  router.push(routePath);
};

// 退出操作
const handleQuite = () => {
  logout();
  userInfoStore.removeUserInfo();
};

const handleMenuClick = (item) => {
  if (item.fn) {
    item.fn();
  }
};
const userList = [
  {
    icon: UserOutlined,
    label: '复习资料',
    fn: () => handleRouteChange('/user/material'),
  },
  {
    icon: UserOutlined,
    label: '我的主页',
    // fn: () => handleRouteChange(),
  },
  {
    icon: MailOutlined,
    label: '我的消息',
  },
  {
    icon: CrownOutlined,
    label: '我的等级',
  },
  {
    icon: UserOutlined,
    label: 'VIP主页',
  },
  {
    icon: UserOutlined,
    label: '个人设置',
  },
  {
    icon: UserOutlined,
    label: '实名认证',
    fn: handleAddUserInfo,
  },
  {
    icon: UserOutlined,
    label: '退出',
    fn: handleQuite,
  },
];

// login
const loginRef = ref(null);

const handleLogin = () => {
  loginRef.value.login();
  console.log(loginRef, loginRef.value.visible, 'loginRef');
};
</script>

<template>
  <Dropdown v-if="props.haveUserInfo" class="drop-down">
    <Avatar :src="userAvator"></Avatar>
    <template #overlay>
      <Menu>
        <Menu.Item v-for="item in userList" :key="item.label" @click="handleMenuClick(item)">
          <component :is="item.icon"></component>
          {{ item.label }}
        </Menu.Item>
      </Menu>
    </template>
  </Dropdown>
  <span v-else class="login-label" @click="handleLogin">登录</span>

  <Login ref="loginRef"></Login>
</template>

<style scoped lang="scss">
.drop-down {
  cursor: pointer;
}

.login-label {
  color: #666;
  cursor: pointer;
}

.login:hover {
  color: #787878;
  text-decoration: underline;
}
</style>
