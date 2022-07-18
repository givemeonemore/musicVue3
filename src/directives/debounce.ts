import { Directive } from 'vue';
import type { DirectiveBinding, VNode } from 'vue';

const debounce: Directive = {
  updated(el: HTMLElement, binding?: DirectiveBinding, vNode?: VNode) {
    if (typeof binding.value !== 'function') {
      const compName = vNode.appContext;
      let warn = `[longpress:] provided expression '${binding.arg}' is not a function, but has to be `;
      if (compName) {
        warn += `Found in component '${compName}' `;
      }
      console.warn(warn);
    }

    let pressTimer: NodeJS.Timer | null = null;
    const handler = (e: Event) => {
      binding.value(e);
    };
    const start = (e: Event) => {
      if (e.type === 'click') {
        return;
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler(e);
        }, 500);
      }
    };

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    document.oncontextmenu = function (event) {
      event.preventDefault();
      return false;
    };
    el.addEventListener(
      'contextmenu',
      function (e) {
        e.preventDefault();
      },
      false,
    );
    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start);
    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchcancel', cancel);
  },
};

export default debounce;
