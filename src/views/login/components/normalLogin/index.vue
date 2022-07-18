<script setup lang="ts">
import { Checkbox, Button } from 'ant-design-vue';
import WEIXIN from '@/assets/svg/weixin.svg';
import QQ from '@/assets/svg/qq.svg';
import WEIBO from '@/assets/svg/weibo.svg';
import WANGYI from '@/assets/svg/wangyi.svg';

const emit = defineEmits<{
  (e: 'changeLoginMethod'): void;
}>();

const checkBoxValue = ref(false);
const loginMethod = [
  {
    label: '微信登录',
    comp: WEIXIN,
  },
  {
    label: 'QQ登录',
    comp: QQ,
  },
  {
    label: '微博登录',
    comp: WEIBO,
  },
  {
    label: '网易邮箱账号登录',
    comp: WANGYI,
  },
];

const rules = [
  {
    label: '《服务条款》',
    fn: () => window.open('https://st.music.163.com/official-terms/service'),
  },
  {
    label: '《隐私政策》',
    fn: () => window.open('https://st.music.163.com/official-terms/privacy'),
  },
  {
    label: '《儿童隐私政策》',
    fn: () => window.open('https://st.music.163.com/official-terms/children'),
  },
];

let timer;
const showValidateTip = ref(false);
const changeLoginMethod = () => {
  console.log(111, checkBoxValue.value);
  if (!checkBoxValue.value) {
    showValidateTip.value = true;
    timer = setTimeout(() => {
      showValidateTip.value = false;
    }, 2000);
    return;
  }
  emit('changeLoginMethod');
};

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});
</script>

<template>
  <div class="login">
    <div class="login-left">
      <img src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9647707645/c8e7/4d8d/1895/6dff82b63181104bbac7cf3743c8b613.png" />
      <Button type="primary">手机号登录</Button>
      <Button>注册</Button>
    </div>
    <ul class="login-right">
      <li v-for="item in loginMethod" :key="item.label" class="login-right-item">
        <span class="login-right-item-icon">
          <component :is="item.comp"></component>
        </span>
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
  <p class="login-rule">
    <Checkbox v-model:checked="checkBoxValue" label=""></Checkbox>
    <span
      >同意
      <span v-for="item in rules" :key="item.label" class="login-rule-item" @click="item.fn">{{ item.label }}</span>
    </span>
  </p>
  <img
    class="login-qrcode"
    src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9656441793/9f07/c197/3af2/f07b8d6ef20964be159ce812841fc9d2.png"
    @click="changeLoginMethod"
  />
  <div v-if="showValidateTip" class="validate">
    <div class="validate-tip"> 请先勾选同意《服务条款》《隐私政策》《儿童隐私政策》 </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  &-left {
    width: 60%;
    padding: 0 35px 3px 40px;
    border-right: 1px dotted #ccc;
    img {
      width: 224px;
      height: 120px;
    }
    ::v-deep(.ant-btn) {
      margin-top: 10px;
      width: 224px;
    }
  }
  &-right {
    width: 40%;
    padding-left: 5%;
    margin-bottom: 0;
    &-item {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        padding: 5px;
        border: 1px solid #ccc;
        margin-right: 14px;
        border-radius: 50%;
      }
    }
    &-item:not(:last-child) {
      margin-bottom: 15px;
    }
  }
  &-rule {
    width: 100%;
    margin-top: 30px;
    margin-left: 40px;
    &-item {
      color: #507daf;
      cursor: pointer;
    }
    ::v-deep(.ant-checkbox-wrapper) {
      margin-right: 3px;
    }
  }
  &-qrcode {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 52px;
    height: 52px;
  }
}
.validate {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &-tip {
    width: 300px;
    height: 60px;
    text-align: center;
    padding: 10px 25px;
    border-radius: 4px;
    color: #fff;
    background-color: #333333;
  }
}
</style>
