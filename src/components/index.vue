<template>
  <transition name="fade">
    <h1 v-if="showTitle">hello Vue3</h1>
  </transition>
  <button @click="handleToggle">click</button>

  <button @click="add">Add</button>

  <transition-group name="list" tag="p">
    <span v-for="citem in items" :key="citem.title" class="list-item">
      {{ citem.title }}
      <button @click="remove(citem.title)">Remove</button>
    </span>
  </transition-group>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const showTitle = ref(true);

const handleToggle = () => {
  showTitle.value = !showTitle.value;
};

interface itemsInterface {
  title: string;
}

const item = ['语文', '数学', '英语'].map((item) => {
  return {
    title: item,
  } as itemsInterface;
});
console.log(item);
const items = reactive(item);

const add = () => {
  items.push({ title: '地理' });
};

const remove = (title: string): void => {
  const index = items.findIndex((item) => item.title !== title);
  items.splice(index, 1);
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
