<script setup lang="ts">
import { Modal } from 'ant-design-vue';
import QRcodeLogin from './components/qrcodeLogin';
import NormalLogin from './components/normalLogin';

const modalRef = ref(null);
const model = ref('qrcode');
const visible = ref(false);

const login = () => {
  visible.value = true;
};

/** */
const changeLoginMethod = (type: 'normal' | 'qrcode') => {
  model.value = type;
};

// 暴露部分参数供 ref 使用
defineExpose({
  login,
});
</script>

<template>
  <div ref="modalRef">
    <Modal :visible="visible" title="登录" centered :mask-closable="false" :get-container="() => modalRef" @cancel="() => (visible = false)">
      <template #footer> </template>
      <div v-show="model === 'qrcode'" class="qrcode-login">
        <QRcodeLogin @change-login-method="changeLoginMethod('normal')"></QRcodeLogin>
      </div>
      <div v-show="model === 'normal'" class="normal-login">
        <NormalLogin @change-login-method="changeLoginMethod('qrcode')"></NormalLogin>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
.qrcode-login {
  height: 100%;
}

::v-deep(.ant-modal-close-x) {
  width: 38px;
  height: 38px;
  line-height: 38px;
  color: #fff;
}

::v-deep(.ant-modal-header) {
  padding: 0;
  height: 38px;
  line-height: 38px;
  background: #2d2d2d;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  border-bottom: 1px solid #191919;
  padding: 0 45px 0 18px;

  .ant-modal-title {
    color: #fff;
    line-height: 38px;
  }
}

::v-deep(.ant-modal-body) {
  height: 327px;
  // width: 530px;
}

::v-deep(.ant-modal-footer) {
  padding: 0;
  border-top: 0;
}
</style>
