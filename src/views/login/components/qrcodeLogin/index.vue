<script setup lang="ts">
import router from '@/router';
import { Button } from 'ant-design-vue';
import { getPrefit, getQRcode, getQRcodeStatus, getLoginStatus } from '@/api/login';
import LoginBg from '@/assets/loginBg_new.png';
import { useUserInfoStore } from '@/stores/user';

interface normalInterface {
  data?: {
    [key: string]: any;
  };
}
interface QRcodeStatusInterface {
  code?: number;
  cookie?: string;
  message?: string;
}

const emit = defineEmits<{
  (e: 'changeLoginMethod'): void;
}>();

// 获取当前登录的用户信息
const userInfoStore = useUserInfoStore();

const handleLogin = () => {
  router.push('/download');
};

let qrCodeImg = ref('');
let showExpire = ref(false);

// 监测二维码状态
const checkQRcodeStatus = async (key) => {
  const res: QRcodeStatusInterface = await getQRcodeStatus(key);
  return res;
};

// 监测登录状态
const checkLoginStatus = async () => {
  const { data }: LoginStatusInterface = await getLoginStatus();
  if (data.code === 200) {
    // 将数据进行全局保存
    userInfoStore.addUserInfo(data);
  }
  return data;
};

const createQRcode = async () => {
  const { data }: normalInterface = await getPrefit();
  if (data.unikey) {
    const { unikey } = data;
    const status: normalInterface = await getQRcode(unikey);
    qrCodeImg.value = status.data.qrimg;
    return unikey;
  }
};

let timer;
const handleQRcode = async (key?: string) => {
  let unikey;
  if (!key) {
    unikey = await createQRcode();
  } else {
    unikey = key;
  }
  timer = setInterval(async () => {
    const statusRes = await checkQRcodeStatus(unikey);
    if (statusRes.code === 800) {
      showExpire.value = true;
      clearInterval(timer);
    } else {
      showExpire.value = false;
    }
    if (statusRes.code === 803) {
      // 这一步会返回cookie
      clearInterval(timer);
      await checkLoginStatus();
    }
  }, 3000);
};

// 刷新二维码
const handleRefreshQRcode = async () => {
  const unikey = await createQRcode();
  showExpire.value = false;
  handleQRcode(unikey);
};

// 切换登录方式
const changeLoginMethod = () => {
  emit('changeLoginMethod');
};

onMounted(() => {
  handleQRcode();
});
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<template>
  <div class="qrcode-login">
    <div class="left-content">
      <img class="left-content-img" :src="LoginBg" />
    </div>
    <div class="right-content">
      <h3 class="right-content-title">扫码登录</h3>
      <div id="qrcode_box" class="right-content-qrcode-box">
        <div v-if="showExpire" class="right-content-qrcode-box-expire">
          <span>二维码已失效</span>
          <Button @click="handleRefreshQRcode">点击刷新</Button>
        </div>
        <img class="right-content-qrcode-box-img" :src="qrCodeImg" />
      </div>
      <p> 使用 <span class="right-content-tips" @click="handleLogin">网易云音乐APP</span> 扫码登录 </p>
    </div>
  </div>
  <div class="footer">
    <Button class="footer-button" @click="changeLoginMethod">选择其他登录模式</Button>
  </div>
</template>

<style scoped lang="scss">
.qrcode-login {
  height: calc(100% - 48px);
  width: 100%;
  display: flex;
  flex-wrap: nowrap;

  .left-content {
    height: 100%;
    width: 50%;
    display: flex;

    &-img {
      // height: 80%;
      width: 100%;
      object-fit: contain;
    }
  }

  .right-content {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    &-title {
      text-align: center;
    }

    &-qrcode-box {
      width: 138px;
      height: 138px;
      position: relative;

      &-expire {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        background-color: #ffffffe6;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;

        ::v-deep(.ant-btn) {
          background: linear-gradient(180deg, #81dd81 0%, #55a055 100%);
          border: 1px solid #5baf5b;
          border-radius: 4px;
          color: #fff;
          font-size: 12px;
          height: 24px;
        }
      }

      &-img {
        width: 100%;
        object-fit: contain;
      }
    }

    &-tips {
      color: #0c73c2;
    }
  }
}

.footer {
  height: 48px;
  width: 100%;
  text-align: center;
  padding: 20px 0 0 0;

  &-button {
    width: auto;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
  }
}
</style>
