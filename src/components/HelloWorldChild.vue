<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';

interface childSubInfoInterFace {
  num: number;
  title: string;
}

interface todoInterface {
  title: string;
  done: boolean;
  time?: string;
}

defineProps<{ childInfo: string }>();
const emit = defineEmits<{
  (e: 'childChange'): void;
}>();
const childInfo = ref('this is child page');

const childSubInfo = reactive({
  num: 0,
  title: 'the number is changing,now is ',
}) as childSubInfoInterFace;

const handleChildClick = (): void => {
  childSubInfo.num++;
  emit('childChange');
};

console.log('Component is created!');

const computedDoubleChildInfo = computed(() => childInfo.value + ' * double');
const todoItemInfo = { title: '学习Vue', done: false } as todoInterface;
const todos = ref([todoItemInfo]);
let allDone = computed({
  get: function () {
    return todos.value.filter((v) => !v.done).length === 0;
  },
  set: function (value: boolean) {
    todos.value.forEach((todo) => {
      todo.done = value;
    });
  },
});

const handleAddItem = (): void => {
  todos.value.forEach((item) => {
    item.done = true;
  });
  todos.value.push({ title: '洗漱', done: true, time: '12:00' });
};

onMounted(() => {
  childSubInfo.num++;
  console.log('Component is mounted!');
});
</script>

<template>
  <p>{{ childInfo }}</p>
  <p>{{ computedDoubleChildInfo }}</p>
  <p>{{ childSubInfo.title }} {{ childSubInfo.num }}</p>

  <li v-for="item in todos" :key="item.title">{{ item.title }}</li>
  <span>{{ allDone }}</span>
  <button @click="handleAddItem">add item</button>

  <button @click="handleChildClick">test</button>
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
