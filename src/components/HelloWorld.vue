<script setup lang="ts">
import { ref, reactive } from 'vue';
import HelloWorldChild from './HelloWorldChild.vue';
import HelloWorldTest from './HelloWorldTest.vue';

interface msgObjInterface {
  name: string;
}

defineProps<{ msg: string; msgObj: msgObjInterface }>();

const msg = ref('this is title');

const childInfo = ref('this is child title');

const msgObj = reactive({ name: 'zhangsan' });

const handleClick = () => {
  if (msgObj.name === 'zhangsan') {
    msgObj.name = 'lisi';
  }
  console.log(msg.value);
};

const childChange = (): void => {
  if (msgObj.name !== 'wangwu') {
    msgObj.name = 'wangwu';
  }
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <p @click="handleClick">{{ msgObj.name }}</p>
  <HelloWorldChild :child-info="childInfo" @child-change="childChange"></HelloWorldChild>
  <HelloWorldTest></HelloWorldTest>
  <div class="parent">
    <div class="parent-child"></div>
  </div>
</template>

<style scoped lang="scss">
a {
  color: #42b983;
}

.parent {
  border: 1px solid #e3e3e3;
  height: 300px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  &-child {
    height: 150px;
    width: 150px;
    border: 1px solid red;
  }
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
