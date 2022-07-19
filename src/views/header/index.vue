<script setup lang="ts">
import WYYYY from '@/assets/svg/wangyiyunyinyue.svg';
import { useRouter, RouteLocationMatched } from 'vue-router';
import { Input } from 'ant-design-vue';
import Search from '@/assets/svg/search.svg';
import User from './component/User.vue';
import { getSong } from '@/api/findMusic';
import { useUserInfoStore } from '@/stores/user';

// 获取当前登录的用户信息
const userInfoStore = useUserInfoStore();

// 获取当前 router 信息
const router = useRouter();

const data = reactive({
  menu: [] as any,
  subMenu: [] as any,
});

// 菜单点击
const handleMenuClick = (route: RouteLocationMatched): void => {
  if (route.path) {
    router.push(route.path);
  }
};

// 路由切换
const routerChange = () => {
  const menuRouter = router.getRoutes();
  // 获取第一级目录的数据
  data.menu = menuRouter.filter((route) => {
    if (route.meta && route.meta.level && route.meta.level === 'firstMenu') {
      return route;
    }
  });
  if (router.currentRoute.value.matched.length > 1) {
    const redirectedFrom = router.currentRoute.value.matched[0].path;
    // 获取第二级目录的数据
    data.subMenu = menuRouter.filter((route) => {
      if (route.meta && route.meta.level && route.meta.level === 'secondMenu' && route.path.includes(redirectedFrom)) {
        return route;
      }
    });
  } else {
    data.subMenu = [];
  }
};

// 输入框查询
const handleSearch = async (e) => {
  const { value } = e.target;
  if (value) {
    await getSong(value);
  }
};

let haveUserInfo = ref(false);
const userInfo = userInfoStore.getUserInfo;
if (userInfo.profile) {
  haveUserInfo.value = true;
}

const headerMenuRef = ref(null);
const subMenuStyle = reactive({} as any); // 引入 HTMLAttributes 属性后，TS校验报错
const getSubStyle = () => {
  if (headerMenuRef.value) {
    subMenuStyle.left = `${headerMenuRef.value.offsetLeft}px`;
    // subMenuStyle.setProperty('left', `${headerMenuRef.value.clientWidth}px`);
  }
};

watch(
  () => {
    return router.currentRoute.value.fullPath;
  },
  () => {
    // console.log('1212121212');
    routerChange();
  },
);

watch(userInfoStore.userInfo, () => {
  if (!userInfoStore.userInfo || !Object.keys(userInfoStore.userInfo).length) {
    haveUserInfo.value = false;
  } else {
    haveUserInfo.value = true;
  }
});

// 初始化时，先显示当前路由的数据
routerChange();
onMounted(() => {
  getSubStyle();
  document.addEventListener('resize', () => {});
});
</script>

<template>
  <div class="header-content">
    <div class="header">
      <span class="header-title">
        <WYYYY class="header-title-icon" />
        <span class="header-title-label">网易云音乐</span>
      </span>
      <ul ref="headerMenuRef" class="header-menu">
        <li
          v-for="route in data.menu"
          :key="(route.meta.cnTitle as string)"
          class="header-menu-item"
          :class="{ active: router.currentRoute.value.fullPath.includes(route.path) }"
          @click="handleMenuClick(route)"
        >
          <em class="header-menu-item-label">{{ route.meta.cnTitle }}</em>
          <sub v-if="router.currentRoute.value.fullPath.includes(route.path)" class="header-menu-item-cor"></sub>
        </li>
      </ul>
      <span class="header-search">
        <Input placeholder="音乐/视频/电台/用户" @press-enter="handleSearch">
          <template #prefix>
            <Search class="header-search-prefix" />
          </template>
        </Input>
      </span>
      <span class="header-creator-center">创作者中心</span>
      <User :have-user-info="haveUserInfo" />
    </div>
    <div :class="data.subMenu.length ? 'sub' : 'sub-no-data'">
      <ul class="sub-menu" :style="subMenuStyle">
        <li
          v-for="route in data.subMenu || []"
          :key="(route.meta.cnTitle as string)"
          class="sub-menu-item"
          :class="{ 'sub-menu-item-active': router.currentRoute.value.fullPath.includes(route.path) }"
          @click="handleMenuClick(route)"
        >
          {{ route.meta.cnTitle }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-content {
  width: 100%;
}

.header {
  flex: 1 1 100%;
  height: 70px;
  background: #242424;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: center;

  &-title {
    float: left;
    font-size: 22px;
    color: #fff;
    display: flex;
    align-items: center;
    margin-right: 20px;

    &-icon {
      width: 30px;
      height: 30px;
      padding-right: 5px;
    }

    &-label {
      white-space: nowrap;
    }
  }

  &-menu {
    margin-bottom: 0;
    height: 100%;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    // max-width: 600px;
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;

    &-item {
      padding: 0 19px;
      height: 100%;
      cursor: pointer;
      float: left;
      color: #ccc;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &-label {
        font-style: normal;
        text-align: left;
        font-size: 14px;
      }

      &-cor {
        display: flex;
        justify-content: center;
        border: 8px solid transparent;
        border-bottom-color: #c20c0c;
        height: 5px;
        width: 7px;
        position: absolute;
        bottom: 0;
        z-index: 999;
      }
    }

    &-item:hover {
      background: #000;
      text-decoration: none;
      color: #fff;
    }
  }

  &-search {
    ::v-deep(.ant-input-affix-wrapper) {
      border-radius: 32px;
      width: 158px;
      height: 32px;
    }

    ::v-deep(.ant-input-prefix) {
      width: 20px;
    }

    ::v-deep(.ant-input) {
      font-size: 12px;
    }
  }

  &-creator-center {
    height: 32px;
    cursor: pointer;
    width: 100px;
    border-radius: 20px;
    margin: 0 12px;
    border: 1px solid #4f4f4f;
    color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    &:hover {
      color: #fff;
      text-decoration: none;
      border: 1px solid #ccc;
    }
  }
}

.active {
  background: #000;
  text-decoration: none;
  color: #fff;
}

.sub {
  background-color: $color-sub-menu;
  padding: 2px 0;
  margin-bottom: 0;
  width: 100%;
  height: 34px;
  color: #fff;
  // max-width: 600px;
  display: flex;
  align-items: center;
  position: relative;

  &-menu {
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;
    position: absolute;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;

    &-item {
      padding: 0 19px;
      cursor: pointer;
      border-radius: 20px;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    &-item-active {
      background-color: $color-sub-menu-active;
    }
  }
}

.sub-no-data {
  background-color: $color-sub-menu;
  padding: 2px 0;
  margin-bottom: 0;
  width: 100%;
  // height: 34px;
  color: #fff;
  // max-width: 600px;
  display: flex;
  align-items: center;
  position: relative;
}
</style>
