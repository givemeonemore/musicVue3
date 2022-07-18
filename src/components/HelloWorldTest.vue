<script lang="js">
import { reactive, toRef } from "vue";

export default {
  name: 'HelloWorldTest',
  setup() {
    let obj = reactive({
      name: '三国杀',
      type: 'card',
      price: 20
    });
    // 以下可以使用 toRef 将上面的响应式数据解构出来，则可以直接在template中使用
    let gameName = toRef(obj, 'name');
    return {obj, gameName}
  }
}
</script>

<template>
  <div>
    <p>游戏名：{{ gameName }}</p>
    <p>游戏类型：{{ obj.type }}</p>
    <p>价格：{{ obj.price }}</p>
  </div>
</template>
