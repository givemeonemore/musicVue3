<script setup lang="ts">
import Header from './header';
import { Input } from 'ant-design-vue';
</script>

<template>
  <div class="media-body">
    <div class="header">
      <Header></Header>
    </div>
    <div class="content">
      <router-view class="content-body"></router-view>
    </div>
    <div class="footer">
      <Input v-focus />
      <div class="temp-div"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.media-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .header {
    display: flex;
  }
}
.content {
  display: flex;
  flex: 1 1;
  width: 100%;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  background: #f5f5f5;

  &-body {
    padding: 40px;
    width: 980px;
    min-height: 100%;
    background-color: #fff;
    border: 1px solid #d3d3d3;
    border-width: 0 1px;
  }
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 47px;
  z-index: 11;
  .temp-div {
    border: 1px solid #000;
    height: 20px;
    width: 150px;
    @include rounded-corners;
  }
}
::v-deep(.ant-input) {
  width: 200px;
}
</style>
