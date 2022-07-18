// longpress.ts
import { Directive } from 'vue';

const focus: Directive = {
  // 指令的定义
  mounted(el) {
    el.focus();
  },
};

export default focus;
