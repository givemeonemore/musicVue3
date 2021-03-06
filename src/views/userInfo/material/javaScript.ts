const info = [
  {
    name: 'JS实现一个带并发限制的异步调度器',
    desc: '<div style="white-space: pre;">JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">class Scheduler {\n</div><div style="white-space: pre;">  add(promiseCreator) { ... }\n</div><div style="white-space: pre;">  // ...\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">const timeout = (time) =&gt; new Promise(resolve =&gt; {\n</div><div style="white-space: pre;">  setTimeout(resolve, time)\n</div><div style="white-space: pre;">})\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">const scheduler = new Scheduler()\n</div><div style="white-space: pre;">const addTask = (time, order) =&gt; {\n</div><div style="white-space: pre;">  scheduler.add(() =&gt; timeout(time))\n</div><div style="white-space: pre;">    .then(() =&gt; console.log(order))\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">addTask(1000, &#39;1&#39;)\n</div><div style="white-space: pre;">addTask(500, &#39;2&#39;)\n</div><div style="white-space: pre;">addTask(300, &#39;3&#39;)\n</div><div style="white-space: pre;">addTask(400, &#39;4&#39;)\n</div><div style="white-space: pre;">// output: 2 3 1 4// 一开始，1、2两个任务进入队列// 500ms时，2完成，输出2，任务3进队// 800ms时，3完成，输出3，任务4进队// 1000ms时，1完成，输出1// 1200ms时，4完成，输出4\n</div>',
    answer:
      '<div style="white-space: pre;">class Scheduler {\n</div><div style="white-space: pre;">  concurrency = 2\n</div><div style="white-space: pre;">  running = 0\n</div><div style="white-space: pre;">  queue = []\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">  add(task) {\n</div><div style="white-space: pre;">    return new Promise(resolve =&gt; {\n</div><div style="white-space: pre;">      this.queue.push({\n</div><div style="white-space: pre;">        taskGenerator: task,\n</div><div style="white-space: pre;">        resolve\n</div><div style="white-space: pre;">      })\n</div><div style="white-space: pre;">      this.schedule()\n</div><div style="white-space: pre;">    })\n</div><div style="white-space: pre;">  }\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">  schedule() {\n</div><div style="white-space: pre;">    while (this.queue.length &gt; 0 &amp;&amp; this.running &lt; this.concurrency) {\n</div><div style="white-space: pre;">      const curTask = this.queue.shift()\n</div><div style="white-space: pre;">      this.running += 1\n</div><div style="white-space: pre;">      curTask.taskGenerator().then(result =&gt; {\n</div><div style="white-space: pre;">        this.running -= 1\n</div><div style="white-space: pre;">        curTask.resolve(result)\n</div><div style="white-space: pre;">        this.schedule()\n</div><div style="white-space: pre;">      })\n</div><div style="white-space: pre;">    }\n</div><div style="white-space: pre;">  }\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div>',
    types: ['前端领域', 'JavaScript'],
    tags: ['前端基础', 'promise', '异步', 'js', '调度器'],
  },
  {
    name: '写一个加法函数(sum)，使他可以同时支持sum(x,y)和sum(x)(y)两种调用方式。',
    desc: '<div style="white-space: pre;"><span style="font-weight: bold;">写一个按照下面两种方式都能正常调用的 sum 方法</span>\n</div><div style="white-space: pre;">```javascript\n</div><div style="white-space: pre;">console.log(sum(2,3)); // 输出5\n</div><div style="white-space: pre;">console.log(sum(2)(3)); // 输出5\n</div><div style="white-space: pre;">```\n</div>',
    answer:
      '<div style="white-space: pre;">答案一\n</div><div style="white-space: pre;">function sum(a,b){\n</div><div style="white-space: pre;">if(b) {\n</div><div style="white-space: pre;">return a+b\n</div><div style="white-space: pre;">}else{\n</div><div style="white-space: pre;">return function(c){\n</div><div style="white-space: pre;">return a+c\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">答案二\n</div><div style="white-space: pre;">function sum(){\n</div><div style="white-space: pre;">var arg=arguments\n</div><div style="white-space: pre;">if(arg.length==2) {\n</div><div style="white-space: pre;">return arg[0]+arg[1];\n</div><div style="white-space: pre;">}else{\n</div><div style="white-space: pre;">return function(c){\n</div><div style="white-space: pre;">return arg[0]+c\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div>',
    types: ['前端领域'],
    tags: ['柯里化', '编码', '函数式', '闭包'],
  },
  {
    name: 'ES5，ES6中this指向考察',
    desc: '1. 以下代码输出什么结果，`this.name`中this指向什么：\n```\nwindow.name = &#39;ByteDance&#39;;\nfunction A () {\n   this.name = 123;\n}\nA.prototype.getA = function(){\n\tconsole.log(this);\n\treturn this.name + 1;\n}\nlet a = new A();\nlet funcA = a.getA;\nfuncA();\n```\n2. 如何使`funcA()`返回`undefined`?\n3. 下面ES6中又会发生什么，this是什么？\n```\nwindow.name = &#39;ByteDance&#39;;\nclass A {\n\tconstructor() {\n  \tthis.name = 123;\n\t}\n\tgetA() { \n\t  console.log(this);\n\t\treturn this.name + 1; \n\t}\n}\nlet a = new A();\nlet funcA = a.getA;\nfuncA();\n```',
    answer:
      '1. 输出`Bytedance1`, this指向widnow;\n2. 正确使用applay / call；\n3. 发生异常：Uncaught TypeError: Cannot read property &#39;name&#39; of undefined，this为undefined；',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'this', 'es6'],
  },
  {
    name: '请问什么是跨域？跨域请求资源有几哪种方式？',
    desc: '何为跨域？跨域请求资源有几哪种方式？',
    answer:
      '由于浏览器同源策略，凡是发送请求url的协议、域名、端口三者之间任意一与当前页面地址不同即为跨域。\n跨域请求资源的方式主要有：  \n（1）JSONP 动态创建script标签  \n但缺点是只支持get请求，并且很难判断请求是否失败（一般通过判断请求是否超时）。  \n（2）Proxy代理  \n这种方式首先将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。  \n（3）CORS跨域  \n是现代浏览器提供的一种跨域请求资源的方法，需要客户端和服务器端的同时支持。整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信  \n服务响应头返回，Access-Control-Allow-Origin: *',
    types: ['前端领域', '浏览器'],
    tags: ['跨域访问'],
  },
  {
    name: '简述React Fiber原理',
    desc: '<p>试描述React Fiber的原理。</p>',
    answer:
      '<p>\t官方的一句话解释是“React Fiber是对核心算法的一次重新实现”。</p><p>\t之前React的更新过程是同步的，所有更新逻辑会在一帧之内完成，如果组件过于复杂则会导致更新时间超过一帧，其他事务包括用户输入都会被延迟响应，从而引发卡顿。如下图：</p><p><br></p><img src="https://pic1.zhimg.com/80/v2-d8f4598c70df94d69825f11dfbf2ca2c_1440w.png" width="375" alt=""><p>\t破解方式——分片。</p><p>\t有了分片之后，更新过程的调用栈如下图所示，中间每一个波谷代表深入某个分片的执行过程，每个波峰就是一个分片执行结束交还控制权的时机。</p><img src="https://pic1.zhimg.com/80/v2-78011f3365ab4e0b6184e1e9201136d0_1440w.png" width="375" alt=""><p>\t实现使用的API：requestIdleCallback</p><pre><code>Q.为什么引入Fiber架构？原架构有何不足？\nA.原架构采用递归遍历方式来更新DOM树，一旦开始，即占用主线程，无法中断，这在页面上会引起问题，如input输入后页面卡顿等\n\nQ.Fiber如何解决该问题\nA.时间分片和暂停\n\nQ.Fiber如何实现？\nA.使用链表结构，将递归遍历更改为循环遍历，然后配合requestIdleCallback API，实现任务拆分、中断和恢复\n\nQ.Fiber如何实现比较？\nA.双缓冲技术，在diff过程中创建新的DOM Tree，diff完成之后生成EffectList，即需要更新的地方，之后进入commit阶段，该阶段不允许中断。\n\nQ.React Hook基于Fiber架构，hook的复用是如何实现的？\nA.hook的数据存在于Fiber节点的数据结构中，具体为memoizedState中，该字段中存储了所有hook相关的信息，https://www.jianshu.com/p/d6244228a427 （重要）</code></pre><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['Fiber', '性能优化', 'React'],
  },
  {
    name: '请简要描述ES6 module require、exports以及module.exports的区别',
    desc: '考察候选人对es6，commonjs等js模块化标准的区别和理解',
    answer:
      '* CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被”循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。\n* ES6 模块是动态引用，如果使用 import 从一个模块加载变量，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。\n* CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports ）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。\n* export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。\n* ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性\n* 混合使用介绍：https://github.com/ShowJoy-com/showjoy-blog/issues/39',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'es6'],
  },
  {
    name: '浏览器缓存机制考察',
    desc: '浏览器缓存机制考察，包括cache-control , etag, expire, last-modify-time\n以及 200 from cache、304',
    answer: '1、cache-control 和 expire 在浏览器端控制  Cache-Control的max-age&gt;expire\n2、etag 和 last-modify-time主 要服务器端对比使用',
    types: ['前端领域', '浏览器'],
    tags: [],
  },
  {
    name: '版本号排序',
    desc: 'versions是一个项目的版本号列表，因多人维护，不规则\n``` javascript\nvar versions=[&#39;1.45.0&#39;,&#39;1.5&#39;,&#39;6&#39;,&#39;3.3.3.3.3.3.3&#39;]\n```\n要求从小到大排序，注意&#39;1.45&#39;比&#39;1.5&#39;大\n``` javascript\nvar sorted=[&#39;1.5&#39;,&#39;1.45.0&#39;,&#39;3.3.3.3.3.3&#39;,&#39;6&#39;]\n```',
    answer:
      '```javascript\nfunction sortVersion(arr) {\n    return arr.sort((a, b) =&gt; {\n        const arrA = a.split(&#39;.&#39;)\n        const arrB = b.split(&#39;.&#39;)\n        for (let i = 0; i &lt; arrA.length; i++) {\n            if (arrA[i] === undefined) {\n                return -1\n            } else if (arrB[i] === undefined) {\n                return 1\n            } else if (parseInt(arrA[i]) === parseInt(arrB[i])) {\n                continue\n            } else {\n                return parseInt(arrA[i]) &gt; parseInt(arrB[i])\n            }\n        }\n    })\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['排序'],
  },
  {
    name: 'JS限流调度器',
    desc: '<p>实现JS限流调度器，方法add接收一个返回Promise的函数，同时执行的任务数量不能超过两个。</p><pre><code>class Scheduler {\n    async add(promiseFunc: () =&gt; Promise&lt;void&gt;): Promise&lt;void&gt; {\n    }\n}\n\nconst scheduler = new Scheduler()\nconst timeout = (time) =&gt; {\n    return new Promise(r =&gt; setTimeout(r, time))\n}\nconst addTask = (time, order) =&gt; {\n    scheduler.add(() =&gt; timeout(time))\n        .then(() =&gt; console.log(order))\n}\n\naddTask(1000, 1)\naddTask(500, 2)\naddTask(300, 3)\naddTask(400, 4)\n// log: 2 3 1 4\n</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>class Scheduler {\n    constructor() {\n        this.concurrency = 0\n        this.queue = []\n    }\n    async add(promiseFunc) {\n        if (this.concurrency &gt;= 2) {\n            return new Promise(r =&gt; {\n                this.queue.push(() =&gt; promiseFunc().then(r))\n            })\n        }\n        this.concurrency += 1\n        await promiseFunc()\n        this.concurrency -= 1\n        let next = this.queue.shift()\n        if (next) {\n            this.add(next)\n        }\n    }\n}\n\nconst scheduler = new Scheduler()\nconst timeout = (time) =&gt; {\n    return new Promise(r =&gt; setTimeout(r, time))\n}\nconst addTask = (time, order) =&gt; {\n    scheduler.add(() =&gt; timeout(time))\n        .then(() =&gt; console.log(order))\n}\n\naddTask(1000, 1)\naddTask(500, 2)\naddTask(300, 3)\naddTask(400, 4)\n</code></pre><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['前端编码', 'js', '调度器'],
  },
  {
    name: '实现一个简单的Event类（观察者模式）',
    desc: '<p>请实现一个观察者模式，拥有四个方法on,off,once和trigger</p><p><br></p><p>const Event = {</p><p>    on() {}   // 绑定</p><p>    off() {}  // 解绑</p><p>    once() {}   // 绑定一次</p><p>    trigger() {}  // 触发事件</p><p>};</p>',
    answer:
      '<p>```javascript function Event() { if (!(this instanceof Event)) { return new Event(); } this._callbacks = {}; } Event.prototype.on = function (type, handler) { this_callbacks = this._callbacks || {}; this._callbacks[type] = this.callbacks[type] || []; this._callbacks[type].push(handler); return this; }; Event.prototype.off = function (type, handler) { var list = this._callbacks[type]; if (list) { for (var i = list.length; i &gt;= 0; --i) { if (list[i] === handler) { list.splice(i, 1); } } } return this; }; Event.prototype.trigger = function (type, data) { var list = this._callbacks[type]; if (list) { for (var i = 0, len = list.length; i &lt; len; ++i) { list[i].call(this, data); } } }; Event.prototype.once = function (type, handler) { var self = this; function wrapper() { handler.apply(self, arguments); self.off(type, wrapper); } this.on(type, wrapper); return this; }; ```</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['编码', 'event'],
  },
  {
    name: '请说明存储在 Cookie 和 localStorage 内有什么区别',
    desc: '请说明 cookie、sessionStorage、localStorage 之间的区别、以及在你项目中的应用？',
    answer:
      ' a) cookie，HTTP Cookie（也叫Web cookie或者浏览器Cookie）是服务器发送到用户浏览器并保存在浏览器上的一块数据，它会在浏览器下一次发起请求时被携带并发送到服务器上。比较经典的，可以它用来确定两次请求是否来自于同一个浏览器，从而能够确认和保持用户的登录状态。Cookie的使用使得基于无状态的HTTP协议上记录稳定的状态信息成为了可能。\nb) sessionStorage，为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。\nc) localStorage，localStorage 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。\n\n区别：\nlocalStorage、sessionStorage 是 Web Storage Api 的组成 API，其为了解决 Cookie 的一些缺陷，服务端 Set 的 cookie 每次会携带在本域下所有的请求上，对性能有损耗。SessionStorage 存储有个期限，当关闭浏览器后就不再存在，但 localStorage 依然存在，需要明确删除。\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础概念', '前端基础'],
  },
  {
    name: '请简述js浏览器事件循环机制',
    desc: '<p><br></p>',
    answer:
      '<p>浏览器 Event Loop 是 HTML 中定义的规范，Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。</p><ul><li>JS 调用栈</li></ul><p>JS 调用栈是一种后进先出的数据结构。当函数被调用时，会被添加到栈中的顶部，执行完成之后就从栈顶部移出该函数，直到栈内被清空。</p><ul><li>同步任务、异步任务</li></ul><p>JavaScript 单线程中的任务分为同步任务和异步任务。同步任务会在调用栈中按照顺序排队等待主线程执行，异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。任务队列是先进先出的数据结构。</p><ul><li>Event Loop</li></ul><p>调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作，就形成了事件循环。</p><ul><li>定时器</li></ul><p>定时器会开启一条定时器触发线程来触发计时，定时器会在等待了指定的时间后将事件放入到任务队列中等待读取到主线程执行。定时器指定的延时毫秒数其实并不准确，因为定时器只是在到了指定的时间时将事件放入到任务队列中，必须要等到同步的任务和现有的任务队列中的事件全部执行完成之后，才会去读取定时器的事件到主线程执行，中间可能会存在耗时比较久的任务，那么就不可能保证在指定的时间执行。</p><ul><li>宏任务(macro-task)、微任务(micro-task)</li></ul><p>除了广义的同步任务和异步任务，JavaScript 单线程中的任务可以细分为宏任务和微任务。macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。micro-task包括：process.nextTick, Promises, Object.observe, MutationObserver。事件循环中，JavaScript 引擎会把整个 script 代码当成一个宏任务执行，执行完成之后，再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务-微任务。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件', 'js'],
  },
  {
    name: '何为https?https和http2有什么关系？',
    desc: '简要描述HTTPS的安全机制，以及在web服务工程实践中需要注意的问题；描述http2的基本机制',
    answer:
      'HTTPS是指建立在安全的传输层（通常是tls/ssl）上的HTTP协议，通过对服务器的证书的认证，解决中间人攻击等问题。\n证书(certificate)由客户端信任的的证书机构(CA)颁发，通过common name或SAN对服务进行描述；客户端通过CA的根证书对证书进行校验，并将请求域名和证书的common name/DNS域名进行验证，以检验证书的有效性。\n目前，很多web api如Notification/web rpc/Service Worker等，都要求必须使用https。\n在工程实践中，https存在以下需要注意的问题：\n  - js/css等资源必须以https形式加载，否则浏览器将拒绝执行，所以CDN必须完成对https的支持\n\t- 非https请求的图片等资源不会携带referer\n\t\n\thttp2是http协议的一个新版本，既可以明文传输也可以在https中使用。浏览器和服务器通过tls的ALPN/SNI等机制可以进行协议协商，决定使用什么协议',
    types: ['前端领域'],
    tags: ['基础概念', 'HTTPS'],
  },
  {
    name: '用数组的reduce方法实现map方法',
    desc: '用数组的reduce方法实现map方法',
    answer:
      '```\n// 代码实现\nArray.prototype.map2 = function(f) {\n  return this.reduce(function(result, x, index, arr) {\n    result.push(f(x, index));\n    return result;\n  }, []);\n}\n\n// 测试代码\nvar res = [1, 3, 5, 7].map2(function(item, idx){\n  return item * 2;\n});\nconsole.log(res);\n```',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: 'js异步操作与计算题',
    desc: '```\nfor (var i = 0; i &lt; 6; i++) {\n    setTimeout(function() {\n        console.log(new Date, i);\n    }, 1000);\n}\n```\n&gt;1. console.log(new Date, i);得到的结果是什么?\n&gt;1. 怎样优化，可以变成： 0 -&gt; 1 -&gt; 2 -&gt; 3-&gt; 4 -&gt;5\n&gt;1. 如果继续优化，实现console.log(new Date, i);代码执行时，立即输出 0，之后每隔 1 秒依次输出 1,2,3,4（sleep），之后再暂停5秒，然后输出5,\n实现结果类似：\n&gt;1. 2017-08-31T04:38:23:  0    &lt;— start IIFE\n&gt;1. 2017-08-31T04:38:24:  1    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:25:  2    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:26:  3    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:27:  4    &lt;— sleep 5s\n&gt;1. 2017-08-31T04:38:32:  5',
    answer:
      '1. 属于结果是暂停1S，然后输出6个6，setTimeout属于异步执行\n1. 实现0-&gt; 1 -&gt; 2 -&gt; 3-&gt; 4 -&gt;5，用闭包或者var改成let\n1. 模拟编程中的sleep实现，参考答案：\n```\n// 模拟其他语言中的 sleep，实际上可以是任何异步操作\nconst sleep = (timeoutMS) =&gt; new Promise((resolve) =&gt; {\n  setTimeout(resolve, timeoutMS)\n});\n(async () =&gt; {  // 声明即执行的 async 函数表达式\n  for (let i = 0; i &lt; 6; i++) {\n      if (i &lt; 5) {\n        console.log(new Date(), i)\n        await sleep(1000)\n      } else {\n        await sleep(4000)\n        console.log(new Date(), i)\n      }\n    }\n})()\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'async', 'js'],
  },
  {
    name: '简单的实现Promise.all',
    desc: '<p><br></p><pre><code>\nfunction fn1() {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(1)\n        }, 1000);\n    })\n}\nfunction fn2() {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(2)\n        }, 2000);\n    })\n}\nPromiseAll([fn1(), fn2()]).then(res =&gt; {\n    console.log(res)\n}).catch(err =&gt; {\n    console.log(err)\n})\n\nPromise.all([fn1(), fn2()]).then(res =&gt; {\n    console.log(res)\n}).catch(err=&gt;{\n    console.log(err)\n})</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>function PromiseAll(list) {\n\n    return new Promise((resolve, reject) =&gt; {\n\n        let count = 0;\n\n        let len = list.length;\n\n        let result = [];\n\n        list.forEach((item,index) =&gt; {\n\n            item.then(res =&gt; {\n\n                count++;\n\n                result[index] = res;\n\n                if (count === len) {\n\n                    resolve(result);\n\n                }\n\n            }).catch(err =&gt; {\n\n                reject(err)\n\n            })\n\n        })\n\n    })\n\n}\n\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '基础'],
  },
  {
    name: 'ES6 import的原理',
    desc: '请描述ES6 import的原理以及与commonjs的require的区别',
    answer:
      'CommonJS模块的是一个值的拷贝，而ES6模块输出的是值的引用。\nES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。\nCommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。\nES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', '模块化', 'es6'],
  },
  {
    name: '不借助变量交换两个数',
    desc: 'var a = 1, b = 2;\nfunction swap(a,b){\n  ....\n}\nswap(a,b)\nconsole.log(a, b)  // 2,1',
    answer:
      '方法一、\n```\nfunction swap(a,b){\n  b=b-a;\n  a=a+b;\n  b=a-b;\n  return [a,b]\n}\n```\n方法二、\n```\nfunction swap(a,b){\n  return [a, b] = [b, a]\n}\n```\n方法三、\n```\nfunction swap(a,b){\n  var a=a^b;\n  var b=b^a;\n  var a=a^b;\n\treturn [a,b]\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '实现垂直居中',
    desc: '```html\n\n    <div id="block">        \n    </div>\n\n```\nid为block的元素不定高不定宽，请实现它在浏览器窗口的居中显示。',
    answer: '```css\n#block {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n```',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '请回答当我们在使用new操作符时，它在对象操作的过程中具体做了什么',
    desc: '考察候选人对原型链操作和js对象的理解',
    answer:
      '1. 简单回答：\n1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。\n1. 属性和方法被加入到 this 引用的对象中。\n3. 新创建的对象由 this 所引用，并且最后隐式的返回 this 。\n```javascript\nfunction Animal(name) {\n      this.name = name;\n}\n  Animal.prototype.run = function() {\n      console.log(this.name + &#39;can run...&#39;);\n}\nvar cat = new Animal(&#39;cat&#39;); //    \nnew Animal(&#39;cat&#39;)=function(){\nlet obj={}; //       \nobj.__proto__=Animal.prototype; // obj-&gt;Animal.prototype-&gt;Object.prototype-&gt;null\nreturn Animal.call(obj,&#39;cat&#39;);//   this        \n}\n```\n\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['prototype'],
  },
  {
    name: 'css3实现多行文字截断处理',
    desc: '用css分别实现单行截断和多行截断字符串，最后以...为结尾',
    answer:
      '单行：\n```\n.text-overflow ( @class ){\n    .@{class} {\n        overflow: hidden;\n        text-overflow:ellipsis;\n        white-space: nowrap;\n    }\n}\n```\n多行：\n```\n.multi-text-overflow ( @class, @line ){\n    .@{class} {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        display: -webkit-box;\n        display: box;\n        -webkit-line-clamp: @line;\n        -webkit-box-orient: vertical;\n    }\n}\n```',
    types: ['前端领域', 'CSS'],
    tags: ['css3'],
  },
  {
    name: '请介绍react diff算法和策略',
    desc: 'react的diff算法和策略了解多少，为什么react的diff性能好，遵循什么样的策略可以把 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题',
    answer:
      'React分别对 tree diff、component diff 以及 element diff做了算法优化，\n做了一些假设\n1.Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计\n2.拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构\n3.对于同一层级的一组子节点，它们可以通过唯一 id 进行区分\ntree diff：React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较\ncomponent diff：\na.如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。\nb.如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。\nc.对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff\nelement diff：\n允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，减少增加和删除\n详见：https://zhuanlan.zhihu.com/p/20346379',
    types: ['前端领域', 'JavaScript'],
    tags: ['React'],
  },
  {
    name: '函数科里化',
    desc: '<p>实现如下函数add,使如下执行都等于9</p><pre><code>add(2,3,4)=9\nadd(2)(3,4)=9\nadd(2)(3)(4)=9\nadd(2,3)(4)=9</code></pre><p><br/></p>',
    answer:
      '<p><br/></p><pre><code>function curry(fn) {\n  return function res(...args) {\n    if (args.length &gt;= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...args2) {\n        return res.apply(this, args.concat(args2));\n      }\n    }\n  }\n}</code></pre><p><br/></p>',
    types: ['前端领域'],
    tags: ['编码', '函数式'],
  },
  {
    name: '如果数据库中采用64位长整型存储一个数据的id，前端通过api拿到这个id的话，会有什么问题？应该怎么解决？',
    desc: '如果数据库中采用64位长整型存储一个数据的id，前端通过api拿到这个id的话，会有什么问题？怎么解决？',
    answer:
      '考察一下JS中整数的安全范围的概念，在头条经常会遇到长整型到前端被截断的问题，需要补一个字符串形式的id供前端使用。\n主要会涉及到JS中的最大安全整数问题\nhttps://segmentfault.com/a/1190000002608050',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础'],
  },
  {
    name: 'JavaScript this 考察',
    desc: '<p>下面代码输出的结果是什么？</p><p>var length = 10;</p><p>function fn() {</p><p> return this.length+1;</p><p>}</p><p>var obj = {</p><p> length: 5,</p><p> test1: function() {</p><p>  return fn();</p><p> }</p><p>};</p><p>obj.test2=fn;</p><p>//下面代码输出是什么</p><p>console.log(obj.test1())</p><p>console.log(fn()===obj.test2())</p>',
    answer: '<p>11, false(11===6)</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['this'],
  },
  {
    name: 'requestAnimationFrame 和 setTimeout 的区别',
    desc: 'requestAnimationFrame 和 setTimeout 都可以用来实现动画，它们的区别是什么',
    answer:
      '1. 执行频率不同，前者按照屏幕刷新频率执行，后者自行控制，可能有无用开销（执行频率小于刷新频率，即1帧执行多次）\n2. 前者在页面不可见时，会停止执行（省电），后者在页面不可见时仍会执行，带来不必要开销\n',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '编码-js高阶函数考察',
    desc: '<h3>实现一个repeat方法，要求如下：</h3><p><br/></p><p>// 需要实现的函数</p><p>function repeat (func, times, wait) {</p><p> // 补全</p><p>}</p><p><br/></p><p>// 使下面调用代码能正常工作</p><p>const repeatFunc = repeat(console.log, 4, 3000);</p><p>repeatFunc(&#34;hello world&#34;);    //会输出4次 hello world, 每次间隔3秒</p><p><br/></p>',
    answer:
      '<p>考点1：能意识到repeat返回的是一个函数，知道参数怎么传递。</p><p>考点2：setTimeout的时间，微任务</p><p><br/></p><p>参考答案</p><p>function repeat(fn, times, wait) {</p><p>  if(typeof times !== &#39;number&#39;) return;</p><p>  if(typeof wait !== &#39;number&#39;) return;</p><p>  return function(str){</p><p>    for(let i = 0; i &lt; times; i++){</p><p>      setTimeout(()=&gt;{</p><p>        fn(str)</p><p>      }, i * wait)</p><p>    }</p><p>  }</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['函数式', 'js'],
  },
  {
    name: 'Vue框架中组件消息通信方式',
    desc: '考察候选人对Vue框架的消息通信方式了解程度：\n\n1. vue父子组件通信方式？\n2. 非父子组件通信方式？\n3. 前两问OK，追问：当一个父组件与子组件中间隔着很多层组件怎么办？',
    answer:
      '1. 父子组件通信方式\n在Vue中，父子组件的关系可以总结为props down, events up。父组件通过props向下传递数据给子组件，子组件通过events给父组件发送消息。\n\n2. 非父子组件通信\n两个独立的组件之间通信，可以借助一个空的Vue实例作为中央事件总线，空实例相当于代理人的形式进行消息监听或触发\n\n3. 父子之间层级过多时\n当父子组件之间层级不多的时候，父组件可以一层层的向子组件传递数据或者子组件一层层向父组件发送消息，代码上没有太难维护的地方。可是，一旦父子组件之间层级变多后，传递一个数据或者发送一个消息就变得麻烦。\n这块如果了解开源的Element组件库，就会知道其实现方式：构造一个函数自动向上/向下查询父亲节点，以`[组件名, 消息名, 参数]`三元组进行消息传递，降低长链传播成本;\n具体实现参考：https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js',
    types: ['前端领域', 'JavaScript'],
    tags: ['vue'],
  },
  {
    name: '什么是 XSS，怎么造成的，有什么防御方法？',
    desc: '考察面试者对于 XSS 是否了解，是否足够重视。',
    answer:
      'XSS 就是在 web 中能够通过某种方式产生执行任意 JavaScript 脚本的情况，\n最常见的一种情况就是将用户的输入，直接放到当前 runtime 中，比如用户输入直接放到页面的 html 里面，\n立刻显示出来。\nXSS 实际上是非常危险的，因为理论上讲，如果能够执行 JavaScript，实际上攻击者可以做任何事情。\n简单的就是输出点什么，偷偷 cookie，或者结合 CSRF 攻击，或者让浏览器跳转一下，\n复杂点的甚至可以改掉当前整个页面，伪造一切用户看到东西，危害无穷。\n如果这种输入存储到数据库中，就会变成一个永久型的 XSS，危害就更大了。\n防止 XSS 最简单的就是使用各种框架，如 React、Vuejs 等，对用户输入进行 html 转义。\n另外，服务端要设置 httpOnly 的 header，防止 JavaScript 操作 cookie。\n当然，服务端也可以对输入进行转义或者过滤监测。',
    types: ['前端领域', 'JavaScript'],
    tags: ['xss', '防御方法'],
  },
  {
    name: 'webpack插件编写',
    desc: '1. 有用过webpack么？说说该工具的优缺点？\n2. 有开发过webpack插件么？\n3. 假如要在构建过程中去除掉html中的一些字符，如何编写这个插件？',
    answer:
      'webpack优缺点：\n* 概念牛，但文档差，使用起来费劲\n* 模块化，让我们可以把复杂的程序细化为小的文件\n* require机制强大，一切文件介资源\n* 代码分隔\n* 丰富的插件，解决less、sass编译\n\n开发插件的两个关键点Compiler和Compilation：\n* compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并在所有可操作的设置中被配置，包括原始配置，loader 和插件。当在 webpack 环境中应用一个插件时，插件将收到一个编译器对象的引用。可以使用它来访问 webpack 的主环境。\n* compilation 对象代表了一次单一的版本构建和生成资源。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。\n\n插件编写可参考：https://doc.webpack-china.org/development/how-to-write-a-plugin',
    types: ['前端领域', '工程构建'],
    tags: ['框架'],
  },
  {
    name: '如何实现微信扫码登录？',
    desc: '综合题，考察网络、前端、认证等多方面知识',
    answer:
      '参考答案：\nhttps://zhuanlan.zhihu.com/p/22032787\n具体步骤：\n1. 用户 A 访问微信网页版，微信服务器为这个会话生成一个全局唯一的 ID，上面的 URL 中 obsbQ-Dzag== 就是这个 ID，此时系统并不知道访问者是谁。\n2. 用户A打开自己的手机微信并扫描这个二维码，并提示用户是否确认登录。\n3. 手机上的微信是登录状态，用户点击确认登录后，手机上的微信客户端将微信账号和这个扫描得到的 ID 一起提交到服务器\n4. 服务器将这个 ID 和用户 A 的微信号绑定在一起，并通知网页版微信，这个 ID 对应的微信号为用户 A，网页版微信加载用户 A 的微信信息，至此，扫码登录全部流程完成',
    types: ['前端领域', '工程构建'],
    tags: ['产品逻辑', '扫码登录'],
  },
  {
    name: '设计类似 Vue.js 双向绑定功能的核心逻辑“监听对象属性变化”功能',
    desc: '实现一个类，可以监听对象属性的值变化。加分项：考虑对象存在值为数组或对象的属性。\n\n\t\tclass Observe {\n\t\t\tconstructor(data: Object) {\n\t\t\t}\n\t\t\t// 监听属性变更\n\t\t\t$on() {\n\t\t\t}\n\t\t\t// 触发属性变更事件\n\t\t\t$emit() {\n\t\t\t}\n\t\t}\n\t\tconst data = new Observer({\n\t\t\ta: 1\n\t\t});\n\t\tcoonsole.log(data.a) // console: 1\n\t\tdata.$on(&#39;a&#39;, (newValue, oldValue) =&gt; {\n\t\t\t// this === data\n\t\t\tconsole.log(newValue, oldValue);\n\t\t});\n\t\tdata.a = 2 // console: 2 1\n\n\t\n',
    answer: '待补充',
    types: ['前端领域', 'JavaScript'],
    tags: ['defineProperty', 'vue', 'js', '逻辑'],
  },
  {
    name: '请简要描述<script>标签defer或async属性的作用，以及二者的区别',
    desc: '',
    answer:
      '### 作用：\ndefer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。\n### 区别：\ndefer与async的区别是：前者要等到整个页面正常渲染结束，才会执行；后者一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。',
    types: ['前端领域', 'HTML'],
    tags: ['async'],
  },
  {
    name: '原型链、this指针、自有属性考察',
    desc: '```javascript\nvar a= function () { this.b =3; }\nvar c = new a();\na.protorype.b = 9;\nvar b = 7;\na();\n```\n问：\n```javascript\nconsole.log(b);\nconsole.log(c.b); \n```\n分别输出什么？',
    answer: '- 第一个 `b = 3`\n- 第二个 `c.b = 3`',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'Cookie 和 Session 有什么区别',
    desc: '<div style="white-space: pre;">如题\n</div>',
    answer:
      '<div style="white-space: pre;">cookie 在浏览器中存在，并且每个请求都会带上，而且是可以设置失效时间的，失效前就会有效。 session 是一次会话有效，也就是说，浏览器关闭 session 就会失效。 其实这道题目考察的一个重点是在于，session 这种机制是怎么在浏览器中实现的呢？ 实际上 session 的实现也是在浏览器中放了一个 cookie，失效时间是一次会话失效。\n</div>',
    types: ['前端领域'],
    tags: ['基础概念'],
  },
  {
    name: 'JS异步队列macrotask和microtask',
    desc: '```\nconsole.log(&#39;begin&#39;)\nsetTimeout(() =&gt; {\n\tconsole.log(&#39;setTimeout 1&#39;)\n\tPromise.resolve().then(() =&gt; {\n\t\tconsole.log(&#39;promise 1&#39;)\n\t\tsetTimeout(() =&gt; {\n\t\t\tconsole.log(&#39;setTimeout2 between promise1&amp;2&#39;)\n\t\t})\n\t}).then(() =&gt; {\n\t\tconsole.log(&#39;promise 2&#39;)\n\t})\n}, 0)\nconsole.log(&#39;end&#39;)\n```',
    answer: '```\nbegin\nend\nsetTimeout 1\npromise 1\npromise 2\nsetTimeout2 between promise1&amp;2\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['promise', '异步', 'js'],
  },
  {
    name: '如何理解虚拟DOM?',
    desc: '如何理解虚拟DOM?',
    answer: '对虚拟dom和diff算法中的一些细节理解与考察，[https://github.com/livoras/blog/issues/13](https://github.com/livoras/blog/issues/13)',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '如何判断一个 JS 对象为空对象',
    desc: '如何判断一个 JS 对象为空对象 ？空对象形如`{}`',
    answer:
      '1. 使用 `for in`\n\t```javascript\n\tfunction isEmptyObject(obj){\n  \tfor(var key in obj){\n    \treturn false\n\t\t};\n\t\treturn true\n\t};\n\t```\n2. 通过 JSON.stringify 方法来判断\n\t```javascript\n\tif(JSON.stringify({}) === &#39;{}&#39;){\n\t\tconsole.log(&#39;empty obj&#39;);\n\t}\n\t```\n3. 使用 ES6 增加的 Object.keys()\n\t```javascript\n\tif(Object.keys(obj).length === 0){\n\t\tconsole.log(&#39;empty obj&#39;);\n\t}\n\t```',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'js'],
  },
  {
    name: '什么是闭包？实现每隔1秒输出数组中的一个数字',
    desc: '解释下js中的闭包概念，解释OK，给出编程题目考察基本功',
    answer:
      '```js\nfunction fun(arr) {\n    var i, len;\n    for (i = 0, len = arr.length; i &lt; len; i++) {\n      (function(i){\n        setTimeout(function() {\n          console.log(i);\n        }, i * 1000);\n      })(i);\n    }\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'promise运行过程解答',
    desc: '如下代码的运行结果是什么？\n```javascript\n process.nextTick(() =&gt; {console.log(&#39;nextTick&#39;)})\nPromise.resolve().then(()=&gt; {console.log(&#39;promise1&#39;);}).then(()=&gt; {\n  console.log(&#39;promise2&#39;);\n});\nsetImmediate(() =&gt; {console.log(&#39;setImmediate&#39;)})\nconsole.log(&#39;end&#39;) \n\n```',
    answer:
      '1. end -&gt; nextTick -&gt; promise1 -&gt; promise2-&gt; setImmediate\n1. process.nextTick 和 promise.then 都属于 microtask，而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。\n1. 事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。',
    types: ['前端领域'],
    tags: ['编码', 'promise', '异步'],
  },
  {
    name: '请简述常见web安全及防护原理',
    desc: '常见web安全及防护原理，请举例说明。',
    answer:
      '1、SQL注入原理  \n\t\t就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令。\n总的来说有以下几点  \n1. 永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双&#34;-&#34;进行转换等。\n2. 永远不要使用动态拼装SQL，可以使用参数化的SQL或者直接使用存储过程进行数据查询存取。\n3. 永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。\n4. 不要把机密信息明文存放，请加密或者hash掉密码和敏感的信息。  \n2、XSS原理及防范  \nXss(cross-site scripting)攻击指的是攻击者往Web页面里插入恶意 html标签或者JavaScript代码。\n看似安全的链接，骗取用户点击后，窃取cookie中的用户私密信息；或者攻击者在论坛中加一个恶意表单，\n当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点。\nXSS防范方法  \n首先代码里对用户输入的地方和变量都需要仔细检查长度和对”&lt;”,”&gt;”,”;”,”’”等字符做过滤；其次任何内容写到页面之前都必须加以encode，避免不小心把html tag 弄出来。这一个层面做好，至少可以堵住超过一半的XSS 攻击。\n首先，避免直接在cookie 中泄露用户隐私，例如email、密码等等。\n其次，通过使cookie 和系统ip 绑定来降低cookie 泄露后的危险。这样攻击者得到的cookie 没有实际价值，不可能拿来重放。\n如果网站不需要再浏览器端对cookie 进行操作，可以在Set-Cookie 末尾加上HttpOnly 来防止javascript 代码直接获取cookie 。\n\n3、CSRF原理及防范  \nCSRF的防御\n服务端的CSRF方式方法很多样，但总的思想都是一致的，就是在客户端页面增加伪随机数。\n通过验证码的方法',
    types: ['前端领域', 'JavaScript'],
    tags: ['安全', 'web'],
  },
  {
    name: '数字格式化问题:1234567890 --> 1,234,567,890',
    desc: '数字格式化问题,将1234567890 --&gt; 1,234,567,890',
    answer:
      '非正则实现\n```javascript\nlet test = &#39;1234567890&#39;\nfunction formatCash(str) {\n  let arr = []\n  for (let i = 1; i &lt; str.length; i++) {\n    if (str.length % 3 &amp;&amp; i == 1)\n      arr.push(str.substr(0, str.length % 3))\n    if (i % 3 === 0)\n      arr.push(str.substr(i - 2, 3))\n  }\n  return arr.join(&#39;,&#39;)\n}\nconsole.log(formatCash(test)) // 1,234,567,890\n```\n正则实现\n```javascript\nlet test1 = &#39;1234567890&#39;\nlet format = test1.replace(/\\B(?=(\\d{3})+(?!\\d))/g, &#39;,&#39;)\nconsole.log(format) // 1,234,567,890\n```',
    types: ['前端领域'],
    tags: ['数字格式化', '编码', '正则表达式'],
  },
  {
    name: '模拟实现loadash中的_.get()函数，实现如下传入参数取值效果',
    desc: '```javascript\nfunction get() {\n  // 请补全函数参数和实现逻辑\n}\nconst obj = { selector: { to: { toutiao: &#39;FE coder&#39; } }, target: [1, 2, { name: &#39;byted&#39; }] };\n// 运行代码\nget(obj, &#39;selector.to.toutiao&#39;, &#39;target[0]&#39;, &#39;target[2].name&#39;)\n\n//  输出结果：\n// [&#39;FE coder&#39;, 1, &#39;byted&#39;]\n```',
    answer:
      '```javascript\nconst get = (from, ...selectors) =&gt;\n  [...selectors].map(s =&gt;\n    s\n      .replace(/\\[([^\\[\\]]*)\\]/g, &#39;.$1.&#39;)\n      .split(&#39;.&#39;)\n      .filter(t =&gt; t !== &#39;&#39;)\n      .reduce((prev, cur) =&gt; prev &amp;&amp; prev[cur], from)\n  );\n```\n1. Use Array.map() for each selector\n2. String.replace() to replace square brackets with dots\n3. String.split(&#39;.&#39;) to split each selector\n4. Array.filter() to remove empty values\n5. Array.reduce() to get the value indicated by it',
    types: ['前端领域', 'JavaScript'],
    tags: ['js对象'],
  },
  {
    name: '合并两个有序数组',
    desc: '合并两个有序数组',
    answer:
      '```\nfunction mergeSortedArray(a, b){\n  var merged = [], \n      aElm = a[0],\n      bElm = b[0],\n      i = 1,\n      j = 1;\n  if(a.length ==0)\n    return b;\n  if(b.length ==0)\n    return a;\n  while(aElm || bElm){\n   if((aElm &amp;&amp; !bElm) || aElm &lt; bElm){\n     merged.push(aElm);\n     aElm = a[i++];\n   }   \n   else {\n     merged.push(bElm);\n     bElm = b[j++];\n   }\n  }\n  return merged;\n}\n```\n验证\n```\nmergeSortedArray([2,5,6,9], [1,2,3,29]);\n结果 [1, 2, 2, 3, 5, 6, 9, 29]\n```',
    types: ['前端领域'],
    tags: ['编码', '编程', '有序数组'],
  },
  {
    name: '进行CSRF漏洞扫描的原理和防御方式是什么？',
    desc: '如题',
    answer:
      'CSRF 就是在用户不知情的情况下，发出了请求，让用户做了不该做的操作。\n举个例子，比如你的一个网站中有个 img 标签，src 指向的是微博关注某人的接口，\n那么当用户访问你的网站时，就会在微博上关注那个人，而且这个操作用户是不知情的。\n因为 img src 发出的跨域请求，也是会携带 cookie 的，所以如果用户在微博登录过，\n那么就会带有微博的登录授权。同理，如果是其他操作，可能也存在这种漏洞，比较危险的情况就是付款。\n一般会采用 CSRF token 的方式防御，就是关键请求得要换取一个一次有效的 token 才有权限。\n',
    types: ['前端领域'],
    tags: ['基础概念'],
  },
  {
    name: '判断一个字符串是否是回文字符串',
    desc: '判断一个字符串是否是回文字符串，回文字符串是对称字符串的形式，例如：did，eve, dad, level',
    answer:
      '```\nfunction isPalindrome(str){\n  var i, len = str.length;\n  for(i=0; i isPalindrome(&#39;madam&#39;)\n  = true\n&gt; isPalindrome(&#39;toyota&#39;)\n  = false\n```',
    types: ['前端领域'],
    tags: ['编码', '编程'],
  },
  {
    name: 'box-sizing 实践',
    desc: '<p><br></p><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;head&gt;\n    &lt;style&gt;\n      .box {\n        width: 10px;\n        height: 10px;\n        border: 1px solid red;\n        margin: 2px;\n        padding: 2px;\n        background: blue;\n      }\n\n      #borderBox {\n        box-sizing: border-box;\n      }\n\n      #contentBox {\n        box-sizing: content-box;\n      }\n    &lt;/style&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;div&gt;请问下面两个 div 元素，蓝色区域的宽高各是多少像素？&lt;/div&gt;\n    &lt;div id=&#34;borderBox&#34; class=&#34;box&#34;&gt;&lt;/div&gt;\n    &lt;div id=&#34;contentBox&#34; class=&#34;box&#34;&gt;&lt;/div&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</code></pre><p><br></p>',
    answer:
      '<p>borderBox：10px(width) - 1px(border) * 2 = 8px </p><p>contentBox 10px(width) + 2px(padding) *2 = 14px</p><p><br></p><p>答题要点：除了验证候选人是否真正了解 box-sizing 之外，也考察候选人是否了解 background 会影响元素的 padding 区域，而不影响 margin 区域这个特点</p>',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '链式调用+延迟计算',
    desc: '<p>写一个加法函数sum，支持sum(1)(2)(3,4)(5,6,7....)</p><p><br></p><p>console.log(sum(1,2,3)(4)) =&gt; 输出 10</p><p><br></p><p><br></p><p>考察链式调用，闭包，延迟计算，函数toStirng/valueOf</p><p><br></p><p><br></p><p><br></p>',
    answer:
      '<p><br></p><pre><code>function sum(...args) {\n  function next(...innerArgs) {\n    args.push(...innerArgs);\n    return next;\n  }\n  next.valueOf = next.toString = () =&gt; {\n    return args.reduce((r, c) =&gt; r + c, 0);\n  };\n\n  return next;\n}</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '前端编码'],
  },
  {
    name: '请描述micro task 与 macro task的区别及应用',
    desc: '<p><br></p><pre><code>async function async1() {\n  console.log(&#39;async1 start&#39;);\n  await async2();\n  console.log(&#39;async1 end&#39;);\n}\nasync function async2() {\n  console.log(&#39;async2&#39;);\n}\n\nconsole.log(&#39;script start&#39;);\nsetTimeout(function() {\n    console.log(&#39;setTimeout&#39;);\n}, 0);  \nasync1();\nnew Promise(function(resolve) {\n    console.log(&#39;promise1&#39;);\n    resolve();\n  }).then(function() {\n    console.log(&#39;promise2&#39;);\n});\nconsole.log(&#39;script end&#39;);</code></pre><p><br></p>',
    answer: '<p>script start</p><p>async1 start</p><p>async2</p><p>promise1</p><p>script end</p><p>async1 end</p><p>promise2</p><p>setTimeout</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['promise', 'task'],
  },
  {
    name: '数组flat函数设计',
    desc: '设计一个flat函数将如下数组arr=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]]输出为1,2,&#39;3&#39;,4,&#39;5&#39;,6,7,8,9。至少写出两种方法,要求不能改变数组中的原始数据类型',
    answer:
      '*  方法一：递归\n```javascript\nfunction flat(array) {\n    var result = [];\n    var each = function(arr) {\n      arr.forEach(item =&gt; {\n        if (item instanceof Array) {\n          each(item);\n        } else {\n          result.push(item);\n        }\n      });\n    };\n    each(array);\n    return result;\n  }\nvar arr=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]];flat(arr).forEach(item=&gt;{console.log(item)})\n\n```\n*  方法二：toString（格式转换），无法保证类型\n```javascript\nArray.prototype.toString = function() {\n  return this.join(&#39;,&#39;);\n};\nconsole.log([1,2,[3,4,[5,6,7]]]+&#39;&#39;);\n```\n*  方法三：Iterator\n```javascript\nArray.prototype[Symbol.iterator] = function() {\n  let arr = [].concat(this),\n    index = 0;\n  let getFirst=function(array){\n    let first=array[0];\n    if(first instanceof Array){\n      return getFirst(array[0])\n    }else if(first!==undefined){\n      return array.shift()\n    }else{\n      return &#39;&#39;\n    }\n  }\n  return {\n    next: function() {\n      let item=getFirst(arr);\n      if(item){\n        return {\n          value:item,\n          done:false\n        }\n      }else{\n        return {\n          done:true\n        }\n      }\n    }\n  }\n}\nvar t=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]];\nfor(let i of t){console.log(i)}\n```',
    types: ['前端领域'],
    tags: ['ES', '编码', '基础算法'],
  },
  {
    name: '存储在 Cookie 和 localStorage 内有什么区别',
    desc: '基础题考察 cookie 和 localStorage 的理解。',
    answer: '存储在 Cookie 中每个 request 都会带上，而放在 localStorage 中，仅有浏览器中会存储。',
    types: ['前端领域', '浏览器'],
    tags: [],
  },
  {
    name: '请说说HTML的Meta标签的用途，并列举一些常用的meta标签',
    desc: '',
    answer:
      '考察对网页结构和语义的理解 \n\n```\nThe HTML  element represents metadata that cannot be represented by other HTML meta-related elements, like , , ',
    types: ['前端领域', 'HTML'],
    tags: ['基础'],
  },
  {
    name: '说说前端优化？图片懒加载原理是什么？',
    desc: '* 考察前端的一些优化方式\n* 图片懒加载原理',
    answer:
      '1. 优化手段：雅虎的34条优化手段，比如：代码压缩、减少请求、cdn、缓存\n2. 图片懒加载原理：img标签设置占位属性(data-src)，存储真正的图片地址；原src设置占位图片地址；当图片(快)进入用户可视区域的时候进行地址替换；',
    types: ['前端领域', '渲染框架'],
    tags: ['优化'],
  },
  {
    name: '请谈谈你对ES6的箭头函数的理解',
    desc: '```\nvar func1 = x =&gt; x;\nvar func2 = x =&gt; {x}; \nvar func3 = x =&gt; ({x});\nconsole.log(func1(1));\nconsole.log(func2(1));\nconsole.log(func3(1));\n```\n请写出程序运行结果。',
    answer: '程序运行结果为：<br>\n第一个：1 <br>\n第二个：undefined <br>\n第三个：{x: 1}  <br>',
    types: ['前端领域', 'JavaScript'],
    tags: ['es6'],
  },
  {
    name: '无重复字符的最长子串',
    desc: '<p>给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。</p><h3>样例：</h3><p><br></p><ul><li>输入: &#34;abcabcbb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;abc&#34;，所以其长度为 3。</p><ul><li>输入: &#34;bbbbb&#34;</li></ul><p>输出: 1</p><p>解释: 因为无重复字符的最长子串是 &#34;b&#34;，所以其长度为 1。</p><ul><li>输入: &#34;pwwkew&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;wke&#34;，所以其长度为 3。</p><ul><li>输入: &#34;dvdf&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;vdf&#34;，所以其长度为 3。</p><ul><li>输入: &#34;asjrgapa&#34;</li></ul><p>输出: 6</p><p>解释: 因为无重复字符的最长子串是 &#34;sjrgap&#34;，所以其长度为 6。</p><ul><li>输入: &#34;aabaab!bb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;ab!&#34;，所以其长度为 3。</p><ul><li>输入: &#34;abcb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;abc&#34;，所以其长度为 3。</p><ul><li>输入: &#34;asljlj&#34;</li></ul><p>输出: 4</p><p>解释: 因为无重复字符的最长子串是 &#34;aslj&#34;，所以其长度为 4。</p><ul><li>输入: &#34;qwnfenpglqdq&#34;</li></ul><p>输出: 8</p><p>解释: 因为无重复字符的最长子串是 &#34;fenpglqd&#34;，所以其长度为 8。</p><h3><br></h3><p><br></p>',
    answer:
      '<p><br></p><pre><code>var lengthOfLongestSubstring = function(s: string) {\n    let list = s.split(&#34;&#34;);\n    let son = [];\n    let max = [];\n    for (let i = 0; i &lt; list.length; i++) {\n        let current = list[i];\n        let index = son.indexOf(current);\n        if (index === -1) {\n            son.push(current);\n        } else {\n            let sameIndex = i - son.length + index;\n            if (son.length &gt; max.length) {\n                max = [...son];\n            }\n            son = son.slice(sameIndex + 1, son.length);\n            son.push(current);\n        }\n    }\n    return max.length;\n};</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '字符串'],
  },
  {
    name: '列举一个近期做的最能体现设计能力的项目',
    desc: '请举出一个你近期做的项目，项目需要最能体现设计能力,  请从以下角度说明：\n1. 项目描述\n2. 技术选型\n3. 模块化\n4. 模块之间通信\n5. 工程化\n6. 前后端数据流 ',
    answer: '这是一个开放式的工程设计题目，没有固定答案，评分参考评分标准',
    types: ['前端领域'],
    tags: ['设计模式'],
  },
  {
    name: '实现一个 JSONP',
    desc: '函数签名如下:\n\n```javascript\nfunction jsonp(url, callback) {\n  // TODO\n}\n```',
    answer:
      '主要考察如何处理第二个参数 `callback` 的问题，\n加分项比如超时处理 onerror 的处理, xss 考虑等等\n\n```\nconst kCallBackMap = {};\nfunction uuid() {\n  return ...;\n}\n\nfunction jsonp(url, callback) {\n  const callbackId = uuid();\n  url += &#39;callback=&#39; + callbackId;\n\twindow[calbackId] = callback;\n\t\n\tconst script = document.createElement(&#39;script&#39;);\n\tscript.src = url;\n\tdocument.head.appendChild(script);\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['jsonp'],
  },
  {
    name: '请谈一谈JAVAscript的作用域和this',
    desc: '```\ninner = &#39;window&#39;;\n\nfunction say() {\n    console.log(inner);\n    console.log(this.inner);\n}\n\nvar obj1 = (function() {\n    var inner = &#39;1-1&#39;;\n    return {\n        inner: &#39;1-2&#39;,\n        say: function() {\n            console.log(inner);\n            console.log(this.inner);\n        }\n    }\n})();\n\nvar obj2 = (function() {\n    var inner = &#39;2-1&#39;;\n    return {\n        inner: &#39;2-2&#39;,\n        say: function() {\n            console.log(inner);\n            console.log(this.inner);\n        }\n    }\n})();\n\n\nsay();\nobj1.say();\nobj2.say();\nobj1.say = say;\nobj1.say();\nobj1.say = obj2.say;\nobj1.say();\n```',
    answer:
      '```\nwindow\nwindow\n\n1-1\n1-2\n\n2-1\n2-2\n\nwindow\n1-2\n\n2-1\n1-2\n\n主要考察javascript的作用域和this指向。作用域是静态的，声明时确定；this是动态的，运行时确定。\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', '语言关键字'],
  },
  {
    name: '请问CSS position有哪些定位方式',
    desc: 'CSS position有哪些定位方式，每种方式是如何定位的？',
    answer:
      '### position取值\nrelative, fixed，absolute和staic、sticky 5种\n### 定位方式\n*  staic-默认位置；元素会像通常那样流入页面。顶部，底部，左，右，z-index属性不适用。  \n*  relative-元素的位置相对于自身进行调整，而不改变布局（从而为未被定位的元素留下一个空白）。  \n*  absolute-该元素从页面的流中移除，并相对于其最近位置的祖先定位（非static）在指定位置，如果有的话，或者与初始包含块相对。绝对定位的框可以有边距，并且不会与其他边距折叠。这些元素不影响其他元素的位置。  \n*  fixed元素是定位在相对于窗口。  \n*  sticky，是相对定位和固定定位的混合。该元素被视为相对位置，直到它越过指定的阈值，此时它被视为固定位置。  \n',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '请介绍一下Oauth2.0 的认证过程',
    desc: '如题',
    answer:
      '可以参考 http://www.jianshu.com/p/0db71eb445c8 或者 \nhttp://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html 的答案，\n回答的一个重点是 code（授权码）仅一次有效，并且要有失效时间，而且很短，比如一分钟，\n因为浏览器收到会立刻跳转。\n还有就是服务端可以根据 code 结合相应的 sercet 去获取 token，要说清楚。',
    types: ['前端领域'],
    tags: ['安全', 'oauth'],
  },
  {
    name: 'express中间件的原理',
    desc: '<div style="white-space: pre;">express中间件的实现原理 并给出实现\n</div>',
    answer:
      '<div style="white-space: pre;">主要考察候选人对中间件的理解 参考代码 ``` export default function compose(...funcs) { if (funcs.length === 0) { return arg =&gt; arg } if (funcs.length === 1) { return funcs[0] } return funcs.reduce((a, b) =&gt; (...args) =&gt; a(b(...args))) } ``` koa中间件主要使用 generator和promise可参考https://github.com/tj/co\n</div>',
    types: ['前端领域'],
    tags: ['编码'],
  },
  {
    name: '实现es6字符串模板方法sprintf',
    desc: '<p><br></p><pre><code>const template = &#34;My name is ${name},I&#39;m from ${city}&#34;;\nconst result = sprintf(template, {\n\tname: &#39;Yiming Zhang&#39;,\n\tcity: &#39;FuJian&#39;,\n});\nconsole.log(result); // My name is Yiming Zhang,I&#39;m from FuJian</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>const sprintf = (str, data) =&gt; (\n    Object.keys(data).reduce((prev, cur) =&gt; {\n        let reg = new RegExp(&#39;\\\\$\\\\{&#39; + cur + &#39;\\\\}&#39;, &#39;g&#39;);\n        return prev.replace(reg, data[cur]);\n    }, str);\n);</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '正则表达式', '前端基础', 'es6'],
  },
  {
    name: '登录表单设计/扫码登录/第三方登录',
    desc: '1. 请实现一个登录表单\n2. 用GET方法行不行？csrf是什么？如何防御？\n3. cookie-sesssion的工作机制\n4. 你已经登录产品的App端，要在web实现扫码登录，该如何设计？\n5. 接入第三方登录（如微信），如何设计？',
    answer:
      '1. 正确书写html\n2. 正确回答GET和POST的区别，从语义、弊端、安全等方面。csrf的防御：token，samesite，referer校验（弊端）等\n3. 正确理解cookie-session的工作机制，sessionId的设计，存储\n4. 考察对司空见惯的扫码登录，是否有思考其实现。正确设计 Client/Server/App 三方流程，设计二维码存储的内容，client通知有轮训或websocket等解决方案\n5. 正确理解 Client/Server/App/Weixin Server 四方流程，理解oauth2协议',
    types: ['前端领域', 'HTML'],
    tags: ['扫码登录'],
  },
  {
    name: '作用域以及变量提升',
    desc: '### 请写出下题的结果：\n```\nvar a = 1; \nfunction b() { \n    a = 10; \n    return; \n    function a() {} \n} \nb(); \nconsole.log(a);   \n```',
    answer: '结果：1',
    types: ['前端领域'],
    tags: ['语言基础', '基础概念', '提升'],
  },
  {
    name: 'setTimeout 和 Promise',
    desc: '<p>请写出程序的输出内容</p><pre><code>setTimeout(function() {\n  console.log(1)\n}, 0);\nnew Promise(function(resolve) {\n  console.log(2);\n  for(var i=0 ; i &lt; 10000 ; i++) {\n    if (i == 9999) {\n      resolve();\n    }\n  }\n  console.log(3);\n}).then(function() {\n  console.log(4);\n});\nconsole.log(5);</code></pre><p><br></p>',
    answer: '<p>正确答案：2 3 5 4 1。重点关注：候选人是否把 2 写在第一位，以及 4 和 1 的顺序。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'requestIdleCallback和requestAnimationFrame有什么区别？',
    desc: '<p>\t<strong>requestIdleCallback和requestAnimationFrame有什么区别？</strong></p>',
    answer:
      '<p>\trequestAnimationFrame的回调会在每一帧确定执行，属于高优先级任务，而requestIdleCallback的回调则不一定，属于低优先级任务。</p><p>\t我们所看到的网页，都是浏览器一帧一帧绘制出来的，通常认为FPS为60的时候是比较流畅的，而FPS为个位数的时候就属于用户可以感知到的卡顿了。</p><p>\t一帧包含了用户的交互、js的执行、以及requestAnimationFrame的调用，布局计算以及页面的重绘等工作。</p><p>\t假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调。</p><p>\t由于requestIdleCallback利用的是帧的空闲时间，所以就有可能出现浏览器一直处于繁忙状态，导致回调一直无法执行，这其实也并不是我们期望的结果（如上报丢失），那么这种情况我们就需要在调用requestIdleCallback的时候传入第二个配置参数timeout了。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件循环'],
  },
  {
    name: '请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率>=n的元素列表',
    desc: '请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率&gt;=n的元素列表',
    answer:
      '`\nArray.prototype.findDuplicate = function (n) {\n    var results = [];\n    if (typeof n != &#39;number&#39; || isNaN(n)) {\n        return results;\n    }\n    \n    var itemFreqs = {};\n    this.forEach(function (item) {\n        if (!itemFreqs[item]) {\n            itemFreqs[item] = 0;\n        }\n        itemFreqs[item] ++;\n    });\n    \n    for (var item in itemFreqs) {\n        if (itemFreqs[item] &gt;= n) {\n            results.push(item);\n        }\n    }\n    \n    return results;\n}\n\n`',
    types: ['前端领域'],
    tags: ['编码', '前端编码'],
  },
  {
    name: '请回答DOM中对应创建、移除、追加、复制、查找节点的方法是什么？',
    desc: '考察候选人对原生dom操作的方法的理解和掌握熟练程度',
    answer:
      '1.  创建新节点\n\t*  createDocumentFragment() //创建一个DOM片段\n\t*  createElement() //创建一个具体的元素\n\t*  createTextNode() //创建一个文本节点\n\n1.  克隆节点\n*  cloneNode()\n\n1. 添加节点\n*  appendChild()\n*  insertBefore()\n\n1. 移除节点\n*  removeChild()\n\n1. 替换节点\n*  replaceChild()\n\n1. 查找节点\n*  querySelector()\n*  querySelectorAll()\n*  getElementById()\n*  getElementsByName()\n*  getElementsByTagName()\n\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['dom'],
  },
  {
    name: '请描述如何用原生JS实现数字的货币格式化',
    desc: '<p># 如何用原生JS实现数字的货币格式化，例如数字6123456789格式化后为6,123,456,789，不低于两种方法。</p>',
    answer:
      '<p>方法一： (6123456789).toLocaleString(&#39;en-US&#39;) // 6,123,456,789</p><p><br></p><p>方法二： (6123456789).toString().split(&#39;&#39;).reverse().join(&#39;&#39;).replace(/\\d{3}/g,function($1){return $1+&#39;,&#39;}).split(&#39;&#39;).reverse().join(&#39;&#39;) </p><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['数字格式化', 'js'],
  },
  {
    name: 'let,const,var的区别',
    desc: '请说明一下let,const,var的区别 并回答如下代码会不会报错\n```\nconst a = {};\na.test = 1;\n```',
    answer:
      '考察候选人对es6变量声明的理解\n1. let声明的变量拥有块级作用域\n2. let声明的全局变量不是全局对象的属性\n3. let不能重新声明变量\n4. const声明的变量与let声明的变量类似，它们的不同之处在于，const声明的变量只可以在声明时赋值，不可随意修改，否则会导致SyntaxError（语法错误）。\n\n上面代码只是针对a的引用 并不会报错',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '如何实现链式调用',
    desc: '请实现函数 a, b, c，使调用方式为 a().b().c() 时，结果为输出 a b c。\n如果上面问题回答出来了，并且是在 a 函数内部 return Object 实现，\n那么可以补充问下如何能够实现让三个函数任意链式顺序调用。\n如 a().c().b() 或 b().a().c() 。\n',
    answer:
      '这道题主要就是考察面试者对 JavaScript 的 Object 概念理解是否清晰，\n最好的答案是直接将 a b c 三个函数挂载到 runtime 中的某个全局变量中，比如可以是 window。\n然后在每个函数内 return window 就可以了。\n当然，也可以按照第一道题目的顺序，分别在相应函数内 return 下个函数，但是这样做无法调换顺序。',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: '实现千位分隔符',
    desc: '给一个数字，比如：1234567.90，转化成：1,234,567.90',
    answer:
      '```js\nfunction commafy(num) {\n  return num &amp;&amp; num\n      .toString()\n      .replace(/^\\d+/, (m) =&gt; m.replace(/(?=(?!^)(\\d{3})+$)/g, &#39;,&#39;));\n}\nconsole.log(commafy(1234567.90)); //1,234,567.90\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础算法'],
  },
  {
    name: '编写javascript深度克隆函数deepClone',
    desc: '编写javascript深度克隆函数deepClone',
    answer:
      '```javascript\nfunction deepClone(obj) {\n    var _toString = Object.prototype.toString;\n\n    // null, undefined, non-object, function\n    if (!obj || typeof obj !== &#39;object&#39;) {\n        return obj;\n    }\n\n    // DOM Node\n    if (obj.nodeType &amp;&amp; &#39;cloneNode&#39; in obj) {\n        return obj.cloneNode(true);\n    }\n\n    // Date\n    if (_toString.call(obj) === &#39;[object Date]&#39;) {\n        return new Date(obj.getTime());\n    }\n\n    // RegExp\n    if (_toString.call(obj) === &#39;[object RegExp]&#39;) {\n        var flags = [];\n        if (obj.global) { flags.push(&#39;g&#39;); }\n        if (obj.multiline) { flags.push(&#39;m&#39;); }\n        if (obj.ignoreCase) { flags.push(&#39;i&#39;); }\n\n        return new RegExp(obj.source, flags.join(&#39;&#39;));\n    }\n\n    var result = Array.isArray(obj) ? [] :\n        obj.constructor ? new obj.constructor() : {};\n\n    for (var key in obj ) {\n        result[key] = deepClone(obj[key]);\n    }\n\n    return result;\n}\n\nfunction A() {\n    this.a = a;\n}\n\nvar a = {\n    name: &#39;qiu&#39;,\n    birth: new Date(),\n    pattern: /qiu/gim,\n    container: document.body,\n    hobbys: [&#39;book&#39;, new Date(), /aaa/gim, 111]\n};\n\nvar c = new A();\nvar b = deepClone(c);\nconsole.log(c.a === b.a);\nconsole.log(c, b);\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '请谈谈你对JS单线程以及setTimeout的理解',
    desc: '```javascript\nsetTimeout(function() {\n\tsetTimeout(function() { console.log(1) }, 100)\n\tconsole.log(2)\n\tsetTimeout(function() { console.log(3) }, 0)\n}, 0)\nsetTimeout(function () {\n\tconsole.log(4)\n}, 100)\nconsole.log(5)\n```\n请说出上面代码的输出顺序以及原因？如果吧4改为101ms呢？',
    answer:
      '正确顺序为：5 2 3 4 1\n如果4改为101ms则执行顺序还是不变\n原因：\n1.  JS单线程\n2. setTimeout不在当前eventloop。且执行顺序依赖入队顺序。setTimeout 0是放入下一个loop的队尾\n3. 虽然4和1都是100ms延迟的标记，但是4先入队列。\n4. setTimeout的time是个标记，会在eventloop循环去检测，符合条件的执行，不符合条件的延后到下一个eventloop，这执行过程本身又有时间，因此尽管101&gt;100，但是在一个执行周期内，他们都会被触发，4先入队所以不变',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', 'js'],
  },
  {
    name: 'async & forEach 考察',
    desc: '以下代码的运行结果\n```javascript\nconst list = [1, 2, 3];\nconst square = num =&gt; {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(num * num);\n        }, 1000);\n    });\n}\nfunction test() {\n    list.forEach(async x =&gt; {\n        const res = await square(x);\n        console.log(res);\n    });\n}\ntest()\n```\n如果希望每隔1s输出一个结果，应该如何改造？',
    answer:
      '1s 后输出 1 4 9  \n改为 for 循环：\n```javascript\nasync function test() {\n    for (let x of list) {\n        const res = await square(x);\n        console.log(res)\n    }\n}\n```\n',
    types: ['前端领域'],
    tags: ['编码', '代码阅读'],
  },
  {
    name: 'css单位的百分比',
    desc: '给一个div设置它父级div的宽度是100px，然后再设置它的padding-top为20%。 <br>\n问现在的div有多高？如果父级元素定位是absolute呢？',
    answer:
      '现有div的高度等于自身高度+父级块的宽度*20%,如果父级元素定位是absolute，结果不变；<br>\n当margin/padding取形式为百分比的值时，无论是left/right，还是top/bottom，都是以父元素的width为参照物的！<br>\n',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: 'NodeJS实现简单的HTTP代理和隧道代理',
    desc: 'Web代理一般包括普通的HTTP代理和隧道代理，谈谈理解。\nNodeJS实现一个简单的HTTP代理，如在本地 8888 端口开启 HTTP 代理服务，修改浏览器的 HTTP 代理为 127.0.0.1:8888 后再访问 HTTP 网站，代理可以正常工作\n对隧道代理了解多少，能否实现？',
    answer:
      'http普通代理：HTTP 客户端向代理发送请求报文，代理服务器需要正确地处理请求和连接（例如正确处理 Connection: keep-alive），同时向服务器发送请求，并将收到的响应转发给客户端。\n```\n// http 普通代理\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction request(cReq, cRes) {\n  const u = url.parse(cReq.url);\n\n  const options = {\n    hostname: u.hostname,\n    port: u.port || 80,\n    path: u.path,\n    method: cReq.method,\n    headers: cReq.headers\n  };\n\n  const pReq = http.request(options, pRes =&gt; {\n    cRes.writeHead(pRes.statusCode, pRes.headers);\n    pRes.pipe(cRes);\n  }).on(&#39;error&#39;, function(e) {\n    cRes.end();\n  });\n\n  cReq.pipe(pReq);\n}\n\nhttp.createServer().on(&#39;request&#39;, request).listen(8888, &#39;0.0.0.0&#39;);\n```\n隧道代理：HTTP 客户端通过 CONNECT 方法请求隧道代理创建一条到达任意目的服务器和端口的 TCP 连接，并对客户端和服务器之间的后继数据进行盲转发\n```\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction connect(cReq, cSock) {\n  const u = url.parse(&#39;http://&#39; + cReq.url);\n\n  const pSock = net.connect(u.port, u.hostname, function() {\n    cSock.write(&#39;HTTP/1.1 200 Connection Established\\r\\n\\r\\n&#39;);\n    pSock.pipe(cSock);\n  }).on(&#39;error&#39;, function(e) {\n    cSock.end();\n  });\n\n  cSock.pipe(pSock);\n}\n\nhttp.createServer().on(&#39;connect&#39;, connect).listen(8888, &#39;0.0.0.0&#39;);\n```\n合二为一\n```\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction request(cReq, cRes) {\n  const u = url.parse(cReq.url);\n\n  const options = {\n    hostname: u.hostname,\n    port: u.port || 80,\n    path: u.path,\n    method: cReq.method,\n    headers: cReq.headers\n  };\n\n  const pReq = http.request(options, pRes =&gt; {\n    cRes.writeHead(pRes.statusCode, pRes.headers);\n    pRes.pipe(cRes);\n  }).on(&#39;error&#39;, function(e) {\n    cRes.end();\n  });\n\n  cReq.pipe(pReq);\n}\n\nfunction connect(cReq, cSock) {\n  var u = url.parse(&#39;http://&#39; + cReq.url);\n\n  var pSock = net.connect(u.port, u.hostname, function() {\n    cSock.write(&#39;HTTP/1.1 200 Connection Established\\r\\n\\r\\n&#39;);\n    pSock.pipe(cSock);\n  }).on(&#39;error&#39;, function(e) {\n    cSock.end();\n  });\n\n  cSock.pipe(pSock);\n}\n\nhttp.createServer()\n  .on(&#39;request&#39;, request)\n  .on(&#39;connect&#39;, connect)\n  .listen(8888, &#39;0.0.0.0&#39;);\n```\n需要注意的是，大部分浏览器配完隧道代理，默认只会让https走隧道代理，http如果需要走隧道代理，还需要写个Nodejs的验证\n```\nconst options = {\n  hostname: &#39;127.0.0.1&#39;,\n  port: 8888,\n  path: &#39;toutiao.com:80&#39;,\n  method: &#39;CONNECT&#39;\n};\n\nconst req = http.request(options);\n\nreq.on(&#39;connect&#39;, function(res, socket) {\n  socket.write(&#39;GET / HTTP/1.1\\r\\n&#39; +\n    &#39;Host: toutiao.com\\r\\n&#39; +\n    &#39;Connection: Close\\r\\n&#39; +\n    &#39;\\r\\n&#39;);\n\n  socket.on(&#39;data&#39;, function(chunk) {\n    console.log(chunk.toString());\n  });\n\n  socket.on(&#39;end&#39;, function() {\n    console.log(&#39;socket end.&#39;);\n  });\n});\n\nreq.end();\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['代理'],
  },
  {
    name: '假设一个网页嵌入一个iframe,如何更改iframe内dom样式？',
    desc: '假设一个网页嵌入一个iframe,如何更改这个iframe内dom样式',
    answer:
      '区分同源和不同源解决方案，同源可以通过document.getElementById(&#39;iframeId&#39;).contentWindow.document，\n不同源：分iframe的嵌入的页面是否自己可控，可控可以通过postMessage方式更改，iframe页面监听message事件；如果页面不可控，应该无解。\n可以追问iframe有同源策略限制，举个例子说明',
    types: ['前端领域', '可视化'],
    tags: ['语言基础'],
  },
  {
    name: '数组随机排序',
    desc: '```javascript\nvar arr=[1,2,3,4,5,6]\n```\n',
    answer:
      '方法一、\n```javascript\narr.map(item=&gt;{\n    return {\n        value:item,\n        key:Math.random()\n    }\n})\n.sort((a,b)=&gt;a.key-b.key)\n.map(item=&gt;item.value)\n```\n方法二、\n```\nvar arrayToRand = (arr) =&gt; {\n    for(let i=0; i',
    types: ['前端领域'],
    tags: ['排序', '编码'],
  },
  {
    name: 'js事件模型',
    desc: '浏览器的事件模型？在当前的事件模型中，哪些事件可以冒泡，哪些不会冒泡，为什么？不冒泡的元素，如何来实现事件代理？',
    answer:
      '考察浏览器事件模型，看看是不是了解事件模型背后的设计意图。\n\n浏览器开发团队遇到的问题：页面上哪一部分会拥有某个特定的事件？比如单击一个嵌套的同心div，那么到底哪一个div会拥有这个点击事件？实际上难以确定点击者的意图，团队给出的解决方式是所有div都将拥有这个事件，于是产生了事件流模型。如上一个问题所述，“事件”的概念在GUI编程中如此之重要，而这种流式模型能给予其很大的灵活性和控制\n对于能精确确定意图的（这种冒泡的话一般也会带来问题，比如mouseleave），或者不可能产生嵌套的媒体类元素，冒泡就不是必须的；对于不冒泡的元素，可以在捕获阶段代理，DOM2级规范addEventListener的第三个参数',
    types: ['前端领域', 'JavaScript'],
    tags: ['js', '事件模型'],
  },
  {
    name: '请列举说明几个在web中实现长连接的技术方案或手段',
    desc: '本地主要考察候选人对长连接技术的概念理解和区分，如果能回答答出大致的名词可以继续追问一些具体的激技术实现细节和存在的优缺点等等。\n',
    answer:
      '参考答案：\n1. https://stackoverflow.com/questions/11077857/what-are-long-polling-websockets-server-sent-events-sse-and-comet/12855533#12855533\n1. https://blog.csdn.net/liang0000zai/article/details/40537059\n\n* Long Polling\n* Server-Sent Events\n* Websockets\n* Comet',
    types: ['前端领域'],
    tags: ['长连接', '基础概念', 'web'],
  },
  {
    name: '函数作用域',
    desc: '用代码实现JavaScript中Function的bind方法的polyfill',
    answer:
      '```\nif (!Function.prototype.bind) {\n  Function.prototype.bind = function (oThis) {\n    if (typeof this !== &#34;function&#34;) {\n      // closest thing possible to the ECMAScript 5\n      // internal IsCallable function\n      throw new TypeError(&#34;Function.prototype.bind - what is trying to be bound is not callable&#34;);\n    }\n\n    var aArgs = Array.prototype.slice.call(arguments, 1), \n        fToBind = this, \n        fNOP = function () {},\n        fBound = function () {\n          return fToBind.apply(this instanceof fNOP\n                                 ? this\n                                 : oThis || this,\n                               aArgs.concat(Array.prototype.slice.call(arguments)));\n        };\n\n    fNOP.prototype = this.prototype;\n    fBound.prototype = new fNOP();\n\n    return fBound;\n  };\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['函数作用域'],
  },
  {
    name: 'CSS 属性 box-sizing的值有哪些？分别有什么含义？',
    desc: 'CSS 属性 box-sizing的值有哪些？分别有什么含义？',
    answer: '  - `content-box` 默认值，width内容宽度\n\t- `border-box` width 包含`padding`和`border`',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: 'JS的new操作符具体做了什么',
    desc: 'JS的new操作符具体做了什么，描述一下，最好可以体现在代码上',
    answer:
      '```\nfunction A() {\n  this.name = &#39;a&#39;;\n  this.getName = function() {\n    return this.name;\n  }\n}\nvar a = new A();\n\nvar aa = new Object();\naa.__proto__ = A.prototype;\nA.call(aa);\n// 还有最后一步，如果发现A返回的是一个Object类（非primitive类型），则直接返回A的返回值，否则把aa返回出去\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', '语言关键字', 'js'],
  },
  {
    name: 'JS编码二叉树的实现与遍历',
    desc: 'JS编码实现一个二叉树的构造函数，包括节点类Node，树类BST，插入节点函数insert，\n并且满足\n1.左子节点的值 &lt; 父节点的值 &lt;= 右子节点的值\n2.可以实现先序，中序，后续遍历',
    answer:
      '```\n// 二叉树\nfunction BST() {\n  this.root = null;\n}\n\nBST.prototype.insert = function(data) {\n  var n = new Node(data, null, null);\n  if (this.root === null) {\n    this.root = n;\n  } else {\n    var current = this.root;\n    for (;;) {\n      if (data &lt; current.data) {\n        if (current.left === null) {\n          current.left = n;\n          break;\n        } else {\n          current = current.left;\n        }\n      } else {\n        if (current.right === null) {\n          current.right = n;\n          break;\n        } else {\n          current = current.right;\n        }\n      }\n    }\n  }\n}\n\n// 先序遍历\nBST.prototype.preOrder = function(node) {\n  if (node !== null) {\n    console.log(node.show() + &#34; &#34;);\n    this.preOrder(node.left);\n    this.preOrder(node.right);\n  }\n}\n\n// 中序遍历\nBST.prototype.inOrder = function(node) {\n  if (node !== null) {\n    this.inOrder(node.left);\n    console.log(node.show() + &#34; &#34;);\n    this.inOrder(node.right);\n  }\n}\n\n// 后序遍历\nBST.prototype.postOrder = function(node) {\n  if (node !== null) {\n    this.postOrder(node.left);\n    this.postOrder(node.right);\n    console.log(node.show() + &#34; &#34;);\n  }\n}\n\n// 节点对象\nfunction Node(data, left, right) {\n  this.data = data;\n  this.left = left;\n  this.right = right;\n  this.show = function() {\n    return this.data;\n  }\n}\n\n// 测试代码\nvar bst = new BST();\nvar nums = [10, 3, 18, 2, 4, 13, 21, 9, 8, 9];\nfor (var i = 0; i &lt; nums.length; i++) {\n  bst.insert(nums[i]);\n}\nbst.preOrder(bst.root);\nbst.inOrder(bst.root);\nbst.postOrder(bst.root);\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['树', '基础算法', 'js'],
  },
  {
    name: '简述一下src与href的区别',
    desc: '描述一下html中的src与href的区别和使用场景是什么',
    answer:
      '基本答案：src用于指向外部资源的位置替换当前元素，href用于在当前文档和引用资源之间确立联系。\n1.  src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；\n在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。\n\n浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。\n这也是为什么将js脚本放在底部而不是头部。\n \n1.  href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加\n\n那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。\n这也是为什么建议使用link方式来加载css，而不是使用@import方式。',
    types: ['前端领域', 'HTML'],
    tags: [],
  },
  {
    name: 'js运行机制',
    desc: '下面一段代码的输出：\n```\n(function() {\n  console.log(&#39;this is the start&#39;);\n  setTimeout(function cb() {\n    console.log(&#39;this is a msg from call back&#39;);\n  });\n  console.log(&#39;this is just a message&#39;);\n  setTimeout(function cb1() {\n    console.log(&#39;this is a msg from call back1&#39;);\n  }, 0);\n  console.log(&#39;this is the end&#39;);\n})();\n```',
    answer:
      '因为前端编程基本属于「Event-driven programming」范式，这是GUI之类的交互式程序的基础，区别于传统的批处理式编程。一个页面上的交互行为，基本都是由用户发起的，然而用户的行为意图是难以预测的，所以需要异步的驱动机制来应对\n因此有进一步问题：\n平时都说JS是单线程执行的，那它是如何实现非阻塞式执行页面JS的？<br>\n考察对EventLoop概念的理解，核心是会在调用栈之外建立一个Event Table。可以将Event Table想象成一个电话注册本：调用栈会告诉event table注册一些特定的函数，并且在指定事件发生时会调用他们。当这些指定事件发生时，event table仅仅是简单地把要调用的函数移入Event Queue中去。event queue提供了一个简单等待区域，函数在此区域内等待被移入调用栈进行调用。\n『究竟什么情况下，event queue中的函数才会被移入调用栈中？』。实际上，JavaScript 遵从一个简单的法则：存在一个监控进程不断检查调用栈是否为空，当调用栈为空的时候，检查事件队列（event queue）中是否有待调用的函数。如果事件队列中存在待调用的函数，队列头部的函数被移入调用栈执行。如果事件队列为空，监控进程就保持轮询状态。\n这意味着js中的定时器的精度，实际上是没有保障的，你写一个setTimeout(function(){ do xxxx}, 1000)； 并没办法保证它刚好是在1000ms之后调用，因为之前的代码执行可能非常耗时，也可能事件队列中有其他事件排在前面。 这样就出现了题目中的情况。\n更多可参考：http://metaphor.space/2016/04/26/javascript-event-loop/；  https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop；还有《你不知道的Javascript中卷》141页~143页，事件循环章节\n\n值得一提的是：我们平常说JS是单线程执行的，但浏览器不是，浏览器是多线程的，有的线程负责网络请求，有的负责渲染页面等；不要搞混了\n\n另外，ES6给JS带来了新的特性，比如加入了可以创建多线程的worker，以及更精准控制事件调度的Promise',
    types: ['前端领域', 'JavaScript'],
    tags: ['js'],
  },
  {
    name: '请问for of和for in的区别',
    desc: 'for of和for in的区别？ for of可以用在普通对象上吗？',
    answer:
      '考察候选人对for 循环的理解 以及对es6中的for of和iterator理解\n\nfor in不多做解释了 for of主要是对实现了 Symbol.iterator 接口进行遍历\n\n自定义for of\n```\nvar iterable = {\n  [Symbol.iterator]() {\n    return {\n      i: 0,\n      next() {\n        if (this.i &lt; 3) {\n          return { value: this.i++, done: false };\n        }\n        return { value: undefined, done: true };\n      }\n    };\n  }\n};\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['编码'],
  },
  {
    name: '字符串的排列组合计算',
    desc: '输入一个字符串，打印出该字符串中字符的所有排列的情况。例如输入字符串abc，则打印出由字符a、b、c所能排列出来的所有字符串abc、acb、bac、bca、cab和cba.\n```javascript\nfunction calc(str){\n    var strArray = str.split(&#39;&#39;);\n    // 补全代码\n  }\n  console.log(calc(&#39;ab&#39;)) // [&#39;a&#39;,&#39;b&#39;]  [&#39;b&#39;,&#39;a&#39;]\n```',
    answer:
      '```javascript\nfunction calc(str){\n    var strArray = str.split(&#39;&#39;);\n    var path = [];\n    var docalc = function(array){\n      if(array.length===1){\n        path.push(array[0]);\n        console.log(path);\n        path.pop();\n        return;\n      }\n      for(var i=0;i',
    types: ['前端领域'],
    tags: ['递归', '排列组合', '编码'],
  },
  {
    name: 'DOM中哪些事件是不冒泡的，如何判断事件是不是可以冒泡？',
    desc: 'DOM中哪些事件是不冒泡的，如何判断事件是不是可以冒泡？',
    answer:
      '*  不冒泡的事件有blur、focus、load、unload、abort、error、mouseenter、mouseleave、resize\n*  每个 event 都有一个event.bubbles属性，通过该属性可知是否冒泡',
    types: ['前端领域'],
    tags: ['事件', '基础概念'],
  },
  {
    name: 'JavaScript实现对象深拷贝方法',
    desc: '编码实现JavaScript实现对象深拷贝',
    answer:
      'var clone = function(v) {  \n  var o = v.constructor === Array ? [] : {};  \n  for (var i in v) {  \n    o[i] = typeof v[i] === &#34;Object&#34; ? clone(v[i]) : v[i];  \n  }  \n  return o;  \n}  ',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: '故障分析-HTTPS证书不被信任',
    desc: '<p>如下图，在不同的设备上，同时访问同一个域名，一个设备显示证书不被信任，另一个设备正常，再使用多个其他设备访问，依然正常。分析可能的原因？以及需要获取的进一步的信息？</p><p>正常的设备</p><img src="https://tosv.byted.org/obj/pgc-fes/marvel/ssl_success.png" width="375" alt="ssl_success.png"><p>异常的设备</p><img src="https://tosv.byted.org/obj/pgc-fes/marvel/ssl_error.png" width="375" alt="ssl_error.png"><p><br></p>',
    answer:
      '<p>需要进行的进一步的操作：</p><p>1) 查看证书详情：路径/SN/哈希值</p><p>2) 查看DNS解析结果</p><p>3) 查看系统时间/版本/浏览器版本</p><p>可能的原因：</p><p>1) 代理工具/安全软硬件</p><p>2) DNS劫持/路由劫持</p><p>3) 时间偏差</p><p>4) 操作系统/浏览器版本差异</p>',
    types: ['前端领域', '浏览器'],
    tags: ['HTTPS', '分析'],
  },
  {
    name: '请实现一个CodingMan函数实现以下功能',
    desc: '<p><br></p><pre><code>实现一个CodingMan，可以按照以下方式调用:\nCodingMan(“Hank”)输出:\nHi! This is Hank!\n\nCodingMan(“Hank”).sleep(10).eat(“dinner”)\n输出\nHi! This is Hank!\n//等待10秒..\nWake up after 10\nEat dinner~\n\nCodingMan(“Hank”).eat(“dinner”).eat(“supper”)\n输出\nHi This is Hank!\nEat dinner~\nEat supper~\n\nCodingMan(“Hank”).sleepFirst(5).eat(“supper”)\n输出\n//等待5秒\nWake up after 5\nHi This is Hank!\nEat supper\n以此类推。</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>class _CodingMan {\n    constructor(name) {\n        this.tasks = [];\n        const task = () =&gt; {\n            console.log(`Hi! This is ${name}`);\n            this.next();\n        }\n        this.tasks.push(task);\n        setTimeout(() =&gt; {               // 把 this.next() 放到调用栈清空之后执行\n            this.next();\n        }, 0);\n    }\n\n    next() {\n        const task = this.tasks.shift(); // 取第一个任务执行\n        task &amp;&amp; task();\n    }\n\n    sleep(time) {\n        this._sleepWrapper(time, false);\n        return this;                     // 链式调用\n    }\n\n    sleepFirst(time) {\n        this._sleepWrapper(time, true);\n        return this;\n    }\n\n    _sleepWrapper(time, first) {\n        const task = () =&gt; {\n            setTimeout(() =&gt; {\n                console.log(`Wake up after ${time}`);\n                this.next();\n            }, time * 1000)\n        }\n        if (first) {\n            this.tasks.unshift(task);     // 放到任务队列顶部\n        } else {\n            this.tasks.push(task);        // 放到任务队列尾部\n        }\n    }\n\n    eat(name) {\n        const task = () =&gt; {\n            console.log(`Eat ${name}`);\n            this.next();\n        }\n        this.tasks.push(task);\n        return this;\n    }\n}\n\nfunction CodingMan(name) {\n    return new _CodingMan(name);\n}\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['事件轮询机制', '队列', '链式调用', '编码', '闭包'],
  },
  {
    name: '实现如下函数add,使如下执行都等于9 ',
    desc: '<p><br></p><pre><code>add(2,3,4)=9\nadd(2)(3,4)=9\nadd(2)(3)(4)=9\nadd(2,3)(4)=9</code></pre><p><br></p>',
    answer:
      '<p>// 较通用的实现</p><p>function currying(fn, length) {</p><p> length = length || fn.length; \t</p><p> return function (...args) {\t\t\t</p><p>  return args.length &gt;= length\t</p><p>  \t? fn.apply(this, args)\t\t\t</p><p>   : currying(fn.bind(this, ...args), length - args.length) </p><p> }</p><p>}</p><p>function add(...args) {</p><p>\treturn args.reduce((t, i) =&gt; t+=i)</p><p>}</p><p>var newAdd = currying(add, 3)</p><p><br></p><p>// 通用实现2</p><p>function currying(fn, length) {</p><p>\treturn function(...args) {</p><p>\t\tif (args.length &gt;= length) {</p><p>\t\t\treturn args.slice(0, length).reduce((t, i) =&gt; t += i);</p><p>\t\t}</p><p>\t\treturn function(..._args) {</p><p>\t\t\treturn add.apply(null, [...args, ..._args]);</p><p>\t\t}</p><p>\t}</p><p>}</p><p>function add(...args) {</p><p>\treturn args.reduce((t, i) =&gt; t+=i)</p><p>}</p><p>var newAdd = currying(add, 3)</p><p><br></p><p>// 直接的实现</p><p>function add(...args) {</p><p>\tif (args.length &gt;= 3) {</p><p>\t\treturn args.slice(0, 3).reduce((t,i) =&gt; t += i);</p><p>\t}</p><p>\treturn function(..._args) {</p><p>\t\treturn add(args.concat(_args));</p><p>\t}</p><p>}</p>',
    types: ['前端领域'],
    tags: ['编码', '柯里化'],
  },
  {
    name: '介绍一下你了解的 WebSocket',
    desc: '简单介绍一下 WebSocket，ws 协议和 http 协议的关系是什么，WebSocket 如何校验权限？ WebSocket 如何实现 SSL 协议的安全连接？',
    answer:
      'WebSocket 是基于 http 的，所以建立 WebSocket 连接前，\n浏览器会通过 http 的方式请求服务器建立连接，\n这个时候可以通过 http  的权限校验方式来校验 WebSocket，比如设置 Cookie。\n同理，WebSocket 实现 SSL 协议也同 https 类似，会升级为 wss 连接。\n另外，当然也可以在 WebSocket 中还可以通过加密或者 token 等方式，实现自己额外的加密传输和权限判断方式。\n更多可参考 https://security.tencent.com/index.php/blog/msg/119\n',
    types: ['前端领域'],
    tags: ['基础概念', 'websocket'],
  },
  {
    name: '请谈谈iframe有哪些缺点？',
    desc: 'iframe通常有哪些用途，主要缺点是什么',
    answer:
      '（1）iframe会阻塞主页面的Onload事件；\n（2）搜索引擎的检索程序无法解读这种页面，不利于SEO;\n（3）iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。\n（4）页面简的通信问题\n使用iframe之前需要考虑这（1）（3）两个缺点。\n如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。',
    types: ['前端领域', '工程构建'],
    tags: [],
  },
  {
    name: '请简述JAVAScript事件模型和事件代理',
    desc: '简述一下JavaScript事件模型和事件代理，事件代理有哪些优点？',
    answer:
      '## 事件模型\n事件三个阶段：事件捕获，目标，事件冒泡（低版本ie不支持捕获阶段）\n## 事件代理及优点： \n把事件委托到其父对象上，借助事件冒泡机制，实现对节点的事件代理。  \n### 优点  \n*  可以大量节省内存占用，减少事件注册\n*  当新增子对象时无需再次对其绑定事件，对于动态内容部分尤为合适',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件', '事件模型'],
  },
  {
    name: '根据id从多叉树里面查找出对应的节点的name',
    desc: '<p><br></p><pre><code>一个树形的数据(如下数据)，面试官给你一个id，然后拿到对应的name?\n  var cityData = [\n      {\n        id: 1,\n        name: &#39;广东省&#39;,\n        children: [\n          {\n            id: 11,\n            name: &#39;深圳&#39;,\n            children: [\n              {\n                id: 111,\n                name: &#39;宝安&#39;,\n                children: [\n                  {\n                    id: 1111,\n                    name: &#39;西乡&#39;,\n                    children:[\n                      {\n                        id: 11111,\n                        name: &#39;坪洲&#39;,\n                        children:[]\n                      },\n                      {\n                        id: 11112,\n                        name: &#39;灵芝&#39;,\n                        children:[]\n                      }\n                    ]\n                  },\n                  {\n                    id: 1112,\n                    name: &#39;南山&#39;,\n                    children:[\n                      {\n                        id: 11121,\n                        name: &#39;科技园&#39;,\n                        children:[]\n                      }\n                    ]\n                  }\n                ]\n              },\n              {\n                id: 112,\n                name: &#39;福田&#39;,\n                children: []\n              }\n            ]\n          },\n          {\n            id: 12,\n            name: &#39;广州&#39;,\n            children: [\n              {\n                id: 122,\n                name: &#39;白云区&#39;,\n                children: [\n                  {\n                    id: 1222,\n                    name: &#39;白云区&#39;,\n                    children: []\n                  }\n                ]\n              },\n              {\n                id: 122,\n                name: &#39;珠海区&#39;,\n                children: []\n              }\n            ]\n          }\n        ]\n      },\n      {\n        id: 2,\n        name: &#39;湖南省&#39;,\n        children: []\n      }\n    ];\n</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>主要考查深度/广度优先遍历,递归算法\n方法1:递归\n\nlet result = &#39;&#39;\n\n// 递归实现\nconst recursion = (cityData, id) =&gt; {\n  // cityData数据为空的时候直接返回\n  if (!cityData || !cityData.length) return;\n  // 常规循环cityData\n  for (let i = 0, len = cityData.length; i &lt; len; i++) {\n    const childs = cityData[i].children;\n    \n    // 如果匹配到id的话，就是我们要的结果\n    if (cityData[i].id === id) {\n      result = cityData[i].name\n    }\n    // 如果还有子节点，执行递归\n    if(childs &amp;&amp; childs.length &gt; 0){\n      recursion(childs, id);\n    }\n  }\n  return result\n};\n\nconst r = recursion(cityData, 11112);\nconsole.log(r) // 灵芝\n\n\n方法2:广度优先遍历\nlet result = &#39;&#39;\n\nconst range = (cityData, id) =&gt; {\n  if (!cityData || !cityData.length) return;\n  // 定义一个数据栈\n  let stack = [];\n\n  let item = null;\n\n  //先将第一层节点放入栈\n  for (var i = 0, len = cityData.length; i &lt; len; i++) {\n    stack.push(cityData[i]);\n  }\n\n  while (stack.length) {\n    // 将数据栈的第一个取出来\n    item = stack.shift();\n    // 如果符合就赋值给result\n    if (item.id === id) {\n      result = item.name\n    }\n    //如果该节点有子节点，继续添加进入栈底\n    if (item.children &amp;&amp; item.children.length) {\n      stack = stack.concat(item.children);\n    }\n  }\n  return result\n};\n\nlet r1 = range(cityData, 11112);\n\nconsole.log(r1) // 灵芝\n\n\n方法3:深度优先遍历\nlet result = &#39;&#39;\n\nconst deep = (cityData, id) =&gt; {\n  // 没有数据直接返回\n  if (!cityData || !cityData.length) return;\n  // 先定义一个数据栈\n  let stack = []\n  let item = null\n\n  //先将第一层节点放入数据栈\n  for (var i = 0, len = cityData.length; i &lt; len; i++) {\n    stack.push(cityData[i])\n  }\n  // 循环\n  while (stack.length) {\n    item = stack.shift()\n    if (item.id === id) {\n      result = item.name\n    }\n    //如果该节点有子节点，继续添加进入栈顶\n    if (item.children &amp;&amp; item.children.length) {\n      // 注意这里调换了顺序\n      stack = item.children.concat(stack);\n    }\n  }\n  return result\n};\n\nlet r3 = deep(cityData, 11112)\nconsole.log(r3) // 灵芝\n\n\n方法4:正则\n\nconst regular = (cityData, id) =&gt; {\n  // 没有数据直接返回\n  if (!cityData || !cityData.length) return;\n  // 数据转成字符串\n  let cityStr = JSON.stringify(cityData)\n  // 定义正则\n  let reg = new RegExp(`&#34;id&#34;:${id},&#34;name&#34;:&#34;([^\\\\x00-\\\\xff]+)&#34;,`)\n  // 取到正则的子字符串并返回\n  return (cityStr.match(reg))[1]\n}\n\nlet r4 = regular(cityData, 11112);\n\nconsole.log(r4) // 灵芝\n\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '基础算法'],
  },
  {
    name: 'js浮点运算',
    desc: 'console.info(0.7+0.1)会得到什么',
    answer: '输出0.799999\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'js'],
  },
  {
    name: 'macro micro 任务队列（async/await版）',
    desc: '<p>async function async1() {</p><p> console.log(&#39;async1 start&#39;);</p><p> await async2();</p><p> console.log(&#39;async1 end&#39;);</p><p>}</p><p>async function async2() {</p><p> console.log(&#39;async2 start&#39;);</p><p> return new Promise((resolve, reject) =&gt; {</p><p>  resolve();</p><p>  console.log(&#39;async2 promise&#39;);</p><p> })</p><p>}</p><p>console.log(&#39;script start&#39;);</p><p>setTimeout(function() {</p><p> console.log(&#39;setTimeout&#39;);</p><p>}, 0);  </p><p>async1();</p><p>new Promise(function(resolve) {</p><p> console.log(&#39;promise1&#39;);</p><p> resolve();</p><p>}).then(function() {</p><p> console.log(&#39;promise2&#39;);</p><p>}).then(function() {</p><p> console.log(&#39;promise3&#39;);</p><p>});</p><p>console.log(&#39;script end&#39;);</p>',
    answer:
      '<p>chrome 和 node 都是以下顺序</p><img src="http://tosv.byted.org/obj/ttfe/nodebb/1563171801424-5d2c1bd9fcb820021a6b13dc.png" width="375" alt=""><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', 'async'],
  },
  {
    name: 'JS实现一个带并发限制的异步调度器',
    desc: '<div style="white-space: pre;">JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">class Scheduler {\n</div><div style="white-space: pre;">  add(promiseCreator) { ... }\n</div><div style="white-space: pre;">  // ...\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">const timeout = (time) =&gt; new Promise(resolve =&gt; {\n</div><div style="white-space: pre;">  setTimeout(resolve, time)\n</div><div style="white-space: pre;">})\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">const scheduler = new Scheduler()\n</div><div style="white-space: pre;">const addTask = (time, order) =&gt; {\n</div><div style="white-space: pre;">  scheduler.add(() =&gt; timeout(time))\n</div><div style="white-space: pre;">    .then(() =&gt; console.log(order))\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">addTask(1000, &#39;1&#39;)\n</div><div style="white-space: pre;">addTask(500, &#39;2&#39;)\n</div><div style="white-space: pre;">addTask(300, &#39;3&#39;)\n</div><div style="white-space: pre;">addTask(400, &#39;4&#39;)\n</div><div style="white-space: pre;">// output: 2 3 1 4// 一开始，1、2两个任务进入队列// 500ms时，2完成，输出2，任务3进队// 800ms时，3完成，输出3，任务4进队// 1000ms时，1完成，输出1// 1200ms时，4完成，输出4\n</div>',
    answer:
      '<div style="white-space: pre;">class Scheduler {\n</div><div style="white-space: pre;">  concurrency = 2\n</div><div style="white-space: pre;">  running = 0\n</div><div style="white-space: pre;">  queue = []\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">  add(task) {\n</div><div style="white-space: pre;">    return new Promise(resolve =&gt; {\n</div><div style="white-space: pre;">      this.queue.push({\n</div><div style="white-space: pre;">        taskGenerator: task,\n</div><div style="white-space: pre;">        resolve\n</div><div style="white-space: pre;">      })\n</div><div style="white-space: pre;">      this.schedule()\n</div><div style="white-space: pre;">    })\n</div><div style="white-space: pre;">  }\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">  schedule() {\n</div><div style="white-space: pre;">    while (this.queue.length &gt; 0 &amp;&amp; this.running &lt; this.concurrency) {\n</div><div style="white-space: pre;">      const curTask = this.queue.shift()\n</div><div style="white-space: pre;">      this.running += 1\n</div><div style="white-space: pre;">      curTask.taskGenerator().then(result =&gt; {\n</div><div style="white-space: pre;">        this.running -= 1\n</div><div style="white-space: pre;">        curTask.resolve(result)\n</div><div style="white-space: pre;">        this.schedule()\n</div><div style="white-space: pre;">      })\n</div><div style="white-space: pre;">    }\n</div><div style="white-space: pre;">  }\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div>',
    types: ['前端领域', 'JavaScript'],
    tags: ['前端基础', 'promise', '异步', 'js', '调度器'],
  },
  {
    name: '写一个加法函数(sum)，使他可以同时支持sum(x,y)和sum(x)(y)两种调用方式。',
    desc: '<div style="white-space: pre;"><span style="font-weight: bold;">写一个按照下面两种方式都能正常调用的 sum 方法</span>\n</div><div style="white-space: pre;">```javascript\n</div><div style="white-space: pre;">console.log(sum(2,3)); // 输出5\n</div><div style="white-space: pre;">console.log(sum(2)(3)); // 输出5\n</div><div style="white-space: pre;">```\n</div>',
    answer:
      '<div style="white-space: pre;">答案一\n</div><div style="white-space: pre;">function sum(a,b){\n</div><div style="white-space: pre;">if(b) {\n</div><div style="white-space: pre;">return a+b\n</div><div style="white-space: pre;">}else{\n</div><div style="white-space: pre;">return function(c){\n</div><div style="white-space: pre;">return a+c\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">答案二\n</div><div style="white-space: pre;">function sum(){\n</div><div style="white-space: pre;">var arg=arguments\n</div><div style="white-space: pre;">if(arg.length==2) {\n</div><div style="white-space: pre;">return arg[0]+arg[1];\n</div><div style="white-space: pre;">}else{\n</div><div style="white-space: pre;">return function(c){\n</div><div style="white-space: pre;">return arg[0]+c\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div>',
    types: ['前端领域'],
    tags: ['柯里化', '编码', '函数式', '闭包'],
  },
  {
    name: 'ES5，ES6中this指向考察',
    desc: '1. 以下代码输出什么结果，`this.name`中this指向什么：\n```\nwindow.name = &#39;ByteDance&#39;;\nfunction A () {\n   this.name = 123;\n}\nA.prototype.getA = function(){\n\tconsole.log(this);\n\treturn this.name + 1;\n}\nlet a = new A();\nlet funcA = a.getA;\nfuncA();\n```\n2. 如何使`funcA()`返回`undefined`?\n3. 下面ES6中又会发生什么，this是什么？\n```\nwindow.name = &#39;ByteDance&#39;;\nclass A {\n\tconstructor() {\n  \tthis.name = 123;\n\t}\n\tgetA() { \n\t  console.log(this);\n\t\treturn this.name + 1; \n\t}\n}\nlet a = new A();\nlet funcA = a.getA;\nfuncA();\n```',
    answer:
      '1. 输出`Bytedance1`, this指向widnow;\n2. 正确使用applay / call；\n3. 发生异常：Uncaught TypeError: Cannot read property &#39;name&#39; of undefined，this为undefined；',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'this', 'es6'],
  },
  {
    name: '请问什么是跨域？跨域请求资源有几哪种方式？',
    desc: '何为跨域？跨域请求资源有几哪种方式？',
    answer:
      '由于浏览器同源策略，凡是发送请求url的协议、域名、端口三者之间任意一与当前页面地址不同即为跨域。\n跨域请求资源的方式主要有：  \n（1）JSONP 动态创建script标签  \n但缺点是只支持get请求，并且很难判断请求是否失败（一般通过判断请求是否超时）。  \n（2）Proxy代理  \n这种方式首先将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。  \n（3）CORS跨域  \n是现代浏览器提供的一种跨域请求资源的方法，需要客户端和服务器端的同时支持。整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信  \n服务响应头返回，Access-Control-Allow-Origin: *',
    types: ['前端领域', '浏览器'],
    tags: ['跨域访问'],
  },
  {
    name: '简述React Fiber原理',
    desc: '<p>试描述React Fiber的原理。</p>',
    answer:
      '<p>\t官方的一句话解释是“React Fiber是对核心算法的一次重新实现”。</p><p>\t之前React的更新过程是同步的，所有更新逻辑会在一帧之内完成，如果组件过于复杂则会导致更新时间超过一帧，其他事务包括用户输入都会被延迟响应，从而引发卡顿。如下图：</p><p><br></p><img src="https://pic1.zhimg.com/80/v2-d8f4598c70df94d69825f11dfbf2ca2c_1440w.png" width="375" alt=""><p>\t破解方式——分片。</p><p>\t有了分片之后，更新过程的调用栈如下图所示，中间每一个波谷代表深入某个分片的执行过程，每个波峰就是一个分片执行结束交还控制权的时机。</p><img src="https://pic1.zhimg.com/80/v2-78011f3365ab4e0b6184e1e9201136d0_1440w.png" width="375" alt=""><p>\t实现使用的API：requestIdleCallback</p><pre><code>Q.为什么引入Fiber架构？原架构有何不足？\nA.原架构采用递归遍历方式来更新DOM树，一旦开始，即占用主线程，无法中断，这在页面上会引起问题，如input输入后页面卡顿等\n\nQ.Fiber如何解决该问题\nA.时间分片和暂停\n\nQ.Fiber如何实现？\nA.使用链表结构，将递归遍历更改为循环遍历，然后配合requestIdleCallback API，实现任务拆分、中断和恢复\n\nQ.Fiber如何实现比较？\nA.双缓冲技术，在diff过程中创建新的DOM Tree，diff完成之后生成EffectList，即需要更新的地方，之后进入commit阶段，该阶段不允许中断。\n\nQ.React Hook基于Fiber架构，hook的复用是如何实现的？\nA.hook的数据存在于Fiber节点的数据结构中，具体为memoizedState中，该字段中存储了所有hook相关的信息，https://www.jianshu.com/p/d6244228a427 （重要）</code></pre><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['Fiber', '性能优化', 'React'],
  },
  {
    name: '请简要描述ES6 module require、exports以及module.exports的区别',
    desc: '考察候选人对es6，commonjs等js模块化标准的区别和理解',
    answer:
      '* CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被”循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。\n* ES6 模块是动态引用，如果使用 import 从一个模块加载变量，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。\n* CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports ）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。\n* export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。\n* ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性\n* 混合使用介绍：https://github.com/ShowJoy-com/showjoy-blog/issues/39',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'es6'],
  },
  {
    name: '浏览器缓存机制考察',
    desc: '浏览器缓存机制考察，包括cache-control , etag, expire, last-modify-time\n以及 200 from cache、304',
    answer: '1、cache-control 和 expire 在浏览器端控制  Cache-Control的max-age&gt;expire\n2、etag 和 last-modify-time主 要服务器端对比使用',
    types: ['前端领域', '浏览器'],
    tags: [],
  },
  {
    name: '版本号排序',
    desc: 'versions是一个项目的版本号列表，因多人维护，不规则\n``` javascript\nvar versions=[&#39;1.45.0&#39;,&#39;1.5&#39;,&#39;6&#39;,&#39;3.3.3.3.3.3.3&#39;]\n```\n要求从小到大排序，注意&#39;1.45&#39;比&#39;1.5&#39;大\n``` javascript\nvar sorted=[&#39;1.5&#39;,&#39;1.45.0&#39;,&#39;3.3.3.3.3.3&#39;,&#39;6&#39;]\n```',
    answer:
      '```javascript\nfunction sortVersion(arr) {\n    return arr.sort((a, b) =&gt; {\n        const arrA = a.split(&#39;.&#39;)\n        const arrB = b.split(&#39;.&#39;)\n        for (let i = 0; i &lt; arrA.length; i++) {\n            if (arrA[i] === undefined) {\n                return -1\n            } else if (arrB[i] === undefined) {\n                return 1\n            } else if (parseInt(arrA[i]) === parseInt(arrB[i])) {\n                continue\n            } else {\n                return parseInt(arrA[i]) &gt; parseInt(arrB[i])\n            }\n        }\n    })\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['排序'],
  },
  {
    name: 'JS限流调度器',
    desc: '<p>实现JS限流调度器，方法add接收一个返回Promise的函数，同时执行的任务数量不能超过两个。</p><pre><code>class Scheduler {\n    async add(promiseFunc: () =&gt; Promise&lt;void&gt;): Promise&lt;void&gt; {\n    }\n}\n\nconst scheduler = new Scheduler()\nconst timeout = (time) =&gt; {\n    return new Promise(r =&gt; setTimeout(r, time))\n}\nconst addTask = (time, order) =&gt; {\n    scheduler.add(() =&gt; timeout(time))\n        .then(() =&gt; console.log(order))\n}\n\naddTask(1000, 1)\naddTask(500, 2)\naddTask(300, 3)\naddTask(400, 4)\n// log: 2 3 1 4\n</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>class Scheduler {\n    constructor() {\n        this.concurrency = 0\n        this.queue = []\n    }\n    async add(promiseFunc) {\n        if (this.concurrency &gt;= 2) {\n            return new Promise(r =&gt; {\n                this.queue.push(() =&gt; promiseFunc().then(r))\n            })\n        }\n        this.concurrency += 1\n        await promiseFunc()\n        this.concurrency -= 1\n        let next = this.queue.shift()\n        if (next) {\n            this.add(next)\n        }\n    }\n}\n\nconst scheduler = new Scheduler()\nconst timeout = (time) =&gt; {\n    return new Promise(r =&gt; setTimeout(r, time))\n}\nconst addTask = (time, order) =&gt; {\n    scheduler.add(() =&gt; timeout(time))\n        .then(() =&gt; console.log(order))\n}\n\naddTask(1000, 1)\naddTask(500, 2)\naddTask(300, 3)\naddTask(400, 4)\n</code></pre><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['前端编码', 'js', '调度器'],
  },
  {
    name: '实现一个简单的Event类（观察者模式）',
    desc: '<p>请实现一个观察者模式，拥有四个方法on,off,once和trigger</p><p><br></p><p>const Event = {</p><p>    on() {}   // 绑定</p><p>    off() {}  // 解绑</p><p>    once() {}   // 绑定一次</p><p>    trigger() {}  // 触发事件</p><p>};</p>',
    answer:
      '<p>```javascript function Event() { if (!(this instanceof Event)) { return new Event(); } this._callbacks = {}; } Event.prototype.on = function (type, handler) { this_callbacks = this._callbacks || {}; this._callbacks[type] = this.callbacks[type] || []; this._callbacks[type].push(handler); return this; }; Event.prototype.off = function (type, handler) { var list = this._callbacks[type]; if (list) { for (var i = list.length; i &gt;= 0; --i) { if (list[i] === handler) { list.splice(i, 1); } } } return this; }; Event.prototype.trigger = function (type, data) { var list = this._callbacks[type]; if (list) { for (var i = 0, len = list.length; i &lt; len; ++i) { list[i].call(this, data); } } }; Event.prototype.once = function (type, handler) { var self = this; function wrapper() { handler.apply(self, arguments); self.off(type, wrapper); } this.on(type, wrapper); return this; }; ```</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['编码', 'event'],
  },
  {
    name: '请说明存储在 Cookie 和 localStorage 内有什么区别',
    desc: '请说明 cookie、sessionStorage、localStorage 之间的区别、以及在你项目中的应用？',
    answer:
      ' a) cookie，HTTP Cookie（也叫Web cookie或者浏览器Cookie）是服务器发送到用户浏览器并保存在浏览器上的一块数据，它会在浏览器下一次发起请求时被携带并发送到服务器上。比较经典的，可以它用来确定两次请求是否来自于同一个浏览器，从而能够确认和保持用户的登录状态。Cookie的使用使得基于无状态的HTTP协议上记录稳定的状态信息成为了可能。\nb) sessionStorage，为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。\nc) localStorage，localStorage 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。\n\n区别：\nlocalStorage、sessionStorage 是 Web Storage Api 的组成 API，其为了解决 Cookie 的一些缺陷，服务端 Set 的 cookie 每次会携带在本域下所有的请求上，对性能有损耗。SessionStorage 存储有个期限，当关闭浏览器后就不再存在，但 localStorage 依然存在，需要明确删除。\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础概念', '前端基础'],
  },
  {
    name: '请简述js浏览器事件循环机制',
    desc: '<p><br></p>',
    answer:
      '<p>浏览器 Event Loop 是 HTML 中定义的规范，Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。</p><ul><li>JS 调用栈</li></ul><p>JS 调用栈是一种后进先出的数据结构。当函数被调用时，会被添加到栈中的顶部，执行完成之后就从栈顶部移出该函数，直到栈内被清空。</p><ul><li>同步任务、异步任务</li></ul><p>JavaScript 单线程中的任务分为同步任务和异步任务。同步任务会在调用栈中按照顺序排队等待主线程执行，异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。任务队列是先进先出的数据结构。</p><ul><li>Event Loop</li></ul><p>调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作，就形成了事件循环。</p><ul><li>定时器</li></ul><p>定时器会开启一条定时器触发线程来触发计时，定时器会在等待了指定的时间后将事件放入到任务队列中等待读取到主线程执行。定时器指定的延时毫秒数其实并不准确，因为定时器只是在到了指定的时间时将事件放入到任务队列中，必须要等到同步的任务和现有的任务队列中的事件全部执行完成之后，才会去读取定时器的事件到主线程执行，中间可能会存在耗时比较久的任务，那么就不可能保证在指定的时间执行。</p><ul><li>宏任务(macro-task)、微任务(micro-task)</li></ul><p>除了广义的同步任务和异步任务，JavaScript 单线程中的任务可以细分为宏任务和微任务。macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。micro-task包括：process.nextTick, Promises, Object.observe, MutationObserver。事件循环中，JavaScript 引擎会把整个 script 代码当成一个宏任务执行，执行完成之后，再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务-微任务。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件', 'js'],
  },
  {
    name: '何为https?https和http2有什么关系？',
    desc: '简要描述HTTPS的安全机制，以及在web服务工程实践中需要注意的问题；描述http2的基本机制',
    answer:
      'HTTPS是指建立在安全的传输层（通常是tls/ssl）上的HTTP协议，通过对服务器的证书的认证，解决中间人攻击等问题。\n证书(certificate)由客户端信任的的证书机构(CA)颁发，通过common name或SAN对服务进行描述；客户端通过CA的根证书对证书进行校验，并将请求域名和证书的common name/DNS域名进行验证，以检验证书的有效性。\n目前，很多web api如Notification/web rpc/Service Worker等，都要求必须使用https。\n在工程实践中，https存在以下需要注意的问题：\n  - js/css等资源必须以https形式加载，否则浏览器将拒绝执行，所以CDN必须完成对https的支持\n\t- 非https请求的图片等资源不会携带referer\n\t\n\thttp2是http协议的一个新版本，既可以明文传输也可以在https中使用。浏览器和服务器通过tls的ALPN/SNI等机制可以进行协议协商，决定使用什么协议',
    types: ['前端领域'],
    tags: ['基础概念', 'HTTPS'],
  },
  {
    name: '用数组的reduce方法实现map方法',
    desc: '用数组的reduce方法实现map方法',
    answer:
      '```\n// 代码实现\nArray.prototype.map2 = function(f) {\n  return this.reduce(function(result, x, index, arr) {\n    result.push(f(x, index));\n    return result;\n  }, []);\n}\n\n// 测试代码\nvar res = [1, 3, 5, 7].map2(function(item, idx){\n  return item * 2;\n});\nconsole.log(res);\n```',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: 'js异步操作与计算题',
    desc: '```\nfor (var i = 0; i &lt; 6; i++) {\n    setTimeout(function() {\n        console.log(new Date, i);\n    }, 1000);\n}\n```\n&gt;1. console.log(new Date, i);得到的结果是什么?\n&gt;1. 怎样优化，可以变成： 0 -&gt; 1 -&gt; 2 -&gt; 3-&gt; 4 -&gt;5\n&gt;1. 如果继续优化，实现console.log(new Date, i);代码执行时，立即输出 0，之后每隔 1 秒依次输出 1,2,3,4（sleep），之后再暂停5秒，然后输出5,\n实现结果类似：\n&gt;1. 2017-08-31T04:38:23:  0    &lt;— start IIFE\n&gt;1. 2017-08-31T04:38:24:  1    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:25:  2    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:26:  3    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:27:  4    &lt;— sleep 5s\n&gt;1. 2017-08-31T04:38:32:  5',
    answer:
      '1. 属于结果是暂停1S，然后输出6个6，setTimeout属于异步执行\n1. 实现0-&gt; 1 -&gt; 2 -&gt; 3-&gt; 4 -&gt;5，用闭包或者var改成let\n1. 模拟编程中的sleep实现，参考答案：\n```\n// 模拟其他语言中的 sleep，实际上可以是任何异步操作\nconst sleep = (timeoutMS) =&gt; new Promise((resolve) =&gt; {\n  setTimeout(resolve, timeoutMS)\n});\n(async () =&gt; {  // 声明即执行的 async 函数表达式\n  for (let i = 0; i &lt; 6; i++) {\n      if (i &lt; 5) {\n        console.log(new Date(), i)\n        await sleep(1000)\n      } else {\n        await sleep(4000)\n        console.log(new Date(), i)\n      }\n    }\n})()\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'async', 'js'],
  },
  {
    name: '简单的实现Promise.all',
    desc: '<p><br></p><pre><code>\nfunction fn1() {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(1)\n        }, 1000);\n    })\n}\nfunction fn2() {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(2)\n        }, 2000);\n    })\n}\nPromiseAll([fn1(), fn2()]).then(res =&gt; {\n    console.log(res)\n}).catch(err =&gt; {\n    console.log(err)\n})\n\nPromise.all([fn1(), fn2()]).then(res =&gt; {\n    console.log(res)\n}).catch(err=&gt;{\n    console.log(err)\n})</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>function PromiseAll(list) {\n\n    return new Promise((resolve, reject) =&gt; {\n\n        let count = 0;\n\n        let len = list.length;\n\n        let result = [];\n\n        list.forEach((item,index) =&gt; {\n\n            item.then(res =&gt; {\n\n                count++;\n\n                result[index] = res;\n\n                if (count === len) {\n\n                    resolve(result);\n\n                }\n\n            }).catch(err =&gt; {\n\n                reject(err)\n\n            })\n\n        })\n\n    })\n\n}\n\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '基础'],
  },
  {
    name: 'ES6 import的原理',
    desc: '请描述ES6 import的原理以及与commonjs的require的区别',
    answer:
      'CommonJS模块的是一个值的拷贝，而ES6模块输出的是值的引用。\nES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。\nCommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。\nES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', '模块化', 'es6'],
  },
  {
    name: '不借助变量交换两个数',
    desc: 'var a = 1, b = 2;\nfunction swap(a,b){\n  ....\n}\nswap(a,b)\nconsole.log(a, b)  // 2,1',
    answer:
      '方法一、\n```\nfunction swap(a,b){\n  b=b-a;\n  a=a+b;\n  b=a-b;\n  return [a,b]\n}\n```\n方法二、\n```\nfunction swap(a,b){\n  return [a, b] = [b, a]\n}\n```\n方法三、\n```\nfunction swap(a,b){\n  var a=a^b;\n  var b=b^a;\n  var a=a^b;\n\treturn [a,b]\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '实现垂直居中',
    desc: '```html\n\n    <div id="block">        \n    </div>\n\n```\nid为block的元素不定高不定宽，请实现它在浏览器窗口的居中显示。',
    answer: '```css\n#block {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n```',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '请回答当我们在使用new操作符时，它在对象操作的过程中具体做了什么',
    desc: '考察候选人对原型链操作和js对象的理解',
    answer:
      '1. 简单回答：\n1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。\n1. 属性和方法被加入到 this 引用的对象中。\n3. 新创建的对象由 this 所引用，并且最后隐式的返回 this 。\n```javascript\nfunction Animal(name) {\n      this.name = name;\n}\n  Animal.prototype.run = function() {\n      console.log(this.name + &#39;can run...&#39;);\n}\nvar cat = new Animal(&#39;cat&#39;); //    \nnew Animal(&#39;cat&#39;)=function(){\nlet obj={}; //       \nobj.__proto__=Animal.prototype; // obj-&gt;Animal.prototype-&gt;Object.prototype-&gt;null\nreturn Animal.call(obj,&#39;cat&#39;);//   this        \n}\n```\n\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['prototype'],
  },
  {
    name: 'css3实现多行文字截断处理',
    desc: '用css分别实现单行截断和多行截断字符串，最后以...为结尾',
    answer:
      '单行：\n```\n.text-overflow ( @class ){\n    .@{class} {\n        overflow: hidden;\n        text-overflow:ellipsis;\n        white-space: nowrap;\n    }\n}\n```\n多行：\n```\n.multi-text-overflow ( @class, @line ){\n    .@{class} {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        display: -webkit-box;\n        display: box;\n        -webkit-line-clamp: @line;\n        -webkit-box-orient: vertical;\n    }\n}\n```',
    types: ['前端领域', 'CSS'],
    tags: ['css3'],
  },
  {
    name: '请介绍react diff算法和策略',
    desc: 'react的diff算法和策略了解多少，为什么react的diff性能好，遵循什么样的策略可以把 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题',
    answer:
      'React分别对 tree diff、component diff 以及 element diff做了算法优化，\n做了一些假设\n1.Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计\n2.拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构\n3.对于同一层级的一组子节点，它们可以通过唯一 id 进行区分\ntree diff：React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较\ncomponent diff：\na.如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。\nb.如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。\nc.对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff\nelement diff：\n允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，减少增加和删除\n详见：https://zhuanlan.zhihu.com/p/20346379',
    types: ['前端领域', 'JavaScript'],
    tags: ['React'],
  },
  {
    name: '函数科里化',
    desc: '<p>实现如下函数add,使如下执行都等于9</p><pre><code>add(2,3,4)=9\nadd(2)(3,4)=9\nadd(2)(3)(4)=9\nadd(2,3)(4)=9</code></pre><p><br/></p>',
    answer:
      '<p><br/></p><pre><code>function curry(fn) {\n  return function res(...args) {\n    if (args.length &gt;= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...args2) {\n        return res.apply(this, args.concat(args2));\n      }\n    }\n  }\n}</code></pre><p><br/></p>',
    types: ['前端领域'],
    tags: ['编码', '函数式'],
  },
  {
    name: '如果数据库中采用64位长整型存储一个数据的id，前端通过api拿到这个id的话，会有什么问题？应该怎么解决？',
    desc: '如果数据库中采用64位长整型存储一个数据的id，前端通过api拿到这个id的话，会有什么问题？怎么解决？',
    answer:
      '考察一下JS中整数的安全范围的概念，在头条经常会遇到长整型到前端被截断的问题，需要补一个字符串形式的id供前端使用。\n主要会涉及到JS中的最大安全整数问题\nhttps://segmentfault.com/a/1190000002608050',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础'],
  },
  {
    name: 'JavaScript this 考察',
    desc: '<p>下面代码输出的结果是什么？</p><p>var length = 10;</p><p>function fn() {</p><p> return this.length+1;</p><p>}</p><p>var obj = {</p><p> length: 5,</p><p> test1: function() {</p><p>  return fn();</p><p> }</p><p>};</p><p>obj.test2=fn;</p><p>//下面代码输出是什么</p><p>console.log(obj.test1())</p><p>console.log(fn()===obj.test2())</p>',
    answer: '<p>11, false(11===6)</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['this'],
  },
  {
    name: 'requestAnimationFrame 和 setTimeout 的区别',
    desc: 'requestAnimationFrame 和 setTimeout 都可以用来实现动画，它们的区别是什么',
    answer:
      '1. 执行频率不同，前者按照屏幕刷新频率执行，后者自行控制，可能有无用开销（执行频率小于刷新频率，即1帧执行多次）\n2. 前者在页面不可见时，会停止执行（省电），后者在页面不可见时仍会执行，带来不必要开销\n',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '编码-js高阶函数考察',
    desc: '<h3>实现一个repeat方法，要求如下：</h3><p><br/></p><p>// 需要实现的函数</p><p>function repeat (func, times, wait) {</p><p> // 补全</p><p>}</p><p><br/></p><p>// 使下面调用代码能正常工作</p><p>const repeatFunc = repeat(console.log, 4, 3000);</p><p>repeatFunc(&#34;hello world&#34;);    //会输出4次 hello world, 每次间隔3秒</p><p><br/></p>',
    answer:
      '<p>考点1：能意识到repeat返回的是一个函数，知道参数怎么传递。</p><p>考点2：setTimeout的时间，微任务</p><p><br/></p><p>参考答案</p><p>function repeat(fn, times, wait) {</p><p>  if(typeof times !== &#39;number&#39;) return;</p><p>  if(typeof wait !== &#39;number&#39;) return;</p><p>  return function(str){</p><p>    for(let i = 0; i &lt; times; i++){</p><p>      setTimeout(()=&gt;{</p><p>        fn(str)</p><p>      }, i * wait)</p><p>    }</p><p>  }</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['函数式', 'js'],
  },
  {
    name: 'Vue框架中组件消息通信方式',
    desc: '考察候选人对Vue框架的消息通信方式了解程度：\n\n1. vue父子组件通信方式？\n2. 非父子组件通信方式？\n3. 前两问OK，追问：当一个父组件与子组件中间隔着很多层组件怎么办？',
    answer:
      '1. 父子组件通信方式\n在Vue中，父子组件的关系可以总结为props down, events up。父组件通过props向下传递数据给子组件，子组件通过events给父组件发送消息。\n\n2. 非父子组件通信\n两个独立的组件之间通信，可以借助一个空的Vue实例作为中央事件总线，空实例相当于代理人的形式进行消息监听或触发\n\n3. 父子之间层级过多时\n当父子组件之间层级不多的时候，父组件可以一层层的向子组件传递数据或者子组件一层层向父组件发送消息，代码上没有太难维护的地方。可是，一旦父子组件之间层级变多后，传递一个数据或者发送一个消息就变得麻烦。\n这块如果了解开源的Element组件库，就会知道其实现方式：构造一个函数自动向上/向下查询父亲节点，以`[组件名, 消息名, 参数]`三元组进行消息传递，降低长链传播成本;\n具体实现参考：https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js',
    types: ['前端领域', 'JavaScript'],
    tags: ['vue'],
  },
  {
    name: '什么是 XSS，怎么造成的，有什么防御方法？',
    desc: '考察面试者对于 XSS 是否了解，是否足够重视。',
    answer:
      'XSS 就是在 web 中能够通过某种方式产生执行任意 JavaScript 脚本的情况，\n最常见的一种情况就是将用户的输入，直接放到当前 runtime 中，比如用户输入直接放到页面的 html 里面，\n立刻显示出来。\nXSS 实际上是非常危险的，因为理论上讲，如果能够执行 JavaScript，实际上攻击者可以做任何事情。\n简单的就是输出点什么，偷偷 cookie，或者结合 CSRF 攻击，或者让浏览器跳转一下，\n复杂点的甚至可以改掉当前整个页面，伪造一切用户看到东西，危害无穷。\n如果这种输入存储到数据库中，就会变成一个永久型的 XSS，危害就更大了。\n防止 XSS 最简单的就是使用各种框架，如 React、Vuejs 等，对用户输入进行 html 转义。\n另外，服务端要设置 httpOnly 的 header，防止 JavaScript 操作 cookie。\n当然，服务端也可以对输入进行转义或者过滤监测。',
    types: ['前端领域', 'JavaScript'],
    tags: ['xss', '防御方法'],
  },
  {
    name: 'webpack插件编写',
    desc: '1. 有用过webpack么？说说该工具的优缺点？\n2. 有开发过webpack插件么？\n3. 假如要在构建过程中去除掉html中的一些字符，如何编写这个插件？',
    answer:
      'webpack优缺点：\n* 概念牛，但文档差，使用起来费劲\n* 模块化，让我们可以把复杂的程序细化为小的文件\n* require机制强大，一切文件介资源\n* 代码分隔\n* 丰富的插件，解决less、sass编译\n\n开发插件的两个关键点Compiler和Compilation：\n* compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并在所有可操作的设置中被配置，包括原始配置，loader 和插件。当在 webpack 环境中应用一个插件时，插件将收到一个编译器对象的引用。可以使用它来访问 webpack 的主环境。\n* compilation 对象代表了一次单一的版本构建和生成资源。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。\n\n插件编写可参考：https://doc.webpack-china.org/development/how-to-write-a-plugin',
    types: ['前端领域', '工程构建'],
    tags: ['框架'],
  },
  {
    name: '如何实现微信扫码登录？',
    desc: '综合题，考察网络、前端、认证等多方面知识',
    answer:
      '参考答案：\nhttps://zhuanlan.zhihu.com/p/22032787\n具体步骤：\n1. 用户 A 访问微信网页版，微信服务器为这个会话生成一个全局唯一的 ID，上面的 URL 中 obsbQ-Dzag== 就是这个 ID，此时系统并不知道访问者是谁。\n2. 用户A打开自己的手机微信并扫描这个二维码，并提示用户是否确认登录。\n3. 手机上的微信是登录状态，用户点击确认登录后，手机上的微信客户端将微信账号和这个扫描得到的 ID 一起提交到服务器\n4. 服务器将这个 ID 和用户 A 的微信号绑定在一起，并通知网页版微信，这个 ID 对应的微信号为用户 A，网页版微信加载用户 A 的微信信息，至此，扫码登录全部流程完成',
    types: ['前端领域', '工程构建'],
    tags: ['产品逻辑', '扫码登录'],
  },
  {
    name: '设计类似 Vue.js 双向绑定功能的核心逻辑“监听对象属性变化”功能',
    desc: '实现一个类，可以监听对象属性的值变化。加分项：考虑对象存在值为数组或对象的属性。\n\n\t\tclass Observe {\n\t\t\tconstructor(data: Object) {\n\t\t\t}\n\t\t\t// 监听属性变更\n\t\t\t$on() {\n\t\t\t}\n\t\t\t// 触发属性变更事件\n\t\t\t$emit() {\n\t\t\t}\n\t\t}\n\t\tconst data = new Observer({\n\t\t\ta: 1\n\t\t});\n\t\tcoonsole.log(data.a) // console: 1\n\t\tdata.$on(&#39;a&#39;, (newValue, oldValue) =&gt; {\n\t\t\t// this === data\n\t\t\tconsole.log(newValue, oldValue);\n\t\t});\n\t\tdata.a = 2 // console: 2 1\n\n\t\n',
    answer: '待补充',
    types: ['前端领域', 'JavaScript'],
    tags: ['defineProperty', 'vue', 'js', '逻辑'],
  },
  {
    name: '请简要描述<script>标签defer或async属性的作用，以及二者的区别',
    desc: '',
    answer:
      '### 作用：\ndefer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。\n### 区别：\ndefer与async的区别是：前者要等到整个页面正常渲染结束，才会执行；后者一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。',
    types: ['前端领域', 'HTML'],
    tags: ['async'],
  },
  {
    name: '原型链、this指针、自有属性考察',
    desc: '```javascript\nvar a= function () { this.b =3; }\nvar c = new a();\na.protorype.b = 9;\nvar b = 7;\na();\n```\n问：\n```javascript\nconsole.log(b);\nconsole.log(c.b); \n```\n分别输出什么？',
    answer: '- 第一个 `b = 3`\n- 第二个 `c.b = 3`',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'Cookie 和 Session 有什么区别',
    desc: '<div style="white-space: pre;">如题\n</div>',
    answer:
      '<div style="white-space: pre;">cookie 在浏览器中存在，并且每个请求都会带上，而且是可以设置失效时间的，失效前就会有效。 session 是一次会话有效，也就是说，浏览器关闭 session 就会失效。 其实这道题目考察的一个重点是在于，session 这种机制是怎么在浏览器中实现的呢？ 实际上 session 的实现也是在浏览器中放了一个 cookie，失效时间是一次会话失效。\n</div>',
    types: ['前端领域'],
    tags: ['基础概念'],
  },
  {
    name: 'JS异步队列macrotask和microtask',
    desc: '```\nconsole.log(&#39;begin&#39;)\nsetTimeout(() =&gt; {\n\tconsole.log(&#39;setTimeout 1&#39;)\n\tPromise.resolve().then(() =&gt; {\n\t\tconsole.log(&#39;promise 1&#39;)\n\t\tsetTimeout(() =&gt; {\n\t\t\tconsole.log(&#39;setTimeout2 between promise1&amp;2&#39;)\n\t\t})\n\t}).then(() =&gt; {\n\t\tconsole.log(&#39;promise 2&#39;)\n\t})\n}, 0)\nconsole.log(&#39;end&#39;)\n```',
    answer: '```\nbegin\nend\nsetTimeout 1\npromise 1\npromise 2\nsetTimeout2 between promise1&amp;2\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['promise', '异步', 'js'],
  },
  {
    name: '如何理解虚拟DOM?',
    desc: '如何理解虚拟DOM?',
    answer: '对虚拟dom和diff算法中的一些细节理解与考察，[https://github.com/livoras/blog/issues/13](https://github.com/livoras/blog/issues/13)',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '如何判断一个 JS 对象为空对象',
    desc: '如何判断一个 JS 对象为空对象 ？空对象形如`{}`',
    answer:
      '1. 使用 `for in`\n\t```javascript\n\tfunction isEmptyObject(obj){\n  \tfor(var key in obj){\n    \treturn false\n\t\t};\n\t\treturn true\n\t};\n\t```\n2. 通过 JSON.stringify 方法来判断\n\t```javascript\n\tif(JSON.stringify({}) === &#39;{}&#39;){\n\t\tconsole.log(&#39;empty obj&#39;);\n\t}\n\t```\n3. 使用 ES6 增加的 Object.keys()\n\t```javascript\n\tif(Object.keys(obj).length === 0){\n\t\tconsole.log(&#39;empty obj&#39;);\n\t}\n\t```',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'js'],
  },
  {
    name: '什么是闭包？实现每隔1秒输出数组中的一个数字',
    desc: '解释下js中的闭包概念，解释OK，给出编程题目考察基本功',
    answer:
      '```js\nfunction fun(arr) {\n    var i, len;\n    for (i = 0, len = arr.length; i &lt; len; i++) {\n      (function(i){\n        setTimeout(function() {\n          console.log(i);\n        }, i * 1000);\n      })(i);\n    }\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'promise运行过程解答',
    desc: '如下代码的运行结果是什么？\n```javascript\n process.nextTick(() =&gt; {console.log(&#39;nextTick&#39;)})\nPromise.resolve().then(()=&gt; {console.log(&#39;promise1&#39;);}).then(()=&gt; {\n  console.log(&#39;promise2&#39;);\n});\nsetImmediate(() =&gt; {console.log(&#39;setImmediate&#39;)})\nconsole.log(&#39;end&#39;) \n\n```',
    answer:
      '1. end -&gt; nextTick -&gt; promise1 -&gt; promise2-&gt; setImmediate\n1. process.nextTick 和 promise.then 都属于 microtask，而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。\n1. 事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。',
    types: ['前端领域'],
    tags: ['编码', 'promise', '异步'],
  },
  {
    name: '请简述常见web安全及防护原理',
    desc: '常见web安全及防护原理，请举例说明。',
    answer:
      '1、SQL注入原理  \n\t\t就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令。\n总的来说有以下几点  \n1. 永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双&#34;-&#34;进行转换等。\n2. 永远不要使用动态拼装SQL，可以使用参数化的SQL或者直接使用存储过程进行数据查询存取。\n3. 永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。\n4. 不要把机密信息明文存放，请加密或者hash掉密码和敏感的信息。  \n2、XSS原理及防范  \nXss(cross-site scripting)攻击指的是攻击者往Web页面里插入恶意 html标签或者JavaScript代码。\n看似安全的链接，骗取用户点击后，窃取cookie中的用户私密信息；或者攻击者在论坛中加一个恶意表单，\n当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点。\nXSS防范方法  \n首先代码里对用户输入的地方和变量都需要仔细检查长度和对”&lt;”,”&gt;”,”;”,”’”等字符做过滤；其次任何内容写到页面之前都必须加以encode，避免不小心把html tag 弄出来。这一个层面做好，至少可以堵住超过一半的XSS 攻击。\n首先，避免直接在cookie 中泄露用户隐私，例如email、密码等等。\n其次，通过使cookie 和系统ip 绑定来降低cookie 泄露后的危险。这样攻击者得到的cookie 没有实际价值，不可能拿来重放。\n如果网站不需要再浏览器端对cookie 进行操作，可以在Set-Cookie 末尾加上HttpOnly 来防止javascript 代码直接获取cookie 。\n\n3、CSRF原理及防范  \nCSRF的防御\n服务端的CSRF方式方法很多样，但总的思想都是一致的，就是在客户端页面增加伪随机数。\n通过验证码的方法',
    types: ['前端领域', 'JavaScript'],
    tags: ['安全', 'web'],
  },
  {
    name: '数字格式化问题:1234567890 --> 1,234,567,890',
    desc: '数字格式化问题,将1234567890 --&gt; 1,234,567,890',
    answer:
      '非正则实现\n```javascript\nlet test = &#39;1234567890&#39;\nfunction formatCash(str) {\n  let arr = []\n  for (let i = 1; i &lt; str.length; i++) {\n    if (str.length % 3 &amp;&amp; i == 1)\n      arr.push(str.substr(0, str.length % 3))\n    if (i % 3 === 0)\n      arr.push(str.substr(i - 2, 3))\n  }\n  return arr.join(&#39;,&#39;)\n}\nconsole.log(formatCash(test)) // 1,234,567,890\n```\n正则实现\n```javascript\nlet test1 = &#39;1234567890&#39;\nlet format = test1.replace(/\\B(?=(\\d{3})+(?!\\d))/g, &#39;,&#39;)\nconsole.log(format) // 1,234,567,890\n```',
    types: ['前端领域'],
    tags: ['数字格式化', '编码', '正则表达式'],
  },
  {
    name: '模拟实现loadash中的_.get()函数，实现如下传入参数取值效果',
    desc: '```javascript\nfunction get() {\n  // 请补全函数参数和实现逻辑\n}\nconst obj = { selector: { to: { toutiao: &#39;FE coder&#39; } }, target: [1, 2, { name: &#39;byted&#39; }] };\n// 运行代码\nget(obj, &#39;selector.to.toutiao&#39;, &#39;target[0]&#39;, &#39;target[2].name&#39;)\n\n//  输出结果：\n// [&#39;FE coder&#39;, 1, &#39;byted&#39;]\n```',
    answer:
      '```javascript\nconst get = (from, ...selectors) =&gt;\n  [...selectors].map(s =&gt;\n    s\n      .replace(/\\[([^\\[\\]]*)\\]/g, &#39;.$1.&#39;)\n      .split(&#39;.&#39;)\n      .filter(t =&gt; t !== &#39;&#39;)\n      .reduce((prev, cur) =&gt; prev &amp;&amp; prev[cur], from)\n  );\n```\n1. Use Array.map() for each selector\n2. String.replace() to replace square brackets with dots\n3. String.split(&#39;.&#39;) to split each selector\n4. Array.filter() to remove empty values\n5. Array.reduce() to get the value indicated by it',
    types: ['前端领域', 'JavaScript'],
    tags: ['js对象'],
  },
  {
    name: '合并两个有序数组',
    desc: '合并两个有序数组',
    answer:
      '```\nfunction mergeSortedArray(a, b){\n  var merged = [], \n      aElm = a[0],\n      bElm = b[0],\n      i = 1,\n      j = 1;\n  if(a.length ==0)\n    return b;\n  if(b.length ==0)\n    return a;\n  while(aElm || bElm){\n   if((aElm &amp;&amp; !bElm) || aElm &lt; bElm){\n     merged.push(aElm);\n     aElm = a[i++];\n   }   \n   else {\n     merged.push(bElm);\n     bElm = b[j++];\n   }\n  }\n  return merged;\n}\n```\n验证\n```\nmergeSortedArray([2,5,6,9], [1,2,3,29]);\n结果 [1, 2, 2, 3, 5, 6, 9, 29]\n```',
    types: ['前端领域'],
    tags: ['编码', '编程', '有序数组'],
  },
  {
    name: '进行CSRF漏洞扫描的原理和防御方式是什么？',
    desc: '如题',
    answer:
      'CSRF 就是在用户不知情的情况下，发出了请求，让用户做了不该做的操作。\n举个例子，比如你的一个网站中有个 img 标签，src 指向的是微博关注某人的接口，\n那么当用户访问你的网站时，就会在微博上关注那个人，而且这个操作用户是不知情的。\n因为 img src 发出的跨域请求，也是会携带 cookie 的，所以如果用户在微博登录过，\n那么就会带有微博的登录授权。同理，如果是其他操作，可能也存在这种漏洞，比较危险的情况就是付款。\n一般会采用 CSRF token 的方式防御，就是关键请求得要换取一个一次有效的 token 才有权限。\n',
    types: ['前端领域'],
    tags: ['基础概念'],
  },
  {
    name: '判断一个字符串是否是回文字符串',
    desc: '判断一个字符串是否是回文字符串，回文字符串是对称字符串的形式，例如：did，eve, dad, level',
    answer:
      '```\nfunction isPalindrome(str){\n  var i, len = str.length;\n  for(i=0; i isPalindrome(&#39;madam&#39;)\n  = true\n&gt; isPalindrome(&#39;toyota&#39;)\n  = false\n```',
    types: ['前端领域'],
    tags: ['编码', '编程'],
  },
  {
    name: 'box-sizing 实践',
    desc: '<p><br></p><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;head&gt;\n    &lt;style&gt;\n      .box {\n        width: 10px;\n        height: 10px;\n        border: 1px solid red;\n        margin: 2px;\n        padding: 2px;\n        background: blue;\n      }\n\n      #borderBox {\n        box-sizing: border-box;\n      }\n\n      #contentBox {\n        box-sizing: content-box;\n      }\n    &lt;/style&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;div&gt;请问下面两个 div 元素，蓝色区域的宽高各是多少像素？&lt;/div&gt;\n    &lt;div id=&#34;borderBox&#34; class=&#34;box&#34;&gt;&lt;/div&gt;\n    &lt;div id=&#34;contentBox&#34; class=&#34;box&#34;&gt;&lt;/div&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</code></pre><p><br></p>',
    answer:
      '<p>borderBox：10px(width) - 1px(border) * 2 = 8px </p><p>contentBox 10px(width) + 2px(padding) *2 = 14px</p><p><br></p><p>答题要点：除了验证候选人是否真正了解 box-sizing 之外，也考察候选人是否了解 background 会影响元素的 padding 区域，而不影响 margin 区域这个特点</p>',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '链式调用+延迟计算',
    desc: '<p>写一个加法函数sum，支持sum(1)(2)(3,4)(5,6,7....)</p><p><br></p><p>console.log(sum(1,2,3)(4)) =&gt; 输出 10</p><p><br></p><p><br></p><p>考察链式调用，闭包，延迟计算，函数toStirng/valueOf</p><p><br></p><p><br></p><p><br></p>',
    answer:
      '<p><br></p><pre><code>function sum(...args) {\n  function next(...innerArgs) {\n    args.push(...innerArgs);\n    return next;\n  }\n  next.valueOf = next.toString = () =&gt; {\n    return args.reduce((r, c) =&gt; r + c, 0);\n  };\n\n  return next;\n}</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '前端编码'],
  },
  {
    name: '请描述micro task 与 macro task的区别及应用',
    desc: '<p><br></p><pre><code>async function async1() {\n  console.log(&#39;async1 start&#39;);\n  await async2();\n  console.log(&#39;async1 end&#39;);\n}\nasync function async2() {\n  console.log(&#39;async2&#39;);\n}\n\nconsole.log(&#39;script start&#39;);\nsetTimeout(function() {\n    console.log(&#39;setTimeout&#39;);\n}, 0);  \nasync1();\nnew Promise(function(resolve) {\n    console.log(&#39;promise1&#39;);\n    resolve();\n  }).then(function() {\n    console.log(&#39;promise2&#39;);\n});\nconsole.log(&#39;script end&#39;);</code></pre><p><br></p>',
    answer: '<p>script start</p><p>async1 start</p><p>async2</p><p>promise1</p><p>script end</p><p>async1 end</p><p>promise2</p><p>setTimeout</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['promise', 'task'],
  },
  {
    name: '数组flat函数设计',
    desc: '设计一个flat函数将如下数组arr=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]]输出为1,2,&#39;3&#39;,4,&#39;5&#39;,6,7,8,9。至少写出两种方法,要求不能改变数组中的原始数据类型',
    answer:
      '*  方法一：递归\n```javascript\nfunction flat(array) {\n    var result = [];\n    var each = function(arr) {\n      arr.forEach(item =&gt; {\n        if (item instanceof Array) {\n          each(item);\n        } else {\n          result.push(item);\n        }\n      });\n    };\n    each(array);\n    return result;\n  }\nvar arr=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]];flat(arr).forEach(item=&gt;{console.log(item)})\n\n```\n*  方法二：toString（格式转换），无法保证类型\n```javascript\nArray.prototype.toString = function() {\n  return this.join(&#39;,&#39;);\n};\nconsole.log([1,2,[3,4,[5,6,7]]]+&#39;&#39;);\n```\n*  方法三：Iterator\n```javascript\nArray.prototype[Symbol.iterator] = function() {\n  let arr = [].concat(this),\n    index = 0;\n  let getFirst=function(array){\n    let first=array[0];\n    if(first instanceof Array){\n      return getFirst(array[0])\n    }else if(first!==undefined){\n      return array.shift()\n    }else{\n      return &#39;&#39;\n    }\n  }\n  return {\n    next: function() {\n      let item=getFirst(arr);\n      if(item){\n        return {\n          value:item,\n          done:false\n        }\n      }else{\n        return {\n          done:true\n        }\n      }\n    }\n  }\n}\nvar t=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]];\nfor(let i of t){console.log(i)}\n```',
    types: ['前端领域'],
    tags: ['ES', '编码', '基础算法'],
  },
  {
    name: '存储在 Cookie 和 localStorage 内有什么区别',
    desc: '基础题考察 cookie 和 localStorage 的理解。',
    answer: '存储在 Cookie 中每个 request 都会带上，而放在 localStorage 中，仅有浏览器中会存储。',
    types: ['前端领域', '浏览器'],
    tags: [],
  },
  {
    name: '请说说HTML的Meta标签的用途，并列举一些常用的meta标签',
    desc: '',
    answer:
      '考察对网页结构和语义的理解 \n\n```\nThe HTML  element represents metadata that cannot be represented by other HTML meta-related elements, like , , ',
    types: ['前端领域', 'HTML'],
    tags: ['基础'],
  },
  {
    name: '说说前端优化？图片懒加载原理是什么？',
    desc: '* 考察前端的一些优化方式\n* 图片懒加载原理',
    answer:
      '1. 优化手段：雅虎的34条优化手段，比如：代码压缩、减少请求、cdn、缓存\n2. 图片懒加载原理：img标签设置占位属性(data-src)，存储真正的图片地址；原src设置占位图片地址；当图片(快)进入用户可视区域的时候进行地址替换；',
    types: ['前端领域', '渲染框架'],
    tags: ['优化'],
  },
  {
    name: '请谈谈你对ES6的箭头函数的理解',
    desc: '```\nvar func1 = x =&gt; x;\nvar func2 = x =&gt; {x}; \nvar func3 = x =&gt; ({x});\nconsole.log(func1(1));\nconsole.log(func2(1));\nconsole.log(func3(1));\n```\n请写出程序运行结果。',
    answer: '程序运行结果为：<br>\n第一个：1 <br>\n第二个：undefined <br>\n第三个：{x: 1}  <br>',
    types: ['前端领域', 'JavaScript'],
    tags: ['es6'],
  },
  {
    name: '无重复字符的最长子串',
    desc: '<p>给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。</p><h3>样例：</h3><p><br></p><ul><li>输入: &#34;abcabcbb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;abc&#34;，所以其长度为 3。</p><ul><li>输入: &#34;bbbbb&#34;</li></ul><p>输出: 1</p><p>解释: 因为无重复字符的最长子串是 &#34;b&#34;，所以其长度为 1。</p><ul><li>输入: &#34;pwwkew&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;wke&#34;，所以其长度为 3。</p><ul><li>输入: &#34;dvdf&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;vdf&#34;，所以其长度为 3。</p><ul><li>输入: &#34;asjrgapa&#34;</li></ul><p>输出: 6</p><p>解释: 因为无重复字符的最长子串是 &#34;sjrgap&#34;，所以其长度为 6。</p><ul><li>输入: &#34;aabaab!bb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;ab!&#34;，所以其长度为 3。</p><ul><li>输入: &#34;abcb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;abc&#34;，所以其长度为 3。</p><ul><li>输入: &#34;asljlj&#34;</li></ul><p>输出: 4</p><p>解释: 因为无重复字符的最长子串是 &#34;aslj&#34;，所以其长度为 4。</p><ul><li>输入: &#34;qwnfenpglqdq&#34;</li></ul><p>输出: 8</p><p>解释: 因为无重复字符的最长子串是 &#34;fenpglqd&#34;，所以其长度为 8。</p><h3><br></h3><p><br></p>',
    answer:
      '<p><br></p><pre><code>var lengthOfLongestSubstring = function(s: string) {\n    let list = s.split(&#34;&#34;);\n    let son = [];\n    let max = [];\n    for (let i = 0; i &lt; list.length; i++) {\n        let current = list[i];\n        let index = son.indexOf(current);\n        if (index === -1) {\n            son.push(current);\n        } else {\n            let sameIndex = i - son.length + index;\n            if (son.length &gt; max.length) {\n                max = [...son];\n            }\n            son = son.slice(sameIndex + 1, son.length);\n            son.push(current);\n        }\n    }\n    return max.length;\n};</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '字符串'],
  },
  {
    name: '列举一个近期做的最能体现设计能力的项目',
    desc: '请举出一个你近期做的项目，项目需要最能体现设计能力,  请从以下角度说明：\n1. 项目描述\n2. 技术选型\n3. 模块化\n4. 模块之间通信\n5. 工程化\n6. 前后端数据流 ',
    answer: '这是一个开放式的工程设计题目，没有固定答案，评分参考评分标准',
    types: ['前端领域'],
    tags: ['设计模式'],
  },
  {
    name: '实现一个 JSONP',
    desc: '函数签名如下:\n\n```javascript\nfunction jsonp(url, callback) {\n  // TODO\n}\n```',
    answer:
      '主要考察如何处理第二个参数 `callback` 的问题，\n加分项比如超时处理 onerror 的处理, xss 考虑等等\n\n```\nconst kCallBackMap = {};\nfunction uuid() {\n  return ...;\n}\n\nfunction jsonp(url, callback) {\n  const callbackId = uuid();\n  url += &#39;callback=&#39; + callbackId;\n\twindow[calbackId] = callback;\n\t\n\tconst script = document.createElement(&#39;script&#39;);\n\tscript.src = url;\n\tdocument.head.appendChild(script);\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['jsonp'],
  },
  {
    name: '请谈一谈JAVAscript的作用域和this',
    desc: '```\ninner = &#39;window&#39;;\n\nfunction say() {\n    console.log(inner);\n    console.log(this.inner);\n}\n\nvar obj1 = (function() {\n    var inner = &#39;1-1&#39;;\n    return {\n        inner: &#39;1-2&#39;,\n        say: function() {\n            console.log(inner);\n            console.log(this.inner);\n        }\n    }\n})();\n\nvar obj2 = (function() {\n    var inner = &#39;2-1&#39;;\n    return {\n        inner: &#39;2-2&#39;,\n        say: function() {\n            console.log(inner);\n            console.log(this.inner);\n        }\n    }\n})();\n\n\nsay();\nobj1.say();\nobj2.say();\nobj1.say = say;\nobj1.say();\nobj1.say = obj2.say;\nobj1.say();\n```',
    answer:
      '```\nwindow\nwindow\n\n1-1\n1-2\n\n2-1\n2-2\n\nwindow\n1-2\n\n2-1\n1-2\n\n主要考察javascript的作用域和this指向。作用域是静态的，声明时确定；this是动态的，运行时确定。\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', '语言关键字'],
  },
  {
    name: '请问CSS position有哪些定位方式',
    desc: 'CSS position有哪些定位方式，每种方式是如何定位的？',
    answer:
      '### position取值\nrelative, fixed，absolute和staic、sticky 5种\n### 定位方式\n*  staic-默认位置；元素会像通常那样流入页面。顶部，底部，左，右，z-index属性不适用。  \n*  relative-元素的位置相对于自身进行调整，而不改变布局（从而为未被定位的元素留下一个空白）。  \n*  absolute-该元素从页面的流中移除，并相对于其最近位置的祖先定位（非static）在指定位置，如果有的话，或者与初始包含块相对。绝对定位的框可以有边距，并且不会与其他边距折叠。这些元素不影响其他元素的位置。  \n*  fixed元素是定位在相对于窗口。  \n*  sticky，是相对定位和固定定位的混合。该元素被视为相对位置，直到它越过指定的阈值，此时它被视为固定位置。  \n',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '请介绍一下Oauth2.0 的认证过程',
    desc: '如题',
    answer:
      '可以参考 http://www.jianshu.com/p/0db71eb445c8 或者 \nhttp://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html 的答案，\n回答的一个重点是 code（授权码）仅一次有效，并且要有失效时间，而且很短，比如一分钟，\n因为浏览器收到会立刻跳转。\n还有就是服务端可以根据 code 结合相应的 sercet 去获取 token，要说清楚。',
    types: ['前端领域'],
    tags: ['安全', 'oauth'],
  },
  {
    name: 'express中间件的原理',
    desc: '<div style="white-space: pre;">express中间件的实现原理 并给出实现\n</div>',
    answer:
      '<div style="white-space: pre;">主要考察候选人对中间件的理解 参考代码 ``` export default function compose(...funcs) { if (funcs.length === 0) { return arg =&gt; arg } if (funcs.length === 1) { return funcs[0] } return funcs.reduce((a, b) =&gt; (...args) =&gt; a(b(...args))) } ``` koa中间件主要使用 generator和promise可参考https://github.com/tj/co\n</div>',
    types: ['前端领域'],
    tags: ['编码'],
  },
  {
    name: '实现es6字符串模板方法sprintf',
    desc: '<p><br></p><pre><code>const template = &#34;My name is ${name},I&#39;m from ${city}&#34;;\nconst result = sprintf(template, {\n\tname: &#39;Yiming Zhang&#39;,\n\tcity: &#39;FuJian&#39;,\n});\nconsole.log(result); // My name is Yiming Zhang,I&#39;m from FuJian</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>const sprintf = (str, data) =&gt; (\n    Object.keys(data).reduce((prev, cur) =&gt; {\n        let reg = new RegExp(&#39;\\\\$\\\\{&#39; + cur + &#39;\\\\}&#39;, &#39;g&#39;);\n        return prev.replace(reg, data[cur]);\n    }, str);\n);</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '正则表达式', '前端基础', 'es6'],
  },
  {
    name: '登录表单设计/扫码登录/第三方登录',
    desc: '1. 请实现一个登录表单\n2. 用GET方法行不行？csrf是什么？如何防御？\n3. cookie-sesssion的工作机制\n4. 你已经登录产品的App端，要在web实现扫码登录，该如何设计？\n5. 接入第三方登录（如微信），如何设计？',
    answer:
      '1. 正确书写html\n2. 正确回答GET和POST的区别，从语义、弊端、安全等方面。csrf的防御：token，samesite，referer校验（弊端）等\n3. 正确理解cookie-session的工作机制，sessionId的设计，存储\n4. 考察对司空见惯的扫码登录，是否有思考其实现。正确设计 Client/Server/App 三方流程，设计二维码存储的内容，client通知有轮训或websocket等解决方案\n5. 正确理解 Client/Server/App/Weixin Server 四方流程，理解oauth2协议',
    types: ['前端领域', 'HTML'],
    tags: ['扫码登录'],
  },
  {
    name: '作用域以及变量提升',
    desc: '### 请写出下题的结果：\n```\nvar a = 1; \nfunction b() { \n    a = 10; \n    return; \n    function a() {} \n} \nb(); \nconsole.log(a);   \n```',
    answer: '结果：1',
    types: ['前端领域'],
    tags: ['语言基础', '基础概念', '提升'],
  },
  {
    name: 'setTimeout 和 Promise',
    desc: '<p>请写出程序的输出内容</p><pre><code>setTimeout(function() {\n  console.log(1)\n}, 0);\nnew Promise(function(resolve) {\n  console.log(2);\n  for(var i=0 ; i &lt; 10000 ; i++) {\n    if (i == 9999) {\n      resolve();\n    }\n  }\n  console.log(3);\n}).then(function() {\n  console.log(4);\n});\nconsole.log(5);</code></pre><p><br></p>',
    answer: '<p>正确答案：2 3 5 4 1。重点关注：候选人是否把 2 写在第一位，以及 4 和 1 的顺序。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'requestIdleCallback和requestAnimationFrame有什么区别？',
    desc: '<p>\t<strong>requestIdleCallback和requestAnimationFrame有什么区别？</strong></p>',
    answer:
      '<p>\trequestAnimationFrame的回调会在每一帧确定执行，属于高优先级任务，而requestIdleCallback的回调则不一定，属于低优先级任务。</p><p>\t我们所看到的网页，都是浏览器一帧一帧绘制出来的，通常认为FPS为60的时候是比较流畅的，而FPS为个位数的时候就属于用户可以感知到的卡顿了。</p><p>\t一帧包含了用户的交互、js的执行、以及requestAnimationFrame的调用，布局计算以及页面的重绘等工作。</p><p>\t假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调。</p><p>\t由于requestIdleCallback利用的是帧的空闲时间，所以就有可能出现浏览器一直处于繁忙状态，导致回调一直无法执行，这其实也并不是我们期望的结果（如上报丢失），那么这种情况我们就需要在调用requestIdleCallback的时候传入第二个配置参数timeout了。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件循环'],
  },
  {
    name: '请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率>=n的元素列表',
    desc: '请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率&gt;=n的元素列表',
    answer:
      '`\nArray.prototype.findDuplicate = function (n) {\n    var results = [];\n    if (typeof n != &#39;number&#39; || isNaN(n)) {\n        return results;\n    }\n    \n    var itemFreqs = {};\n    this.forEach(function (item) {\n        if (!itemFreqs[item]) {\n            itemFreqs[item] = 0;\n        }\n        itemFreqs[item] ++;\n    });\n    \n    for (var item in itemFreqs) {\n        if (itemFreqs[item] &gt;= n) {\n            results.push(item);\n        }\n    }\n    \n    return results;\n}\n\n`',
    types: ['前端领域'],
    tags: ['编码', '前端编码'],
  },
  {
    name: '请回答DOM中对应创建、移除、追加、复制、查找节点的方法是什么？',
    desc: '考察候选人对原生dom操作的方法的理解和掌握熟练程度',
    answer:
      '1.  创建新节点\n\t*  createDocumentFragment() //创建一个DOM片段\n\t*  createElement() //创建一个具体的元素\n\t*  createTextNode() //创建一个文本节点\n\n1.  克隆节点\n*  cloneNode()\n\n1. 添加节点\n*  appendChild()\n*  insertBefore()\n\n1. 移除节点\n*  removeChild()\n\n1. 替换节点\n*  replaceChild()\n\n1. 查找节点\n*  querySelector()\n*  querySelectorAll()\n*  getElementById()\n*  getElementsByName()\n*  getElementsByTagName()\n\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['dom'],
  },
  {
    name: '请描述如何用原生JS实现数字的货币格式化',
    desc: '<p># 如何用原生JS实现数字的货币格式化，例如数字6123456789格式化后为6,123,456,789，不低于两种方法。</p>',
    answer:
      '<p>方法一： (6123456789).toLocaleString(&#39;en-US&#39;) // 6,123,456,789</p><p><br></p><p>方法二： (6123456789).toString().split(&#39;&#39;).reverse().join(&#39;&#39;).replace(/\\d{3}/g,function($1){return $1+&#39;,&#39;}).split(&#39;&#39;).reverse().join(&#39;&#39;) </p><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['数字格式化', 'js'],
  },
  {
    name: 'let,const,var的区别',
    desc: '请说明一下let,const,var的区别 并回答如下代码会不会报错\n```\nconst a = {};\na.test = 1;\n```',
    answer:
      '考察候选人对es6变量声明的理解\n1. let声明的变量拥有块级作用域\n2. let声明的全局变量不是全局对象的属性\n3. let不能重新声明变量\n4. const声明的变量与let声明的变量类似，它们的不同之处在于，const声明的变量只可以在声明时赋值，不可随意修改，否则会导致SyntaxError（语法错误）。\n\n上面代码只是针对a的引用 并不会报错',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '如何实现链式调用',
    desc: '请实现函数 a, b, c，使调用方式为 a().b().c() 时，结果为输出 a b c。\n如果上面问题回答出来了，并且是在 a 函数内部 return Object 实现，\n那么可以补充问下如何能够实现让三个函数任意链式顺序调用。\n如 a().c().b() 或 b().a().c() 。\n',
    answer:
      '这道题主要就是考察面试者对 JavaScript 的 Object 概念理解是否清晰，\n最好的答案是直接将 a b c 三个函数挂载到 runtime 中的某个全局变量中，比如可以是 window。\n然后在每个函数内 return window 就可以了。\n当然，也可以按照第一道题目的顺序，分别在相应函数内 return 下个函数，但是这样做无法调换顺序。',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: '实现千位分隔符',
    desc: '给一个数字，比如：1234567.90，转化成：1,234,567.90',
    answer:
      '```js\nfunction commafy(num) {\n  return num &amp;&amp; num\n      .toString()\n      .replace(/^\\d+/, (m) =&gt; m.replace(/(?=(?!^)(\\d{3})+$)/g, &#39;,&#39;));\n}\nconsole.log(commafy(1234567.90)); //1,234,567.90\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础算法'],
  },
  {
    name: '编写javascript深度克隆函数deepClone',
    desc: '编写javascript深度克隆函数deepClone',
    answer:
      '```javascript\nfunction deepClone(obj) {\n    var _toString = Object.prototype.toString;\n\n    // null, undefined, non-object, function\n    if (!obj || typeof obj !== &#39;object&#39;) {\n        return obj;\n    }\n\n    // DOM Node\n    if (obj.nodeType &amp;&amp; &#39;cloneNode&#39; in obj) {\n        return obj.cloneNode(true);\n    }\n\n    // Date\n    if (_toString.call(obj) === &#39;[object Date]&#39;) {\n        return new Date(obj.getTime());\n    }\n\n    // RegExp\n    if (_toString.call(obj) === &#39;[object RegExp]&#39;) {\n        var flags = [];\n        if (obj.global) { flags.push(&#39;g&#39;); }\n        if (obj.multiline) { flags.push(&#39;m&#39;); }\n        if (obj.ignoreCase) { flags.push(&#39;i&#39;); }\n\n        return new RegExp(obj.source, flags.join(&#39;&#39;));\n    }\n\n    var result = Array.isArray(obj) ? [] :\n        obj.constructor ? new obj.constructor() : {};\n\n    for (var key in obj ) {\n        result[key] = deepClone(obj[key]);\n    }\n\n    return result;\n}\n\nfunction A() {\n    this.a = a;\n}\n\nvar a = {\n    name: &#39;qiu&#39;,\n    birth: new Date(),\n    pattern: /qiu/gim,\n    container: document.body,\n    hobbys: [&#39;book&#39;, new Date(), /aaa/gim, 111]\n};\n\nvar c = new A();\nvar b = deepClone(c);\nconsole.log(c.a === b.a);\nconsole.log(c, b);\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '请谈谈你对JS单线程以及setTimeout的理解',
    desc: '```javascript\nsetTimeout(function() {\n\tsetTimeout(function() { console.log(1) }, 100)\n\tconsole.log(2)\n\tsetTimeout(function() { console.log(3) }, 0)\n}, 0)\nsetTimeout(function () {\n\tconsole.log(4)\n}, 100)\nconsole.log(5)\n```\n请说出上面代码的输出顺序以及原因？如果吧4改为101ms呢？',
    answer:
      '正确顺序为：5 2 3 4 1\n如果4改为101ms则执行顺序还是不变\n原因：\n1.  JS单线程\n2. setTimeout不在当前eventloop。且执行顺序依赖入队顺序。setTimeout 0是放入下一个loop的队尾\n3. 虽然4和1都是100ms延迟的标记，但是4先入队列。\n4. setTimeout的time是个标记，会在eventloop循环去检测，符合条件的执行，不符合条件的延后到下一个eventloop，这执行过程本身又有时间，因此尽管101&gt;100，但是在一个执行周期内，他们都会被触发，4先入队所以不变',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', 'js'],
  },
  {
    name: 'async & forEach 考察',
    desc: '以下代码的运行结果\n```javascript\nconst list = [1, 2, 3];\nconst square = num =&gt; {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(num * num);\n        }, 1000);\n    });\n}\nfunction test() {\n    list.forEach(async x =&gt; {\n        const res = await square(x);\n        console.log(res);\n    });\n}\ntest()\n```\n如果希望每隔1s输出一个结果，应该如何改造？',
    answer:
      '1s 后输出 1 4 9  \n改为 for 循环：\n```javascript\nasync function test() {\n    for (let x of list) {\n        const res = await square(x);\n        console.log(res)\n    }\n}\n```\n',
    types: ['前端领域'],
    tags: ['编码', '代码阅读'],
  },
  {
    name: 'css单位的百分比',
    desc: '给一个div设置它父级div的宽度是100px，然后再设置它的padding-top为20%。 <br>\n问现在的div有多高？如果父级元素定位是absolute呢？',
    answer:
      '现有div的高度等于自身高度+父级块的宽度*20%,如果父级元素定位是absolute，结果不变；<br>\n当margin/padding取形式为百分比的值时，无论是left/right，还是top/bottom，都是以父元素的width为参照物的！<br>\n',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: 'NodeJS实现简单的HTTP代理和隧道代理',
    desc: 'Web代理一般包括普通的HTTP代理和隧道代理，谈谈理解。\nNodeJS实现一个简单的HTTP代理，如在本地 8888 端口开启 HTTP 代理服务，修改浏览器的 HTTP 代理为 127.0.0.1:8888 后再访问 HTTP 网站，代理可以正常工作\n对隧道代理了解多少，能否实现？',
    answer:
      'http普通代理：HTTP 客户端向代理发送请求报文，代理服务器需要正确地处理请求和连接（例如正确处理 Connection: keep-alive），同时向服务器发送请求，并将收到的响应转发给客户端。\n```\n// http 普通代理\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction request(cReq, cRes) {\n  const u = url.parse(cReq.url);\n\n  const options = {\n    hostname: u.hostname,\n    port: u.port || 80,\n    path: u.path,\n    method: cReq.method,\n    headers: cReq.headers\n  };\n\n  const pReq = http.request(options, pRes =&gt; {\n    cRes.writeHead(pRes.statusCode, pRes.headers);\n    pRes.pipe(cRes);\n  }).on(&#39;error&#39;, function(e) {\n    cRes.end();\n  });\n\n  cReq.pipe(pReq);\n}\n\nhttp.createServer().on(&#39;request&#39;, request).listen(8888, &#39;0.0.0.0&#39;);\n```\n隧道代理：HTTP 客户端通过 CONNECT 方法请求隧道代理创建一条到达任意目的服务器和端口的 TCP 连接，并对客户端和服务器之间的后继数据进行盲转发\n```\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction connect(cReq, cSock) {\n  const u = url.parse(&#39;http://&#39; + cReq.url);\n\n  const pSock = net.connect(u.port, u.hostname, function() {\n    cSock.write(&#39;HTTP/1.1 200 Connection Established\\r\\n\\r\\n&#39;);\n    pSock.pipe(cSock);\n  }).on(&#39;error&#39;, function(e) {\n    cSock.end();\n  });\n\n  cSock.pipe(pSock);\n}\n\nhttp.createServer().on(&#39;connect&#39;, connect).listen(8888, &#39;0.0.0.0&#39;);\n```\n合二为一\n```\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction request(cReq, cRes) {\n  const u = url.parse(cReq.url);\n\n  const options = {\n    hostname: u.hostname,\n    port: u.port || 80,\n    path: u.path,\n    method: cReq.method,\n    headers: cReq.headers\n  };\n\n  const pReq = http.request(options, pRes =&gt; {\n    cRes.writeHead(pRes.statusCode, pRes.headers);\n    pRes.pipe(cRes);\n  }).on(&#39;error&#39;, function(e) {\n    cRes.end();\n  });\n\n  cReq.pipe(pReq);\n}\n\nfunction connect(cReq, cSock) {\n  var u = url.parse(&#39;http://&#39; + cReq.url);\n\n  var pSock = net.connect(u.port, u.hostname, function() {\n    cSock.write(&#39;HTTP/1.1 200 Connection Established\\r\\n\\r\\n&#39;);\n    pSock.pipe(cSock);\n  }).on(&#39;error&#39;, function(e) {\n    cSock.end();\n  });\n\n  cSock.pipe(pSock);\n}\n\nhttp.createServer()\n  .on(&#39;request&#39;, request)\n  .on(&#39;connect&#39;, connect)\n  .listen(8888, &#39;0.0.0.0&#39;);\n```\n需要注意的是，大部分浏览器配完隧道代理，默认只会让https走隧道代理，http如果需要走隧道代理，还需要写个Nodejs的验证\n```\nconst options = {\n  hostname: &#39;127.0.0.1&#39;,\n  port: 8888,\n  path: &#39;toutiao.com:80&#39;,\n  method: &#39;CONNECT&#39;\n};\n\nconst req = http.request(options);\n\nreq.on(&#39;connect&#39;, function(res, socket) {\n  socket.write(&#39;GET / HTTP/1.1\\r\\n&#39; +\n    &#39;Host: toutiao.com\\r\\n&#39; +\n    &#39;Connection: Close\\r\\n&#39; +\n    &#39;\\r\\n&#39;);\n\n  socket.on(&#39;data&#39;, function(chunk) {\n    console.log(chunk.toString());\n  });\n\n  socket.on(&#39;end&#39;, function() {\n    console.log(&#39;socket end.&#39;);\n  });\n});\n\nreq.end();\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['代理'],
  },
  {
    name: '假设一个网页嵌入一个iframe,如何更改iframe内dom样式？',
    desc: '假设一个网页嵌入一个iframe,如何更改这个iframe内dom样式',
    answer:
      '区分同源和不同源解决方案，同源可以通过document.getElementById(&#39;iframeId&#39;).contentWindow.document，\n不同源：分iframe的嵌入的页面是否自己可控，可控可以通过postMessage方式更改，iframe页面监听message事件；如果页面不可控，应该无解。\n可以追问iframe有同源策略限制，举个例子说明',
    types: ['前端领域', '可视化'],
    tags: ['语言基础'],
  },
  {
    name: '数组随机排序',
    desc: '```javascript\nvar arr=[1,2,3,4,5,6]\n```\n',
    answer:
      '方法一、\n```javascript\narr.map(item=&gt;{\n    return {\n        value:item,\n        key:Math.random()\n    }\n})\n.sort((a,b)=&gt;a.key-b.key)\n.map(item=&gt;item.value)\n```\n方法二、\n```\nvar arrayToRand = (arr) =&gt; {\n    for(let i=0; i',
    types: ['前端领域'],
    tags: ['排序', '编码'],
  },
  {
    name: 'js事件模型',
    desc: '浏览器的事件模型？在当前的事件模型中，哪些事件可以冒泡，哪些不会冒泡，为什么？不冒泡的元素，如何来实现事件代理？',
    answer:
      '考察浏览器事件模型，看看是不是了解事件模型背后的设计意图。\n\n浏览器开发团队遇到的问题：页面上哪一部分会拥有某个特定的事件？比如单击一个嵌套的同心div，那么到底哪一个div会拥有这个点击事件？实际上难以确定点击者的意图，团队给出的解决方式是所有div都将拥有这个事件，于是产生了事件流模型。如上一个问题所述，“事件”的概念在GUI编程中如此之重要，而这种流式模型能给予其很大的灵活性和控制\n对于能精确确定意图的（这种冒泡的话一般也会带来问题，比如mouseleave），或者不可能产生嵌套的媒体类元素，冒泡就不是必须的；对于不冒泡的元素，可以在捕获阶段代理，DOM2级规范addEventListener的第三个参数',
    types: ['前端领域', 'JavaScript'],
    tags: ['js', '事件模型'],
  },
  {
    name: '请列举说明几个在web中实现长连接的技术方案或手段',
    desc: '本地主要考察候选人对长连接技术的概念理解和区分，如果能回答答出大致的名词可以继续追问一些具体的激技术实现细节和存在的优缺点等等。\n',
    answer:
      '参考答案：\n1. https://stackoverflow.com/questions/11077857/what-are-long-polling-websockets-server-sent-events-sse-and-comet/12855533#12855533\n1. https://blog.csdn.net/liang0000zai/article/details/40537059\n\n* Long Polling\n* Server-Sent Events\n* Websockets\n* Comet',
    types: ['前端领域'],
    tags: ['长连接', '基础概念', 'web'],
  },
  {
    name: '函数作用域',
    desc: '用代码实现JavaScript中Function的bind方法的polyfill',
    answer:
      '```\nif (!Function.prototype.bind) {\n  Function.prototype.bind = function (oThis) {\n    if (typeof this !== &#34;function&#34;) {\n      // closest thing possible to the ECMAScript 5\n      // internal IsCallable function\n      throw new TypeError(&#34;Function.prototype.bind - what is trying to be bound is not callable&#34;);\n    }\n\n    var aArgs = Array.prototype.slice.call(arguments, 1), \n        fToBind = this, \n        fNOP = function () {},\n        fBound = function () {\n          return fToBind.apply(this instanceof fNOP\n                                 ? this\n                                 : oThis || this,\n                               aArgs.concat(Array.prototype.slice.call(arguments)));\n        };\n\n    fNOP.prototype = this.prototype;\n    fBound.prototype = new fNOP();\n\n    return fBound;\n  };\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['函数作用域'],
  },
  {
    name: 'CSS 属性 box-sizing的值有哪些？分别有什么含义？',
    desc: 'CSS 属性 box-sizing的值有哪些？分别有什么含义？',
    answer: '  - `content-box` 默认值，width内容宽度\n\t- `border-box` width 包含`padding`和`border`',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: 'JS的new操作符具体做了什么',
    desc: 'JS的new操作符具体做了什么，描述一下，最好可以体现在代码上',
    answer:
      '```\nfunction A() {\n  this.name = &#39;a&#39;;\n  this.getName = function() {\n    return this.name;\n  }\n}\nvar a = new A();\n\nvar aa = new Object();\naa.__proto__ = A.prototype;\nA.call(aa);\n// 还有最后一步，如果发现A返回的是一个Object类（非primitive类型），则直接返回A的返回值，否则把aa返回出去\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', '语言关键字', 'js'],
  },
  {
    name: 'JS编码二叉树的实现与遍历',
    desc: 'JS编码实现一个二叉树的构造函数，包括节点类Node，树类BST，插入节点函数insert，\n并且满足\n1.左子节点的值 &lt; 父节点的值 &lt;= 右子节点的值\n2.可以实现先序，中序，后续遍历',
    answer:
      '```\n// 二叉树\nfunction BST() {\n  this.root = null;\n}\n\nBST.prototype.insert = function(data) {\n  var n = new Node(data, null, null);\n  if (this.root === null) {\n    this.root = n;\n  } else {\n    var current = this.root;\n    for (;;) {\n      if (data &lt; current.data) {\n        if (current.left === null) {\n          current.left = n;\n          break;\n        } else {\n          current = current.left;\n        }\n      } else {\n        if (current.right === null) {\n          current.right = n;\n          break;\n        } else {\n          current = current.right;\n        }\n      }\n    }\n  }\n}\n\n// 先序遍历\nBST.prototype.preOrder = function(node) {\n  if (node !== null) {\n    console.log(node.show() + &#34; &#34;);\n    this.preOrder(node.left);\n    this.preOrder(node.right);\n  }\n}\n\n// 中序遍历\nBST.prototype.inOrder = function(node) {\n  if (node !== null) {\n    this.inOrder(node.left);\n    console.log(node.show() + &#34; &#34;);\n    this.inOrder(node.right);\n  }\n}\n\n// 后序遍历\nBST.prototype.postOrder = function(node) {\n  if (node !== null) {\n    this.postOrder(node.left);\n    this.postOrder(node.right);\n    console.log(node.show() + &#34; &#34;);\n  }\n}\n\n// 节点对象\nfunction Node(data, left, right) {\n  this.data = data;\n  this.left = left;\n  this.right = right;\n  this.show = function() {\n    return this.data;\n  }\n}\n\n// 测试代码\nvar bst = new BST();\nvar nums = [10, 3, 18, 2, 4, 13, 21, 9, 8, 9];\nfor (var i = 0; i &lt; nums.length; i++) {\n  bst.insert(nums[i]);\n}\nbst.preOrder(bst.root);\nbst.inOrder(bst.root);\nbst.postOrder(bst.root);\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['树', '基础算法', 'js'],
  },
  {
    name: '简述一下src与href的区别',
    desc: '描述一下html中的src与href的区别和使用场景是什么',
    answer:
      '基本答案：src用于指向外部资源的位置替换当前元素，href用于在当前文档和引用资源之间确立联系。\n1.  src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；\n在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。\n\n浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。\n这也是为什么将js脚本放在底部而不是头部。\n \n1.  href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加\n\n那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。\n这也是为什么建议使用link方式来加载css，而不是使用@import方式。',
    types: ['前端领域', 'HTML'],
    tags: [],
  },
  {
    name: 'js运行机制',
    desc: '下面一段代码的输出：\n```\n(function() {\n  console.log(&#39;this is the start&#39;);\n  setTimeout(function cb() {\n    console.log(&#39;this is a msg from call back&#39;);\n  });\n  console.log(&#39;this is just a message&#39;);\n  setTimeout(function cb1() {\n    console.log(&#39;this is a msg from call back1&#39;);\n  }, 0);\n  console.log(&#39;this is the end&#39;);\n})();\n```',
    answer:
      '因为前端编程基本属于「Event-driven programming」范式，这是GUI之类的交互式程序的基础，区别于传统的批处理式编程。一个页面上的交互行为，基本都是由用户发起的，然而用户的行为意图是难以预测的，所以需要异步的驱动机制来应对\n因此有进一步问题：\n平时都说JS是单线程执行的，那它是如何实现非阻塞式执行页面JS的？<br>\n考察对EventLoop概念的理解，核心是会在调用栈之外建立一个Event Table。可以将Event Table想象成一个电话注册本：调用栈会告诉event table注册一些特定的函数，并且在指定事件发生时会调用他们。当这些指定事件发生时，event table仅仅是简单地把要调用的函数移入Event Queue中去。event queue提供了一个简单等待区域，函数在此区域内等待被移入调用栈进行调用。\n『究竟什么情况下，event queue中的函数才会被移入调用栈中？』。实际上，JavaScript 遵从一个简单的法则：存在一个监控进程不断检查调用栈是否为空，当调用栈为空的时候，检查事件队列（event queue）中是否有待调用的函数。如果事件队列中存在待调用的函数，队列头部的函数被移入调用栈执行。如果事件队列为空，监控进程就保持轮询状态。\n这意味着js中的定时器的精度，实际上是没有保障的，你写一个setTimeout(function(){ do xxxx}, 1000)； 并没办法保证它刚好是在1000ms之后调用，因为之前的代码执行可能非常耗时，也可能事件队列中有其他事件排在前面。 这样就出现了题目中的情况。\n更多可参考：http://metaphor.space/2016/04/26/javascript-event-loop/；  https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop；还有《你不知道的Javascript中卷》141页~143页，事件循环章节\n\n值得一提的是：我们平常说JS是单线程执行的，但浏览器不是，浏览器是多线程的，有的线程负责网络请求，有的负责渲染页面等；不要搞混了\n\n另外，ES6给JS带来了新的特性，比如加入了可以创建多线程的worker，以及更精准控制事件调度的Promise',
    types: ['前端领域', 'JavaScript'],
    tags: ['js'],
  },
  {
    name: '请问for of和for in的区别',
    desc: 'for of和for in的区别？ for of可以用在普通对象上吗？',
    answer:
      '考察候选人对for 循环的理解 以及对es6中的for of和iterator理解\n\nfor in不多做解释了 for of主要是对实现了 Symbol.iterator 接口进行遍历\n\n自定义for of\n```\nvar iterable = {\n  [Symbol.iterator]() {\n    return {\n      i: 0,\n      next() {\n        if (this.i &lt; 3) {\n          return { value: this.i++, done: false };\n        }\n        return { value: undefined, done: true };\n      }\n    };\n  }\n};\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['编码'],
  },
  {
    name: '字符串的排列组合计算',
    desc: '输入一个字符串，打印出该字符串中字符的所有排列的情况。例如输入字符串abc，则打印出由字符a、b、c所能排列出来的所有字符串abc、acb、bac、bca、cab和cba.\n```javascript\nfunction calc(str){\n    var strArray = str.split(&#39;&#39;);\n    // 补全代码\n  }\n  console.log(calc(&#39;ab&#39;)) // [&#39;a&#39;,&#39;b&#39;]  [&#39;b&#39;,&#39;a&#39;]\n```',
    answer:
      '```javascript\nfunction calc(str){\n    var strArray = str.split(&#39;&#39;);\n    var path = [];\n    var docalc = function(array){\n      if(array.length===1){\n        path.push(array[0]);\n        console.log(path);\n        path.pop();\n        return;\n      }\n      for(var i=0;i',
    types: ['前端领域'],
    tags: ['递归', '排列组合', '编码'],
  },
  {
    name: 'DOM中哪些事件是不冒泡的，如何判断事件是不是可以冒泡？',
    desc: 'DOM中哪些事件是不冒泡的，如何判断事件是不是可以冒泡？',
    answer:
      '*  不冒泡的事件有blur、focus、load、unload、abort、error、mouseenter、mouseleave、resize\n*  每个 event 都有一个event.bubbles属性，通过该属性可知是否冒泡',
    types: ['前端领域'],
    tags: ['事件', '基础概念'],
  },
  {
    name: 'JavaScript实现对象深拷贝方法',
    desc: '编码实现JavaScript实现对象深拷贝',
    answer:
      'var clone = function(v) {  \n  var o = v.constructor === Array ? [] : {};  \n  for (var i in v) {  \n    o[i] = typeof v[i] === &#34;Object&#34; ? clone(v[i]) : v[i];  \n  }  \n  return o;  \n}  ',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: '故障分析-HTTPS证书不被信任',
    desc: '<p>如下图，在不同的设备上，同时访问同一个域名，一个设备显示证书不被信任，另一个设备正常，再使用多个其他设备访问，依然正常。分析可能的原因？以及需要获取的进一步的信息？</p><p>正常的设备</p><img src="https://tosv.byted.org/obj/pgc-fes/marvel/ssl_success.png" width="375" alt="ssl_success.png"><p>异常的设备</p><img src="https://tosv.byted.org/obj/pgc-fes/marvel/ssl_error.png" width="375" alt="ssl_error.png"><p><br></p>',
    answer:
      '<p>需要进行的进一步的操作：</p><p>1) 查看证书详情：路径/SN/哈希值</p><p>2) 查看DNS解析结果</p><p>3) 查看系统时间/版本/浏览器版本</p><p>可能的原因：</p><p>1) 代理工具/安全软硬件</p><p>2) DNS劫持/路由劫持</p><p>3) 时间偏差</p><p>4) 操作系统/浏览器版本差异</p>',
    types: ['前端领域', '浏览器'],
    tags: ['HTTPS', '分析'],
  },
  {
    name: '请实现一个CodingMan函数实现以下功能',
    desc: '<p><br></p><pre><code>实现一个CodingMan，可以按照以下方式调用:\nCodingMan(“Hank”)输出:\nHi! This is Hank!\n\nCodingMan(“Hank”).sleep(10).eat(“dinner”)\n输出\nHi! This is Hank!\n//等待10秒..\nWake up after 10\nEat dinner~\n\nCodingMan(“Hank”).eat(“dinner”).eat(“supper”)\n输出\nHi This is Hank!\nEat dinner~\nEat supper~\n\nCodingMan(“Hank”).sleepFirst(5).eat(“supper”)\n输出\n//等待5秒\nWake up after 5\nHi This is Hank!\nEat supper\n以此类推。</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>class _CodingMan {\n    constructor(name) {\n        this.tasks = [];\n        const task = () =&gt; {\n            console.log(`Hi! This is ${name}`);\n            this.next();\n        }\n        this.tasks.push(task);\n        setTimeout(() =&gt; {               // 把 this.next() 放到调用栈清空之后执行\n            this.next();\n        }, 0);\n    }\n\n    next() {\n        const task = this.tasks.shift(); // 取第一个任务执行\n        task &amp;&amp; task();\n    }\n\n    sleep(time) {\n        this._sleepWrapper(time, false);\n        return this;                     // 链式调用\n    }\n\n    sleepFirst(time) {\n        this._sleepWrapper(time, true);\n        return this;\n    }\n\n    _sleepWrapper(time, first) {\n        const task = () =&gt; {\n            setTimeout(() =&gt; {\n                console.log(`Wake up after ${time}`);\n                this.next();\n            }, time * 1000)\n        }\n        if (first) {\n            this.tasks.unshift(task);     // 放到任务队列顶部\n        } else {\n            this.tasks.push(task);        // 放到任务队列尾部\n        }\n    }\n\n    eat(name) {\n        const task = () =&gt; {\n            console.log(`Eat ${name}`);\n            this.next();\n        }\n        this.tasks.push(task);\n        return this;\n    }\n}\n\nfunction CodingMan(name) {\n    return new _CodingMan(name);\n}\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['事件轮询机制', '队列', '链式调用', '编码', '闭包'],
  },
  {
    name: '实现如下函数add,使如下执行都等于9 ',
    desc: '<p><br></p><pre><code>add(2,3,4)=9\nadd(2)(3,4)=9\nadd(2)(3)(4)=9\nadd(2,3)(4)=9</code></pre><p><br></p>',
    answer:
      '<p>// 较通用的实现</p><p>function currying(fn, length) {</p><p> length = length || fn.length; \t</p><p> return function (...args) {\t\t\t</p><p>  return args.length &gt;= length\t</p><p>  \t? fn.apply(this, args)\t\t\t</p><p>   : currying(fn.bind(this, ...args), length - args.length) </p><p> }</p><p>}</p><p>function add(...args) {</p><p>\treturn args.reduce((t, i) =&gt; t+=i)</p><p>}</p><p>var newAdd = currying(add, 3)</p><p><br></p><p>// 通用实现2</p><p>function currying(fn, length) {</p><p>\treturn function(...args) {</p><p>\t\tif (args.length &gt;= length) {</p><p>\t\t\treturn args.slice(0, length).reduce((t, i) =&gt; t += i);</p><p>\t\t}</p><p>\t\treturn function(..._args) {</p><p>\t\t\treturn add.apply(null, [...args, ..._args]);</p><p>\t\t}</p><p>\t}</p><p>}</p><p>function add(...args) {</p><p>\treturn args.reduce((t, i) =&gt; t+=i)</p><p>}</p><p>var newAdd = currying(add, 3)</p><p><br></p><p>// 直接的实现</p><p>function add(...args) {</p><p>\tif (args.length &gt;= 3) {</p><p>\t\treturn args.slice(0, 3).reduce((t,i) =&gt; t += i);</p><p>\t}</p><p>\treturn function(..._args) {</p><p>\t\treturn add(args.concat(_args));</p><p>\t}</p><p>}</p>',
    types: ['前端领域'],
    tags: ['编码', '柯里化'],
  },
  {
    name: '介绍一下你了解的 WebSocket',
    desc: '简单介绍一下 WebSocket，ws 协议和 http 协议的关系是什么，WebSocket 如何校验权限？ WebSocket 如何实现 SSL 协议的安全连接？',
    answer:
      'WebSocket 是基于 http 的，所以建立 WebSocket 连接前，\n浏览器会通过 http 的方式请求服务器建立连接，\n这个时候可以通过 http  的权限校验方式来校验 WebSocket，比如设置 Cookie。\n同理，WebSocket 实现 SSL 协议也同 https 类似，会升级为 wss 连接。\n另外，当然也可以在 WebSocket 中还可以通过加密或者 token 等方式，实现自己额外的加密传输和权限判断方式。\n更多可参考 https://security.tencent.com/index.php/blog/msg/119\n',
    types: ['前端领域'],
    tags: ['基础概念', 'websocket'],
  },
  {
    name: '请谈谈iframe有哪些缺点？',
    desc: 'iframe通常有哪些用途，主要缺点是什么',
    answer:
      '（1）iframe会阻塞主页面的Onload事件；\n（2）搜索引擎的检索程序无法解读这种页面，不利于SEO;\n（3）iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。\n（4）页面简的通信问题\n使用iframe之前需要考虑这（1）（3）两个缺点。\n如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。',
    types: ['前端领域', '工程构建'],
    tags: [],
  },
  {
    name: '请简述JAVAScript事件模型和事件代理',
    desc: '简述一下JavaScript事件模型和事件代理，事件代理有哪些优点？',
    answer:
      '## 事件模型\n事件三个阶段：事件捕获，目标，事件冒泡（低版本ie不支持捕获阶段）\n## 事件代理及优点： \n把事件委托到其父对象上，借助事件冒泡机制，实现对节点的事件代理。  \n### 优点  \n*  可以大量节省内存占用，减少事件注册\n*  当新增子对象时无需再次对其绑定事件，对于动态内容部分尤为合适',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件', '事件模型'],
  },
  {
    name: '根据id从多叉树里面查找出对应的节点的name',
    desc: '<p><br></p><pre><code>一个树形的数据(如下数据)，面试官给你一个id，然后拿到对应的name?\n  var cityData = [\n      {\n        id: 1,\n        name: &#39;广东省&#39;,\n        children: [\n          {\n            id: 11,\n            name: &#39;深圳&#39;,\n            children: [\n              {\n                id: 111,\n                name: &#39;宝安&#39;,\n                children: [\n                  {\n                    id: 1111,\n                    name: &#39;西乡&#39;,\n                    children:[\n                      {\n                        id: 11111,\n                        name: &#39;坪洲&#39;,\n                        children:[]\n                      },\n                      {\n                        id: 11112,\n                        name: &#39;灵芝&#39;,\n                        children:[]\n                      }\n                    ]\n                  },\n                  {\n                    id: 1112,\n                    name: &#39;南山&#39;,\n                    children:[\n                      {\n                        id: 11121,\n                        name: &#39;科技园&#39;,\n                        children:[]\n                      }\n                    ]\n                  }\n                ]\n              },\n              {\n                id: 112,\n                name: &#39;福田&#39;,\n                children: []\n              }\n            ]\n          },\n          {\n            id: 12,\n            name: &#39;广州&#39;,\n            children: [\n              {\n                id: 122,\n                name: &#39;白云区&#39;,\n                children: [\n                  {\n                    id: 1222,\n                    name: &#39;白云区&#39;,\n                    children: []\n                  }\n                ]\n              },\n              {\n                id: 122,\n                name: &#39;珠海区&#39;,\n                children: []\n              }\n            ]\n          }\n        ]\n      },\n      {\n        id: 2,\n        name: &#39;湖南省&#39;,\n        children: []\n      }\n    ];\n</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>主要考查深度/广度优先遍历,递归算法\n方法1:递归\n\nlet result = &#39;&#39;\n\n// 递归实现\nconst recursion = (cityData, id) =&gt; {\n  // cityData数据为空的时候直接返回\n  if (!cityData || !cityData.length) return;\n  // 常规循环cityData\n  for (let i = 0, len = cityData.length; i &lt; len; i++) {\n    const childs = cityData[i].children;\n    \n    // 如果匹配到id的话，就是我们要的结果\n    if (cityData[i].id === id) {\n      result = cityData[i].name\n    }\n    // 如果还有子节点，执行递归\n    if(childs &amp;&amp; childs.length &gt; 0){\n      recursion(childs, id);\n    }\n  }\n  return result\n};\n\nconst r = recursion(cityData, 11112);\nconsole.log(r) // 灵芝\n\n\n方法2:广度优先遍历\nlet result = &#39;&#39;\n\nconst range = (cityData, id) =&gt; {\n  if (!cityData || !cityData.length) return;\n  // 定义一个数据栈\n  let stack = [];\n\n  let item = null;\n\n  //先将第一层节点放入栈\n  for (var i = 0, len = cityData.length; i &lt; len; i++) {\n    stack.push(cityData[i]);\n  }\n\n  while (stack.length) {\n    // 将数据栈的第一个取出来\n    item = stack.shift();\n    // 如果符合就赋值给result\n    if (item.id === id) {\n      result = item.name\n    }\n    //如果该节点有子节点，继续添加进入栈底\n    if (item.children &amp;&amp; item.children.length) {\n      stack = stack.concat(item.children);\n    }\n  }\n  return result\n};\n\nlet r1 = range(cityData, 11112);\n\nconsole.log(r1) // 灵芝\n\n\n方法3:深度优先遍历\nlet result = &#39;&#39;\n\nconst deep = (cityData, id) =&gt; {\n  // 没有数据直接返回\n  if (!cityData || !cityData.length) return;\n  // 先定义一个数据栈\n  let stack = []\n  let item = null\n\n  //先将第一层节点放入数据栈\n  for (var i = 0, len = cityData.length; i &lt; len; i++) {\n    stack.push(cityData[i])\n  }\n  // 循环\n  while (stack.length) {\n    item = stack.shift()\n    if (item.id === id) {\n      result = item.name\n    }\n    //如果该节点有子节点，继续添加进入栈顶\n    if (item.children &amp;&amp; item.children.length) {\n      // 注意这里调换了顺序\n      stack = item.children.concat(stack);\n    }\n  }\n  return result\n};\n\nlet r3 = deep(cityData, 11112)\nconsole.log(r3) // 灵芝\n\n\n方法4:正则\n\nconst regular = (cityData, id) =&gt; {\n  // 没有数据直接返回\n  if (!cityData || !cityData.length) return;\n  // 数据转成字符串\n  let cityStr = JSON.stringify(cityData)\n  // 定义正则\n  let reg = new RegExp(`&#34;id&#34;:${id},&#34;name&#34;:&#34;([^\\\\x00-\\\\xff]+)&#34;,`)\n  // 取到正则的子字符串并返回\n  return (cityStr.match(reg))[1]\n}\n\nlet r4 = regular(cityData, 11112);\n\nconsole.log(r4) // 灵芝\n\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '基础算法'],
  },
  {
    name: 'js浮点运算',
    desc: 'console.info(0.7+0.1)会得到什么',
    answer: '输出0.799999\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'js'],
  },
  {
    name: 'macro micro 任务队列（async/await版）',
    desc: '<p>async function async1() {</p><p> console.log(&#39;async1 start&#39;);</p><p> await async2();</p><p> console.log(&#39;async1 end&#39;);</p><p>}</p><p>async function async2() {</p><p> console.log(&#39;async2 start&#39;);</p><p> return new Promise((resolve, reject) =&gt; {</p><p>  resolve();</p><p>  console.log(&#39;async2 promise&#39;);</p><p> })</p><p>}</p><p>console.log(&#39;script start&#39;);</p><p>setTimeout(function() {</p><p> console.log(&#39;setTimeout&#39;);</p><p>}, 0);  </p><p>async1();</p><p>new Promise(function(resolve) {</p><p> console.log(&#39;promise1&#39;);</p><p> resolve();</p><p>}).then(function() {</p><p> console.log(&#39;promise2&#39;);</p><p>}).then(function() {</p><p> console.log(&#39;promise3&#39;);</p><p>});</p><p>console.log(&#39;script end&#39;);</p>',
    answer:
      '<p>chrome 和 node 都是以下顺序</p><img src="http://tosv.byted.org/obj/ttfe/nodebb/1563171801424-5d2c1bd9fcb820021a6b13dc.png" width="375" alt=""><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', 'async'],
  },
  {
    name: 'JS实现一个带并发限制的异步调度器',
    desc: '<div style="white-space: pre;">JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">class Scheduler {\n</div><div style="white-space: pre;">  add(promiseCreator) { ... }\n</div><div style="white-space: pre;">  // ...\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">const timeout = (time) =&gt; new Promise(resolve =&gt; {\n</div><div style="white-space: pre;">  setTimeout(resolve, time)\n</div><div style="white-space: pre;">})\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">const scheduler = new Scheduler()\n</div><div style="white-space: pre;">const addTask = (time, order) =&gt; {\n</div><div style="white-space: pre;">  scheduler.add(() =&gt; timeout(time))\n</div><div style="white-space: pre;">    .then(() =&gt; console.log(order))\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">addTask(1000, &#39;1&#39;)\n</div><div style="white-space: pre;">addTask(500, &#39;2&#39;)\n</div><div style="white-space: pre;">addTask(300, &#39;3&#39;)\n</div><div style="white-space: pre;">addTask(400, &#39;4&#39;)\n</div><div style="white-space: pre;">// output: 2 3 1 4// 一开始，1、2两个任务进入队列// 500ms时，2完成，输出2，任务3进队// 800ms时，3完成，输出3，任务4进队// 1000ms时，1完成，输出1// 1200ms时，4完成，输出4\n</div>',
    answer:
      '<div style="white-space: pre;">class Scheduler {\n</div><div style="white-space: pre;">  concurrency = 2\n</div><div style="white-space: pre;">  running = 0\n</div><div style="white-space: pre;">  queue = []\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">  add(task) {\n</div><div style="white-space: pre;">    return new Promise(resolve =&gt; {\n</div><div style="white-space: pre;">      this.queue.push({\n</div><div style="white-space: pre;">        taskGenerator: task,\n</div><div style="white-space: pre;">        resolve\n</div><div style="white-space: pre;">      })\n</div><div style="white-space: pre;">      this.schedule()\n</div><div style="white-space: pre;">    })\n</div><div style="white-space: pre;">  }\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">  schedule() {\n</div><div style="white-space: pre;">    while (this.queue.length &gt; 0 &amp;&amp; this.running &lt; this.concurrency) {\n</div><div style="white-space: pre;">      const curTask = this.queue.shift()\n</div><div style="white-space: pre;">      this.running += 1\n</div><div style="white-space: pre;">      curTask.taskGenerator().then(result =&gt; {\n</div><div style="white-space: pre;">        this.running -= 1\n</div><div style="white-space: pre;">        curTask.resolve(result)\n</div><div style="white-space: pre;">        this.schedule()\n</div><div style="white-space: pre;">      })\n</div><div style="white-space: pre;">    }\n</div><div style="white-space: pre;">  }\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div>',
    types: ['前端领域', 'JavaScript'],
    tags: ['前端基础', 'promise', '异步', 'js', '调度器'],
  },
  {
    name: '写一个加法函数(sum)，使他可以同时支持sum(x,y)和sum(x)(y)两种调用方式。',
    desc: '<div style="white-space: pre;"><span style="font-weight: bold;">写一个按照下面两种方式都能正常调用的 sum 方法</span>\n</div><div style="white-space: pre;">```javascript\n</div><div style="white-space: pre;">console.log(sum(2,3)); // 输出5\n</div><div style="white-space: pre;">console.log(sum(2)(3)); // 输出5\n</div><div style="white-space: pre;">```\n</div>',
    answer:
      '<div style="white-space: pre;">答案一\n</div><div style="white-space: pre;">function sum(a,b){\n</div><div style="white-space: pre;">if(b) {\n</div><div style="white-space: pre;">return a+b\n</div><div style="white-space: pre;">}else{\n</div><div style="white-space: pre;">return function(c){\n</div><div style="white-space: pre;">return a+c\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">答案二\n</div><div style="white-space: pre;">function sum(){\n</div><div style="white-space: pre;">var arg=arguments\n</div><div style="white-space: pre;">if(arg.length==2) {\n</div><div style="white-space: pre;">return arg[0]+arg[1];\n</div><div style="white-space: pre;">}else{\n</div><div style="white-space: pre;">return function(c){\n</div><div style="white-space: pre;">return arg[0]+c\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div>',
    types: ['前端领域'],
    tags: ['柯里化', '编码', '函数式', '闭包'],
  },
  {
    name: 'ES5，ES6中this指向考察',
    desc: '1. 以下代码输出什么结果，`this.name`中this指向什么：\n```\nwindow.name = &#39;ByteDance&#39;;\nfunction A () {\n   this.name = 123;\n}\nA.prototype.getA = function(){\n\tconsole.log(this);\n\treturn this.name + 1;\n}\nlet a = new A();\nlet funcA = a.getA;\nfuncA();\n```\n2. 如何使`funcA()`返回`undefined`?\n3. 下面ES6中又会发生什么，this是什么？\n```\nwindow.name = &#39;ByteDance&#39;;\nclass A {\n\tconstructor() {\n  \tthis.name = 123;\n\t}\n\tgetA() { \n\t  console.log(this);\n\t\treturn this.name + 1; \n\t}\n}\nlet a = new A();\nlet funcA = a.getA;\nfuncA();\n```',
    answer:
      '1. 输出`Bytedance1`, this指向widnow;\n2. 正确使用applay / call；\n3. 发生异常：Uncaught TypeError: Cannot read property &#39;name&#39; of undefined，this为undefined；',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'this', 'es6'],
  },
  {
    name: '请问什么是跨域？跨域请求资源有几哪种方式？',
    desc: '何为跨域？跨域请求资源有几哪种方式？',
    answer:
      '由于浏览器同源策略，凡是发送请求url的协议、域名、端口三者之间任意一与当前页面地址不同即为跨域。\n跨域请求资源的方式主要有：  \n（1）JSONP 动态创建script标签  \n但缺点是只支持get请求，并且很难判断请求是否失败（一般通过判断请求是否超时）。  \n（2）Proxy代理  \n这种方式首先将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。  \n（3）CORS跨域  \n是现代浏览器提供的一种跨域请求资源的方法，需要客户端和服务器端的同时支持。整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信  \n服务响应头返回，Access-Control-Allow-Origin: *',
    types: ['前端领域', '浏览器'],
    tags: ['跨域访问'],
  },
  {
    name: '简述React Fiber原理',
    desc: '<p>试描述React Fiber的原理。</p>',
    answer:
      '<p>\t官方的一句话解释是“React Fiber是对核心算法的一次重新实现”。</p><p>\t之前React的更新过程是同步的，所有更新逻辑会在一帧之内完成，如果组件过于复杂则会导致更新时间超过一帧，其他事务包括用户输入都会被延迟响应，从而引发卡顿。如下图：</p><p><br></p><img src="https://pic1.zhimg.com/80/v2-d8f4598c70df94d69825f11dfbf2ca2c_1440w.png" width="375" alt=""><p>\t破解方式——分片。</p><p>\t有了分片之后，更新过程的调用栈如下图所示，中间每一个波谷代表深入某个分片的执行过程，每个波峰就是一个分片执行结束交还控制权的时机。</p><img src="https://pic1.zhimg.com/80/v2-78011f3365ab4e0b6184e1e9201136d0_1440w.png" width="375" alt=""><p>\t实现使用的API：requestIdleCallback</p><pre><code>Q.为什么引入Fiber架构？原架构有何不足？\nA.原架构采用递归遍历方式来更新DOM树，一旦开始，即占用主线程，无法中断，这在页面上会引起问题，如input输入后页面卡顿等\n\nQ.Fiber如何解决该问题\nA.时间分片和暂停\n\nQ.Fiber如何实现？\nA.使用链表结构，将递归遍历更改为循环遍历，然后配合requestIdleCallback API，实现任务拆分、中断和恢复\n\nQ.Fiber如何实现比较？\nA.双缓冲技术，在diff过程中创建新的DOM Tree，diff完成之后生成EffectList，即需要更新的地方，之后进入commit阶段，该阶段不允许中断。\n\nQ.React Hook基于Fiber架构，hook的复用是如何实现的？\nA.hook的数据存在于Fiber节点的数据结构中，具体为memoizedState中，该字段中存储了所有hook相关的信息，https://www.jianshu.com/p/d6244228a427 （重要）</code></pre><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['Fiber', '性能优化', 'React'],
  },
  {
    name: '请简要描述ES6 module require、exports以及module.exports的区别',
    desc: '考察候选人对es6，commonjs等js模块化标准的区别和理解',
    answer:
      '* CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被”循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。\n* ES6 模块是动态引用，如果使用 import 从一个模块加载变量，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。\n* CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports ）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。\n* export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。\n* ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性\n* 混合使用介绍：https://github.com/ShowJoy-com/showjoy-blog/issues/39',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'es6'],
  },
  {
    name: '浏览器缓存机制考察',
    desc: '浏览器缓存机制考察，包括cache-control , etag, expire, last-modify-time\n以及 200 from cache、304',
    answer: '1、cache-control 和 expire 在浏览器端控制  Cache-Control的max-age&gt;expire\n2、etag 和 last-modify-time主 要服务器端对比使用',
    types: ['前端领域', '浏览器'],
    tags: [],
  },
  {
    name: '版本号排序',
    desc: 'versions是一个项目的版本号列表，因多人维护，不规则\n``` javascript\nvar versions=[&#39;1.45.0&#39;,&#39;1.5&#39;,&#39;6&#39;,&#39;3.3.3.3.3.3.3&#39;]\n```\n要求从小到大排序，注意&#39;1.45&#39;比&#39;1.5&#39;大\n``` javascript\nvar sorted=[&#39;1.5&#39;,&#39;1.45.0&#39;,&#39;3.3.3.3.3.3&#39;,&#39;6&#39;]\n```',
    answer:
      '```javascript\nfunction sortVersion(arr) {\n    return arr.sort((a, b) =&gt; {\n        const arrA = a.split(&#39;.&#39;)\n        const arrB = b.split(&#39;.&#39;)\n        for (let i = 0; i &lt; arrA.length; i++) {\n            if (arrA[i] === undefined) {\n                return -1\n            } else if (arrB[i] === undefined) {\n                return 1\n            } else if (parseInt(arrA[i]) === parseInt(arrB[i])) {\n                continue\n            } else {\n                return parseInt(arrA[i]) &gt; parseInt(arrB[i])\n            }\n        }\n    })\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['排序'],
  },
  {
    name: 'JS限流调度器',
    desc: '<p>实现JS限流调度器，方法add接收一个返回Promise的函数，同时执行的任务数量不能超过两个。</p><pre><code>class Scheduler {\n    async add(promiseFunc: () =&gt; Promise&lt;void&gt;): Promise&lt;void&gt; {\n    }\n}\n\nconst scheduler = new Scheduler()\nconst timeout = (time) =&gt; {\n    return new Promise(r =&gt; setTimeout(r, time))\n}\nconst addTask = (time, order) =&gt; {\n    scheduler.add(() =&gt; timeout(time))\n        .then(() =&gt; console.log(order))\n}\n\naddTask(1000, 1)\naddTask(500, 2)\naddTask(300, 3)\naddTask(400, 4)\n// log: 2 3 1 4\n</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>class Scheduler {\n    constructor() {\n        this.concurrency = 0\n        this.queue = []\n    }\n    async add(promiseFunc) {\n        if (this.concurrency &gt;= 2) {\n            return new Promise(r =&gt; {\n                this.queue.push(() =&gt; promiseFunc().then(r))\n            })\n        }\n        this.concurrency += 1\n        await promiseFunc()\n        this.concurrency -= 1\n        let next = this.queue.shift()\n        if (next) {\n            this.add(next)\n        }\n    }\n}\n\nconst scheduler = new Scheduler()\nconst timeout = (time) =&gt; {\n    return new Promise(r =&gt; setTimeout(r, time))\n}\nconst addTask = (time, order) =&gt; {\n    scheduler.add(() =&gt; timeout(time))\n        .then(() =&gt; console.log(order))\n}\n\naddTask(1000, 1)\naddTask(500, 2)\naddTask(300, 3)\naddTask(400, 4)\n</code></pre><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['前端编码', 'js', '调度器'],
  },
  {
    name: '实现一个简单的Event类（观察者模式）',
    desc: '<p>请实现一个观察者模式，拥有四个方法on,off,once和trigger</p><p><br></p><p>const Event = {</p><p>    on() {}   // 绑定</p><p>    off() {}  // 解绑</p><p>    once() {}   // 绑定一次</p><p>    trigger() {}  // 触发事件</p><p>};</p>',
    answer:
      '<p>```javascript function Event() { if (!(this instanceof Event)) { return new Event(); } this._callbacks = {}; } Event.prototype.on = function (type, handler) { this_callbacks = this._callbacks || {}; this._callbacks[type] = this.callbacks[type] || []; this._callbacks[type].push(handler); return this; }; Event.prototype.off = function (type, handler) { var list = this._callbacks[type]; if (list) { for (var i = list.length; i &gt;= 0; --i) { if (list[i] === handler) { list.splice(i, 1); } } } return this; }; Event.prototype.trigger = function (type, data) { var list = this._callbacks[type]; if (list) { for (var i = 0, len = list.length; i &lt; len; ++i) { list[i].call(this, data); } } }; Event.prototype.once = function (type, handler) { var self = this; function wrapper() { handler.apply(self, arguments); self.off(type, wrapper); } this.on(type, wrapper); return this; }; ```</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['编码', 'event'],
  },
  {
    name: '请说明存储在 Cookie 和 localStorage 内有什么区别',
    desc: '请说明 cookie、sessionStorage、localStorage 之间的区别、以及在你项目中的应用？',
    answer:
      ' a) cookie，HTTP Cookie（也叫Web cookie或者浏览器Cookie）是服务器发送到用户浏览器并保存在浏览器上的一块数据，它会在浏览器下一次发起请求时被携带并发送到服务器上。比较经典的，可以它用来确定两次请求是否来自于同一个浏览器，从而能够确认和保持用户的登录状态。Cookie的使用使得基于无状态的HTTP协议上记录稳定的状态信息成为了可能。\nb) sessionStorage，为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。\nc) localStorage，localStorage 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。\n\n区别：\nlocalStorage、sessionStorage 是 Web Storage Api 的组成 API，其为了解决 Cookie 的一些缺陷，服务端 Set 的 cookie 每次会携带在本域下所有的请求上，对性能有损耗。SessionStorage 存储有个期限，当关闭浏览器后就不再存在，但 localStorage 依然存在，需要明确删除。\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础概念', '前端基础'],
  },
  {
    name: '请简述js浏览器事件循环机制',
    desc: '<p><br></p>',
    answer:
      '<p>浏览器 Event Loop 是 HTML 中定义的规范，Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。</p><ul><li>JS 调用栈</li></ul><p>JS 调用栈是一种后进先出的数据结构。当函数被调用时，会被添加到栈中的顶部，执行完成之后就从栈顶部移出该函数，直到栈内被清空。</p><ul><li>同步任务、异步任务</li></ul><p>JavaScript 单线程中的任务分为同步任务和异步任务。同步任务会在调用栈中按照顺序排队等待主线程执行，异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。任务队列是先进先出的数据结构。</p><ul><li>Event Loop</li></ul><p>调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作，就形成了事件循环。</p><ul><li>定时器</li></ul><p>定时器会开启一条定时器触发线程来触发计时，定时器会在等待了指定的时间后将事件放入到任务队列中等待读取到主线程执行。定时器指定的延时毫秒数其实并不准确，因为定时器只是在到了指定的时间时将事件放入到任务队列中，必须要等到同步的任务和现有的任务队列中的事件全部执行完成之后，才会去读取定时器的事件到主线程执行，中间可能会存在耗时比较久的任务，那么就不可能保证在指定的时间执行。</p><ul><li>宏任务(macro-task)、微任务(micro-task)</li></ul><p>除了广义的同步任务和异步任务，JavaScript 单线程中的任务可以细分为宏任务和微任务。macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。micro-task包括：process.nextTick, Promises, Object.observe, MutationObserver。事件循环中，JavaScript 引擎会把整个 script 代码当成一个宏任务执行，执行完成之后，再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务-微任务。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件', 'js'],
  },
  {
    name: '何为https?https和http2有什么关系？',
    desc: '简要描述HTTPS的安全机制，以及在web服务工程实践中需要注意的问题；描述http2的基本机制',
    answer:
      'HTTPS是指建立在安全的传输层（通常是tls/ssl）上的HTTP协议，通过对服务器的证书的认证，解决中间人攻击等问题。\n证书(certificate)由客户端信任的的证书机构(CA)颁发，通过common name或SAN对服务进行描述；客户端通过CA的根证书对证书进行校验，并将请求域名和证书的common name/DNS域名进行验证，以检验证书的有效性。\n目前，很多web api如Notification/web rpc/Service Worker等，都要求必须使用https。\n在工程实践中，https存在以下需要注意的问题：\n  - js/css等资源必须以https形式加载，否则浏览器将拒绝执行，所以CDN必须完成对https的支持\n\t- 非https请求的图片等资源不会携带referer\n\t\n\thttp2是http协议的一个新版本，既可以明文传输也可以在https中使用。浏览器和服务器通过tls的ALPN/SNI等机制可以进行协议协商，决定使用什么协议',
    types: ['前端领域'],
    tags: ['基础概念', 'HTTPS'],
  },
  {
    name: '用数组的reduce方法实现map方法',
    desc: '用数组的reduce方法实现map方法',
    answer:
      '```\n// 代码实现\nArray.prototype.map2 = function(f) {\n  return this.reduce(function(result, x, index, arr) {\n    result.push(f(x, index));\n    return result;\n  }, []);\n}\n\n// 测试代码\nvar res = [1, 3, 5, 7].map2(function(item, idx){\n  return item * 2;\n});\nconsole.log(res);\n```',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: 'js异步操作与计算题',
    desc: '```\nfor (var i = 0; i &lt; 6; i++) {\n    setTimeout(function() {\n        console.log(new Date, i);\n    }, 1000);\n}\n```\n&gt;1. console.log(new Date, i);得到的结果是什么?\n&gt;1. 怎样优化，可以变成： 0 -&gt; 1 -&gt; 2 -&gt; 3-&gt; 4 -&gt;5\n&gt;1. 如果继续优化，实现console.log(new Date, i);代码执行时，立即输出 0，之后每隔 1 秒依次输出 1,2,3,4（sleep），之后再暂停5秒，然后输出5,\n实现结果类似：\n&gt;1. 2017-08-31T04:38:23:  0    &lt;— start IIFE\n&gt;1. 2017-08-31T04:38:24:  1    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:25:  2    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:26:  3    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:27:  4    &lt;— sleep 5s\n&gt;1. 2017-08-31T04:38:32:  5',
    answer:
      '1. 属于结果是暂停1S，然后输出6个6，setTimeout属于异步执行\n1. 实现0-&gt; 1 -&gt; 2 -&gt; 3-&gt; 4 -&gt;5，用闭包或者var改成let\n1. 模拟编程中的sleep实现，参考答案：\n```\n// 模拟其他语言中的 sleep，实际上可以是任何异步操作\nconst sleep = (timeoutMS) =&gt; new Promise((resolve) =&gt; {\n  setTimeout(resolve, timeoutMS)\n});\n(async () =&gt; {  // 声明即执行的 async 函数表达式\n  for (let i = 0; i &lt; 6; i++) {\n      if (i &lt; 5) {\n        console.log(new Date(), i)\n        await sleep(1000)\n      } else {\n        await sleep(4000)\n        console.log(new Date(), i)\n      }\n    }\n})()\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'async', 'js'],
  },
  {
    name: '简单的实现Promise.all',
    desc: '<p><br></p><pre><code>\nfunction fn1() {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(1)\n        }, 1000);\n    })\n}\nfunction fn2() {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(2)\n        }, 2000);\n    })\n}\nPromiseAll([fn1(), fn2()]).then(res =&gt; {\n    console.log(res)\n}).catch(err =&gt; {\n    console.log(err)\n})\n\nPromise.all([fn1(), fn2()]).then(res =&gt; {\n    console.log(res)\n}).catch(err=&gt;{\n    console.log(err)\n})</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>function PromiseAll(list) {\n\n    return new Promise((resolve, reject) =&gt; {\n\n        let count = 0;\n\n        let len = list.length;\n\n        let result = [];\n\n        list.forEach((item,index) =&gt; {\n\n            item.then(res =&gt; {\n\n                count++;\n\n                result[index] = res;\n\n                if (count === len) {\n\n                    resolve(result);\n\n                }\n\n            }).catch(err =&gt; {\n\n                reject(err)\n\n            })\n\n        })\n\n    })\n\n}\n\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '基础'],
  },
  {
    name: 'ES6 import的原理',
    desc: '请描述ES6 import的原理以及与commonjs的require的区别',
    answer:
      'CommonJS模块的是一个值的拷贝，而ES6模块输出的是值的引用。\nES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。\nCommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。\nES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', '模块化', 'es6'],
  },
  {
    name: '不借助变量交换两个数',
    desc: 'var a = 1, b = 2;\nfunction swap(a,b){\n  ....\n}\nswap(a,b)\nconsole.log(a, b)  // 2,1',
    answer:
      '方法一、\n```\nfunction swap(a,b){\n  b=b-a;\n  a=a+b;\n  b=a-b;\n  return [a,b]\n}\n```\n方法二、\n```\nfunction swap(a,b){\n  return [a, b] = [b, a]\n}\n```\n方法三、\n```\nfunction swap(a,b){\n  var a=a^b;\n  var b=b^a;\n  var a=a^b;\n\treturn [a,b]\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '实现垂直居中',
    desc: '```html\n\n    <div id="block">        \n    </div>\n\n```\nid为block的元素不定高不定宽，请实现它在浏览器窗口的居中显示。',
    answer: '```css\n#block {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n```',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '请回答当我们在使用new操作符时，它在对象操作的过程中具体做了什么',
    desc: '考察候选人对原型链操作和js对象的理解',
    answer:
      '1. 简单回答：\n1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。\n1. 属性和方法被加入到 this 引用的对象中。\n3. 新创建的对象由 this 所引用，并且最后隐式的返回 this 。\n```javascript\nfunction Animal(name) {\n      this.name = name;\n}\n  Animal.prototype.run = function() {\n      console.log(this.name + &#39;can run...&#39;);\n}\nvar cat = new Animal(&#39;cat&#39;); //    \nnew Animal(&#39;cat&#39;)=function(){\nlet obj={}; //       \nobj.__proto__=Animal.prototype; // obj-&gt;Animal.prototype-&gt;Object.prototype-&gt;null\nreturn Animal.call(obj,&#39;cat&#39;);//   this        \n}\n```\n\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['prototype'],
  },
  {
    name: 'css3实现多行文字截断处理',
    desc: '用css分别实现单行截断和多行截断字符串，最后以...为结尾',
    answer:
      '单行：\n```\n.text-overflow ( @class ){\n    .@{class} {\n        overflow: hidden;\n        text-overflow:ellipsis;\n        white-space: nowrap;\n    }\n}\n```\n多行：\n```\n.multi-text-overflow ( @class, @line ){\n    .@{class} {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        display: -webkit-box;\n        display: box;\n        -webkit-line-clamp: @line;\n        -webkit-box-orient: vertical;\n    }\n}\n```',
    types: ['前端领域', 'CSS'],
    tags: ['css3'],
  },
  {
    name: '请介绍react diff算法和策略',
    desc: 'react的diff算法和策略了解多少，为什么react的diff性能好，遵循什么样的策略可以把 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题',
    answer:
      'React分别对 tree diff、component diff 以及 element diff做了算法优化，\n做了一些假设\n1.Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计\n2.拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构\n3.对于同一层级的一组子节点，它们可以通过唯一 id 进行区分\ntree diff：React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较\ncomponent diff：\na.如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。\nb.如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。\nc.对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff\nelement diff：\n允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，减少增加和删除\n详见：https://zhuanlan.zhihu.com/p/20346379',
    types: ['前端领域', 'JavaScript'],
    tags: ['React'],
  },
  {
    name: '函数科里化',
    desc: '<p>实现如下函数add,使如下执行都等于9</p><pre><code>add(2,3,4)=9\nadd(2)(3,4)=9\nadd(2)(3)(4)=9\nadd(2,3)(4)=9</code></pre><p><br/></p>',
    answer:
      '<p><br/></p><pre><code>function curry(fn) {\n  return function res(...args) {\n    if (args.length &gt;= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...args2) {\n        return res.apply(this, args.concat(args2));\n      }\n    }\n  }\n}</code></pre><p><br/></p>',
    types: ['前端领域'],
    tags: ['编码', '函数式'],
  },
  {
    name: '如果数据库中采用64位长整型存储一个数据的id，前端通过api拿到这个id的话，会有什么问题？应该怎么解决？',
    desc: '如果数据库中采用64位长整型存储一个数据的id，前端通过api拿到这个id的话，会有什么问题？怎么解决？',
    answer:
      '考察一下JS中整数的安全范围的概念，在头条经常会遇到长整型到前端被截断的问题，需要补一个字符串形式的id供前端使用。\n主要会涉及到JS中的最大安全整数问题\nhttps://segmentfault.com/a/1190000002608050',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础'],
  },
  {
    name: 'JavaScript this 考察',
    desc: '<p>下面代码输出的结果是什么？</p><p>var length = 10;</p><p>function fn() {</p><p> return this.length+1;</p><p>}</p><p>var obj = {</p><p> length: 5,</p><p> test1: function() {</p><p>  return fn();</p><p> }</p><p>};</p><p>obj.test2=fn;</p><p>//下面代码输出是什么</p><p>console.log(obj.test1())</p><p>console.log(fn()===obj.test2())</p>',
    answer: '<p>11, false(11===6)</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['this'],
  },
  {
    name: 'requestAnimationFrame 和 setTimeout 的区别',
    desc: 'requestAnimationFrame 和 setTimeout 都可以用来实现动画，它们的区别是什么',
    answer:
      '1. 执行频率不同，前者按照屏幕刷新频率执行，后者自行控制，可能有无用开销（执行频率小于刷新频率，即1帧执行多次）\n2. 前者在页面不可见时，会停止执行（省电），后者在页面不可见时仍会执行，带来不必要开销\n',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '编码-js高阶函数考察',
    desc: '<h3>实现一个repeat方法，要求如下：</h3><p><br/></p><p>// 需要实现的函数</p><p>function repeat (func, times, wait) {</p><p> // 补全</p><p>}</p><p><br/></p><p>// 使下面调用代码能正常工作</p><p>const repeatFunc = repeat(console.log, 4, 3000);</p><p>repeatFunc(&#34;hello world&#34;);    //会输出4次 hello world, 每次间隔3秒</p><p><br/></p>',
    answer:
      '<p>考点1：能意识到repeat返回的是一个函数，知道参数怎么传递。</p><p>考点2：setTimeout的时间，微任务</p><p><br/></p><p>参考答案</p><p>function repeat(fn, times, wait) {</p><p>  if(typeof times !== &#39;number&#39;) return;</p><p>  if(typeof wait !== &#39;number&#39;) return;</p><p>  return function(str){</p><p>    for(let i = 0; i &lt; times; i++){</p><p>      setTimeout(()=&gt;{</p><p>        fn(str)</p><p>      }, i * wait)</p><p>    }</p><p>  }</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['函数式', 'js'],
  },
  {
    name: 'Vue框架中组件消息通信方式',
    desc: '考察候选人对Vue框架的消息通信方式了解程度：\n\n1. vue父子组件通信方式？\n2. 非父子组件通信方式？\n3. 前两问OK，追问：当一个父组件与子组件中间隔着很多层组件怎么办？',
    answer:
      '1. 父子组件通信方式\n在Vue中，父子组件的关系可以总结为props down, events up。父组件通过props向下传递数据给子组件，子组件通过events给父组件发送消息。\n\n2. 非父子组件通信\n两个独立的组件之间通信，可以借助一个空的Vue实例作为中央事件总线，空实例相当于代理人的形式进行消息监听或触发\n\n3. 父子之间层级过多时\n当父子组件之间层级不多的时候，父组件可以一层层的向子组件传递数据或者子组件一层层向父组件发送消息，代码上没有太难维护的地方。可是，一旦父子组件之间层级变多后，传递一个数据或者发送一个消息就变得麻烦。\n这块如果了解开源的Element组件库，就会知道其实现方式：构造一个函数自动向上/向下查询父亲节点，以`[组件名, 消息名, 参数]`三元组进行消息传递，降低长链传播成本;\n具体实现参考：https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js',
    types: ['前端领域', 'JavaScript'],
    tags: ['vue'],
  },
  {
    name: '什么是 XSS，怎么造成的，有什么防御方法？',
    desc: '考察面试者对于 XSS 是否了解，是否足够重视。',
    answer:
      'XSS 就是在 web 中能够通过某种方式产生执行任意 JavaScript 脚本的情况，\n最常见的一种情况就是将用户的输入，直接放到当前 runtime 中，比如用户输入直接放到页面的 html 里面，\n立刻显示出来。\nXSS 实际上是非常危险的，因为理论上讲，如果能够执行 JavaScript，实际上攻击者可以做任何事情。\n简单的就是输出点什么，偷偷 cookie，或者结合 CSRF 攻击，或者让浏览器跳转一下，\n复杂点的甚至可以改掉当前整个页面，伪造一切用户看到东西，危害无穷。\n如果这种输入存储到数据库中，就会变成一个永久型的 XSS，危害就更大了。\n防止 XSS 最简单的就是使用各种框架，如 React、Vuejs 等，对用户输入进行 html 转义。\n另外，服务端要设置 httpOnly 的 header，防止 JavaScript 操作 cookie。\n当然，服务端也可以对输入进行转义或者过滤监测。',
    types: ['前端领域', 'JavaScript'],
    tags: ['xss', '防御方法'],
  },
  {
    name: 'webpack插件编写',
    desc: '1. 有用过webpack么？说说该工具的优缺点？\n2. 有开发过webpack插件么？\n3. 假如要在构建过程中去除掉html中的一些字符，如何编写这个插件？',
    answer:
      'webpack优缺点：\n* 概念牛，但文档差，使用起来费劲\n* 模块化，让我们可以把复杂的程序细化为小的文件\n* require机制强大，一切文件介资源\n* 代码分隔\n* 丰富的插件，解决less、sass编译\n\n开发插件的两个关键点Compiler和Compilation：\n* compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并在所有可操作的设置中被配置，包括原始配置，loader 和插件。当在 webpack 环境中应用一个插件时，插件将收到一个编译器对象的引用。可以使用它来访问 webpack 的主环境。\n* compilation 对象代表了一次单一的版本构建和生成资源。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。\n\n插件编写可参考：https://doc.webpack-china.org/development/how-to-write-a-plugin',
    types: ['前端领域', '工程构建'],
    tags: ['框架'],
  },
  {
    name: '如何实现微信扫码登录？',
    desc: '综合题，考察网络、前端、认证等多方面知识',
    answer:
      '参考答案：\nhttps://zhuanlan.zhihu.com/p/22032787\n具体步骤：\n1. 用户 A 访问微信网页版，微信服务器为这个会话生成一个全局唯一的 ID，上面的 URL 中 obsbQ-Dzag== 就是这个 ID，此时系统并不知道访问者是谁。\n2. 用户A打开自己的手机微信并扫描这个二维码，并提示用户是否确认登录。\n3. 手机上的微信是登录状态，用户点击确认登录后，手机上的微信客户端将微信账号和这个扫描得到的 ID 一起提交到服务器\n4. 服务器将这个 ID 和用户 A 的微信号绑定在一起，并通知网页版微信，这个 ID 对应的微信号为用户 A，网页版微信加载用户 A 的微信信息，至此，扫码登录全部流程完成',
    types: ['前端领域', '工程构建'],
    tags: ['产品逻辑', '扫码登录'],
  },
  {
    name: '设计类似 Vue.js 双向绑定功能的核心逻辑“监听对象属性变化”功能',
    desc: '实现一个类，可以监听对象属性的值变化。加分项：考虑对象存在值为数组或对象的属性。\n\n\t\tclass Observe {\n\t\t\tconstructor(data: Object) {\n\t\t\t}\n\t\t\t// 监听属性变更\n\t\t\t$on() {\n\t\t\t}\n\t\t\t// 触发属性变更事件\n\t\t\t$emit() {\n\t\t\t}\n\t\t}\n\t\tconst data = new Observer({\n\t\t\ta: 1\n\t\t});\n\t\tcoonsole.log(data.a) // console: 1\n\t\tdata.$on(&#39;a&#39;, (newValue, oldValue) =&gt; {\n\t\t\t// this === data\n\t\t\tconsole.log(newValue, oldValue);\n\t\t});\n\t\tdata.a = 2 // console: 2 1\n\n\t\n',
    answer: '待补充',
    types: ['前端领域', 'JavaScript'],
    tags: ['defineProperty', 'vue', 'js', '逻辑'],
  },
  {
    name: '请简要描述<script>标签defer或async属性的作用，以及二者的区别',
    desc: '',
    answer:
      '### 作用：\ndefer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。\n### 区别：\ndefer与async的区别是：前者要等到整个页面正常渲染结束，才会执行；后者一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。',
    types: ['前端领域', 'HTML'],
    tags: ['async'],
  },
  {
    name: '原型链、this指针、自有属性考察',
    desc: '```javascript\nvar a= function () { this.b =3; }\nvar c = new a();\na.protorype.b = 9;\nvar b = 7;\na();\n```\n问：\n```javascript\nconsole.log(b);\nconsole.log(c.b); \n```\n分别输出什么？',
    answer: '- 第一个 `b = 3`\n- 第二个 `c.b = 3`',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'Cookie 和 Session 有什么区别',
    desc: '<div style="white-space: pre;">如题\n</div>',
    answer:
      '<div style="white-space: pre;">cookie 在浏览器中存在，并且每个请求都会带上，而且是可以设置失效时间的，失效前就会有效。 session 是一次会话有效，也就是说，浏览器关闭 session 就会失效。 其实这道题目考察的一个重点是在于，session 这种机制是怎么在浏览器中实现的呢？ 实际上 session 的实现也是在浏览器中放了一个 cookie，失效时间是一次会话失效。\n</div>',
    types: ['前端领域'],
    tags: ['基础概念'],
  },
  {
    name: 'JS异步队列macrotask和microtask',
    desc: '```\nconsole.log(&#39;begin&#39;)\nsetTimeout(() =&gt; {\n\tconsole.log(&#39;setTimeout 1&#39;)\n\tPromise.resolve().then(() =&gt; {\n\t\tconsole.log(&#39;promise 1&#39;)\n\t\tsetTimeout(() =&gt; {\n\t\t\tconsole.log(&#39;setTimeout2 between promise1&amp;2&#39;)\n\t\t})\n\t}).then(() =&gt; {\n\t\tconsole.log(&#39;promise 2&#39;)\n\t})\n}, 0)\nconsole.log(&#39;end&#39;)\n```',
    answer: '```\nbegin\nend\nsetTimeout 1\npromise 1\npromise 2\nsetTimeout2 between promise1&amp;2\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['promise', '异步', 'js'],
  },
  {
    name: '如何理解虚拟DOM?',
    desc: '如何理解虚拟DOM?',
    answer: '对虚拟dom和diff算法中的一些细节理解与考察，[https://github.com/livoras/blog/issues/13](https://github.com/livoras/blog/issues/13)',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '如何判断一个 JS 对象为空对象',
    desc: '如何判断一个 JS 对象为空对象 ？空对象形如`{}`',
    answer:
      '1. 使用 `for in`\n\t```javascript\n\tfunction isEmptyObject(obj){\n  \tfor(var key in obj){\n    \treturn false\n\t\t};\n\t\treturn true\n\t};\n\t```\n2. 通过 JSON.stringify 方法来判断\n\t```javascript\n\tif(JSON.stringify({}) === &#39;{}&#39;){\n\t\tconsole.log(&#39;empty obj&#39;);\n\t}\n\t```\n3. 使用 ES6 增加的 Object.keys()\n\t```javascript\n\tif(Object.keys(obj).length === 0){\n\t\tconsole.log(&#39;empty obj&#39;);\n\t}\n\t```',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'js'],
  },
  {
    name: '什么是闭包？实现每隔1秒输出数组中的一个数字',
    desc: '解释下js中的闭包概念，解释OK，给出编程题目考察基本功',
    answer:
      '```js\nfunction fun(arr) {\n    var i, len;\n    for (i = 0, len = arr.length; i &lt; len; i++) {\n      (function(i){\n        setTimeout(function() {\n          console.log(i);\n        }, i * 1000);\n      })(i);\n    }\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'promise运行过程解答',
    desc: '如下代码的运行结果是什么？\n```javascript\n process.nextTick(() =&gt; {console.log(&#39;nextTick&#39;)})\nPromise.resolve().then(()=&gt; {console.log(&#39;promise1&#39;);}).then(()=&gt; {\n  console.log(&#39;promise2&#39;);\n});\nsetImmediate(() =&gt; {console.log(&#39;setImmediate&#39;)})\nconsole.log(&#39;end&#39;) \n\n```',
    answer:
      '1. end -&gt; nextTick -&gt; promise1 -&gt; promise2-&gt; setImmediate\n1. process.nextTick 和 promise.then 都属于 microtask，而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。\n1. 事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。',
    types: ['前端领域'],
    tags: ['编码', 'promise', '异步'],
  },
  {
    name: '请简述常见web安全及防护原理',
    desc: '常见web安全及防护原理，请举例说明。',
    answer:
      '1、SQL注入原理  \n\t\t就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令。\n总的来说有以下几点  \n1. 永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双&#34;-&#34;进行转换等。\n2. 永远不要使用动态拼装SQL，可以使用参数化的SQL或者直接使用存储过程进行数据查询存取。\n3. 永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。\n4. 不要把机密信息明文存放，请加密或者hash掉密码和敏感的信息。  \n2、XSS原理及防范  \nXss(cross-site scripting)攻击指的是攻击者往Web页面里插入恶意 html标签或者JavaScript代码。\n看似安全的链接，骗取用户点击后，窃取cookie中的用户私密信息；或者攻击者在论坛中加一个恶意表单，\n当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点。\nXSS防范方法  \n首先代码里对用户输入的地方和变量都需要仔细检查长度和对”&lt;”,”&gt;”,”;”,”’”等字符做过滤；其次任何内容写到页面之前都必须加以encode，避免不小心把html tag 弄出来。这一个层面做好，至少可以堵住超过一半的XSS 攻击。\n首先，避免直接在cookie 中泄露用户隐私，例如email、密码等等。\n其次，通过使cookie 和系统ip 绑定来降低cookie 泄露后的危险。这样攻击者得到的cookie 没有实际价值，不可能拿来重放。\n如果网站不需要再浏览器端对cookie 进行操作，可以在Set-Cookie 末尾加上HttpOnly 来防止javascript 代码直接获取cookie 。\n\n3、CSRF原理及防范  \nCSRF的防御\n服务端的CSRF方式方法很多样，但总的思想都是一致的，就是在客户端页面增加伪随机数。\n通过验证码的方法',
    types: ['前端领域', 'JavaScript'],
    tags: ['安全', 'web'],
  },
  {
    name: '数字格式化问题:1234567890 --> 1,234,567,890',
    desc: '数字格式化问题,将1234567890 --&gt; 1,234,567,890',
    answer:
      '非正则实现\n```javascript\nlet test = &#39;1234567890&#39;\nfunction formatCash(str) {\n  let arr = []\n  for (let i = 1; i &lt; str.length; i++) {\n    if (str.length % 3 &amp;&amp; i == 1)\n      arr.push(str.substr(0, str.length % 3))\n    if (i % 3 === 0)\n      arr.push(str.substr(i - 2, 3))\n  }\n  return arr.join(&#39;,&#39;)\n}\nconsole.log(formatCash(test)) // 1,234,567,890\n```\n正则实现\n```javascript\nlet test1 = &#39;1234567890&#39;\nlet format = test1.replace(/\\B(?=(\\d{3})+(?!\\d))/g, &#39;,&#39;)\nconsole.log(format) // 1,234,567,890\n```',
    types: ['前端领域'],
    tags: ['数字格式化', '编码', '正则表达式'],
  },
  {
    name: '模拟实现loadash中的_.get()函数，实现如下传入参数取值效果',
    desc: '```javascript\nfunction get() {\n  // 请补全函数参数和实现逻辑\n}\nconst obj = { selector: { to: { toutiao: &#39;FE coder&#39; } }, target: [1, 2, { name: &#39;byted&#39; }] };\n// 运行代码\nget(obj, &#39;selector.to.toutiao&#39;, &#39;target[0]&#39;, &#39;target[2].name&#39;)\n\n//  输出结果：\n// [&#39;FE coder&#39;, 1, &#39;byted&#39;]\n```',
    answer:
      '```javascript\nconst get = (from, ...selectors) =&gt;\n  [...selectors].map(s =&gt;\n    s\n      .replace(/\\[([^\\[\\]]*)\\]/g, &#39;.$1.&#39;)\n      .split(&#39;.&#39;)\n      .filter(t =&gt; t !== &#39;&#39;)\n      .reduce((prev, cur) =&gt; prev &amp;&amp; prev[cur], from)\n  );\n```\n1. Use Array.map() for each selector\n2. String.replace() to replace square brackets with dots\n3. String.split(&#39;.&#39;) to split each selector\n4. Array.filter() to remove empty values\n5. Array.reduce() to get the value indicated by it',
    types: ['前端领域', 'JavaScript'],
    tags: ['js对象'],
  },
  {
    name: '合并两个有序数组',
    desc: '合并两个有序数组',
    answer:
      '```\nfunction mergeSortedArray(a, b){\n  var merged = [], \n      aElm = a[0],\n      bElm = b[0],\n      i = 1,\n      j = 1;\n  if(a.length ==0)\n    return b;\n  if(b.length ==0)\n    return a;\n  while(aElm || bElm){\n   if((aElm &amp;&amp; !bElm) || aElm &lt; bElm){\n     merged.push(aElm);\n     aElm = a[i++];\n   }   \n   else {\n     merged.push(bElm);\n     bElm = b[j++];\n   }\n  }\n  return merged;\n}\n```\n验证\n```\nmergeSortedArray([2,5,6,9], [1,2,3,29]);\n结果 [1, 2, 2, 3, 5, 6, 9, 29]\n```',
    types: ['前端领域'],
    tags: ['编码', '编程', '有序数组'],
  },
  {
    name: '进行CSRF漏洞扫描的原理和防御方式是什么？',
    desc: '如题',
    answer:
      'CSRF 就是在用户不知情的情况下，发出了请求，让用户做了不该做的操作。\n举个例子，比如你的一个网站中有个 img 标签，src 指向的是微博关注某人的接口，\n那么当用户访问你的网站时，就会在微博上关注那个人，而且这个操作用户是不知情的。\n因为 img src 发出的跨域请求，也是会携带 cookie 的，所以如果用户在微博登录过，\n那么就会带有微博的登录授权。同理，如果是其他操作，可能也存在这种漏洞，比较危险的情况就是付款。\n一般会采用 CSRF token 的方式防御，就是关键请求得要换取一个一次有效的 token 才有权限。\n',
    types: ['前端领域'],
    tags: ['基础概念'],
  },
  {
    name: '判断一个字符串是否是回文字符串',
    desc: '判断一个字符串是否是回文字符串，回文字符串是对称字符串的形式，例如：did，eve, dad, level',
    answer:
      '```\nfunction isPalindrome(str){\n  var i, len = str.length;\n  for(i=0; i isPalindrome(&#39;madam&#39;)\n  = true\n&gt; isPalindrome(&#39;toyota&#39;)\n  = false\n```',
    types: ['前端领域'],
    tags: ['编码', '编程'],
  },
  {
    name: 'box-sizing 实践',
    desc: '<p><br></p><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;head&gt;\n    &lt;style&gt;\n      .box {\n        width: 10px;\n        height: 10px;\n        border: 1px solid red;\n        margin: 2px;\n        padding: 2px;\n        background: blue;\n      }\n\n      #borderBox {\n        box-sizing: border-box;\n      }\n\n      #contentBox {\n        box-sizing: content-box;\n      }\n    &lt;/style&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;div&gt;请问下面两个 div 元素，蓝色区域的宽高各是多少像素？&lt;/div&gt;\n    &lt;div id=&#34;borderBox&#34; class=&#34;box&#34;&gt;&lt;/div&gt;\n    &lt;div id=&#34;contentBox&#34; class=&#34;box&#34;&gt;&lt;/div&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</code></pre><p><br></p>',
    answer:
      '<p>borderBox：10px(width) - 1px(border) * 2 = 8px </p><p>contentBox 10px(width) + 2px(padding) *2 = 14px</p><p><br></p><p>答题要点：除了验证候选人是否真正了解 box-sizing 之外，也考察候选人是否了解 background 会影响元素的 padding 区域，而不影响 margin 区域这个特点</p>',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '链式调用+延迟计算',
    desc: '<p>写一个加法函数sum，支持sum(1)(2)(3,4)(5,6,7....)</p><p><br></p><p>console.log(sum(1,2,3)(4)) =&gt; 输出 10</p><p><br></p><p><br></p><p>考察链式调用，闭包，延迟计算，函数toStirng/valueOf</p><p><br></p><p><br></p><p><br></p>',
    answer:
      '<p><br></p><pre><code>function sum(...args) {\n  function next(...innerArgs) {\n    args.push(...innerArgs);\n    return next;\n  }\n  next.valueOf = next.toString = () =&gt; {\n    return args.reduce((r, c) =&gt; r + c, 0);\n  };\n\n  return next;\n}</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '前端编码'],
  },
  {
    name: '请描述micro task 与 macro task的区别及应用',
    desc: '<p><br></p><pre><code>async function async1() {\n  console.log(&#39;async1 start&#39;);\n  await async2();\n  console.log(&#39;async1 end&#39;);\n}\nasync function async2() {\n  console.log(&#39;async2&#39;);\n}\n\nconsole.log(&#39;script start&#39;);\nsetTimeout(function() {\n    console.log(&#39;setTimeout&#39;);\n}, 0);  \nasync1();\nnew Promise(function(resolve) {\n    console.log(&#39;promise1&#39;);\n    resolve();\n  }).then(function() {\n    console.log(&#39;promise2&#39;);\n});\nconsole.log(&#39;script end&#39;);</code></pre><p><br></p>',
    answer: '<p>script start</p><p>async1 start</p><p>async2</p><p>promise1</p><p>script end</p><p>async1 end</p><p>promise2</p><p>setTimeout</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['promise', 'task'],
  },
  {
    name: '数组flat函数设计',
    desc: '设计一个flat函数将如下数组arr=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]]输出为1,2,&#39;3&#39;,4,&#39;5&#39;,6,7,8,9。至少写出两种方法,要求不能改变数组中的原始数据类型',
    answer:
      '*  方法一：递归\n```javascript\nfunction flat(array) {\n    var result = [];\n    var each = function(arr) {\n      arr.forEach(item =&gt; {\n        if (item instanceof Array) {\n          each(item);\n        } else {\n          result.push(item);\n        }\n      });\n    };\n    each(array);\n    return result;\n  }\nvar arr=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]];flat(arr).forEach(item=&gt;{console.log(item)})\n\n```\n*  方法二：toString（格式转换），无法保证类型\n```javascript\nArray.prototype.toString = function() {\n  return this.join(&#39;,&#39;);\n};\nconsole.log([1,2,[3,4,[5,6,7]]]+&#39;&#39;);\n```\n*  方法三：Iterator\n```javascript\nArray.prototype[Symbol.iterator] = function() {\n  let arr = [].concat(this),\n    index = 0;\n  let getFirst=function(array){\n    let first=array[0];\n    if(first instanceof Array){\n      return getFirst(array[0])\n    }else if(first!==undefined){\n      return array.shift()\n    }else{\n      return &#39;&#39;\n    }\n  }\n  return {\n    next: function() {\n      let item=getFirst(arr);\n      if(item){\n        return {\n          value:item,\n          done:false\n        }\n      }else{\n        return {\n          done:true\n        }\n      }\n    }\n  }\n}\nvar t=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]];\nfor(let i of t){console.log(i)}\n```',
    types: ['前端领域'],
    tags: ['ES', '编码', '基础算法'],
  },
  {
    name: '存储在 Cookie 和 localStorage 内有什么区别',
    desc: '基础题考察 cookie 和 localStorage 的理解。',
    answer: '存储在 Cookie 中每个 request 都会带上，而放在 localStorage 中，仅有浏览器中会存储。',
    types: ['前端领域', '浏览器'],
    tags: [],
  },
  {
    name: '请说说HTML的Meta标签的用途，并列举一些常用的meta标签',
    desc: '',
    answer:
      '考察对网页结构和语义的理解 \n\n```\nThe HTML  element represents metadata that cannot be represented by other HTML meta-related elements, like , , ',
    types: ['前端领域', 'HTML'],
    tags: ['基础'],
  },
  {
    name: '说说前端优化？图片懒加载原理是什么？',
    desc: '* 考察前端的一些优化方式\n* 图片懒加载原理',
    answer:
      '1. 优化手段：雅虎的34条优化手段，比如：代码压缩、减少请求、cdn、缓存\n2. 图片懒加载原理：img标签设置占位属性(data-src)，存储真正的图片地址；原src设置占位图片地址；当图片(快)进入用户可视区域的时候进行地址替换；',
    types: ['前端领域', '渲染框架'],
    tags: ['优化'],
  },
  {
    name: '请谈谈你对ES6的箭头函数的理解',
    desc: '```\nvar func1 = x =&gt; x;\nvar func2 = x =&gt; {x}; \nvar func3 = x =&gt; ({x});\nconsole.log(func1(1));\nconsole.log(func2(1));\nconsole.log(func3(1));\n```\n请写出程序运行结果。',
    answer: '程序运行结果为：<br>\n第一个：1 <br>\n第二个：undefined <br>\n第三个：{x: 1}  <br>',
    types: ['前端领域', 'JavaScript'],
    tags: ['es6'],
  },
  {
    name: '无重复字符的最长子串',
    desc: '<p>给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。</p><h3>样例：</h3><p><br></p><ul><li>输入: &#34;abcabcbb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;abc&#34;，所以其长度为 3。</p><ul><li>输入: &#34;bbbbb&#34;</li></ul><p>输出: 1</p><p>解释: 因为无重复字符的最长子串是 &#34;b&#34;，所以其长度为 1。</p><ul><li>输入: &#34;pwwkew&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;wke&#34;，所以其长度为 3。</p><ul><li>输入: &#34;dvdf&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;vdf&#34;，所以其长度为 3。</p><ul><li>输入: &#34;asjrgapa&#34;</li></ul><p>输出: 6</p><p>解释: 因为无重复字符的最长子串是 &#34;sjrgap&#34;，所以其长度为 6。</p><ul><li>输入: &#34;aabaab!bb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;ab!&#34;，所以其长度为 3。</p><ul><li>输入: &#34;abcb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;abc&#34;，所以其长度为 3。</p><ul><li>输入: &#34;asljlj&#34;</li></ul><p>输出: 4</p><p>解释: 因为无重复字符的最长子串是 &#34;aslj&#34;，所以其长度为 4。</p><ul><li>输入: &#34;qwnfenpglqdq&#34;</li></ul><p>输出: 8</p><p>解释: 因为无重复字符的最长子串是 &#34;fenpglqd&#34;，所以其长度为 8。</p><h3><br></h3><p><br></p>',
    answer:
      '<p><br></p><pre><code>var lengthOfLongestSubstring = function(s: string) {\n    let list = s.split(&#34;&#34;);\n    let son = [];\n    let max = [];\n    for (let i = 0; i &lt; list.length; i++) {\n        let current = list[i];\n        let index = son.indexOf(current);\n        if (index === -1) {\n            son.push(current);\n        } else {\n            let sameIndex = i - son.length + index;\n            if (son.length &gt; max.length) {\n                max = [...son];\n            }\n            son = son.slice(sameIndex + 1, son.length);\n            son.push(current);\n        }\n    }\n    return max.length;\n};</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '字符串'],
  },
  {
    name: '列举一个近期做的最能体现设计能力的项目',
    desc: '请举出一个你近期做的项目，项目需要最能体现设计能力,  请从以下角度说明：\n1. 项目描述\n2. 技术选型\n3. 模块化\n4. 模块之间通信\n5. 工程化\n6. 前后端数据流 ',
    answer: '这是一个开放式的工程设计题目，没有固定答案，评分参考评分标准',
    types: ['前端领域'],
    tags: ['设计模式'],
  },
  {
    name: '实现一个 JSONP',
    desc: '函数签名如下:\n\n```javascript\nfunction jsonp(url, callback) {\n  // TODO\n}\n```',
    answer:
      '主要考察如何处理第二个参数 `callback` 的问题，\n加分项比如超时处理 onerror 的处理, xss 考虑等等\n\n```\nconst kCallBackMap = {};\nfunction uuid() {\n  return ...;\n}\n\nfunction jsonp(url, callback) {\n  const callbackId = uuid();\n  url += &#39;callback=&#39; + callbackId;\n\twindow[calbackId] = callback;\n\t\n\tconst script = document.createElement(&#39;script&#39;);\n\tscript.src = url;\n\tdocument.head.appendChild(script);\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['jsonp'],
  },
  {
    name: '请谈一谈JAVAscript的作用域和this',
    desc: '```\ninner = &#39;window&#39;;\n\nfunction say() {\n    console.log(inner);\n    console.log(this.inner);\n}\n\nvar obj1 = (function() {\n    var inner = &#39;1-1&#39;;\n    return {\n        inner: &#39;1-2&#39;,\n        say: function() {\n            console.log(inner);\n            console.log(this.inner);\n        }\n    }\n})();\n\nvar obj2 = (function() {\n    var inner = &#39;2-1&#39;;\n    return {\n        inner: &#39;2-2&#39;,\n        say: function() {\n            console.log(inner);\n            console.log(this.inner);\n        }\n    }\n})();\n\n\nsay();\nobj1.say();\nobj2.say();\nobj1.say = say;\nobj1.say();\nobj1.say = obj2.say;\nobj1.say();\n```',
    answer:
      '```\nwindow\nwindow\n\n1-1\n1-2\n\n2-1\n2-2\n\nwindow\n1-2\n\n2-1\n1-2\n\n主要考察javascript的作用域和this指向。作用域是静态的，声明时确定；this是动态的，运行时确定。\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', '语言关键字'],
  },
  {
    name: '请问CSS position有哪些定位方式',
    desc: 'CSS position有哪些定位方式，每种方式是如何定位的？',
    answer:
      '### position取值\nrelative, fixed，absolute和staic、sticky 5种\n### 定位方式\n*  staic-默认位置；元素会像通常那样流入页面。顶部，底部，左，右，z-index属性不适用。  \n*  relative-元素的位置相对于自身进行调整，而不改变布局（从而为未被定位的元素留下一个空白）。  \n*  absolute-该元素从页面的流中移除，并相对于其最近位置的祖先定位（非static）在指定位置，如果有的话，或者与初始包含块相对。绝对定位的框可以有边距，并且不会与其他边距折叠。这些元素不影响其他元素的位置。  \n*  fixed元素是定位在相对于窗口。  \n*  sticky，是相对定位和固定定位的混合。该元素被视为相对位置，直到它越过指定的阈值，此时它被视为固定位置。  \n',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '请介绍一下Oauth2.0 的认证过程',
    desc: '如题',
    answer:
      '可以参考 http://www.jianshu.com/p/0db71eb445c8 或者 \nhttp://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html 的答案，\n回答的一个重点是 code（授权码）仅一次有效，并且要有失效时间，而且很短，比如一分钟，\n因为浏览器收到会立刻跳转。\n还有就是服务端可以根据 code 结合相应的 sercet 去获取 token，要说清楚。',
    types: ['前端领域'],
    tags: ['安全', 'oauth'],
  },
  {
    name: 'express中间件的原理',
    desc: '<div style="white-space: pre;">express中间件的实现原理 并给出实现\n</div>',
    answer:
      '<div style="white-space: pre;">主要考察候选人对中间件的理解 参考代码 ``` export default function compose(...funcs) { if (funcs.length === 0) { return arg =&gt; arg } if (funcs.length === 1) { return funcs[0] } return funcs.reduce((a, b) =&gt; (...args) =&gt; a(b(...args))) } ``` koa中间件主要使用 generator和promise可参考https://github.com/tj/co\n</div>',
    types: ['前端领域'],
    tags: ['编码'],
  },
  {
    name: '实现es6字符串模板方法sprintf',
    desc: '<p><br></p><pre><code>const template = &#34;My name is ${name},I&#39;m from ${city}&#34;;\nconst result = sprintf(template, {\n\tname: &#39;Yiming Zhang&#39;,\n\tcity: &#39;FuJian&#39;,\n});\nconsole.log(result); // My name is Yiming Zhang,I&#39;m from FuJian</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>const sprintf = (str, data) =&gt; (\n    Object.keys(data).reduce((prev, cur) =&gt; {\n        let reg = new RegExp(&#39;\\\\$\\\\{&#39; + cur + &#39;\\\\}&#39;, &#39;g&#39;);\n        return prev.replace(reg, data[cur]);\n    }, str);\n);</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '正则表达式', '前端基础', 'es6'],
  },
  {
    name: '登录表单设计/扫码登录/第三方登录',
    desc: '1. 请实现一个登录表单\n2. 用GET方法行不行？csrf是什么？如何防御？\n3. cookie-sesssion的工作机制\n4. 你已经登录产品的App端，要在web实现扫码登录，该如何设计？\n5. 接入第三方登录（如微信），如何设计？',
    answer:
      '1. 正确书写html\n2. 正确回答GET和POST的区别，从语义、弊端、安全等方面。csrf的防御：token，samesite，referer校验（弊端）等\n3. 正确理解cookie-session的工作机制，sessionId的设计，存储\n4. 考察对司空见惯的扫码登录，是否有思考其实现。正确设计 Client/Server/App 三方流程，设计二维码存储的内容，client通知有轮训或websocket等解决方案\n5. 正确理解 Client/Server/App/Weixin Server 四方流程，理解oauth2协议',
    types: ['前端领域', 'HTML'],
    tags: ['扫码登录'],
  },
  {
    name: '作用域以及变量提升',
    desc: '### 请写出下题的结果：\n```\nvar a = 1; \nfunction b() { \n    a = 10; \n    return; \n    function a() {} \n} \nb(); \nconsole.log(a);   \n```',
    answer: '结果：1',
    types: ['前端领域'],
    tags: ['语言基础', '基础概念', '提升'],
  },
  {
    name: 'setTimeout 和 Promise',
    desc: '<p>请写出程序的输出内容</p><pre><code>setTimeout(function() {\n  console.log(1)\n}, 0);\nnew Promise(function(resolve) {\n  console.log(2);\n  for(var i=0 ; i &lt; 10000 ; i++) {\n    if (i == 9999) {\n      resolve();\n    }\n  }\n  console.log(3);\n}).then(function() {\n  console.log(4);\n});\nconsole.log(5);</code></pre><p><br></p>',
    answer: '<p>正确答案：2 3 5 4 1。重点关注：候选人是否把 2 写在第一位，以及 4 和 1 的顺序。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'requestIdleCallback和requestAnimationFrame有什么区别？',
    desc: '<p>\t<strong>requestIdleCallback和requestAnimationFrame有什么区别？</strong></p>',
    answer:
      '<p>\trequestAnimationFrame的回调会在每一帧确定执行，属于高优先级任务，而requestIdleCallback的回调则不一定，属于低优先级任务。</p><p>\t我们所看到的网页，都是浏览器一帧一帧绘制出来的，通常认为FPS为60的时候是比较流畅的，而FPS为个位数的时候就属于用户可以感知到的卡顿了。</p><p>\t一帧包含了用户的交互、js的执行、以及requestAnimationFrame的调用，布局计算以及页面的重绘等工作。</p><p>\t假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调。</p><p>\t由于requestIdleCallback利用的是帧的空闲时间，所以就有可能出现浏览器一直处于繁忙状态，导致回调一直无法执行，这其实也并不是我们期望的结果（如上报丢失），那么这种情况我们就需要在调用requestIdleCallback的时候传入第二个配置参数timeout了。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件循环'],
  },
  {
    name: '请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率>=n的元素列表',
    desc: '请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率&gt;=n的元素列表',
    answer:
      '`\nArray.prototype.findDuplicate = function (n) {\n    var results = [];\n    if (typeof n != &#39;number&#39; || isNaN(n)) {\n        return results;\n    }\n    \n    var itemFreqs = {};\n    this.forEach(function (item) {\n        if (!itemFreqs[item]) {\n            itemFreqs[item] = 0;\n        }\n        itemFreqs[item] ++;\n    });\n    \n    for (var item in itemFreqs) {\n        if (itemFreqs[item] &gt;= n) {\n            results.push(item);\n        }\n    }\n    \n    return results;\n}\n\n`',
    types: ['前端领域'],
    tags: ['编码', '前端编码'],
  },
  {
    name: '请回答DOM中对应创建、移除、追加、复制、查找节点的方法是什么？',
    desc: '考察候选人对原生dom操作的方法的理解和掌握熟练程度',
    answer:
      '1.  创建新节点\n\t*  createDocumentFragment() //创建一个DOM片段\n\t*  createElement() //创建一个具体的元素\n\t*  createTextNode() //创建一个文本节点\n\n1.  克隆节点\n*  cloneNode()\n\n1. 添加节点\n*  appendChild()\n*  insertBefore()\n\n1. 移除节点\n*  removeChild()\n\n1. 替换节点\n*  replaceChild()\n\n1. 查找节点\n*  querySelector()\n*  querySelectorAll()\n*  getElementById()\n*  getElementsByName()\n*  getElementsByTagName()\n\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['dom'],
  },
  {
    name: '请描述如何用原生JS实现数字的货币格式化',
    desc: '<p># 如何用原生JS实现数字的货币格式化，例如数字6123456789格式化后为6,123,456,789，不低于两种方法。</p>',
    answer:
      '<p>方法一： (6123456789).toLocaleString(&#39;en-US&#39;) // 6,123,456,789</p><p><br></p><p>方法二： (6123456789).toString().split(&#39;&#39;).reverse().join(&#39;&#39;).replace(/\\d{3}/g,function($1){return $1+&#39;,&#39;}).split(&#39;&#39;).reverse().join(&#39;&#39;) </p><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['数字格式化', 'js'],
  },
  {
    name: 'let,const,var的区别',
    desc: '请说明一下let,const,var的区别 并回答如下代码会不会报错\n```\nconst a = {};\na.test = 1;\n```',
    answer:
      '考察候选人对es6变量声明的理解\n1. let声明的变量拥有块级作用域\n2. let声明的全局变量不是全局对象的属性\n3. let不能重新声明变量\n4. const声明的变量与let声明的变量类似，它们的不同之处在于，const声明的变量只可以在声明时赋值，不可随意修改，否则会导致SyntaxError（语法错误）。\n\n上面代码只是针对a的引用 并不会报错',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '如何实现链式调用',
    desc: '请实现函数 a, b, c，使调用方式为 a().b().c() 时，结果为输出 a b c。\n如果上面问题回答出来了，并且是在 a 函数内部 return Object 实现，\n那么可以补充问下如何能够实现让三个函数任意链式顺序调用。\n如 a().c().b() 或 b().a().c() 。\n',
    answer:
      '这道题主要就是考察面试者对 JavaScript 的 Object 概念理解是否清晰，\n最好的答案是直接将 a b c 三个函数挂载到 runtime 中的某个全局变量中，比如可以是 window。\n然后在每个函数内 return window 就可以了。\n当然，也可以按照第一道题目的顺序，分别在相应函数内 return 下个函数，但是这样做无法调换顺序。',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: '实现千位分隔符',
    desc: '给一个数字，比如：1234567.90，转化成：1,234,567.90',
    answer:
      '```js\nfunction commafy(num) {\n  return num &amp;&amp; num\n      .toString()\n      .replace(/^\\d+/, (m) =&gt; m.replace(/(?=(?!^)(\\d{3})+$)/g, &#39;,&#39;));\n}\nconsole.log(commafy(1234567.90)); //1,234,567.90\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础算法'],
  },
  {
    name: '编写javascript深度克隆函数deepClone',
    desc: '编写javascript深度克隆函数deepClone',
    answer:
      '```javascript\nfunction deepClone(obj) {\n    var _toString = Object.prototype.toString;\n\n    // null, undefined, non-object, function\n    if (!obj || typeof obj !== &#39;object&#39;) {\n        return obj;\n    }\n\n    // DOM Node\n    if (obj.nodeType &amp;&amp; &#39;cloneNode&#39; in obj) {\n        return obj.cloneNode(true);\n    }\n\n    // Date\n    if (_toString.call(obj) === &#39;[object Date]&#39;) {\n        return new Date(obj.getTime());\n    }\n\n    // RegExp\n    if (_toString.call(obj) === &#39;[object RegExp]&#39;) {\n        var flags = [];\n        if (obj.global) { flags.push(&#39;g&#39;); }\n        if (obj.multiline) { flags.push(&#39;m&#39;); }\n        if (obj.ignoreCase) { flags.push(&#39;i&#39;); }\n\n        return new RegExp(obj.source, flags.join(&#39;&#39;));\n    }\n\n    var result = Array.isArray(obj) ? [] :\n        obj.constructor ? new obj.constructor() : {};\n\n    for (var key in obj ) {\n        result[key] = deepClone(obj[key]);\n    }\n\n    return result;\n}\n\nfunction A() {\n    this.a = a;\n}\n\nvar a = {\n    name: &#39;qiu&#39;,\n    birth: new Date(),\n    pattern: /qiu/gim,\n    container: document.body,\n    hobbys: [&#39;book&#39;, new Date(), /aaa/gim, 111]\n};\n\nvar c = new A();\nvar b = deepClone(c);\nconsole.log(c.a === b.a);\nconsole.log(c, b);\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '请谈谈你对JS单线程以及setTimeout的理解',
    desc: '```javascript\nsetTimeout(function() {\n\tsetTimeout(function() { console.log(1) }, 100)\n\tconsole.log(2)\n\tsetTimeout(function() { console.log(3) }, 0)\n}, 0)\nsetTimeout(function () {\n\tconsole.log(4)\n}, 100)\nconsole.log(5)\n```\n请说出上面代码的输出顺序以及原因？如果吧4改为101ms呢？',
    answer:
      '正确顺序为：5 2 3 4 1\n如果4改为101ms则执行顺序还是不变\n原因：\n1.  JS单线程\n2. setTimeout不在当前eventloop。且执行顺序依赖入队顺序。setTimeout 0是放入下一个loop的队尾\n3. 虽然4和1都是100ms延迟的标记，但是4先入队列。\n4. setTimeout的time是个标记，会在eventloop循环去检测，符合条件的执行，不符合条件的延后到下一个eventloop，这执行过程本身又有时间，因此尽管101&gt;100，但是在一个执行周期内，他们都会被触发，4先入队所以不变',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', 'js'],
  },
  {
    name: 'async & forEach 考察',
    desc: '以下代码的运行结果\n```javascript\nconst list = [1, 2, 3];\nconst square = num =&gt; {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(num * num);\n        }, 1000);\n    });\n}\nfunction test() {\n    list.forEach(async x =&gt; {\n        const res = await square(x);\n        console.log(res);\n    });\n}\ntest()\n```\n如果希望每隔1s输出一个结果，应该如何改造？',
    answer:
      '1s 后输出 1 4 9  \n改为 for 循环：\n```javascript\nasync function test() {\n    for (let x of list) {\n        const res = await square(x);\n        console.log(res)\n    }\n}\n```\n',
    types: ['前端领域'],
    tags: ['编码', '代码阅读'],
  },
  {
    name: 'css单位的百分比',
    desc: '给一个div设置它父级div的宽度是100px，然后再设置它的padding-top为20%。 <br>\n问现在的div有多高？如果父级元素定位是absolute呢？',
    answer:
      '现有div的高度等于自身高度+父级块的宽度*20%,如果父级元素定位是absolute，结果不变；<br>\n当margin/padding取形式为百分比的值时，无论是left/right，还是top/bottom，都是以父元素的width为参照物的！<br>\n',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: 'NodeJS实现简单的HTTP代理和隧道代理',
    desc: 'Web代理一般包括普通的HTTP代理和隧道代理，谈谈理解。\nNodeJS实现一个简单的HTTP代理，如在本地 8888 端口开启 HTTP 代理服务，修改浏览器的 HTTP 代理为 127.0.0.1:8888 后再访问 HTTP 网站，代理可以正常工作\n对隧道代理了解多少，能否实现？',
    answer:
      'http普通代理：HTTP 客户端向代理发送请求报文，代理服务器需要正确地处理请求和连接（例如正确处理 Connection: keep-alive），同时向服务器发送请求，并将收到的响应转发给客户端。\n```\n// http 普通代理\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction request(cReq, cRes) {\n  const u = url.parse(cReq.url);\n\n  const options = {\n    hostname: u.hostname,\n    port: u.port || 80,\n    path: u.path,\n    method: cReq.method,\n    headers: cReq.headers\n  };\n\n  const pReq = http.request(options, pRes =&gt; {\n    cRes.writeHead(pRes.statusCode, pRes.headers);\n    pRes.pipe(cRes);\n  }).on(&#39;error&#39;, function(e) {\n    cRes.end();\n  });\n\n  cReq.pipe(pReq);\n}\n\nhttp.createServer().on(&#39;request&#39;, request).listen(8888, &#39;0.0.0.0&#39;);\n```\n隧道代理：HTTP 客户端通过 CONNECT 方法请求隧道代理创建一条到达任意目的服务器和端口的 TCP 连接，并对客户端和服务器之间的后继数据进行盲转发\n```\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction connect(cReq, cSock) {\n  const u = url.parse(&#39;http://&#39; + cReq.url);\n\n  const pSock = net.connect(u.port, u.hostname, function() {\n    cSock.write(&#39;HTTP/1.1 200 Connection Established\\r\\n\\r\\n&#39;);\n    pSock.pipe(cSock);\n  }).on(&#39;error&#39;, function(e) {\n    cSock.end();\n  });\n\n  cSock.pipe(pSock);\n}\n\nhttp.createServer().on(&#39;connect&#39;, connect).listen(8888, &#39;0.0.0.0&#39;);\n```\n合二为一\n```\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction request(cReq, cRes) {\n  const u = url.parse(cReq.url);\n\n  const options = {\n    hostname: u.hostname,\n    port: u.port || 80,\n    path: u.path,\n    method: cReq.method,\n    headers: cReq.headers\n  };\n\n  const pReq = http.request(options, pRes =&gt; {\n    cRes.writeHead(pRes.statusCode, pRes.headers);\n    pRes.pipe(cRes);\n  }).on(&#39;error&#39;, function(e) {\n    cRes.end();\n  });\n\n  cReq.pipe(pReq);\n}\n\nfunction connect(cReq, cSock) {\n  var u = url.parse(&#39;http://&#39; + cReq.url);\n\n  var pSock = net.connect(u.port, u.hostname, function() {\n    cSock.write(&#39;HTTP/1.1 200 Connection Established\\r\\n\\r\\n&#39;);\n    pSock.pipe(cSock);\n  }).on(&#39;error&#39;, function(e) {\n    cSock.end();\n  });\n\n  cSock.pipe(pSock);\n}\n\nhttp.createServer()\n  .on(&#39;request&#39;, request)\n  .on(&#39;connect&#39;, connect)\n  .listen(8888, &#39;0.0.0.0&#39;);\n```\n需要注意的是，大部分浏览器配完隧道代理，默认只会让https走隧道代理，http如果需要走隧道代理，还需要写个Nodejs的验证\n```\nconst options = {\n  hostname: &#39;127.0.0.1&#39;,\n  port: 8888,\n  path: &#39;toutiao.com:80&#39;,\n  method: &#39;CONNECT&#39;\n};\n\nconst req = http.request(options);\n\nreq.on(&#39;connect&#39;, function(res, socket) {\n  socket.write(&#39;GET / HTTP/1.1\\r\\n&#39; +\n    &#39;Host: toutiao.com\\r\\n&#39; +\n    &#39;Connection: Close\\r\\n&#39; +\n    &#39;\\r\\n&#39;);\n\n  socket.on(&#39;data&#39;, function(chunk) {\n    console.log(chunk.toString());\n  });\n\n  socket.on(&#39;end&#39;, function() {\n    console.log(&#39;socket end.&#39;);\n  });\n});\n\nreq.end();\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['代理'],
  },
  {
    name: '假设一个网页嵌入一个iframe,如何更改iframe内dom样式？',
    desc: '假设一个网页嵌入一个iframe,如何更改这个iframe内dom样式',
    answer:
      '区分同源和不同源解决方案，同源可以通过document.getElementById(&#39;iframeId&#39;).contentWindow.document，\n不同源：分iframe的嵌入的页面是否自己可控，可控可以通过postMessage方式更改，iframe页面监听message事件；如果页面不可控，应该无解。\n可以追问iframe有同源策略限制，举个例子说明',
    types: ['前端领域', '可视化'],
    tags: ['语言基础'],
  },
  {
    name: '数组随机排序',
    desc: '```javascript\nvar arr=[1,2,3,4,5,6]\n```\n',
    answer:
      '方法一、\n```javascript\narr.map(item=&gt;{\n    return {\n        value:item,\n        key:Math.random()\n    }\n})\n.sort((a,b)=&gt;a.key-b.key)\n.map(item=&gt;item.value)\n```\n方法二、\n```\nvar arrayToRand = (arr) =&gt; {\n    for(let i=0; i',
    types: ['前端领域'],
    tags: ['排序', '编码'],
  },
  {
    name: 'js事件模型',
    desc: '浏览器的事件模型？在当前的事件模型中，哪些事件可以冒泡，哪些不会冒泡，为什么？不冒泡的元素，如何来实现事件代理？',
    answer:
      '考察浏览器事件模型，看看是不是了解事件模型背后的设计意图。\n\n浏览器开发团队遇到的问题：页面上哪一部分会拥有某个特定的事件？比如单击一个嵌套的同心div，那么到底哪一个div会拥有这个点击事件？实际上难以确定点击者的意图，团队给出的解决方式是所有div都将拥有这个事件，于是产生了事件流模型。如上一个问题所述，“事件”的概念在GUI编程中如此之重要，而这种流式模型能给予其很大的灵活性和控制\n对于能精确确定意图的（这种冒泡的话一般也会带来问题，比如mouseleave），或者不可能产生嵌套的媒体类元素，冒泡就不是必须的；对于不冒泡的元素，可以在捕获阶段代理，DOM2级规范addEventListener的第三个参数',
    types: ['前端领域', 'JavaScript'],
    tags: ['js', '事件模型'],
  },
  {
    name: '请列举说明几个在web中实现长连接的技术方案或手段',
    desc: '本地主要考察候选人对长连接技术的概念理解和区分，如果能回答答出大致的名词可以继续追问一些具体的激技术实现细节和存在的优缺点等等。\n',
    answer:
      '参考答案：\n1. https://stackoverflow.com/questions/11077857/what-are-long-polling-websockets-server-sent-events-sse-and-comet/12855533#12855533\n1. https://blog.csdn.net/liang0000zai/article/details/40537059\n\n* Long Polling\n* Server-Sent Events\n* Websockets\n* Comet',
    types: ['前端领域'],
    tags: ['长连接', '基础概念', 'web'],
  },
  {
    name: '函数作用域',
    desc: '用代码实现JavaScript中Function的bind方法的polyfill',
    answer:
      '```\nif (!Function.prototype.bind) {\n  Function.prototype.bind = function (oThis) {\n    if (typeof this !== &#34;function&#34;) {\n      // closest thing possible to the ECMAScript 5\n      // internal IsCallable function\n      throw new TypeError(&#34;Function.prototype.bind - what is trying to be bound is not callable&#34;);\n    }\n\n    var aArgs = Array.prototype.slice.call(arguments, 1), \n        fToBind = this, \n        fNOP = function () {},\n        fBound = function () {\n          return fToBind.apply(this instanceof fNOP\n                                 ? this\n                                 : oThis || this,\n                               aArgs.concat(Array.prototype.slice.call(arguments)));\n        };\n\n    fNOP.prototype = this.prototype;\n    fBound.prototype = new fNOP();\n\n    return fBound;\n  };\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['函数作用域'],
  },
  {
    name: 'CSS 属性 box-sizing的值有哪些？分别有什么含义？',
    desc: 'CSS 属性 box-sizing的值有哪些？分别有什么含义？',
    answer: '  - `content-box` 默认值，width内容宽度\n\t- `border-box` width 包含`padding`和`border`',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: 'JS的new操作符具体做了什么',
    desc: 'JS的new操作符具体做了什么，描述一下，最好可以体现在代码上',
    answer:
      '```\nfunction A() {\n  this.name = &#39;a&#39;;\n  this.getName = function() {\n    return this.name;\n  }\n}\nvar a = new A();\n\nvar aa = new Object();\naa.__proto__ = A.prototype;\nA.call(aa);\n// 还有最后一步，如果发现A返回的是一个Object类（非primitive类型），则直接返回A的返回值，否则把aa返回出去\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', '语言关键字', 'js'],
  },
  {
    name: 'JS编码二叉树的实现与遍历',
    desc: 'JS编码实现一个二叉树的构造函数，包括节点类Node，树类BST，插入节点函数insert，\n并且满足\n1.左子节点的值 &lt; 父节点的值 &lt;= 右子节点的值\n2.可以实现先序，中序，后续遍历',
    answer:
      '```\n// 二叉树\nfunction BST() {\n  this.root = null;\n}\n\nBST.prototype.insert = function(data) {\n  var n = new Node(data, null, null);\n  if (this.root === null) {\n    this.root = n;\n  } else {\n    var current = this.root;\n    for (;;) {\n      if (data &lt; current.data) {\n        if (current.left === null) {\n          current.left = n;\n          break;\n        } else {\n          current = current.left;\n        }\n      } else {\n        if (current.right === null) {\n          current.right = n;\n          break;\n        } else {\n          current = current.right;\n        }\n      }\n    }\n  }\n}\n\n// 先序遍历\nBST.prototype.preOrder = function(node) {\n  if (node !== null) {\n    console.log(node.show() + &#34; &#34;);\n    this.preOrder(node.left);\n    this.preOrder(node.right);\n  }\n}\n\n// 中序遍历\nBST.prototype.inOrder = function(node) {\n  if (node !== null) {\n    this.inOrder(node.left);\n    console.log(node.show() + &#34; &#34;);\n    this.inOrder(node.right);\n  }\n}\n\n// 后序遍历\nBST.prototype.postOrder = function(node) {\n  if (node !== null) {\n    this.postOrder(node.left);\n    this.postOrder(node.right);\n    console.log(node.show() + &#34; &#34;);\n  }\n}\n\n// 节点对象\nfunction Node(data, left, right) {\n  this.data = data;\n  this.left = left;\n  this.right = right;\n  this.show = function() {\n    return this.data;\n  }\n}\n\n// 测试代码\nvar bst = new BST();\nvar nums = [10, 3, 18, 2, 4, 13, 21, 9, 8, 9];\nfor (var i = 0; i &lt; nums.length; i++) {\n  bst.insert(nums[i]);\n}\nbst.preOrder(bst.root);\nbst.inOrder(bst.root);\nbst.postOrder(bst.root);\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['树', '基础算法', 'js'],
  },
  {
    name: '简述一下src与href的区别',
    desc: '描述一下html中的src与href的区别和使用场景是什么',
    answer:
      '基本答案：src用于指向外部资源的位置替换当前元素，href用于在当前文档和引用资源之间确立联系。\n1.  src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；\n在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。\n\n浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。\n这也是为什么将js脚本放在底部而不是头部。\n \n1.  href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加\n\n那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。\n这也是为什么建议使用link方式来加载css，而不是使用@import方式。',
    types: ['前端领域', 'HTML'],
    tags: [],
  },
  {
    name: 'js运行机制',
    desc: '下面一段代码的输出：\n```\n(function() {\n  console.log(&#39;this is the start&#39;);\n  setTimeout(function cb() {\n    console.log(&#39;this is a msg from call back&#39;);\n  });\n  console.log(&#39;this is just a message&#39;);\n  setTimeout(function cb1() {\n    console.log(&#39;this is a msg from call back1&#39;);\n  }, 0);\n  console.log(&#39;this is the end&#39;);\n})();\n```',
    answer:
      '因为前端编程基本属于「Event-driven programming」范式，这是GUI之类的交互式程序的基础，区别于传统的批处理式编程。一个页面上的交互行为，基本都是由用户发起的，然而用户的行为意图是难以预测的，所以需要异步的驱动机制来应对\n因此有进一步问题：\n平时都说JS是单线程执行的，那它是如何实现非阻塞式执行页面JS的？<br>\n考察对EventLoop概念的理解，核心是会在调用栈之外建立一个Event Table。可以将Event Table想象成一个电话注册本：调用栈会告诉event table注册一些特定的函数，并且在指定事件发生时会调用他们。当这些指定事件发生时，event table仅仅是简单地把要调用的函数移入Event Queue中去。event queue提供了一个简单等待区域，函数在此区域内等待被移入调用栈进行调用。\n『究竟什么情况下，event queue中的函数才会被移入调用栈中？』。实际上，JavaScript 遵从一个简单的法则：存在一个监控进程不断检查调用栈是否为空，当调用栈为空的时候，检查事件队列（event queue）中是否有待调用的函数。如果事件队列中存在待调用的函数，队列头部的函数被移入调用栈执行。如果事件队列为空，监控进程就保持轮询状态。\n这意味着js中的定时器的精度，实际上是没有保障的，你写一个setTimeout(function(){ do xxxx}, 1000)； 并没办法保证它刚好是在1000ms之后调用，因为之前的代码执行可能非常耗时，也可能事件队列中有其他事件排在前面。 这样就出现了题目中的情况。\n更多可参考：http://metaphor.space/2016/04/26/javascript-event-loop/；  https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop；还有《你不知道的Javascript中卷》141页~143页，事件循环章节\n\n值得一提的是：我们平常说JS是单线程执行的，但浏览器不是，浏览器是多线程的，有的线程负责网络请求，有的负责渲染页面等；不要搞混了\n\n另外，ES6给JS带来了新的特性，比如加入了可以创建多线程的worker，以及更精准控制事件调度的Promise',
    types: ['前端领域', 'JavaScript'],
    tags: ['js'],
  },
  {
    name: '请问for of和for in的区别',
    desc: 'for of和for in的区别？ for of可以用在普通对象上吗？',
    answer:
      '考察候选人对for 循环的理解 以及对es6中的for of和iterator理解\n\nfor in不多做解释了 for of主要是对实现了 Symbol.iterator 接口进行遍历\n\n自定义for of\n```\nvar iterable = {\n  [Symbol.iterator]() {\n    return {\n      i: 0,\n      next() {\n        if (this.i &lt; 3) {\n          return { value: this.i++, done: false };\n        }\n        return { value: undefined, done: true };\n      }\n    };\n  }\n};\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['编码'],
  },
  {
    name: '字符串的排列组合计算',
    desc: '输入一个字符串，打印出该字符串中字符的所有排列的情况。例如输入字符串abc，则打印出由字符a、b、c所能排列出来的所有字符串abc、acb、bac、bca、cab和cba.\n```javascript\nfunction calc(str){\n    var strArray = str.split(&#39;&#39;);\n    // 补全代码\n  }\n  console.log(calc(&#39;ab&#39;)) // [&#39;a&#39;,&#39;b&#39;]  [&#39;b&#39;,&#39;a&#39;]\n```',
    answer:
      '```javascript\nfunction calc(str){\n    var strArray = str.split(&#39;&#39;);\n    var path = [];\n    var docalc = function(array){\n      if(array.length===1){\n        path.push(array[0]);\n        console.log(path);\n        path.pop();\n        return;\n      }\n      for(var i=0;i',
    types: ['前端领域'],
    tags: ['递归', '排列组合', '编码'],
  },
  {
    name: 'DOM中哪些事件是不冒泡的，如何判断事件是不是可以冒泡？',
    desc: 'DOM中哪些事件是不冒泡的，如何判断事件是不是可以冒泡？',
    answer:
      '*  不冒泡的事件有blur、focus、load、unload、abort、error、mouseenter、mouseleave、resize\n*  每个 event 都有一个event.bubbles属性，通过该属性可知是否冒泡',
    types: ['前端领域'],
    tags: ['事件', '基础概念'],
  },
  {
    name: 'JavaScript实现对象深拷贝方法',
    desc: '编码实现JavaScript实现对象深拷贝',
    answer:
      'var clone = function(v) {  \n  var o = v.constructor === Array ? [] : {};  \n  for (var i in v) {  \n    o[i] = typeof v[i] === &#34;Object&#34; ? clone(v[i]) : v[i];  \n  }  \n  return o;  \n}  ',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: '故障分析-HTTPS证书不被信任',
    desc: '<p>如下图，在不同的设备上，同时访问同一个域名，一个设备显示证书不被信任，另一个设备正常，再使用多个其他设备访问，依然正常。分析可能的原因？以及需要获取的进一步的信息？</p><p>正常的设备</p><img src="https://tosv.byted.org/obj/pgc-fes/marvel/ssl_success.png" width="375" alt="ssl_success.png"><p>异常的设备</p><img src="https://tosv.byted.org/obj/pgc-fes/marvel/ssl_error.png" width="375" alt="ssl_error.png"><p><br></p>',
    answer:
      '<p>需要进行的进一步的操作：</p><p>1) 查看证书详情：路径/SN/哈希值</p><p>2) 查看DNS解析结果</p><p>3) 查看系统时间/版本/浏览器版本</p><p>可能的原因：</p><p>1) 代理工具/安全软硬件</p><p>2) DNS劫持/路由劫持</p><p>3) 时间偏差</p><p>4) 操作系统/浏览器版本差异</p>',
    types: ['前端领域', '浏览器'],
    tags: ['HTTPS', '分析'],
  },
  {
    name: '请实现一个CodingMan函数实现以下功能',
    desc: '<p><br></p><pre><code>实现一个CodingMan，可以按照以下方式调用:\nCodingMan(“Hank”)输出:\nHi! This is Hank!\n\nCodingMan(“Hank”).sleep(10).eat(“dinner”)\n输出\nHi! This is Hank!\n//等待10秒..\nWake up after 10\nEat dinner~\n\nCodingMan(“Hank”).eat(“dinner”).eat(“supper”)\n输出\nHi This is Hank!\nEat dinner~\nEat supper~\n\nCodingMan(“Hank”).sleepFirst(5).eat(“supper”)\n输出\n//等待5秒\nWake up after 5\nHi This is Hank!\nEat supper\n以此类推。</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>class _CodingMan {\n    constructor(name) {\n        this.tasks = [];\n        const task = () =&gt; {\n            console.log(`Hi! This is ${name}`);\n            this.next();\n        }\n        this.tasks.push(task);\n        setTimeout(() =&gt; {               // 把 this.next() 放到调用栈清空之后执行\n            this.next();\n        }, 0);\n    }\n\n    next() {\n        const task = this.tasks.shift(); // 取第一个任务执行\n        task &amp;&amp; task();\n    }\n\n    sleep(time) {\n        this._sleepWrapper(time, false);\n        return this;                     // 链式调用\n    }\n\n    sleepFirst(time) {\n        this._sleepWrapper(time, true);\n        return this;\n    }\n\n    _sleepWrapper(time, first) {\n        const task = () =&gt; {\n            setTimeout(() =&gt; {\n                console.log(`Wake up after ${time}`);\n                this.next();\n            }, time * 1000)\n        }\n        if (first) {\n            this.tasks.unshift(task);     // 放到任务队列顶部\n        } else {\n            this.tasks.push(task);        // 放到任务队列尾部\n        }\n    }\n\n    eat(name) {\n        const task = () =&gt; {\n            console.log(`Eat ${name}`);\n            this.next();\n        }\n        this.tasks.push(task);\n        return this;\n    }\n}\n\nfunction CodingMan(name) {\n    return new _CodingMan(name);\n}\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['事件轮询机制', '队列', '链式调用', '编码', '闭包'],
  },
  {
    name: '实现如下函数add,使如下执行都等于9 ',
    desc: '<p><br></p><pre><code>add(2,3,4)=9\nadd(2)(3,4)=9\nadd(2)(3)(4)=9\nadd(2,3)(4)=9</code></pre><p><br></p>',
    answer:
      '<p>// 较通用的实现</p><p>function currying(fn, length) {</p><p> length = length || fn.length; \t</p><p> return function (...args) {\t\t\t</p><p>  return args.length &gt;= length\t</p><p>  \t? fn.apply(this, args)\t\t\t</p><p>   : currying(fn.bind(this, ...args), length - args.length) </p><p> }</p><p>}</p><p>function add(...args) {</p><p>\treturn args.reduce((t, i) =&gt; t+=i)</p><p>}</p><p>var newAdd = currying(add, 3)</p><p><br></p><p>// 通用实现2</p><p>function currying(fn, length) {</p><p>\treturn function(...args) {</p><p>\t\tif (args.length &gt;= length) {</p><p>\t\t\treturn args.slice(0, length).reduce((t, i) =&gt; t += i);</p><p>\t\t}</p><p>\t\treturn function(..._args) {</p><p>\t\t\treturn add.apply(null, [...args, ..._args]);</p><p>\t\t}</p><p>\t}</p><p>}</p><p>function add(...args) {</p><p>\treturn args.reduce((t, i) =&gt; t+=i)</p><p>}</p><p>var newAdd = currying(add, 3)</p><p><br></p><p>// 直接的实现</p><p>function add(...args) {</p><p>\tif (args.length &gt;= 3) {</p><p>\t\treturn args.slice(0, 3).reduce((t,i) =&gt; t += i);</p><p>\t}</p><p>\treturn function(..._args) {</p><p>\t\treturn add(args.concat(_args));</p><p>\t}</p><p>}</p>',
    types: ['前端领域'],
    tags: ['编码', '柯里化'],
  },
  {
    name: '介绍一下你了解的 WebSocket',
    desc: '简单介绍一下 WebSocket，ws 协议和 http 协议的关系是什么，WebSocket 如何校验权限？ WebSocket 如何实现 SSL 协议的安全连接？',
    answer:
      'WebSocket 是基于 http 的，所以建立 WebSocket 连接前，\n浏览器会通过 http 的方式请求服务器建立连接，\n这个时候可以通过 http  的权限校验方式来校验 WebSocket，比如设置 Cookie。\n同理，WebSocket 实现 SSL 协议也同 https 类似，会升级为 wss 连接。\n另外，当然也可以在 WebSocket 中还可以通过加密或者 token 等方式，实现自己额外的加密传输和权限判断方式。\n更多可参考 https://security.tencent.com/index.php/blog/msg/119\n',
    types: ['前端领域'],
    tags: ['基础概念', 'websocket'],
  },
  {
    name: '请谈谈iframe有哪些缺点？',
    desc: 'iframe通常有哪些用途，主要缺点是什么',
    answer:
      '（1）iframe会阻塞主页面的Onload事件；\n（2）搜索引擎的检索程序无法解读这种页面，不利于SEO;\n（3）iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。\n（4）页面简的通信问题\n使用iframe之前需要考虑这（1）（3）两个缺点。\n如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。',
    types: ['前端领域', '工程构建'],
    tags: [],
  },
  {
    name: '请简述JAVAScript事件模型和事件代理',
    desc: '简述一下JavaScript事件模型和事件代理，事件代理有哪些优点？',
    answer:
      '## 事件模型\n事件三个阶段：事件捕获，目标，事件冒泡（低版本ie不支持捕获阶段）\n## 事件代理及优点： \n把事件委托到其父对象上，借助事件冒泡机制，实现对节点的事件代理。  \n### 优点  \n*  可以大量节省内存占用，减少事件注册\n*  当新增子对象时无需再次对其绑定事件，对于动态内容部分尤为合适',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件', '事件模型'],
  },
  {
    name: '根据id从多叉树里面查找出对应的节点的name',
    desc: '<p><br></p><pre><code>一个树形的数据(如下数据)，面试官给你一个id，然后拿到对应的name?\n  var cityData = [\n      {\n        id: 1,\n        name: &#39;广东省&#39;,\n        children: [\n          {\n            id: 11,\n            name: &#39;深圳&#39;,\n            children: [\n              {\n                id: 111,\n                name: &#39;宝安&#39;,\n                children: [\n                  {\n                    id: 1111,\n                    name: &#39;西乡&#39;,\n                    children:[\n                      {\n                        id: 11111,\n                        name: &#39;坪洲&#39;,\n                        children:[]\n                      },\n                      {\n                        id: 11112,\n                        name: &#39;灵芝&#39;,\n                        children:[]\n                      }\n                    ]\n                  },\n                  {\n                    id: 1112,\n                    name: &#39;南山&#39;,\n                    children:[\n                      {\n                        id: 11121,\n                        name: &#39;科技园&#39;,\n                        children:[]\n                      }\n                    ]\n                  }\n                ]\n              },\n              {\n                id: 112,\n                name: &#39;福田&#39;,\n                children: []\n              }\n            ]\n          },\n          {\n            id: 12,\n            name: &#39;广州&#39;,\n            children: [\n              {\n                id: 122,\n                name: &#39;白云区&#39;,\n                children: [\n                  {\n                    id: 1222,\n                    name: &#39;白云区&#39;,\n                    children: []\n                  }\n                ]\n              },\n              {\n                id: 122,\n                name: &#39;珠海区&#39;,\n                children: []\n              }\n            ]\n          }\n        ]\n      },\n      {\n        id: 2,\n        name: &#39;湖南省&#39;,\n        children: []\n      }\n    ];\n</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>主要考查深度/广度优先遍历,递归算法\n方法1:递归\n\nlet result = &#39;&#39;\n\n// 递归实现\nconst recursion = (cityData, id) =&gt; {\n  // cityData数据为空的时候直接返回\n  if (!cityData || !cityData.length) return;\n  // 常规循环cityData\n  for (let i = 0, len = cityData.length; i &lt; len; i++) {\n    const childs = cityData[i].children;\n    \n    // 如果匹配到id的话，就是我们要的结果\n    if (cityData[i].id === id) {\n      result = cityData[i].name\n    }\n    // 如果还有子节点，执行递归\n    if(childs &amp;&amp; childs.length &gt; 0){\n      recursion(childs, id);\n    }\n  }\n  return result\n};\n\nconst r = recursion(cityData, 11112);\nconsole.log(r) // 灵芝\n\n\n方法2:广度优先遍历\nlet result = &#39;&#39;\n\nconst range = (cityData, id) =&gt; {\n  if (!cityData || !cityData.length) return;\n  // 定义一个数据栈\n  let stack = [];\n\n  let item = null;\n\n  //先将第一层节点放入栈\n  for (var i = 0, len = cityData.length; i &lt; len; i++) {\n    stack.push(cityData[i]);\n  }\n\n  while (stack.length) {\n    // 将数据栈的第一个取出来\n    item = stack.shift();\n    // 如果符合就赋值给result\n    if (item.id === id) {\n      result = item.name\n    }\n    //如果该节点有子节点，继续添加进入栈底\n    if (item.children &amp;&amp; item.children.length) {\n      stack = stack.concat(item.children);\n    }\n  }\n  return result\n};\n\nlet r1 = range(cityData, 11112);\n\nconsole.log(r1) // 灵芝\n\n\n方法3:深度优先遍历\nlet result = &#39;&#39;\n\nconst deep = (cityData, id) =&gt; {\n  // 没有数据直接返回\n  if (!cityData || !cityData.length) return;\n  // 先定义一个数据栈\n  let stack = []\n  let item = null\n\n  //先将第一层节点放入数据栈\n  for (var i = 0, len = cityData.length; i &lt; len; i++) {\n    stack.push(cityData[i])\n  }\n  // 循环\n  while (stack.length) {\n    item = stack.shift()\n    if (item.id === id) {\n      result = item.name\n    }\n    //如果该节点有子节点，继续添加进入栈顶\n    if (item.children &amp;&amp; item.children.length) {\n      // 注意这里调换了顺序\n      stack = item.children.concat(stack);\n    }\n  }\n  return result\n};\n\nlet r3 = deep(cityData, 11112)\nconsole.log(r3) // 灵芝\n\n\n方法4:正则\n\nconst regular = (cityData, id) =&gt; {\n  // 没有数据直接返回\n  if (!cityData || !cityData.length) return;\n  // 数据转成字符串\n  let cityStr = JSON.stringify(cityData)\n  // 定义正则\n  let reg = new RegExp(`&#34;id&#34;:${id},&#34;name&#34;:&#34;([^\\\\x00-\\\\xff]+)&#34;,`)\n  // 取到正则的子字符串并返回\n  return (cityStr.match(reg))[1]\n}\n\nlet r4 = regular(cityData, 11112);\n\nconsole.log(r4) // 灵芝\n\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '基础算法'],
  },
  {
    name: 'js浮点运算',
    desc: 'console.info(0.7+0.1)会得到什么',
    answer: '输出0.799999\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'js'],
  },
  {
    name: 'macro micro 任务队列（async/await版）',
    desc: '<p>async function async1() {</p><p> console.log(&#39;async1 start&#39;);</p><p> await async2();</p><p> console.log(&#39;async1 end&#39;);</p><p>}</p><p>async function async2() {</p><p> console.log(&#39;async2 start&#39;);</p><p> return new Promise((resolve, reject) =&gt; {</p><p>  resolve();</p><p>  console.log(&#39;async2 promise&#39;);</p><p> })</p><p>}</p><p>console.log(&#39;script start&#39;);</p><p>setTimeout(function() {</p><p> console.log(&#39;setTimeout&#39;);</p><p>}, 0);  </p><p>async1();</p><p>new Promise(function(resolve) {</p><p> console.log(&#39;promise1&#39;);</p><p> resolve();</p><p>}).then(function() {</p><p> console.log(&#39;promise2&#39;);</p><p>}).then(function() {</p><p> console.log(&#39;promise3&#39;);</p><p>});</p><p>console.log(&#39;script end&#39;);</p>',
    answer:
      '<p>chrome 和 node 都是以下顺序</p><img src="http://tosv.byted.org/obj/ttfe/nodebb/1563171801424-5d2c1bd9fcb820021a6b13dc.png" width="375" alt=""><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', 'async'],
  },
  {
    name: 'JS实现一个带并发限制的异步调度器',
    desc: '<div style="white-space: pre;">JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">class Scheduler {\n</div><div style="white-space: pre;">  add(promiseCreator) { ... }\n</div><div style="white-space: pre;">  // ...\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">const timeout = (time) =&gt; new Promise(resolve =&gt; {\n</div><div style="white-space: pre;">  setTimeout(resolve, time)\n</div><div style="white-space: pre;">})\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">const scheduler = new Scheduler()\n</div><div style="white-space: pre;">const addTask = (time, order) =&gt; {\n</div><div style="white-space: pre;">  scheduler.add(() =&gt; timeout(time))\n</div><div style="white-space: pre;">    .then(() =&gt; console.log(order))\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">addTask(1000, &#39;1&#39;)\n</div><div style="white-space: pre;">addTask(500, &#39;2&#39;)\n</div><div style="white-space: pre;">addTask(300, &#39;3&#39;)\n</div><div style="white-space: pre;">addTask(400, &#39;4&#39;)\n</div><div style="white-space: pre;">// output: 2 3 1 4// 一开始，1、2两个任务进入队列// 500ms时，2完成，输出2，任务3进队// 800ms时，3完成，输出3，任务4进队// 1000ms时，1完成，输出1// 1200ms时，4完成，输出4\n</div>',
    answer:
      '<div style="white-space: pre;">class Scheduler {\n</div><div style="white-space: pre;">  concurrency = 2\n</div><div style="white-space: pre;">  running = 0\n</div><div style="white-space: pre;">  queue = []\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">  add(task) {\n</div><div style="white-space: pre;">    return new Promise(resolve =&gt; {\n</div><div style="white-space: pre;">      this.queue.push({\n</div><div style="white-space: pre;">        taskGenerator: task,\n</div><div style="white-space: pre;">        resolve\n</div><div style="white-space: pre;">      })\n</div><div style="white-space: pre;">      this.schedule()\n</div><div style="white-space: pre;">    })\n</div><div style="white-space: pre;">  }\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">  schedule() {\n</div><div style="white-space: pre;">    while (this.queue.length &gt; 0 &amp;&amp; this.running &lt; this.concurrency) {\n</div><div style="white-space: pre;">      const curTask = this.queue.shift()\n</div><div style="white-space: pre;">      this.running += 1\n</div><div style="white-space: pre;">      curTask.taskGenerator().then(result =&gt; {\n</div><div style="white-space: pre;">        this.running -= 1\n</div><div style="white-space: pre;">        curTask.resolve(result)\n</div><div style="white-space: pre;">        this.schedule()\n</div><div style="white-space: pre;">      })\n</div><div style="white-space: pre;">    }\n</div><div style="white-space: pre;">  }\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div>',
    types: ['前端领域', 'JavaScript'],
    tags: ['前端基础', 'promise', '异步', 'js', '调度器'],
  },
  {
    name: '写一个加法函数(sum)，使他可以同时支持sum(x,y)和sum(x)(y)两种调用方式。',
    desc: '<div style="white-space: pre;"><span style="font-weight: bold;">写一个按照下面两种方式都能正常调用的 sum 方法</span>\n</div><div style="white-space: pre;">```javascript\n</div><div style="white-space: pre;">console.log(sum(2,3)); // 输出5\n</div><div style="white-space: pre;">console.log(sum(2)(3)); // 输出5\n</div><div style="white-space: pre;">```\n</div>',
    answer:
      '<div style="white-space: pre;">答案一\n</div><div style="white-space: pre;">function sum(a,b){\n</div><div style="white-space: pre;">if(b) {\n</div><div style="white-space: pre;">return a+b\n</div><div style="white-space: pre;">}else{\n</div><div style="white-space: pre;">return function(c){\n</div><div style="white-space: pre;">return a+c\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">答案二\n</div><div style="white-space: pre;">function sum(){\n</div><div style="white-space: pre;">var arg=arguments\n</div><div style="white-space: pre;">if(arg.length==2) {\n</div><div style="white-space: pre;">return arg[0]+arg[1];\n</div><div style="white-space: pre;">}else{\n</div><div style="white-space: pre;">return function(c){\n</div><div style="white-space: pre;">return arg[0]+c\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div>',
    types: ['前端领域'],
    tags: ['柯里化', '编码', '函数式', '闭包'],
  },
  {
    name: 'ES5，ES6中this指向考察',
    desc: '1. 以下代码输出什么结果，`this.name`中this指向什么：\n```\nwindow.name = &#39;ByteDance&#39;;\nfunction A () {\n   this.name = 123;\n}\nA.prototype.getA = function(){\n\tconsole.log(this);\n\treturn this.name + 1;\n}\nlet a = new A();\nlet funcA = a.getA;\nfuncA();\n```\n2. 如何使`funcA()`返回`undefined`?\n3. 下面ES6中又会发生什么，this是什么？\n```\nwindow.name = &#39;ByteDance&#39;;\nclass A {\n\tconstructor() {\n  \tthis.name = 123;\n\t}\n\tgetA() { \n\t  console.log(this);\n\t\treturn this.name + 1; \n\t}\n}\nlet a = new A();\nlet funcA = a.getA;\nfuncA();\n```',
    answer:
      '1. 输出`Bytedance1`, this指向widnow;\n2. 正确使用applay / call；\n3. 发生异常：Uncaught TypeError: Cannot read property &#39;name&#39; of undefined，this为undefined；',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'this', 'es6'],
  },
  {
    name: '请问什么是跨域？跨域请求资源有几哪种方式？',
    desc: '何为跨域？跨域请求资源有几哪种方式？',
    answer:
      '由于浏览器同源策略，凡是发送请求url的协议、域名、端口三者之间任意一与当前页面地址不同即为跨域。\n跨域请求资源的方式主要有：  \n（1）JSONP 动态创建script标签  \n但缺点是只支持get请求，并且很难判断请求是否失败（一般通过判断请求是否超时）。  \n（2）Proxy代理  \n这种方式首先将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。  \n（3）CORS跨域  \n是现代浏览器提供的一种跨域请求资源的方法，需要客户端和服务器端的同时支持。整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信  \n服务响应头返回，Access-Control-Allow-Origin: *',
    types: ['前端领域', '浏览器'],
    tags: ['跨域访问'],
  },
  {
    name: '简述React Fiber原理',
    desc: '<p>试描述React Fiber的原理。</p>',
    answer:
      '<p>\t官方的一句话解释是“React Fiber是对核心算法的一次重新实现”。</p><p>\t之前React的更新过程是同步的，所有更新逻辑会在一帧之内完成，如果组件过于复杂则会导致更新时间超过一帧，其他事务包括用户输入都会被延迟响应，从而引发卡顿。如下图：</p><p><br></p><img src="https://pic1.zhimg.com/80/v2-d8f4598c70df94d69825f11dfbf2ca2c_1440w.png" width="375" alt=""><p>\t破解方式——分片。</p><p>\t有了分片之后，更新过程的调用栈如下图所示，中间每一个波谷代表深入某个分片的执行过程，每个波峰就是一个分片执行结束交还控制权的时机。</p><img src="https://pic1.zhimg.com/80/v2-78011f3365ab4e0b6184e1e9201136d0_1440w.png" width="375" alt=""><p>\t实现使用的API：requestIdleCallback</p><pre><code>Q.为什么引入Fiber架构？原架构有何不足？\nA.原架构采用递归遍历方式来更新DOM树，一旦开始，即占用主线程，无法中断，这在页面上会引起问题，如input输入后页面卡顿等\n\nQ.Fiber如何解决该问题\nA.时间分片和暂停\n\nQ.Fiber如何实现？\nA.使用链表结构，将递归遍历更改为循环遍历，然后配合requestIdleCallback API，实现任务拆分、中断和恢复\n\nQ.Fiber如何实现比较？\nA.双缓冲技术，在diff过程中创建新的DOM Tree，diff完成之后生成EffectList，即需要更新的地方，之后进入commit阶段，该阶段不允许中断。\n\nQ.React Hook基于Fiber架构，hook的复用是如何实现的？\nA.hook的数据存在于Fiber节点的数据结构中，具体为memoizedState中，该字段中存储了所有hook相关的信息，https://www.jianshu.com/p/d6244228a427 （重要）</code></pre><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['Fiber', '性能优化', 'React'],
  },
  {
    name: '请简要描述ES6 module require、exports以及module.exports的区别',
    desc: '考察候选人对es6，commonjs等js模块化标准的区别和理解',
    answer:
      '* CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被”循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。\n* ES6 模块是动态引用，如果使用 import 从一个模块加载变量，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。\n* CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports ）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。\n* export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。\n* ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性\n* 混合使用介绍：https://github.com/ShowJoy-com/showjoy-blog/issues/39',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'es6'],
  },
  {
    name: '浏览器缓存机制考察',
    desc: '浏览器缓存机制考察，包括cache-control , etag, expire, last-modify-time\n以及 200 from cache、304',
    answer: '1、cache-control 和 expire 在浏览器端控制  Cache-Control的max-age&gt;expire\n2、etag 和 last-modify-time主 要服务器端对比使用',
    types: ['前端领域', '浏览器'],
    tags: [],
  },
  {
    name: '版本号排序',
    desc: 'versions是一个项目的版本号列表，因多人维护，不规则\n``` javascript\nvar versions=[&#39;1.45.0&#39;,&#39;1.5&#39;,&#39;6&#39;,&#39;3.3.3.3.3.3.3&#39;]\n```\n要求从小到大排序，注意&#39;1.45&#39;比&#39;1.5&#39;大\n``` javascript\nvar sorted=[&#39;1.5&#39;,&#39;1.45.0&#39;,&#39;3.3.3.3.3.3&#39;,&#39;6&#39;]\n```',
    answer:
      '```javascript\nfunction sortVersion(arr) {\n    return arr.sort((a, b) =&gt; {\n        const arrA = a.split(&#39;.&#39;)\n        const arrB = b.split(&#39;.&#39;)\n        for (let i = 0; i &lt; arrA.length; i++) {\n            if (arrA[i] === undefined) {\n                return -1\n            } else if (arrB[i] === undefined) {\n                return 1\n            } else if (parseInt(arrA[i]) === parseInt(arrB[i])) {\n                continue\n            } else {\n                return parseInt(arrA[i]) &gt; parseInt(arrB[i])\n            }\n        }\n    })\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['排序'],
  },
  {
    name: 'JS限流调度器',
    desc: '<p>实现JS限流调度器，方法add接收一个返回Promise的函数，同时执行的任务数量不能超过两个。</p><pre><code>class Scheduler {\n    async add(promiseFunc: () =&gt; Promise&lt;void&gt;): Promise&lt;void&gt; {\n    }\n}\n\nconst scheduler = new Scheduler()\nconst timeout = (time) =&gt; {\n    return new Promise(r =&gt; setTimeout(r, time))\n}\nconst addTask = (time, order) =&gt; {\n    scheduler.add(() =&gt; timeout(time))\n        .then(() =&gt; console.log(order))\n}\n\naddTask(1000, 1)\naddTask(500, 2)\naddTask(300, 3)\naddTask(400, 4)\n// log: 2 3 1 4\n</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>class Scheduler {\n    constructor() {\n        this.concurrency = 0\n        this.queue = []\n    }\n    async add(promiseFunc) {\n        if (this.concurrency &gt;= 2) {\n            return new Promise(r =&gt; {\n                this.queue.push(() =&gt; promiseFunc().then(r))\n            })\n        }\n        this.concurrency += 1\n        await promiseFunc()\n        this.concurrency -= 1\n        let next = this.queue.shift()\n        if (next) {\n            this.add(next)\n        }\n    }\n}\n\nconst scheduler = new Scheduler()\nconst timeout = (time) =&gt; {\n    return new Promise(r =&gt; setTimeout(r, time))\n}\nconst addTask = (time, order) =&gt; {\n    scheduler.add(() =&gt; timeout(time))\n        .then(() =&gt; console.log(order))\n}\n\naddTask(1000, 1)\naddTask(500, 2)\naddTask(300, 3)\naddTask(400, 4)\n</code></pre><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['前端编码', 'js', '调度器'],
  },
  {
    name: '实现一个简单的Event类（观察者模式）',
    desc: '<p>请实现一个观察者模式，拥有四个方法on,off,once和trigger</p><p><br></p><p>const Event = {</p><p>    on() {}   // 绑定</p><p>    off() {}  // 解绑</p><p>    once() {}   // 绑定一次</p><p>    trigger() {}  // 触发事件</p><p>};</p>',
    answer:
      '<p>```javascript function Event() { if (!(this instanceof Event)) { return new Event(); } this._callbacks = {}; } Event.prototype.on = function (type, handler) { this_callbacks = this._callbacks || {}; this._callbacks[type] = this.callbacks[type] || []; this._callbacks[type].push(handler); return this; }; Event.prototype.off = function (type, handler) { var list = this._callbacks[type]; if (list) { for (var i = list.length; i &gt;= 0; --i) { if (list[i] === handler) { list.splice(i, 1); } } } return this; }; Event.prototype.trigger = function (type, data) { var list = this._callbacks[type]; if (list) { for (var i = 0, len = list.length; i &lt; len; ++i) { list[i].call(this, data); } } }; Event.prototype.once = function (type, handler) { var self = this; function wrapper() { handler.apply(self, arguments); self.off(type, wrapper); } this.on(type, wrapper); return this; }; ```</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['编码', 'event'],
  },
  {
    name: '请说明存储在 Cookie 和 localStorage 内有什么区别',
    desc: '请说明 cookie、sessionStorage、localStorage 之间的区别、以及在你项目中的应用？',
    answer:
      ' a) cookie，HTTP Cookie（也叫Web cookie或者浏览器Cookie）是服务器发送到用户浏览器并保存在浏览器上的一块数据，它会在浏览器下一次发起请求时被携带并发送到服务器上。比较经典的，可以它用来确定两次请求是否来自于同一个浏览器，从而能够确认和保持用户的登录状态。Cookie的使用使得基于无状态的HTTP协议上记录稳定的状态信息成为了可能。\nb) sessionStorage，为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。\nc) localStorage，localStorage 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。\n\n区别：\nlocalStorage、sessionStorage 是 Web Storage Api 的组成 API，其为了解决 Cookie 的一些缺陷，服务端 Set 的 cookie 每次会携带在本域下所有的请求上，对性能有损耗。SessionStorage 存储有个期限，当关闭浏览器后就不再存在，但 localStorage 依然存在，需要明确删除。\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础概念', '前端基础'],
  },
  {
    name: '请简述js浏览器事件循环机制',
    desc: '<p><br></p>',
    answer:
      '<p>浏览器 Event Loop 是 HTML 中定义的规范，Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。</p><ul><li>JS 调用栈</li></ul><p>JS 调用栈是一种后进先出的数据结构。当函数被调用时，会被添加到栈中的顶部，执行完成之后就从栈顶部移出该函数，直到栈内被清空。</p><ul><li>同步任务、异步任务</li></ul><p>JavaScript 单线程中的任务分为同步任务和异步任务。同步任务会在调用栈中按照顺序排队等待主线程执行，异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。任务队列是先进先出的数据结构。</p><ul><li>Event Loop</li></ul><p>调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作，就形成了事件循环。</p><ul><li>定时器</li></ul><p>定时器会开启一条定时器触发线程来触发计时，定时器会在等待了指定的时间后将事件放入到任务队列中等待读取到主线程执行。定时器指定的延时毫秒数其实并不准确，因为定时器只是在到了指定的时间时将事件放入到任务队列中，必须要等到同步的任务和现有的任务队列中的事件全部执行完成之后，才会去读取定时器的事件到主线程执行，中间可能会存在耗时比较久的任务，那么就不可能保证在指定的时间执行。</p><ul><li>宏任务(macro-task)、微任务(micro-task)</li></ul><p>除了广义的同步任务和异步任务，JavaScript 单线程中的任务可以细分为宏任务和微任务。macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。micro-task包括：process.nextTick, Promises, Object.observe, MutationObserver。事件循环中，JavaScript 引擎会把整个 script 代码当成一个宏任务执行，执行完成之后，再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务-微任务。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件', 'js'],
  },
  {
    name: '何为https?https和http2有什么关系？',
    desc: '简要描述HTTPS的安全机制，以及在web服务工程实践中需要注意的问题；描述http2的基本机制',
    answer:
      'HTTPS是指建立在安全的传输层（通常是tls/ssl）上的HTTP协议，通过对服务器的证书的认证，解决中间人攻击等问题。\n证书(certificate)由客户端信任的的证书机构(CA)颁发，通过common name或SAN对服务进行描述；客户端通过CA的根证书对证书进行校验，并将请求域名和证书的common name/DNS域名进行验证，以检验证书的有效性。\n目前，很多web api如Notification/web rpc/Service Worker等，都要求必须使用https。\n在工程实践中，https存在以下需要注意的问题：\n  - js/css等资源必须以https形式加载，否则浏览器将拒绝执行，所以CDN必须完成对https的支持\n\t- 非https请求的图片等资源不会携带referer\n\t\n\thttp2是http协议的一个新版本，既可以明文传输也可以在https中使用。浏览器和服务器通过tls的ALPN/SNI等机制可以进行协议协商，决定使用什么协议',
    types: ['前端领域'],
    tags: ['基础概念', 'HTTPS'],
  },
  {
    name: '用数组的reduce方法实现map方法',
    desc: '用数组的reduce方法实现map方法',
    answer:
      '```\n// 代码实现\nArray.prototype.map2 = function(f) {\n  return this.reduce(function(result, x, index, arr) {\n    result.push(f(x, index));\n    return result;\n  }, []);\n}\n\n// 测试代码\nvar res = [1, 3, 5, 7].map2(function(item, idx){\n  return item * 2;\n});\nconsole.log(res);\n```',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: 'js异步操作与计算题',
    desc: '```\nfor (var i = 0; i &lt; 6; i++) {\n    setTimeout(function() {\n        console.log(new Date, i);\n    }, 1000);\n}\n```\n&gt;1. console.log(new Date, i);得到的结果是什么?\n&gt;1. 怎样优化，可以变成： 0 -&gt; 1 -&gt; 2 -&gt; 3-&gt; 4 -&gt;5\n&gt;1. 如果继续优化，实现console.log(new Date, i);代码执行时，立即输出 0，之后每隔 1 秒依次输出 1,2,3,4（sleep），之后再暂停5秒，然后输出5,\n实现结果类似：\n&gt;1. 2017-08-31T04:38:23:  0    &lt;— start IIFE\n&gt;1. 2017-08-31T04:38:24:  1    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:25:  2    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:26:  3    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:27:  4    &lt;— sleep 5s\n&gt;1. 2017-08-31T04:38:32:  5',
    answer:
      '1. 属于结果是暂停1S，然后输出6个6，setTimeout属于异步执行\n1. 实现0-&gt; 1 -&gt; 2 -&gt; 3-&gt; 4 -&gt;5，用闭包或者var改成let\n1. 模拟编程中的sleep实现，参考答案：\n```\n// 模拟其他语言中的 sleep，实际上可以是任何异步操作\nconst sleep = (timeoutMS) =&gt; new Promise((resolve) =&gt; {\n  setTimeout(resolve, timeoutMS)\n});\n(async () =&gt; {  // 声明即执行的 async 函数表达式\n  for (let i = 0; i &lt; 6; i++) {\n      if (i &lt; 5) {\n        console.log(new Date(), i)\n        await sleep(1000)\n      } else {\n        await sleep(4000)\n        console.log(new Date(), i)\n      }\n    }\n})()\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'async', 'js'],
  },
  {
    name: '简单的实现Promise.all',
    desc: '<p><br></p><pre><code>\nfunction fn1() {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(1)\n        }, 1000);\n    })\n}\nfunction fn2() {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(2)\n        }, 2000);\n    })\n}\nPromiseAll([fn1(), fn2()]).then(res =&gt; {\n    console.log(res)\n}).catch(err =&gt; {\n    console.log(err)\n})\n\nPromise.all([fn1(), fn2()]).then(res =&gt; {\n    console.log(res)\n}).catch(err=&gt;{\n    console.log(err)\n})</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>function PromiseAll(list) {\n\n    return new Promise((resolve, reject) =&gt; {\n\n        let count = 0;\n\n        let len = list.length;\n\n        let result = [];\n\n        list.forEach((item,index) =&gt; {\n\n            item.then(res =&gt; {\n\n                count++;\n\n                result[index] = res;\n\n                if (count === len) {\n\n                    resolve(result);\n\n                }\n\n            }).catch(err =&gt; {\n\n                reject(err)\n\n            })\n\n        })\n\n    })\n\n}\n\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '基础'],
  },
  {
    name: 'ES6 import的原理',
    desc: '请描述ES6 import的原理以及与commonjs的require的区别',
    answer:
      'CommonJS模块的是一个值的拷贝，而ES6模块输出的是值的引用。\nES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。\nCommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。\nES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', '模块化', 'es6'],
  },
  {
    name: '不借助变量交换两个数',
    desc: 'var a = 1, b = 2;\nfunction swap(a,b){\n  ....\n}\nswap(a,b)\nconsole.log(a, b)  // 2,1',
    answer:
      '方法一、\n```\nfunction swap(a,b){\n  b=b-a;\n  a=a+b;\n  b=a-b;\n  return [a,b]\n}\n```\n方法二、\n```\nfunction swap(a,b){\n  return [a, b] = [b, a]\n}\n```\n方法三、\n```\nfunction swap(a,b){\n  var a=a^b;\n  var b=b^a;\n  var a=a^b;\n\treturn [a,b]\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '实现垂直居中',
    desc: '```html\n\n    <div id="block">        \n    </div>\n\n```\nid为block的元素不定高不定宽，请实现它在浏览器窗口的居中显示。',
    answer: '```css\n#block {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n```',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '请回答当我们在使用new操作符时，它在对象操作的过程中具体做了什么',
    desc: '考察候选人对原型链操作和js对象的理解',
    answer:
      '1. 简单回答：\n1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。\n1. 属性和方法被加入到 this 引用的对象中。\n3. 新创建的对象由 this 所引用，并且最后隐式的返回 this 。\n```javascript\nfunction Animal(name) {\n      this.name = name;\n}\n  Animal.prototype.run = function() {\n      console.log(this.name + &#39;can run...&#39;);\n}\nvar cat = new Animal(&#39;cat&#39;); //    \nnew Animal(&#39;cat&#39;)=function(){\nlet obj={}; //       \nobj.__proto__=Animal.prototype; // obj-&gt;Animal.prototype-&gt;Object.prototype-&gt;null\nreturn Animal.call(obj,&#39;cat&#39;);//   this        \n}\n```\n\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['prototype'],
  },
  {
    name: 'css3实现多行文字截断处理',
    desc: '用css分别实现单行截断和多行截断字符串，最后以...为结尾',
    answer:
      '单行：\n```\n.text-overflow ( @class ){\n    .@{class} {\n        overflow: hidden;\n        text-overflow:ellipsis;\n        white-space: nowrap;\n    }\n}\n```\n多行：\n```\n.multi-text-overflow ( @class, @line ){\n    .@{class} {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        display: -webkit-box;\n        display: box;\n        -webkit-line-clamp: @line;\n        -webkit-box-orient: vertical;\n    }\n}\n```',
    types: ['前端领域', 'CSS'],
    tags: ['css3'],
  },
  {
    name: '请介绍react diff算法和策略',
    desc: 'react的diff算法和策略了解多少，为什么react的diff性能好，遵循什么样的策略可以把 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题',
    answer:
      'React分别对 tree diff、component diff 以及 element diff做了算法优化，\n做了一些假设\n1.Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计\n2.拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构\n3.对于同一层级的一组子节点，它们可以通过唯一 id 进行区分\ntree diff：React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较\ncomponent diff：\na.如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。\nb.如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。\nc.对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff\nelement diff：\n允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，减少增加和删除\n详见：https://zhuanlan.zhihu.com/p/20346379',
    types: ['前端领域', 'JavaScript'],
    tags: ['React'],
  },
  {
    name: '函数科里化',
    desc: '<p>实现如下函数add,使如下执行都等于9</p><pre><code>add(2,3,4)=9\nadd(2)(3,4)=9\nadd(2)(3)(4)=9\nadd(2,3)(4)=9</code></pre><p><br/></p>',
    answer:
      '<p><br/></p><pre><code>function curry(fn) {\n  return function res(...args) {\n    if (args.length &gt;= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...args2) {\n        return res.apply(this, args.concat(args2));\n      }\n    }\n  }\n}</code></pre><p><br/></p>',
    types: ['前端领域'],
    tags: ['编码', '函数式'],
  },
  {
    name: '如果数据库中采用64位长整型存储一个数据的id，前端通过api拿到这个id的话，会有什么问题？应该怎么解决？',
    desc: '如果数据库中采用64位长整型存储一个数据的id，前端通过api拿到这个id的话，会有什么问题？怎么解决？',
    answer:
      '考察一下JS中整数的安全范围的概念，在头条经常会遇到长整型到前端被截断的问题，需要补一个字符串形式的id供前端使用。\n主要会涉及到JS中的最大安全整数问题\nhttps://segmentfault.com/a/1190000002608050',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础'],
  },
  {
    name: 'JavaScript this 考察',
    desc: '<p>下面代码输出的结果是什么？</p><p>var length = 10;</p><p>function fn() {</p><p> return this.length+1;</p><p>}</p><p>var obj = {</p><p> length: 5,</p><p> test1: function() {</p><p>  return fn();</p><p> }</p><p>};</p><p>obj.test2=fn;</p><p>//下面代码输出是什么</p><p>console.log(obj.test1())</p><p>console.log(fn()===obj.test2())</p>',
    answer: '<p>11, false(11===6)</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['this'],
  },
  {
    name: 'requestAnimationFrame 和 setTimeout 的区别',
    desc: 'requestAnimationFrame 和 setTimeout 都可以用来实现动画，它们的区别是什么',
    answer:
      '1. 执行频率不同，前者按照屏幕刷新频率执行，后者自行控制，可能有无用开销（执行频率小于刷新频率，即1帧执行多次）\n2. 前者在页面不可见时，会停止执行（省电），后者在页面不可见时仍会执行，带来不必要开销\n',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '编码-js高阶函数考察',
    desc: '<h3>实现一个repeat方法，要求如下：</h3><p><br/></p><p>// 需要实现的函数</p><p>function repeat (func, times, wait) {</p><p> // 补全</p><p>}</p><p><br/></p><p>// 使下面调用代码能正常工作</p><p>const repeatFunc = repeat(console.log, 4, 3000);</p><p>repeatFunc(&#34;hello world&#34;);    //会输出4次 hello world, 每次间隔3秒</p><p><br/></p>',
    answer:
      '<p>考点1：能意识到repeat返回的是一个函数，知道参数怎么传递。</p><p>考点2：setTimeout的时间，微任务</p><p><br/></p><p>参考答案</p><p>function repeat(fn, times, wait) {</p><p>  if(typeof times !== &#39;number&#39;) return;</p><p>  if(typeof wait !== &#39;number&#39;) return;</p><p>  return function(str){</p><p>    for(let i = 0; i &lt; times; i++){</p><p>      setTimeout(()=&gt;{</p><p>        fn(str)</p><p>      }, i * wait)</p><p>    }</p><p>  }</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['函数式', 'js'],
  },
  {
    name: 'Vue框架中组件消息通信方式',
    desc: '考察候选人对Vue框架的消息通信方式了解程度：\n\n1. vue父子组件通信方式？\n2. 非父子组件通信方式？\n3. 前两问OK，追问：当一个父组件与子组件中间隔着很多层组件怎么办？',
    answer:
      '1. 父子组件通信方式\n在Vue中，父子组件的关系可以总结为props down, events up。父组件通过props向下传递数据给子组件，子组件通过events给父组件发送消息。\n\n2. 非父子组件通信\n两个独立的组件之间通信，可以借助一个空的Vue实例作为中央事件总线，空实例相当于代理人的形式进行消息监听或触发\n\n3. 父子之间层级过多时\n当父子组件之间层级不多的时候，父组件可以一层层的向子组件传递数据或者子组件一层层向父组件发送消息，代码上没有太难维护的地方。可是，一旦父子组件之间层级变多后，传递一个数据或者发送一个消息就变得麻烦。\n这块如果了解开源的Element组件库，就会知道其实现方式：构造一个函数自动向上/向下查询父亲节点，以`[组件名, 消息名, 参数]`三元组进行消息传递，降低长链传播成本;\n具体实现参考：https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js',
    types: ['前端领域', 'JavaScript'],
    tags: ['vue'],
  },
  {
    name: '什么是 XSS，怎么造成的，有什么防御方法？',
    desc: '考察面试者对于 XSS 是否了解，是否足够重视。',
    answer:
      'XSS 就是在 web 中能够通过某种方式产生执行任意 JavaScript 脚本的情况，\n最常见的一种情况就是将用户的输入，直接放到当前 runtime 中，比如用户输入直接放到页面的 html 里面，\n立刻显示出来。\nXSS 实际上是非常危险的，因为理论上讲，如果能够执行 JavaScript，实际上攻击者可以做任何事情。\n简单的就是输出点什么，偷偷 cookie，或者结合 CSRF 攻击，或者让浏览器跳转一下，\n复杂点的甚至可以改掉当前整个页面，伪造一切用户看到东西，危害无穷。\n如果这种输入存储到数据库中，就会变成一个永久型的 XSS，危害就更大了。\n防止 XSS 最简单的就是使用各种框架，如 React、Vuejs 等，对用户输入进行 html 转义。\n另外，服务端要设置 httpOnly 的 header，防止 JavaScript 操作 cookie。\n当然，服务端也可以对输入进行转义或者过滤监测。',
    types: ['前端领域', 'JavaScript'],
    tags: ['xss', '防御方法'],
  },
  {
    name: 'webpack插件编写',
    desc: '1. 有用过webpack么？说说该工具的优缺点？\n2. 有开发过webpack插件么？\n3. 假如要在构建过程中去除掉html中的一些字符，如何编写这个插件？',
    answer:
      'webpack优缺点：\n* 概念牛，但文档差，使用起来费劲\n* 模块化，让我们可以把复杂的程序细化为小的文件\n* require机制强大，一切文件介资源\n* 代码分隔\n* 丰富的插件，解决less、sass编译\n\n开发插件的两个关键点Compiler和Compilation：\n* compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并在所有可操作的设置中被配置，包括原始配置，loader 和插件。当在 webpack 环境中应用一个插件时，插件将收到一个编译器对象的引用。可以使用它来访问 webpack 的主环境。\n* compilation 对象代表了一次单一的版本构建和生成资源。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。\n\n插件编写可参考：https://doc.webpack-china.org/development/how-to-write-a-plugin',
    types: ['前端领域', '工程构建'],
    tags: ['框架'],
  },
  {
    name: '如何实现微信扫码登录？',
    desc: '综合题，考察网络、前端、认证等多方面知识',
    answer:
      '参考答案：\nhttps://zhuanlan.zhihu.com/p/22032787\n具体步骤：\n1. 用户 A 访问微信网页版，微信服务器为这个会话生成一个全局唯一的 ID，上面的 URL 中 obsbQ-Dzag== 就是这个 ID，此时系统并不知道访问者是谁。\n2. 用户A打开自己的手机微信并扫描这个二维码，并提示用户是否确认登录。\n3. 手机上的微信是登录状态，用户点击确认登录后，手机上的微信客户端将微信账号和这个扫描得到的 ID 一起提交到服务器\n4. 服务器将这个 ID 和用户 A 的微信号绑定在一起，并通知网页版微信，这个 ID 对应的微信号为用户 A，网页版微信加载用户 A 的微信信息，至此，扫码登录全部流程完成',
    types: ['前端领域', '工程构建'],
    tags: ['产品逻辑', '扫码登录'],
  },
  {
    name: '设计类似 Vue.js 双向绑定功能的核心逻辑“监听对象属性变化”功能',
    desc: '实现一个类，可以监听对象属性的值变化。加分项：考虑对象存在值为数组或对象的属性。\n\n\t\tclass Observe {\n\t\t\tconstructor(data: Object) {\n\t\t\t}\n\t\t\t// 监听属性变更\n\t\t\t$on() {\n\t\t\t}\n\t\t\t// 触发属性变更事件\n\t\t\t$emit() {\n\t\t\t}\n\t\t}\n\t\tconst data = new Observer({\n\t\t\ta: 1\n\t\t});\n\t\tcoonsole.log(data.a) // console: 1\n\t\tdata.$on(&#39;a&#39;, (newValue, oldValue) =&gt; {\n\t\t\t// this === data\n\t\t\tconsole.log(newValue, oldValue);\n\t\t});\n\t\tdata.a = 2 // console: 2 1\n\n\t\n',
    answer: '待补充',
    types: ['前端领域', 'JavaScript'],
    tags: ['defineProperty', 'vue', 'js', '逻辑'],
  },
  {
    name: '请简要描述<script>标签defer或async属性的作用，以及二者的区别',
    desc: '',
    answer:
      '### 作用：\ndefer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。\n### 区别：\ndefer与async的区别是：前者要等到整个页面正常渲染结束，才会执行；后者一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。',
    types: ['前端领域', 'HTML'],
    tags: ['async'],
  },
  {
    name: '原型链、this指针、自有属性考察',
    desc: '```javascript\nvar a= function () { this.b =3; }\nvar c = new a();\na.protorype.b = 9;\nvar b = 7;\na();\n```\n问：\n```javascript\nconsole.log(b);\nconsole.log(c.b); \n```\n分别输出什么？',
    answer: '- 第一个 `b = 3`\n- 第二个 `c.b = 3`',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'Cookie 和 Session 有什么区别',
    desc: '<div style="white-space: pre;">如题\n</div>',
    answer:
      '<div style="white-space: pre;">cookie 在浏览器中存在，并且每个请求都会带上，而且是可以设置失效时间的，失效前就会有效。 session 是一次会话有效，也就是说，浏览器关闭 session 就会失效。 其实这道题目考察的一个重点是在于，session 这种机制是怎么在浏览器中实现的呢？ 实际上 session 的实现也是在浏览器中放了一个 cookie，失效时间是一次会话失效。\n</div>',
    types: ['前端领域'],
    tags: ['基础概念'],
  },
  {
    name: 'JS异步队列macrotask和microtask',
    desc: '```\nconsole.log(&#39;begin&#39;)\nsetTimeout(() =&gt; {\n\tconsole.log(&#39;setTimeout 1&#39;)\n\tPromise.resolve().then(() =&gt; {\n\t\tconsole.log(&#39;promise 1&#39;)\n\t\tsetTimeout(() =&gt; {\n\t\t\tconsole.log(&#39;setTimeout2 between promise1&amp;2&#39;)\n\t\t})\n\t}).then(() =&gt; {\n\t\tconsole.log(&#39;promise 2&#39;)\n\t})\n}, 0)\nconsole.log(&#39;end&#39;)\n```',
    answer: '```\nbegin\nend\nsetTimeout 1\npromise 1\npromise 2\nsetTimeout2 between promise1&amp;2\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['promise', '异步', 'js'],
  },
  {
    name: '如何理解虚拟DOM?',
    desc: '如何理解虚拟DOM?',
    answer: '对虚拟dom和diff算法中的一些细节理解与考察，[https://github.com/livoras/blog/issues/13](https://github.com/livoras/blog/issues/13)',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '如何判断一个 JS 对象为空对象',
    desc: '如何判断一个 JS 对象为空对象 ？空对象形如`{}`',
    answer:
      '1. 使用 `for in`\n\t```javascript\n\tfunction isEmptyObject(obj){\n  \tfor(var key in obj){\n    \treturn false\n\t\t};\n\t\treturn true\n\t};\n\t```\n2. 通过 JSON.stringify 方法来判断\n\t```javascript\n\tif(JSON.stringify({}) === &#39;{}&#39;){\n\t\tconsole.log(&#39;empty obj&#39;);\n\t}\n\t```\n3. 使用 ES6 增加的 Object.keys()\n\t```javascript\n\tif(Object.keys(obj).length === 0){\n\t\tconsole.log(&#39;empty obj&#39;);\n\t}\n\t```',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'js'],
  },
  {
    name: '什么是闭包？实现每隔1秒输出数组中的一个数字',
    desc: '解释下js中的闭包概念，解释OK，给出编程题目考察基本功',
    answer:
      '```js\nfunction fun(arr) {\n    var i, len;\n    for (i = 0, len = arr.length; i &lt; len; i++) {\n      (function(i){\n        setTimeout(function() {\n          console.log(i);\n        }, i * 1000);\n      })(i);\n    }\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'promise运行过程解答',
    desc: '如下代码的运行结果是什么？\n```javascript\n process.nextTick(() =&gt; {console.log(&#39;nextTick&#39;)})\nPromise.resolve().then(()=&gt; {console.log(&#39;promise1&#39;);}).then(()=&gt; {\n  console.log(&#39;promise2&#39;);\n});\nsetImmediate(() =&gt; {console.log(&#39;setImmediate&#39;)})\nconsole.log(&#39;end&#39;) \n\n```',
    answer:
      '1. end -&gt; nextTick -&gt; promise1 -&gt; promise2-&gt; setImmediate\n1. process.nextTick 和 promise.then 都属于 microtask，而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。\n1. 事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。',
    types: ['前端领域'],
    tags: ['编码', 'promise', '异步'],
  },
  {
    name: '请简述常见web安全及防护原理',
    desc: '常见web安全及防护原理，请举例说明。',
    answer:
      '1、SQL注入原理  \n\t\t就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令。\n总的来说有以下几点  \n1. 永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双&#34;-&#34;进行转换等。\n2. 永远不要使用动态拼装SQL，可以使用参数化的SQL或者直接使用存储过程进行数据查询存取。\n3. 永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。\n4. 不要把机密信息明文存放，请加密或者hash掉密码和敏感的信息。  \n2、XSS原理及防范  \nXss(cross-site scripting)攻击指的是攻击者往Web页面里插入恶意 html标签或者JavaScript代码。\n看似安全的链接，骗取用户点击后，窃取cookie中的用户私密信息；或者攻击者在论坛中加一个恶意表单，\n当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点。\nXSS防范方法  \n首先代码里对用户输入的地方和变量都需要仔细检查长度和对”&lt;”,”&gt;”,”;”,”’”等字符做过滤；其次任何内容写到页面之前都必须加以encode，避免不小心把html tag 弄出来。这一个层面做好，至少可以堵住超过一半的XSS 攻击。\n首先，避免直接在cookie 中泄露用户隐私，例如email、密码等等。\n其次，通过使cookie 和系统ip 绑定来降低cookie 泄露后的危险。这样攻击者得到的cookie 没有实际价值，不可能拿来重放。\n如果网站不需要再浏览器端对cookie 进行操作，可以在Set-Cookie 末尾加上HttpOnly 来防止javascript 代码直接获取cookie 。\n\n3、CSRF原理及防范  \nCSRF的防御\n服务端的CSRF方式方法很多样，但总的思想都是一致的，就是在客户端页面增加伪随机数。\n通过验证码的方法',
    types: ['前端领域', 'JavaScript'],
    tags: ['安全', 'web'],
  },
  {
    name: '数字格式化问题:1234567890 --> 1,234,567,890',
    desc: '数字格式化问题,将1234567890 --&gt; 1,234,567,890',
    answer:
      '非正则实现\n```javascript\nlet test = &#39;1234567890&#39;\nfunction formatCash(str) {\n  let arr = []\n  for (let i = 1; i &lt; str.length; i++) {\n    if (str.length % 3 &amp;&amp; i == 1)\n      arr.push(str.substr(0, str.length % 3))\n    if (i % 3 === 0)\n      arr.push(str.substr(i - 2, 3))\n  }\n  return arr.join(&#39;,&#39;)\n}\nconsole.log(formatCash(test)) // 1,234,567,890\n```\n正则实现\n```javascript\nlet test1 = &#39;1234567890&#39;\nlet format = test1.replace(/\\B(?=(\\d{3})+(?!\\d))/g, &#39;,&#39;)\nconsole.log(format) // 1,234,567,890\n```',
    types: ['前端领域'],
    tags: ['数字格式化', '编码', '正则表达式'],
  },
  {
    name: '模拟实现loadash中的_.get()函数，实现如下传入参数取值效果',
    desc: '```javascript\nfunction get() {\n  // 请补全函数参数和实现逻辑\n}\nconst obj = { selector: { to: { toutiao: &#39;FE coder&#39; } }, target: [1, 2, { name: &#39;byted&#39; }] };\n// 运行代码\nget(obj, &#39;selector.to.toutiao&#39;, &#39;target[0]&#39;, &#39;target[2].name&#39;)\n\n//  输出结果：\n// [&#39;FE coder&#39;, 1, &#39;byted&#39;]\n```',
    answer:
      '```javascript\nconst get = (from, ...selectors) =&gt;\n  [...selectors].map(s =&gt;\n    s\n      .replace(/\\[([^\\[\\]]*)\\]/g, &#39;.$1.&#39;)\n      .split(&#39;.&#39;)\n      .filter(t =&gt; t !== &#39;&#39;)\n      .reduce((prev, cur) =&gt; prev &amp;&amp; prev[cur], from)\n  );\n```\n1. Use Array.map() for each selector\n2. String.replace() to replace square brackets with dots\n3. String.split(&#39;.&#39;) to split each selector\n4. Array.filter() to remove empty values\n5. Array.reduce() to get the value indicated by it',
    types: ['前端领域', 'JavaScript'],
    tags: ['js对象'],
  },
  {
    name: '合并两个有序数组',
    desc: '合并两个有序数组',
    answer:
      '```\nfunction mergeSortedArray(a, b){\n  var merged = [], \n      aElm = a[0],\n      bElm = b[0],\n      i = 1,\n      j = 1;\n  if(a.length ==0)\n    return b;\n  if(b.length ==0)\n    return a;\n  while(aElm || bElm){\n   if((aElm &amp;&amp; !bElm) || aElm &lt; bElm){\n     merged.push(aElm);\n     aElm = a[i++];\n   }   \n   else {\n     merged.push(bElm);\n     bElm = b[j++];\n   }\n  }\n  return merged;\n}\n```\n验证\n```\nmergeSortedArray([2,5,6,9], [1,2,3,29]);\n结果 [1, 2, 2, 3, 5, 6, 9, 29]\n```',
    types: ['前端领域'],
    tags: ['编码', '编程', '有序数组'],
  },
  {
    name: '进行CSRF漏洞扫描的原理和防御方式是什么？',
    desc: '如题',
    answer:
      'CSRF 就是在用户不知情的情况下，发出了请求，让用户做了不该做的操作。\n举个例子，比如你的一个网站中有个 img 标签，src 指向的是微博关注某人的接口，\n那么当用户访问你的网站时，就会在微博上关注那个人，而且这个操作用户是不知情的。\n因为 img src 发出的跨域请求，也是会携带 cookie 的，所以如果用户在微博登录过，\n那么就会带有微博的登录授权。同理，如果是其他操作，可能也存在这种漏洞，比较危险的情况就是付款。\n一般会采用 CSRF token 的方式防御，就是关键请求得要换取一个一次有效的 token 才有权限。\n',
    types: ['前端领域'],
    tags: ['基础概念'],
  },
  {
    name: '判断一个字符串是否是回文字符串',
    desc: '判断一个字符串是否是回文字符串，回文字符串是对称字符串的形式，例如：did，eve, dad, level',
    answer:
      '```\nfunction isPalindrome(str){\n  var i, len = str.length;\n  for(i=0; i isPalindrome(&#39;madam&#39;)\n  = true\n&gt; isPalindrome(&#39;toyota&#39;)\n  = false\n```',
    types: ['前端领域'],
    tags: ['编码', '编程'],
  },
  {
    name: 'box-sizing 实践',
    desc: '<p><br></p><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;head&gt;\n    &lt;style&gt;\n      .box {\n        width: 10px;\n        height: 10px;\n        border: 1px solid red;\n        margin: 2px;\n        padding: 2px;\n        background: blue;\n      }\n\n      #borderBox {\n        box-sizing: border-box;\n      }\n\n      #contentBox {\n        box-sizing: content-box;\n      }\n    &lt;/style&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;div&gt;请问下面两个 div 元素，蓝色区域的宽高各是多少像素？&lt;/div&gt;\n    &lt;div id=&#34;borderBox&#34; class=&#34;box&#34;&gt;&lt;/div&gt;\n    &lt;div id=&#34;contentBox&#34; class=&#34;box&#34;&gt;&lt;/div&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</code></pre><p><br></p>',
    answer:
      '<p>borderBox：10px(width) - 1px(border) * 2 = 8px </p><p>contentBox 10px(width) + 2px(padding) *2 = 14px</p><p><br></p><p>答题要点：除了验证候选人是否真正了解 box-sizing 之外，也考察候选人是否了解 background 会影响元素的 padding 区域，而不影响 margin 区域这个特点</p>',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '链式调用+延迟计算',
    desc: '<p>写一个加法函数sum，支持sum(1)(2)(3,4)(5,6,7....)</p><p><br></p><p>console.log(sum(1,2,3)(4)) =&gt; 输出 10</p><p><br></p><p><br></p><p>考察链式调用，闭包，延迟计算，函数toStirng/valueOf</p><p><br></p><p><br></p><p><br></p>',
    answer:
      '<p><br></p><pre><code>function sum(...args) {\n  function next(...innerArgs) {\n    args.push(...innerArgs);\n    return next;\n  }\n  next.valueOf = next.toString = () =&gt; {\n    return args.reduce((r, c) =&gt; r + c, 0);\n  };\n\n  return next;\n}</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '前端编码'],
  },
  {
    name: '请描述micro task 与 macro task的区别及应用',
    desc: '<p><br></p><pre><code>async function async1() {\n  console.log(&#39;async1 start&#39;);\n  await async2();\n  console.log(&#39;async1 end&#39;);\n}\nasync function async2() {\n  console.log(&#39;async2&#39;);\n}\n\nconsole.log(&#39;script start&#39;);\nsetTimeout(function() {\n    console.log(&#39;setTimeout&#39;);\n}, 0);  \nasync1();\nnew Promise(function(resolve) {\n    console.log(&#39;promise1&#39;);\n    resolve();\n  }).then(function() {\n    console.log(&#39;promise2&#39;);\n});\nconsole.log(&#39;script end&#39;);</code></pre><p><br></p>',
    answer: '<p>script start</p><p>async1 start</p><p>async2</p><p>promise1</p><p>script end</p><p>async1 end</p><p>promise2</p><p>setTimeout</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['promise', 'task'],
  },
  {
    name: '数组flat函数设计',
    desc: '设计一个flat函数将如下数组arr=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]]输出为1,2,&#39;3&#39;,4,&#39;5&#39;,6,7,8,9。至少写出两种方法,要求不能改变数组中的原始数据类型',
    answer:
      '*  方法一：递归\n```javascript\nfunction flat(array) {\n    var result = [];\n    var each = function(arr) {\n      arr.forEach(item =&gt; {\n        if (item instanceof Array) {\n          each(item);\n        } else {\n          result.push(item);\n        }\n      });\n    };\n    each(array);\n    return result;\n  }\nvar arr=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]];flat(arr).forEach(item=&gt;{console.log(item)})\n\n```\n*  方法二：toString（格式转换），无法保证类型\n```javascript\nArray.prototype.toString = function() {\n  return this.join(&#39;,&#39;);\n};\nconsole.log([1,2,[3,4,[5,6,7]]]+&#39;&#39;);\n```\n*  方法三：Iterator\n```javascript\nArray.prototype[Symbol.iterator] = function() {\n  let arr = [].concat(this),\n    index = 0;\n  let getFirst=function(array){\n    let first=array[0];\n    if(first instanceof Array){\n      return getFirst(array[0])\n    }else if(first!==undefined){\n      return array.shift()\n    }else{\n      return &#39;&#39;\n    }\n  }\n  return {\n    next: function() {\n      let item=getFirst(arr);\n      if(item){\n        return {\n          value:item,\n          done:false\n        }\n      }else{\n        return {\n          done:true\n        }\n      }\n    }\n  }\n}\nvar t=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]];\nfor(let i of t){console.log(i)}\n```',
    types: ['前端领域'],
    tags: ['ES', '编码', '基础算法'],
  },
  {
    name: '存储在 Cookie 和 localStorage 内有什么区别',
    desc: '基础题考察 cookie 和 localStorage 的理解。',
    answer: '存储在 Cookie 中每个 request 都会带上，而放在 localStorage 中，仅有浏览器中会存储。',
    types: ['前端领域', '浏览器'],
    tags: [],
  },
  {
    name: '请说说HTML的Meta标签的用途，并列举一些常用的meta标签',
    desc: '',
    answer:
      '考察对网页结构和语义的理解 \n\n```\nThe HTML  element represents metadata that cannot be represented by other HTML meta-related elements, like , , ',
    types: ['前端领域', 'HTML'],
    tags: ['基础'],
  },
  {
    name: '说说前端优化？图片懒加载原理是什么？',
    desc: '* 考察前端的一些优化方式\n* 图片懒加载原理',
    answer:
      '1. 优化手段：雅虎的34条优化手段，比如：代码压缩、减少请求、cdn、缓存\n2. 图片懒加载原理：img标签设置占位属性(data-src)，存储真正的图片地址；原src设置占位图片地址；当图片(快)进入用户可视区域的时候进行地址替换；',
    types: ['前端领域', '渲染框架'],
    tags: ['优化'],
  },
  {
    name: '请谈谈你对ES6的箭头函数的理解',
    desc: '```\nvar func1 = x =&gt; x;\nvar func2 = x =&gt; {x}; \nvar func3 = x =&gt; ({x});\nconsole.log(func1(1));\nconsole.log(func2(1));\nconsole.log(func3(1));\n```\n请写出程序运行结果。',
    answer: '程序运行结果为：<br>\n第一个：1 <br>\n第二个：undefined <br>\n第三个：{x: 1}  <br>',
    types: ['前端领域', 'JavaScript'],
    tags: ['es6'],
  },
  {
    name: '无重复字符的最长子串',
    desc: '<p>给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。</p><h3>样例：</h3><p><br></p><ul><li>输入: &#34;abcabcbb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;abc&#34;，所以其长度为 3。</p><ul><li>输入: &#34;bbbbb&#34;</li></ul><p>输出: 1</p><p>解释: 因为无重复字符的最长子串是 &#34;b&#34;，所以其长度为 1。</p><ul><li>输入: &#34;pwwkew&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;wke&#34;，所以其长度为 3。</p><ul><li>输入: &#34;dvdf&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;vdf&#34;，所以其长度为 3。</p><ul><li>输入: &#34;asjrgapa&#34;</li></ul><p>输出: 6</p><p>解释: 因为无重复字符的最长子串是 &#34;sjrgap&#34;，所以其长度为 6。</p><ul><li>输入: &#34;aabaab!bb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;ab!&#34;，所以其长度为 3。</p><ul><li>输入: &#34;abcb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;abc&#34;，所以其长度为 3。</p><ul><li>输入: &#34;asljlj&#34;</li></ul><p>输出: 4</p><p>解释: 因为无重复字符的最长子串是 &#34;aslj&#34;，所以其长度为 4。</p><ul><li>输入: &#34;qwnfenpglqdq&#34;</li></ul><p>输出: 8</p><p>解释: 因为无重复字符的最长子串是 &#34;fenpglqd&#34;，所以其长度为 8。</p><h3><br></h3><p><br></p>',
    answer:
      '<p><br></p><pre><code>var lengthOfLongestSubstring = function(s: string) {\n    let list = s.split(&#34;&#34;);\n    let son = [];\n    let max = [];\n    for (let i = 0; i &lt; list.length; i++) {\n        let current = list[i];\n        let index = son.indexOf(current);\n        if (index === -1) {\n            son.push(current);\n        } else {\n            let sameIndex = i - son.length + index;\n            if (son.length &gt; max.length) {\n                max = [...son];\n            }\n            son = son.slice(sameIndex + 1, son.length);\n            son.push(current);\n        }\n    }\n    return max.length;\n};</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '字符串'],
  },
  {
    name: '列举一个近期做的最能体现设计能力的项目',
    desc: '请举出一个你近期做的项目，项目需要最能体现设计能力,  请从以下角度说明：\n1. 项目描述\n2. 技术选型\n3. 模块化\n4. 模块之间通信\n5. 工程化\n6. 前后端数据流 ',
    answer: '这是一个开放式的工程设计题目，没有固定答案，评分参考评分标准',
    types: ['前端领域'],
    tags: ['设计模式'],
  },
  {
    name: '实现一个 JSONP',
    desc: '函数签名如下:\n\n```javascript\nfunction jsonp(url, callback) {\n  // TODO\n}\n```',
    answer:
      '主要考察如何处理第二个参数 `callback` 的问题，\n加分项比如超时处理 onerror 的处理, xss 考虑等等\n\n```\nconst kCallBackMap = {};\nfunction uuid() {\n  return ...;\n}\n\nfunction jsonp(url, callback) {\n  const callbackId = uuid();\n  url += &#39;callback=&#39; + callbackId;\n\twindow[calbackId] = callback;\n\t\n\tconst script = document.createElement(&#39;script&#39;);\n\tscript.src = url;\n\tdocument.head.appendChild(script);\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['jsonp'],
  },
  {
    name: '请谈一谈JAVAscript的作用域和this',
    desc: '```\ninner = &#39;window&#39;;\n\nfunction say() {\n    console.log(inner);\n    console.log(this.inner);\n}\n\nvar obj1 = (function() {\n    var inner = &#39;1-1&#39;;\n    return {\n        inner: &#39;1-2&#39;,\n        say: function() {\n            console.log(inner);\n            console.log(this.inner);\n        }\n    }\n})();\n\nvar obj2 = (function() {\n    var inner = &#39;2-1&#39;;\n    return {\n        inner: &#39;2-2&#39;,\n        say: function() {\n            console.log(inner);\n            console.log(this.inner);\n        }\n    }\n})();\n\n\nsay();\nobj1.say();\nobj2.say();\nobj1.say = say;\nobj1.say();\nobj1.say = obj2.say;\nobj1.say();\n```',
    answer:
      '```\nwindow\nwindow\n\n1-1\n1-2\n\n2-1\n2-2\n\nwindow\n1-2\n\n2-1\n1-2\n\n主要考察javascript的作用域和this指向。作用域是静态的，声明时确定；this是动态的，运行时确定。\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', '语言关键字'],
  },
  {
    name: '请问CSS position有哪些定位方式',
    desc: 'CSS position有哪些定位方式，每种方式是如何定位的？',
    answer:
      '### position取值\nrelative, fixed，absolute和staic、sticky 5种\n### 定位方式\n*  staic-默认位置；元素会像通常那样流入页面。顶部，底部，左，右，z-index属性不适用。  \n*  relative-元素的位置相对于自身进行调整，而不改变布局（从而为未被定位的元素留下一个空白）。  \n*  absolute-该元素从页面的流中移除，并相对于其最近位置的祖先定位（非static）在指定位置，如果有的话，或者与初始包含块相对。绝对定位的框可以有边距，并且不会与其他边距折叠。这些元素不影响其他元素的位置。  \n*  fixed元素是定位在相对于窗口。  \n*  sticky，是相对定位和固定定位的混合。该元素被视为相对位置，直到它越过指定的阈值，此时它被视为固定位置。  \n',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '请介绍一下Oauth2.0 的认证过程',
    desc: '如题',
    answer:
      '可以参考 http://www.jianshu.com/p/0db71eb445c8 或者 \nhttp://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html 的答案，\n回答的一个重点是 code（授权码）仅一次有效，并且要有失效时间，而且很短，比如一分钟，\n因为浏览器收到会立刻跳转。\n还有就是服务端可以根据 code 结合相应的 sercet 去获取 token，要说清楚。',
    types: ['前端领域'],
    tags: ['安全', 'oauth'],
  },
  {
    name: 'express中间件的原理',
    desc: '<div style="white-space: pre;">express中间件的实现原理 并给出实现\n</div>',
    answer:
      '<div style="white-space: pre;">主要考察候选人对中间件的理解 参考代码 ``` export default function compose(...funcs) { if (funcs.length === 0) { return arg =&gt; arg } if (funcs.length === 1) { return funcs[0] } return funcs.reduce((a, b) =&gt; (...args) =&gt; a(b(...args))) } ``` koa中间件主要使用 generator和promise可参考https://github.com/tj/co\n</div>',
    types: ['前端领域'],
    tags: ['编码'],
  },
  {
    name: '实现es6字符串模板方法sprintf',
    desc: '<p><br></p><pre><code>const template = &#34;My name is ${name},I&#39;m from ${city}&#34;;\nconst result = sprintf(template, {\n\tname: &#39;Yiming Zhang&#39;,\n\tcity: &#39;FuJian&#39;,\n});\nconsole.log(result); // My name is Yiming Zhang,I&#39;m from FuJian</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>const sprintf = (str, data) =&gt; (\n    Object.keys(data).reduce((prev, cur) =&gt; {\n        let reg = new RegExp(&#39;\\\\$\\\\{&#39; + cur + &#39;\\\\}&#39;, &#39;g&#39;);\n        return prev.replace(reg, data[cur]);\n    }, str);\n);</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '正则表达式', '前端基础', 'es6'],
  },
  {
    name: '登录表单设计/扫码登录/第三方登录',
    desc: '1. 请实现一个登录表单\n2. 用GET方法行不行？csrf是什么？如何防御？\n3. cookie-sesssion的工作机制\n4. 你已经登录产品的App端，要在web实现扫码登录，该如何设计？\n5. 接入第三方登录（如微信），如何设计？',
    answer:
      '1. 正确书写html\n2. 正确回答GET和POST的区别，从语义、弊端、安全等方面。csrf的防御：token，samesite，referer校验（弊端）等\n3. 正确理解cookie-session的工作机制，sessionId的设计，存储\n4. 考察对司空见惯的扫码登录，是否有思考其实现。正确设计 Client/Server/App 三方流程，设计二维码存储的内容，client通知有轮训或websocket等解决方案\n5. 正确理解 Client/Server/App/Weixin Server 四方流程，理解oauth2协议',
    types: ['前端领域', 'HTML'],
    tags: ['扫码登录'],
  },
  {
    name: '作用域以及变量提升',
    desc: '### 请写出下题的结果：\n```\nvar a = 1; \nfunction b() { \n    a = 10; \n    return; \n    function a() {} \n} \nb(); \nconsole.log(a);   \n```',
    answer: '结果：1',
    types: ['前端领域'],
    tags: ['语言基础', '基础概念', '提升'],
  },
  {
    name: 'setTimeout 和 Promise',
    desc: '<p>请写出程序的输出内容</p><pre><code>setTimeout(function() {\n  console.log(1)\n}, 0);\nnew Promise(function(resolve) {\n  console.log(2);\n  for(var i=0 ; i &lt; 10000 ; i++) {\n    if (i == 9999) {\n      resolve();\n    }\n  }\n  console.log(3);\n}).then(function() {\n  console.log(4);\n});\nconsole.log(5);</code></pre><p><br></p>',
    answer: '<p>正确答案：2 3 5 4 1。重点关注：候选人是否把 2 写在第一位，以及 4 和 1 的顺序。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'requestIdleCallback和requestAnimationFrame有什么区别？',
    desc: '<p>\t<strong>requestIdleCallback和requestAnimationFrame有什么区别？</strong></p>',
    answer:
      '<p>\trequestAnimationFrame的回调会在每一帧确定执行，属于高优先级任务，而requestIdleCallback的回调则不一定，属于低优先级任务。</p><p>\t我们所看到的网页，都是浏览器一帧一帧绘制出来的，通常认为FPS为60的时候是比较流畅的，而FPS为个位数的时候就属于用户可以感知到的卡顿了。</p><p>\t一帧包含了用户的交互、js的执行、以及requestAnimationFrame的调用，布局计算以及页面的重绘等工作。</p><p>\t假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调。</p><p>\t由于requestIdleCallback利用的是帧的空闲时间，所以就有可能出现浏览器一直处于繁忙状态，导致回调一直无法执行，这其实也并不是我们期望的结果（如上报丢失），那么这种情况我们就需要在调用requestIdleCallback的时候传入第二个配置参数timeout了。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件循环'],
  },
  {
    name: '请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率>=n的元素列表',
    desc: '请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率&gt;=n的元素列表',
    answer:
      '`\nArray.prototype.findDuplicate = function (n) {\n    var results = [];\n    if (typeof n != &#39;number&#39; || isNaN(n)) {\n        return results;\n    }\n    \n    var itemFreqs = {};\n    this.forEach(function (item) {\n        if (!itemFreqs[item]) {\n            itemFreqs[item] = 0;\n        }\n        itemFreqs[item] ++;\n    });\n    \n    for (var item in itemFreqs) {\n        if (itemFreqs[item] &gt;= n) {\n            results.push(item);\n        }\n    }\n    \n    return results;\n}\n\n`',
    types: ['前端领域'],
    tags: ['编码', '前端编码'],
  },
  {
    name: '请回答DOM中对应创建、移除、追加、复制、查找节点的方法是什么？',
    desc: '考察候选人对原生dom操作的方法的理解和掌握熟练程度',
    answer:
      '1.  创建新节点\n\t*  createDocumentFragment() //创建一个DOM片段\n\t*  createElement() //创建一个具体的元素\n\t*  createTextNode() //创建一个文本节点\n\n1.  克隆节点\n*  cloneNode()\n\n1. 添加节点\n*  appendChild()\n*  insertBefore()\n\n1. 移除节点\n*  removeChild()\n\n1. 替换节点\n*  replaceChild()\n\n1. 查找节点\n*  querySelector()\n*  querySelectorAll()\n*  getElementById()\n*  getElementsByName()\n*  getElementsByTagName()\n\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['dom'],
  },
  {
    name: '请描述如何用原生JS实现数字的货币格式化',
    desc: '<p># 如何用原生JS实现数字的货币格式化，例如数字6123456789格式化后为6,123,456,789，不低于两种方法。</p>',
    answer:
      '<p>方法一： (6123456789).toLocaleString(&#39;en-US&#39;) // 6,123,456,789</p><p><br></p><p>方法二： (6123456789).toString().split(&#39;&#39;).reverse().join(&#39;&#39;).replace(/\\d{3}/g,function($1){return $1+&#39;,&#39;}).split(&#39;&#39;).reverse().join(&#39;&#39;) </p><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['数字格式化', 'js'],
  },
  {
    name: 'let,const,var的区别',
    desc: '请说明一下let,const,var的区别 并回答如下代码会不会报错\n```\nconst a = {};\na.test = 1;\n```',
    answer:
      '考察候选人对es6变量声明的理解\n1. let声明的变量拥有块级作用域\n2. let声明的全局变量不是全局对象的属性\n3. let不能重新声明变量\n4. const声明的变量与let声明的变量类似，它们的不同之处在于，const声明的变量只可以在声明时赋值，不可随意修改，否则会导致SyntaxError（语法错误）。\n\n上面代码只是针对a的引用 并不会报错',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '如何实现链式调用',
    desc: '请实现函数 a, b, c，使调用方式为 a().b().c() 时，结果为输出 a b c。\n如果上面问题回答出来了，并且是在 a 函数内部 return Object 实现，\n那么可以补充问下如何能够实现让三个函数任意链式顺序调用。\n如 a().c().b() 或 b().a().c() 。\n',
    answer:
      '这道题主要就是考察面试者对 JavaScript 的 Object 概念理解是否清晰，\n最好的答案是直接将 a b c 三个函数挂载到 runtime 中的某个全局变量中，比如可以是 window。\n然后在每个函数内 return window 就可以了。\n当然，也可以按照第一道题目的顺序，分别在相应函数内 return 下个函数，但是这样做无法调换顺序。',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: '实现千位分隔符',
    desc: '给一个数字，比如：1234567.90，转化成：1,234,567.90',
    answer:
      '```js\nfunction commafy(num) {\n  return num &amp;&amp; num\n      .toString()\n      .replace(/^\\d+/, (m) =&gt; m.replace(/(?=(?!^)(\\d{3})+$)/g, &#39;,&#39;));\n}\nconsole.log(commafy(1234567.90)); //1,234,567.90\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础算法'],
  },
  {
    name: '编写javascript深度克隆函数deepClone',
    desc: '编写javascript深度克隆函数deepClone',
    answer:
      '```javascript\nfunction deepClone(obj) {\n    var _toString = Object.prototype.toString;\n\n    // null, undefined, non-object, function\n    if (!obj || typeof obj !== &#39;object&#39;) {\n        return obj;\n    }\n\n    // DOM Node\n    if (obj.nodeType &amp;&amp; &#39;cloneNode&#39; in obj) {\n        return obj.cloneNode(true);\n    }\n\n    // Date\n    if (_toString.call(obj) === &#39;[object Date]&#39;) {\n        return new Date(obj.getTime());\n    }\n\n    // RegExp\n    if (_toString.call(obj) === &#39;[object RegExp]&#39;) {\n        var flags = [];\n        if (obj.global) { flags.push(&#39;g&#39;); }\n        if (obj.multiline) { flags.push(&#39;m&#39;); }\n        if (obj.ignoreCase) { flags.push(&#39;i&#39;); }\n\n        return new RegExp(obj.source, flags.join(&#39;&#39;));\n    }\n\n    var result = Array.isArray(obj) ? [] :\n        obj.constructor ? new obj.constructor() : {};\n\n    for (var key in obj ) {\n        result[key] = deepClone(obj[key]);\n    }\n\n    return result;\n}\n\nfunction A() {\n    this.a = a;\n}\n\nvar a = {\n    name: &#39;qiu&#39;,\n    birth: new Date(),\n    pattern: /qiu/gim,\n    container: document.body,\n    hobbys: [&#39;book&#39;, new Date(), /aaa/gim, 111]\n};\n\nvar c = new A();\nvar b = deepClone(c);\nconsole.log(c.a === b.a);\nconsole.log(c, b);\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '请谈谈你对JS单线程以及setTimeout的理解',
    desc: '```javascript\nsetTimeout(function() {\n\tsetTimeout(function() { console.log(1) }, 100)\n\tconsole.log(2)\n\tsetTimeout(function() { console.log(3) }, 0)\n}, 0)\nsetTimeout(function () {\n\tconsole.log(4)\n}, 100)\nconsole.log(5)\n```\n请说出上面代码的输出顺序以及原因？如果吧4改为101ms呢？',
    answer:
      '正确顺序为：5 2 3 4 1\n如果4改为101ms则执行顺序还是不变\n原因：\n1.  JS单线程\n2. setTimeout不在当前eventloop。且执行顺序依赖入队顺序。setTimeout 0是放入下一个loop的队尾\n3. 虽然4和1都是100ms延迟的标记，但是4先入队列。\n4. setTimeout的time是个标记，会在eventloop循环去检测，符合条件的执行，不符合条件的延后到下一个eventloop，这执行过程本身又有时间，因此尽管101&gt;100，但是在一个执行周期内，他们都会被触发，4先入队所以不变',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', 'js'],
  },
  {
    name: 'async & forEach 考察',
    desc: '以下代码的运行结果\n```javascript\nconst list = [1, 2, 3];\nconst square = num =&gt; {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(num * num);\n        }, 1000);\n    });\n}\nfunction test() {\n    list.forEach(async x =&gt; {\n        const res = await square(x);\n        console.log(res);\n    });\n}\ntest()\n```\n如果希望每隔1s输出一个结果，应该如何改造？',
    answer:
      '1s 后输出 1 4 9  \n改为 for 循环：\n```javascript\nasync function test() {\n    for (let x of list) {\n        const res = await square(x);\n        console.log(res)\n    }\n}\n```\n',
    types: ['前端领域'],
    tags: ['编码', '代码阅读'],
  },
  {
    name: 'css单位的百分比',
    desc: '给一个div设置它父级div的宽度是100px，然后再设置它的padding-top为20%。 <br>\n问现在的div有多高？如果父级元素定位是absolute呢？',
    answer:
      '现有div的高度等于自身高度+父级块的宽度*20%,如果父级元素定位是absolute，结果不变；<br>\n当margin/padding取形式为百分比的值时，无论是left/right，还是top/bottom，都是以父元素的width为参照物的！<br>\n',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: 'NodeJS实现简单的HTTP代理和隧道代理',
    desc: 'Web代理一般包括普通的HTTP代理和隧道代理，谈谈理解。\nNodeJS实现一个简单的HTTP代理，如在本地 8888 端口开启 HTTP 代理服务，修改浏览器的 HTTP 代理为 127.0.0.1:8888 后再访问 HTTP 网站，代理可以正常工作\n对隧道代理了解多少，能否实现？',
    answer:
      'http普通代理：HTTP 客户端向代理发送请求报文，代理服务器需要正确地处理请求和连接（例如正确处理 Connection: keep-alive），同时向服务器发送请求，并将收到的响应转发给客户端。\n```\n// http 普通代理\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction request(cReq, cRes) {\n  const u = url.parse(cReq.url);\n\n  const options = {\n    hostname: u.hostname,\n    port: u.port || 80,\n    path: u.path,\n    method: cReq.method,\n    headers: cReq.headers\n  };\n\n  const pReq = http.request(options, pRes =&gt; {\n    cRes.writeHead(pRes.statusCode, pRes.headers);\n    pRes.pipe(cRes);\n  }).on(&#39;error&#39;, function(e) {\n    cRes.end();\n  });\n\n  cReq.pipe(pReq);\n}\n\nhttp.createServer().on(&#39;request&#39;, request).listen(8888, &#39;0.0.0.0&#39;);\n```\n隧道代理：HTTP 客户端通过 CONNECT 方法请求隧道代理创建一条到达任意目的服务器和端口的 TCP 连接，并对客户端和服务器之间的后继数据进行盲转发\n```\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction connect(cReq, cSock) {\n  const u = url.parse(&#39;http://&#39; + cReq.url);\n\n  const pSock = net.connect(u.port, u.hostname, function() {\n    cSock.write(&#39;HTTP/1.1 200 Connection Established\\r\\n\\r\\n&#39;);\n    pSock.pipe(cSock);\n  }).on(&#39;error&#39;, function(e) {\n    cSock.end();\n  });\n\n  cSock.pipe(pSock);\n}\n\nhttp.createServer().on(&#39;connect&#39;, connect).listen(8888, &#39;0.0.0.0&#39;);\n```\n合二为一\n```\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction request(cReq, cRes) {\n  const u = url.parse(cReq.url);\n\n  const options = {\n    hostname: u.hostname,\n    port: u.port || 80,\n    path: u.path,\n    method: cReq.method,\n    headers: cReq.headers\n  };\n\n  const pReq = http.request(options, pRes =&gt; {\n    cRes.writeHead(pRes.statusCode, pRes.headers);\n    pRes.pipe(cRes);\n  }).on(&#39;error&#39;, function(e) {\n    cRes.end();\n  });\n\n  cReq.pipe(pReq);\n}\n\nfunction connect(cReq, cSock) {\n  var u = url.parse(&#39;http://&#39; + cReq.url);\n\n  var pSock = net.connect(u.port, u.hostname, function() {\n    cSock.write(&#39;HTTP/1.1 200 Connection Established\\r\\n\\r\\n&#39;);\n    pSock.pipe(cSock);\n  }).on(&#39;error&#39;, function(e) {\n    cSock.end();\n  });\n\n  cSock.pipe(pSock);\n}\n\nhttp.createServer()\n  .on(&#39;request&#39;, request)\n  .on(&#39;connect&#39;, connect)\n  .listen(8888, &#39;0.0.0.0&#39;);\n```\n需要注意的是，大部分浏览器配完隧道代理，默认只会让https走隧道代理，http如果需要走隧道代理，还需要写个Nodejs的验证\n```\nconst options = {\n  hostname: &#39;127.0.0.1&#39;,\n  port: 8888,\n  path: &#39;toutiao.com:80&#39;,\n  method: &#39;CONNECT&#39;\n};\n\nconst req = http.request(options);\n\nreq.on(&#39;connect&#39;, function(res, socket) {\n  socket.write(&#39;GET / HTTP/1.1\\r\\n&#39; +\n    &#39;Host: toutiao.com\\r\\n&#39; +\n    &#39;Connection: Close\\r\\n&#39; +\n    &#39;\\r\\n&#39;);\n\n  socket.on(&#39;data&#39;, function(chunk) {\n    console.log(chunk.toString());\n  });\n\n  socket.on(&#39;end&#39;, function() {\n    console.log(&#39;socket end.&#39;);\n  });\n});\n\nreq.end();\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['代理'],
  },
  {
    name: '假设一个网页嵌入一个iframe,如何更改iframe内dom样式？',
    desc: '假设一个网页嵌入一个iframe,如何更改这个iframe内dom样式',
    answer:
      '区分同源和不同源解决方案，同源可以通过document.getElementById(&#39;iframeId&#39;).contentWindow.document，\n不同源：分iframe的嵌入的页面是否自己可控，可控可以通过postMessage方式更改，iframe页面监听message事件；如果页面不可控，应该无解。\n可以追问iframe有同源策略限制，举个例子说明',
    types: ['前端领域', '可视化'],
    tags: ['语言基础'],
  },
  {
    name: '数组随机排序',
    desc: '```javascript\nvar arr=[1,2,3,4,5,6]\n```\n',
    answer:
      '方法一、\n```javascript\narr.map(item=&gt;{\n    return {\n        value:item,\n        key:Math.random()\n    }\n})\n.sort((a,b)=&gt;a.key-b.key)\n.map(item=&gt;item.value)\n```\n方法二、\n```\nvar arrayToRand = (arr) =&gt; {\n    for(let i=0; i',
    types: ['前端领域'],
    tags: ['排序', '编码'],
  },
  {
    name: 'js事件模型',
    desc: '浏览器的事件模型？在当前的事件模型中，哪些事件可以冒泡，哪些不会冒泡，为什么？不冒泡的元素，如何来实现事件代理？',
    answer:
      '考察浏览器事件模型，看看是不是了解事件模型背后的设计意图。\n\n浏览器开发团队遇到的问题：页面上哪一部分会拥有某个特定的事件？比如单击一个嵌套的同心div，那么到底哪一个div会拥有这个点击事件？实际上难以确定点击者的意图，团队给出的解决方式是所有div都将拥有这个事件，于是产生了事件流模型。如上一个问题所述，“事件”的概念在GUI编程中如此之重要，而这种流式模型能给予其很大的灵活性和控制\n对于能精确确定意图的（这种冒泡的话一般也会带来问题，比如mouseleave），或者不可能产生嵌套的媒体类元素，冒泡就不是必须的；对于不冒泡的元素，可以在捕获阶段代理，DOM2级规范addEventListener的第三个参数',
    types: ['前端领域', 'JavaScript'],
    tags: ['js', '事件模型'],
  },
  {
    name: '请列举说明几个在web中实现长连接的技术方案或手段',
    desc: '本地主要考察候选人对长连接技术的概念理解和区分，如果能回答答出大致的名词可以继续追问一些具体的激技术实现细节和存在的优缺点等等。\n',
    answer:
      '参考答案：\n1. https://stackoverflow.com/questions/11077857/what-are-long-polling-websockets-server-sent-events-sse-and-comet/12855533#12855533\n1. https://blog.csdn.net/liang0000zai/article/details/40537059\n\n* Long Polling\n* Server-Sent Events\n* Websockets\n* Comet',
    types: ['前端领域'],
    tags: ['长连接', '基础概念', 'web'],
  },
  {
    name: '函数作用域',
    desc: '用代码实现JavaScript中Function的bind方法的polyfill',
    answer:
      '```\nif (!Function.prototype.bind) {\n  Function.prototype.bind = function (oThis) {\n    if (typeof this !== &#34;function&#34;) {\n      // closest thing possible to the ECMAScript 5\n      // internal IsCallable function\n      throw new TypeError(&#34;Function.prototype.bind - what is trying to be bound is not callable&#34;);\n    }\n\n    var aArgs = Array.prototype.slice.call(arguments, 1), \n        fToBind = this, \n        fNOP = function () {},\n        fBound = function () {\n          return fToBind.apply(this instanceof fNOP\n                                 ? this\n                                 : oThis || this,\n                               aArgs.concat(Array.prototype.slice.call(arguments)));\n        };\n\n    fNOP.prototype = this.prototype;\n    fBound.prototype = new fNOP();\n\n    return fBound;\n  };\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['函数作用域'],
  },
  {
    name: 'CSS 属性 box-sizing的值有哪些？分别有什么含义？',
    desc: 'CSS 属性 box-sizing的值有哪些？分别有什么含义？',
    answer: '  - `content-box` 默认值，width内容宽度\n\t- `border-box` width 包含`padding`和`border`',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: 'JS的new操作符具体做了什么',
    desc: 'JS的new操作符具体做了什么，描述一下，最好可以体现在代码上',
    answer:
      '```\nfunction A() {\n  this.name = &#39;a&#39;;\n  this.getName = function() {\n    return this.name;\n  }\n}\nvar a = new A();\n\nvar aa = new Object();\naa.__proto__ = A.prototype;\nA.call(aa);\n// 还有最后一步，如果发现A返回的是一个Object类（非primitive类型），则直接返回A的返回值，否则把aa返回出去\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', '语言关键字', 'js'],
  },
  {
    name: 'JS编码二叉树的实现与遍历',
    desc: 'JS编码实现一个二叉树的构造函数，包括节点类Node，树类BST，插入节点函数insert，\n并且满足\n1.左子节点的值 &lt; 父节点的值 &lt;= 右子节点的值\n2.可以实现先序，中序，后续遍历',
    answer:
      '```\n// 二叉树\nfunction BST() {\n  this.root = null;\n}\n\nBST.prototype.insert = function(data) {\n  var n = new Node(data, null, null);\n  if (this.root === null) {\n    this.root = n;\n  } else {\n    var current = this.root;\n    for (;;) {\n      if (data &lt; current.data) {\n        if (current.left === null) {\n          current.left = n;\n          break;\n        } else {\n          current = current.left;\n        }\n      } else {\n        if (current.right === null) {\n          current.right = n;\n          break;\n        } else {\n          current = current.right;\n        }\n      }\n    }\n  }\n}\n\n// 先序遍历\nBST.prototype.preOrder = function(node) {\n  if (node !== null) {\n    console.log(node.show() + &#34; &#34;);\n    this.preOrder(node.left);\n    this.preOrder(node.right);\n  }\n}\n\n// 中序遍历\nBST.prototype.inOrder = function(node) {\n  if (node !== null) {\n    this.inOrder(node.left);\n    console.log(node.show() + &#34; &#34;);\n    this.inOrder(node.right);\n  }\n}\n\n// 后序遍历\nBST.prototype.postOrder = function(node) {\n  if (node !== null) {\n    this.postOrder(node.left);\n    this.postOrder(node.right);\n    console.log(node.show() + &#34; &#34;);\n  }\n}\n\n// 节点对象\nfunction Node(data, left, right) {\n  this.data = data;\n  this.left = left;\n  this.right = right;\n  this.show = function() {\n    return this.data;\n  }\n}\n\n// 测试代码\nvar bst = new BST();\nvar nums = [10, 3, 18, 2, 4, 13, 21, 9, 8, 9];\nfor (var i = 0; i &lt; nums.length; i++) {\n  bst.insert(nums[i]);\n}\nbst.preOrder(bst.root);\nbst.inOrder(bst.root);\nbst.postOrder(bst.root);\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['树', '基础算法', 'js'],
  },
  {
    name: '简述一下src与href的区别',
    desc: '描述一下html中的src与href的区别和使用场景是什么',
    answer:
      '基本答案：src用于指向外部资源的位置替换当前元素，href用于在当前文档和引用资源之间确立联系。\n1.  src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；\n在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。\n\n浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。\n这也是为什么将js脚本放在底部而不是头部。\n \n1.  href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加\n\n那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。\n这也是为什么建议使用link方式来加载css，而不是使用@import方式。',
    types: ['前端领域', 'HTML'],
    tags: [],
  },
  {
    name: 'js运行机制',
    desc: '下面一段代码的输出：\n```\n(function() {\n  console.log(&#39;this is the start&#39;);\n  setTimeout(function cb() {\n    console.log(&#39;this is a msg from call back&#39;);\n  });\n  console.log(&#39;this is just a message&#39;);\n  setTimeout(function cb1() {\n    console.log(&#39;this is a msg from call back1&#39;);\n  }, 0);\n  console.log(&#39;this is the end&#39;);\n})();\n```',
    answer:
      '因为前端编程基本属于「Event-driven programming」范式，这是GUI之类的交互式程序的基础，区别于传统的批处理式编程。一个页面上的交互行为，基本都是由用户发起的，然而用户的行为意图是难以预测的，所以需要异步的驱动机制来应对\n因此有进一步问题：\n平时都说JS是单线程执行的，那它是如何实现非阻塞式执行页面JS的？<br>\n考察对EventLoop概念的理解，核心是会在调用栈之外建立一个Event Table。可以将Event Table想象成一个电话注册本：调用栈会告诉event table注册一些特定的函数，并且在指定事件发生时会调用他们。当这些指定事件发生时，event table仅仅是简单地把要调用的函数移入Event Queue中去。event queue提供了一个简单等待区域，函数在此区域内等待被移入调用栈进行调用。\n『究竟什么情况下，event queue中的函数才会被移入调用栈中？』。实际上，JavaScript 遵从一个简单的法则：存在一个监控进程不断检查调用栈是否为空，当调用栈为空的时候，检查事件队列（event queue）中是否有待调用的函数。如果事件队列中存在待调用的函数，队列头部的函数被移入调用栈执行。如果事件队列为空，监控进程就保持轮询状态。\n这意味着js中的定时器的精度，实际上是没有保障的，你写一个setTimeout(function(){ do xxxx}, 1000)； 并没办法保证它刚好是在1000ms之后调用，因为之前的代码执行可能非常耗时，也可能事件队列中有其他事件排在前面。 这样就出现了题目中的情况。\n更多可参考：http://metaphor.space/2016/04/26/javascript-event-loop/；  https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop；还有《你不知道的Javascript中卷》141页~143页，事件循环章节\n\n值得一提的是：我们平常说JS是单线程执行的，但浏览器不是，浏览器是多线程的，有的线程负责网络请求，有的负责渲染页面等；不要搞混了\n\n另外，ES6给JS带来了新的特性，比如加入了可以创建多线程的worker，以及更精准控制事件调度的Promise',
    types: ['前端领域', 'JavaScript'],
    tags: ['js'],
  },
  {
    name: '请问for of和for in的区别',
    desc: 'for of和for in的区别？ for of可以用在普通对象上吗？',
    answer:
      '考察候选人对for 循环的理解 以及对es6中的for of和iterator理解\n\nfor in不多做解释了 for of主要是对实现了 Symbol.iterator 接口进行遍历\n\n自定义for of\n```\nvar iterable = {\n  [Symbol.iterator]() {\n    return {\n      i: 0,\n      next() {\n        if (this.i &lt; 3) {\n          return { value: this.i++, done: false };\n        }\n        return { value: undefined, done: true };\n      }\n    };\n  }\n};\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['编码'],
  },
  {
    name: '字符串的排列组合计算',
    desc: '输入一个字符串，打印出该字符串中字符的所有排列的情况。例如输入字符串abc，则打印出由字符a、b、c所能排列出来的所有字符串abc、acb、bac、bca、cab和cba.\n```javascript\nfunction calc(str){\n    var strArray = str.split(&#39;&#39;);\n    // 补全代码\n  }\n  console.log(calc(&#39;ab&#39;)) // [&#39;a&#39;,&#39;b&#39;]  [&#39;b&#39;,&#39;a&#39;]\n```',
    answer:
      '```javascript\nfunction calc(str){\n    var strArray = str.split(&#39;&#39;);\n    var path = [];\n    var docalc = function(array){\n      if(array.length===1){\n        path.push(array[0]);\n        console.log(path);\n        path.pop();\n        return;\n      }\n      for(var i=0;i',
    types: ['前端领域'],
    tags: ['递归', '排列组合', '编码'],
  },
  {
    name: 'DOM中哪些事件是不冒泡的，如何判断事件是不是可以冒泡？',
    desc: 'DOM中哪些事件是不冒泡的，如何判断事件是不是可以冒泡？',
    answer:
      '*  不冒泡的事件有blur、focus、load、unload、abort、error、mouseenter、mouseleave、resize\n*  每个 event 都有一个event.bubbles属性，通过该属性可知是否冒泡',
    types: ['前端领域'],
    tags: ['事件', '基础概念'],
  },
  {
    name: 'JavaScript实现对象深拷贝方法',
    desc: '编码实现JavaScript实现对象深拷贝',
    answer:
      'var clone = function(v) {  \n  var o = v.constructor === Array ? [] : {};  \n  for (var i in v) {  \n    o[i] = typeof v[i] === &#34;Object&#34; ? clone(v[i]) : v[i];  \n  }  \n  return o;  \n}  ',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: '故障分析-HTTPS证书不被信任',
    desc: '<p>如下图，在不同的设备上，同时访问同一个域名，一个设备显示证书不被信任，另一个设备正常，再使用多个其他设备访问，依然正常。分析可能的原因？以及需要获取的进一步的信息？</p><p>正常的设备</p><img src="https://tosv.byted.org/obj/pgc-fes/marvel/ssl_success.png" width="375" alt="ssl_success.png"><p>异常的设备</p><img src="https://tosv.byted.org/obj/pgc-fes/marvel/ssl_error.png" width="375" alt="ssl_error.png"><p><br></p>',
    answer:
      '<p>需要进行的进一步的操作：</p><p>1) 查看证书详情：路径/SN/哈希值</p><p>2) 查看DNS解析结果</p><p>3) 查看系统时间/版本/浏览器版本</p><p>可能的原因：</p><p>1) 代理工具/安全软硬件</p><p>2) DNS劫持/路由劫持</p><p>3) 时间偏差</p><p>4) 操作系统/浏览器版本差异</p>',
    types: ['前端领域', '浏览器'],
    tags: ['HTTPS', '分析'],
  },
  {
    name: '请实现一个CodingMan函数实现以下功能',
    desc: '<p><br></p><pre><code>实现一个CodingMan，可以按照以下方式调用:\nCodingMan(“Hank”)输出:\nHi! This is Hank!\n\nCodingMan(“Hank”).sleep(10).eat(“dinner”)\n输出\nHi! This is Hank!\n//等待10秒..\nWake up after 10\nEat dinner~\n\nCodingMan(“Hank”).eat(“dinner”).eat(“supper”)\n输出\nHi This is Hank!\nEat dinner~\nEat supper~\n\nCodingMan(“Hank”).sleepFirst(5).eat(“supper”)\n输出\n//等待5秒\nWake up after 5\nHi This is Hank!\nEat supper\n以此类推。</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>class _CodingMan {\n    constructor(name) {\n        this.tasks = [];\n        const task = () =&gt; {\n            console.log(`Hi! This is ${name}`);\n            this.next();\n        }\n        this.tasks.push(task);\n        setTimeout(() =&gt; {               // 把 this.next() 放到调用栈清空之后执行\n            this.next();\n        }, 0);\n    }\n\n    next() {\n        const task = this.tasks.shift(); // 取第一个任务执行\n        task &amp;&amp; task();\n    }\n\n    sleep(time) {\n        this._sleepWrapper(time, false);\n        return this;                     // 链式调用\n    }\n\n    sleepFirst(time) {\n        this._sleepWrapper(time, true);\n        return this;\n    }\n\n    _sleepWrapper(time, first) {\n        const task = () =&gt; {\n            setTimeout(() =&gt; {\n                console.log(`Wake up after ${time}`);\n                this.next();\n            }, time * 1000)\n        }\n        if (first) {\n            this.tasks.unshift(task);     // 放到任务队列顶部\n        } else {\n            this.tasks.push(task);        // 放到任务队列尾部\n        }\n    }\n\n    eat(name) {\n        const task = () =&gt; {\n            console.log(`Eat ${name}`);\n            this.next();\n        }\n        this.tasks.push(task);\n        return this;\n    }\n}\n\nfunction CodingMan(name) {\n    return new _CodingMan(name);\n}\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['事件轮询机制', '队列', '链式调用', '编码', '闭包'],
  },
  {
    name: '实现如下函数add,使如下执行都等于9 ',
    desc: '<p><br></p><pre><code>add(2,3,4)=9\nadd(2)(3,4)=9\nadd(2)(3)(4)=9\nadd(2,3)(4)=9</code></pre><p><br></p>',
    answer:
      '<p>// 较通用的实现</p><p>function currying(fn, length) {</p><p> length = length || fn.length; \t</p><p> return function (...args) {\t\t\t</p><p>  return args.length &gt;= length\t</p><p>  \t? fn.apply(this, args)\t\t\t</p><p>   : currying(fn.bind(this, ...args), length - args.length) </p><p> }</p><p>}</p><p>function add(...args) {</p><p>\treturn args.reduce((t, i) =&gt; t+=i)</p><p>}</p><p>var newAdd = currying(add, 3)</p><p><br></p><p>// 通用实现2</p><p>function currying(fn, length) {</p><p>\treturn function(...args) {</p><p>\t\tif (args.length &gt;= length) {</p><p>\t\t\treturn args.slice(0, length).reduce((t, i) =&gt; t += i);</p><p>\t\t}</p><p>\t\treturn function(..._args) {</p><p>\t\t\treturn add.apply(null, [...args, ..._args]);</p><p>\t\t}</p><p>\t}</p><p>}</p><p>function add(...args) {</p><p>\treturn args.reduce((t, i) =&gt; t+=i)</p><p>}</p><p>var newAdd = currying(add, 3)</p><p><br></p><p>// 直接的实现</p><p>function add(...args) {</p><p>\tif (args.length &gt;= 3) {</p><p>\t\treturn args.slice(0, 3).reduce((t,i) =&gt; t += i);</p><p>\t}</p><p>\treturn function(..._args) {</p><p>\t\treturn add(args.concat(_args));</p><p>\t}</p><p>}</p>',
    types: ['前端领域'],
    tags: ['编码', '柯里化'],
  },
  {
    name: '介绍一下你了解的 WebSocket',
    desc: '简单介绍一下 WebSocket，ws 协议和 http 协议的关系是什么，WebSocket 如何校验权限？ WebSocket 如何实现 SSL 协议的安全连接？',
    answer:
      'WebSocket 是基于 http 的，所以建立 WebSocket 连接前，\n浏览器会通过 http 的方式请求服务器建立连接，\n这个时候可以通过 http  的权限校验方式来校验 WebSocket，比如设置 Cookie。\n同理，WebSocket 实现 SSL 协议也同 https 类似，会升级为 wss 连接。\n另外，当然也可以在 WebSocket 中还可以通过加密或者 token 等方式，实现自己额外的加密传输和权限判断方式。\n更多可参考 https://security.tencent.com/index.php/blog/msg/119\n',
    types: ['前端领域'],
    tags: ['基础概念', 'websocket'],
  },
  {
    name: '请谈谈iframe有哪些缺点？',
    desc: 'iframe通常有哪些用途，主要缺点是什么',
    answer:
      '（1）iframe会阻塞主页面的Onload事件；\n（2）搜索引擎的检索程序无法解读这种页面，不利于SEO;\n（3）iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。\n（4）页面简的通信问题\n使用iframe之前需要考虑这（1）（3）两个缺点。\n如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。',
    types: ['前端领域', '工程构建'],
    tags: [],
  },
  {
    name: '请简述JAVAScript事件模型和事件代理',
    desc: '简述一下JavaScript事件模型和事件代理，事件代理有哪些优点？',
    answer:
      '## 事件模型\n事件三个阶段：事件捕获，目标，事件冒泡（低版本ie不支持捕获阶段）\n## 事件代理及优点： \n把事件委托到其父对象上，借助事件冒泡机制，实现对节点的事件代理。  \n### 优点  \n*  可以大量节省内存占用，减少事件注册\n*  当新增子对象时无需再次对其绑定事件，对于动态内容部分尤为合适',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件', '事件模型'],
  },
  {
    name: '根据id从多叉树里面查找出对应的节点的name',
    desc: '<p><br></p><pre><code>一个树形的数据(如下数据)，面试官给你一个id，然后拿到对应的name?\n  var cityData = [\n      {\n        id: 1,\n        name: &#39;广东省&#39;,\n        children: [\n          {\n            id: 11,\n            name: &#39;深圳&#39;,\n            children: [\n              {\n                id: 111,\n                name: &#39;宝安&#39;,\n                children: [\n                  {\n                    id: 1111,\n                    name: &#39;西乡&#39;,\n                    children:[\n                      {\n                        id: 11111,\n                        name: &#39;坪洲&#39;,\n                        children:[]\n                      },\n                      {\n                        id: 11112,\n                        name: &#39;灵芝&#39;,\n                        children:[]\n                      }\n                    ]\n                  },\n                  {\n                    id: 1112,\n                    name: &#39;南山&#39;,\n                    children:[\n                      {\n                        id: 11121,\n                        name: &#39;科技园&#39;,\n                        children:[]\n                      }\n                    ]\n                  }\n                ]\n              },\n              {\n                id: 112,\n                name: &#39;福田&#39;,\n                children: []\n              }\n            ]\n          },\n          {\n            id: 12,\n            name: &#39;广州&#39;,\n            children: [\n              {\n                id: 122,\n                name: &#39;白云区&#39;,\n                children: [\n                  {\n                    id: 1222,\n                    name: &#39;白云区&#39;,\n                    children: []\n                  }\n                ]\n              },\n              {\n                id: 122,\n                name: &#39;珠海区&#39;,\n                children: []\n              }\n            ]\n          }\n        ]\n      },\n      {\n        id: 2,\n        name: &#39;湖南省&#39;,\n        children: []\n      }\n    ];\n</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>主要考查深度/广度优先遍历,递归算法\n方法1:递归\n\nlet result = &#39;&#39;\n\n// 递归实现\nconst recursion = (cityData, id) =&gt; {\n  // cityData数据为空的时候直接返回\n  if (!cityData || !cityData.length) return;\n  // 常规循环cityData\n  for (let i = 0, len = cityData.length; i &lt; len; i++) {\n    const childs = cityData[i].children;\n    \n    // 如果匹配到id的话，就是我们要的结果\n    if (cityData[i].id === id) {\n      result = cityData[i].name\n    }\n    // 如果还有子节点，执行递归\n    if(childs &amp;&amp; childs.length &gt; 0){\n      recursion(childs, id);\n    }\n  }\n  return result\n};\n\nconst r = recursion(cityData, 11112);\nconsole.log(r) // 灵芝\n\n\n方法2:广度优先遍历\nlet result = &#39;&#39;\n\nconst range = (cityData, id) =&gt; {\n  if (!cityData || !cityData.length) return;\n  // 定义一个数据栈\n  let stack = [];\n\n  let item = null;\n\n  //先将第一层节点放入栈\n  for (var i = 0, len = cityData.length; i &lt; len; i++) {\n    stack.push(cityData[i]);\n  }\n\n  while (stack.length) {\n    // 将数据栈的第一个取出来\n    item = stack.shift();\n    // 如果符合就赋值给result\n    if (item.id === id) {\n      result = item.name\n    }\n    //如果该节点有子节点，继续添加进入栈底\n    if (item.children &amp;&amp; item.children.length) {\n      stack = stack.concat(item.children);\n    }\n  }\n  return result\n};\n\nlet r1 = range(cityData, 11112);\n\nconsole.log(r1) // 灵芝\n\n\n方法3:深度优先遍历\nlet result = &#39;&#39;\n\nconst deep = (cityData, id) =&gt; {\n  // 没有数据直接返回\n  if (!cityData || !cityData.length) return;\n  // 先定义一个数据栈\n  let stack = []\n  let item = null\n\n  //先将第一层节点放入数据栈\n  for (var i = 0, len = cityData.length; i &lt; len; i++) {\n    stack.push(cityData[i])\n  }\n  // 循环\n  while (stack.length) {\n    item = stack.shift()\n    if (item.id === id) {\n      result = item.name\n    }\n    //如果该节点有子节点，继续添加进入栈顶\n    if (item.children &amp;&amp; item.children.length) {\n      // 注意这里调换了顺序\n      stack = item.children.concat(stack);\n    }\n  }\n  return result\n};\n\nlet r3 = deep(cityData, 11112)\nconsole.log(r3) // 灵芝\n\n\n方法4:正则\n\nconst regular = (cityData, id) =&gt; {\n  // 没有数据直接返回\n  if (!cityData || !cityData.length) return;\n  // 数据转成字符串\n  let cityStr = JSON.stringify(cityData)\n  // 定义正则\n  let reg = new RegExp(`&#34;id&#34;:${id},&#34;name&#34;:&#34;([^\\\\x00-\\\\xff]+)&#34;,`)\n  // 取到正则的子字符串并返回\n  return (cityStr.match(reg))[1]\n}\n\nlet r4 = regular(cityData, 11112);\n\nconsole.log(r4) // 灵芝\n\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '基础算法'],
  },
  {
    name: 'js浮点运算',
    desc: 'console.info(0.7+0.1)会得到什么',
    answer: '输出0.799999\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'js'],
  },
  {
    name: 'macro micro 任务队列（async/await版）',
    desc: '<p>async function async1() {</p><p> console.log(&#39;async1 start&#39;);</p><p> await async2();</p><p> console.log(&#39;async1 end&#39;);</p><p>}</p><p>async function async2() {</p><p> console.log(&#39;async2 start&#39;);</p><p> return new Promise((resolve, reject) =&gt; {</p><p>  resolve();</p><p>  console.log(&#39;async2 promise&#39;);</p><p> })</p><p>}</p><p>console.log(&#39;script start&#39;);</p><p>setTimeout(function() {</p><p> console.log(&#39;setTimeout&#39;);</p><p>}, 0);  </p><p>async1();</p><p>new Promise(function(resolve) {</p><p> console.log(&#39;promise1&#39;);</p><p> resolve();</p><p>}).then(function() {</p><p> console.log(&#39;promise2&#39;);</p><p>}).then(function() {</p><p> console.log(&#39;promise3&#39;);</p><p>});</p><p>console.log(&#39;script end&#39;);</p>',
    answer:
      '<p>chrome 和 node 都是以下顺序</p><img src="http://tosv.byted.org/obj/ttfe/nodebb/1563171801424-5d2c1bd9fcb820021a6b13dc.png" width="375" alt=""><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', 'async'],
  },
  {
    name: 'JS实现一个带并发限制的异步调度器',
    desc: '<div style="white-space: pre;">JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">class Scheduler {\n</div><div style="white-space: pre;">  add(promiseCreator) { ... }\n</div><div style="white-space: pre;">  // ...\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">const timeout = (time) =&gt; new Promise(resolve =&gt; {\n</div><div style="white-space: pre;">  setTimeout(resolve, time)\n</div><div style="white-space: pre;">})\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">const scheduler = new Scheduler()\n</div><div style="white-space: pre;">const addTask = (time, order) =&gt; {\n</div><div style="white-space: pre;">  scheduler.add(() =&gt; timeout(time))\n</div><div style="white-space: pre;">    .then(() =&gt; console.log(order))\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">addTask(1000, &#39;1&#39;)\n</div><div style="white-space: pre;">addTask(500, &#39;2&#39;)\n</div><div style="white-space: pre;">addTask(300, &#39;3&#39;)\n</div><div style="white-space: pre;">addTask(400, &#39;4&#39;)\n</div><div style="white-space: pre;">// output: 2 3 1 4// 一开始，1、2两个任务进入队列// 500ms时，2完成，输出2，任务3进队// 800ms时，3完成，输出3，任务4进队// 1000ms时，1完成，输出1// 1200ms时，4完成，输出4\n</div>',
    answer:
      '<div style="white-space: pre;">class Scheduler {\n</div><div style="white-space: pre;">  concurrency = 2\n</div><div style="white-space: pre;">  running = 0\n</div><div style="white-space: pre;">  queue = []\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">  add(task) {\n</div><div style="white-space: pre;">    return new Promise(resolve =&gt; {\n</div><div style="white-space: pre;">      this.queue.push({\n</div><div style="white-space: pre;">        taskGenerator: task,\n</div><div style="white-space: pre;">        resolve\n</div><div style="white-space: pre;">      })\n</div><div style="white-space: pre;">      this.schedule()\n</div><div style="white-space: pre;">    })\n</div><div style="white-space: pre;">  }\n</div><div style="white-space: pre;">\n</div><div style="white-space: pre;">  schedule() {\n</div><div style="white-space: pre;">    while (this.queue.length &gt; 0 &amp;&amp; this.running &lt; this.concurrency) {\n</div><div style="white-space: pre;">      const curTask = this.queue.shift()\n</div><div style="white-space: pre;">      this.running += 1\n</div><div style="white-space: pre;">      curTask.taskGenerator().then(result =&gt; {\n</div><div style="white-space: pre;">        this.running -= 1\n</div><div style="white-space: pre;">        curTask.resolve(result)\n</div><div style="white-space: pre;">        this.schedule()\n</div><div style="white-space: pre;">      })\n</div><div style="white-space: pre;">    }\n</div><div style="white-space: pre;">  }\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">\n</div>',
    types: ['前端领域', 'JavaScript'],
    tags: ['前端基础', 'promise', '异步', 'js', '调度器'],
  },
  {
    name: '写一个加法函数(sum)，使他可以同时支持sum(x,y)和sum(x)(y)两种调用方式。',
    desc: '<div style="white-space: pre;"><span style="font-weight: bold;">写一个按照下面两种方式都能正常调用的 sum 方法</span>\n</div><div style="white-space: pre;">```javascript\n</div><div style="white-space: pre;">console.log(sum(2,3)); // 输出5\n</div><div style="white-space: pre;">console.log(sum(2)(3)); // 输出5\n</div><div style="white-space: pre;">```\n</div>',
    answer:
      '<div style="white-space: pre;">答案一\n</div><div style="white-space: pre;">function sum(a,b){\n</div><div style="white-space: pre;">if(b) {\n</div><div style="white-space: pre;">return a+b\n</div><div style="white-space: pre;">}else{\n</div><div style="white-space: pre;">return function(c){\n</div><div style="white-space: pre;">return a+c\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">答案二\n</div><div style="white-space: pre;">function sum(){\n</div><div style="white-space: pre;">var arg=arguments\n</div><div style="white-space: pre;">if(arg.length==2) {\n</div><div style="white-space: pre;">return arg[0]+arg[1];\n</div><div style="white-space: pre;">}else{\n</div><div style="white-space: pre;">return function(c){\n</div><div style="white-space: pre;">return arg[0]+c\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div><div style="white-space: pre;">}\n</div>',
    types: ['前端领域'],
    tags: ['柯里化', '编码', '函数式', '闭包'],
  },
  {
    name: 'ES5，ES6中this指向考察',
    desc: '1. 以下代码输出什么结果，`this.name`中this指向什么：\n```\nwindow.name = &#39;ByteDance&#39;;\nfunction A () {\n   this.name = 123;\n}\nA.prototype.getA = function(){\n\tconsole.log(this);\n\treturn this.name + 1;\n}\nlet a = new A();\nlet funcA = a.getA;\nfuncA();\n```\n2. 如何使`funcA()`返回`undefined`?\n3. 下面ES6中又会发生什么，this是什么？\n```\nwindow.name = &#39;ByteDance&#39;;\nclass A {\n\tconstructor() {\n  \tthis.name = 123;\n\t}\n\tgetA() { \n\t  console.log(this);\n\t\treturn this.name + 1; \n\t}\n}\nlet a = new A();\nlet funcA = a.getA;\nfuncA();\n```',
    answer:
      '1. 输出`Bytedance1`, this指向widnow;\n2. 正确使用applay / call；\n3. 发生异常：Uncaught TypeError: Cannot read property &#39;name&#39; of undefined，this为undefined；',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'this', 'es6'],
  },
  {
    name: '请问什么是跨域？跨域请求资源有几哪种方式？',
    desc: '何为跨域？跨域请求资源有几哪种方式？',
    answer:
      '由于浏览器同源策略，凡是发送请求url的协议、域名、端口三者之间任意一与当前页面地址不同即为跨域。\n跨域请求资源的方式主要有：  \n（1）JSONP 动态创建script标签  \n但缺点是只支持get请求，并且很难判断请求是否失败（一般通过判断请求是否超时）。  \n（2）Proxy代理  \n这种方式首先将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。  \n（3）CORS跨域  \n是现代浏览器提供的一种跨域请求资源的方法，需要客户端和服务器端的同时支持。整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信  \n服务响应头返回，Access-Control-Allow-Origin: *',
    types: ['前端领域', '浏览器'],
    tags: ['跨域访问'],
  },
  {
    name: '简述React Fiber原理',
    desc: '<p>试描述React Fiber的原理。</p>',
    answer:
      '<p>\t官方的一句话解释是“React Fiber是对核心算法的一次重新实现”。</p><p>\t之前React的更新过程是同步的，所有更新逻辑会在一帧之内完成，如果组件过于复杂则会导致更新时间超过一帧，其他事务包括用户输入都会被延迟响应，从而引发卡顿。如下图：</p><p><br></p><img src="https://pic1.zhimg.com/80/v2-d8f4598c70df94d69825f11dfbf2ca2c_1440w.png" width="375" alt=""><p>\t破解方式——分片。</p><p>\t有了分片之后，更新过程的调用栈如下图所示，中间每一个波谷代表深入某个分片的执行过程，每个波峰就是一个分片执行结束交还控制权的时机。</p><img src="https://pic1.zhimg.com/80/v2-78011f3365ab4e0b6184e1e9201136d0_1440w.png" width="375" alt=""><p>\t实现使用的API：requestIdleCallback</p><pre><code>Q.为什么引入Fiber架构？原架构有何不足？\nA.原架构采用递归遍历方式来更新DOM树，一旦开始，即占用主线程，无法中断，这在页面上会引起问题，如input输入后页面卡顿等\n\nQ.Fiber如何解决该问题\nA.时间分片和暂停\n\nQ.Fiber如何实现？\nA.使用链表结构，将递归遍历更改为循环遍历，然后配合requestIdleCallback API，实现任务拆分、中断和恢复\n\nQ.Fiber如何实现比较？\nA.双缓冲技术，在diff过程中创建新的DOM Tree，diff完成之后生成EffectList，即需要更新的地方，之后进入commit阶段，该阶段不允许中断。\n\nQ.React Hook基于Fiber架构，hook的复用是如何实现的？\nA.hook的数据存在于Fiber节点的数据结构中，具体为memoizedState中，该字段中存储了所有hook相关的信息，https://www.jianshu.com/p/d6244228a427 （重要）</code></pre><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['Fiber', '性能优化', 'React'],
  },
  {
    name: '请简要描述ES6 module require、exports以及module.exports的区别',
    desc: '考察候选人对es6，commonjs等js模块化标准的区别和理解',
    answer:
      '* CommonJS 模块的重要特性是加载时执行，即脚本代码在 require 的时候，就会全部执行。一旦出现某个模块被”循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。\n* ES6 模块是动态引用，如果使用 import 从一个模块加载变量，那些变量不会被缓存，而是成为一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。\n* CommonJS 规范规定，每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports ）是对外的接口。加载某个模块，其实是加载该模块的 module.exports 属性。\n* export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。\n* ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性\n* 混合使用介绍：https://github.com/ShowJoy-com/showjoy-blog/issues/39',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'es6'],
  },
  {
    name: '浏览器缓存机制考察',
    desc: '浏览器缓存机制考察，包括cache-control , etag, expire, last-modify-time\n以及 200 from cache、304',
    answer: '1、cache-control 和 expire 在浏览器端控制  Cache-Control的max-age&gt;expire\n2、etag 和 last-modify-time主 要服务器端对比使用',
    types: ['前端领域', '浏览器'],
    tags: [],
  },
  {
    name: '版本号排序',
    desc: 'versions是一个项目的版本号列表，因多人维护，不规则\n``` javascript\nvar versions=[&#39;1.45.0&#39;,&#39;1.5&#39;,&#39;6&#39;,&#39;3.3.3.3.3.3.3&#39;]\n```\n要求从小到大排序，注意&#39;1.45&#39;比&#39;1.5&#39;大\n``` javascript\nvar sorted=[&#39;1.5&#39;,&#39;1.45.0&#39;,&#39;3.3.3.3.3.3&#39;,&#39;6&#39;]\n```',
    answer:
      '```javascript\nfunction sortVersion(arr) {\n    return arr.sort((a, b) =&gt; {\n        const arrA = a.split(&#39;.&#39;)\n        const arrB = b.split(&#39;.&#39;)\n        for (let i = 0; i &lt; arrA.length; i++) {\n            if (arrA[i] === undefined) {\n                return -1\n            } else if (arrB[i] === undefined) {\n                return 1\n            } else if (parseInt(arrA[i]) === parseInt(arrB[i])) {\n                continue\n            } else {\n                return parseInt(arrA[i]) &gt; parseInt(arrB[i])\n            }\n        }\n    })\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['排序'],
  },
  {
    name: 'JS限流调度器',
    desc: '<p>实现JS限流调度器，方法add接收一个返回Promise的函数，同时执行的任务数量不能超过两个。</p><pre><code>class Scheduler {\n    async add(promiseFunc: () =&gt; Promise&lt;void&gt;): Promise&lt;void&gt; {\n    }\n}\n\nconst scheduler = new Scheduler()\nconst timeout = (time) =&gt; {\n    return new Promise(r =&gt; setTimeout(r, time))\n}\nconst addTask = (time, order) =&gt; {\n    scheduler.add(() =&gt; timeout(time))\n        .then(() =&gt; console.log(order))\n}\n\naddTask(1000, 1)\naddTask(500, 2)\naddTask(300, 3)\naddTask(400, 4)\n// log: 2 3 1 4\n</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>class Scheduler {\n    constructor() {\n        this.concurrency = 0\n        this.queue = []\n    }\n    async add(promiseFunc) {\n        if (this.concurrency &gt;= 2) {\n            return new Promise(r =&gt; {\n                this.queue.push(() =&gt; promiseFunc().then(r))\n            })\n        }\n        this.concurrency += 1\n        await promiseFunc()\n        this.concurrency -= 1\n        let next = this.queue.shift()\n        if (next) {\n            this.add(next)\n        }\n    }\n}\n\nconst scheduler = new Scheduler()\nconst timeout = (time) =&gt; {\n    return new Promise(r =&gt; setTimeout(r, time))\n}\nconst addTask = (time, order) =&gt; {\n    scheduler.add(() =&gt; timeout(time))\n        .then(() =&gt; console.log(order))\n}\n\naddTask(1000, 1)\naddTask(500, 2)\naddTask(300, 3)\naddTask(400, 4)\n</code></pre><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['前端编码', 'js', '调度器'],
  },
  {
    name: '实现一个简单的Event类（观察者模式）',
    desc: '<p>请实现一个观察者模式，拥有四个方法on,off,once和trigger</p><p><br></p><p>const Event = {</p><p>    on() {}   // 绑定</p><p>    off() {}  // 解绑</p><p>    once() {}   // 绑定一次</p><p>    trigger() {}  // 触发事件</p><p>};</p>',
    answer:
      '<p>```javascript function Event() { if (!(this instanceof Event)) { return new Event(); } this._callbacks = {}; } Event.prototype.on = function (type, handler) { this_callbacks = this._callbacks || {}; this._callbacks[type] = this.callbacks[type] || []; this._callbacks[type].push(handler); return this; }; Event.prototype.off = function (type, handler) { var list = this._callbacks[type]; if (list) { for (var i = list.length; i &gt;= 0; --i) { if (list[i] === handler) { list.splice(i, 1); } } } return this; }; Event.prototype.trigger = function (type, data) { var list = this._callbacks[type]; if (list) { for (var i = 0, len = list.length; i &lt; len; ++i) { list[i].call(this, data); } } }; Event.prototype.once = function (type, handler) { var self = this; function wrapper() { handler.apply(self, arguments); self.off(type, wrapper); } this.on(type, wrapper); return this; }; ```</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['编码', 'event'],
  },
  {
    name: '请说明存储在 Cookie 和 localStorage 内有什么区别',
    desc: '请说明 cookie、sessionStorage、localStorage 之间的区别、以及在你项目中的应用？',
    answer:
      ' a) cookie，HTTP Cookie（也叫Web cookie或者浏览器Cookie）是服务器发送到用户浏览器并保存在浏览器上的一块数据，它会在浏览器下一次发起请求时被携带并发送到服务器上。比较经典的，可以它用来确定两次请求是否来自于同一个浏览器，从而能够确认和保持用户的登录状态。Cookie的使用使得基于无状态的HTTP协议上记录稳定的状态信息成为了可能。\nb) sessionStorage，为每一个给定的源（given origin）维持一个独立的存储区域，该存储区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）。\nc) localStorage，localStorage 同样的功能，但是在浏览器关闭，然后重新打开后数据仍然存在。\n\n区别：\nlocalStorage、sessionStorage 是 Web Storage Api 的组成 API，其为了解决 Cookie 的一些缺陷，服务端 Set 的 cookie 每次会携带在本域下所有的请求上，对性能有损耗。SessionStorage 存储有个期限，当关闭浏览器后就不再存在，但 localStorage 依然存在，需要明确删除。\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础概念', '前端基础'],
  },
  {
    name: '请简述js浏览器事件循环机制',
    desc: '<p><br></p>',
    answer:
      '<p>浏览器 Event Loop 是 HTML 中定义的规范，Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。</p><ul><li>JS 调用栈</li></ul><p>JS 调用栈是一种后进先出的数据结构。当函数被调用时，会被添加到栈中的顶部，执行完成之后就从栈顶部移出该函数，直到栈内被清空。</p><ul><li>同步任务、异步任务</li></ul><p>JavaScript 单线程中的任务分为同步任务和异步任务。同步任务会在调用栈中按照顺序排队等待主线程执行，异步任务则会在异步有了结果后将注册的回调函数添加到任务队列(消息队列)中等待主线程空闲的时候，也就是栈内被清空的时候，被读取到栈中等待主线程执行。任务队列是先进先出的数据结构。</p><ul><li>Event Loop</li></ul><p>调用栈中的同步任务都执行完毕，栈内被清空了，就代表主线程空闲了，这个时候就会去任务队列中按照顺序读取一个任务放入到栈中执行。每次栈内被清空，都会去读取任务队列有没有任务，有就读取执行，一直循环读取-执行的操作，就形成了事件循环。</p><ul><li>定时器</li></ul><p>定时器会开启一条定时器触发线程来触发计时，定时器会在等待了指定的时间后将事件放入到任务队列中等待读取到主线程执行。定时器指定的延时毫秒数其实并不准确，因为定时器只是在到了指定的时间时将事件放入到任务队列中，必须要等到同步的任务和现有的任务队列中的事件全部执行完成之后，才会去读取定时器的事件到主线程执行，中间可能会存在耗时比较久的任务，那么就不可能保证在指定的时间执行。</p><ul><li>宏任务(macro-task)、微任务(micro-task)</li></ul><p>除了广义的同步任务和异步任务，JavaScript 单线程中的任务可以细分为宏任务和微任务。macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。micro-task包括：process.nextTick, Promises, Object.observe, MutationObserver。事件循环中，JavaScript 引擎会把整个 script 代码当成一个宏任务执行，执行完成之后，再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务-微任务。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件', 'js'],
  },
  {
    name: '何为https?https和http2有什么关系？',
    desc: '简要描述HTTPS的安全机制，以及在web服务工程实践中需要注意的问题；描述http2的基本机制',
    answer:
      'HTTPS是指建立在安全的传输层（通常是tls/ssl）上的HTTP协议，通过对服务器的证书的认证，解决中间人攻击等问题。\n证书(certificate)由客户端信任的的证书机构(CA)颁发，通过common name或SAN对服务进行描述；客户端通过CA的根证书对证书进行校验，并将请求域名和证书的common name/DNS域名进行验证，以检验证书的有效性。\n目前，很多web api如Notification/web rpc/Service Worker等，都要求必须使用https。\n在工程实践中，https存在以下需要注意的问题：\n  - js/css等资源必须以https形式加载，否则浏览器将拒绝执行，所以CDN必须完成对https的支持\n\t- 非https请求的图片等资源不会携带referer\n\t\n\thttp2是http协议的一个新版本，既可以明文传输也可以在https中使用。浏览器和服务器通过tls的ALPN/SNI等机制可以进行协议协商，决定使用什么协议',
    types: ['前端领域'],
    tags: ['基础概念', 'HTTPS'],
  },
  {
    name: '用数组的reduce方法实现map方法',
    desc: '用数组的reduce方法实现map方法',
    answer:
      '```\n// 代码实现\nArray.prototype.map2 = function(f) {\n  return this.reduce(function(result, x, index, arr) {\n    result.push(f(x, index));\n    return result;\n  }, []);\n}\n\n// 测试代码\nvar res = [1, 3, 5, 7].map2(function(item, idx){\n  return item * 2;\n});\nconsole.log(res);\n```',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: 'js异步操作与计算题',
    desc: '```\nfor (var i = 0; i &lt; 6; i++) {\n    setTimeout(function() {\n        console.log(new Date, i);\n    }, 1000);\n}\n```\n&gt;1. console.log(new Date, i);得到的结果是什么?\n&gt;1. 怎样优化，可以变成： 0 -&gt; 1 -&gt; 2 -&gt; 3-&gt; 4 -&gt;5\n&gt;1. 如果继续优化，实现console.log(new Date, i);代码执行时，立即输出 0，之后每隔 1 秒依次输出 1,2,3,4（sleep），之后再暂停5秒，然后输出5,\n实现结果类似：\n&gt;1. 2017-08-31T04:38:23:  0    &lt;— start IIFE\n&gt;1. 2017-08-31T04:38:24:  1    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:25:  2    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:26:  3    &lt;— sleep 1s\n&gt;1. 2017-08-31T04:38:27:  4    &lt;— sleep 5s\n&gt;1. 2017-08-31T04:38:32:  5',
    answer:
      '1. 属于结果是暂停1S，然后输出6个6，setTimeout属于异步执行\n1. 实现0-&gt; 1 -&gt; 2 -&gt; 3-&gt; 4 -&gt;5，用闭包或者var改成let\n1. 模拟编程中的sleep实现，参考答案：\n```\n// 模拟其他语言中的 sleep，实际上可以是任何异步操作\nconst sleep = (timeoutMS) =&gt; new Promise((resolve) =&gt; {\n  setTimeout(resolve, timeoutMS)\n});\n(async () =&gt; {  // 声明即执行的 async 函数表达式\n  for (let i = 0; i &lt; 6; i++) {\n      if (i &lt; 5) {\n        console.log(new Date(), i)\n        await sleep(1000)\n      } else {\n        await sleep(4000)\n        console.log(new Date(), i)\n      }\n    }\n})()\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'async', 'js'],
  },
  {
    name: '简单的实现Promise.all',
    desc: '<p><br></p><pre><code>\nfunction fn1() {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(1)\n        }, 1000);\n    })\n}\nfunction fn2() {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(2)\n        }, 2000);\n    })\n}\nPromiseAll([fn1(), fn2()]).then(res =&gt; {\n    console.log(res)\n}).catch(err =&gt; {\n    console.log(err)\n})\n\nPromise.all([fn1(), fn2()]).then(res =&gt; {\n    console.log(res)\n}).catch(err=&gt;{\n    console.log(err)\n})</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>function PromiseAll(list) {\n\n    return new Promise((resolve, reject) =&gt; {\n\n        let count = 0;\n\n        let len = list.length;\n\n        let result = [];\n\n        list.forEach((item,index) =&gt; {\n\n            item.then(res =&gt; {\n\n                count++;\n\n                result[index] = res;\n\n                if (count === len) {\n\n                    resolve(result);\n\n                }\n\n            }).catch(err =&gt; {\n\n                reject(err)\n\n            })\n\n        })\n\n    })\n\n}\n\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '基础'],
  },
  {
    name: 'ES6 import的原理',
    desc: '请描述ES6 import的原理以及与commonjs的require的区别',
    answer:
      'CommonJS模块的是一个值的拷贝，而ES6模块输出的是值的引用。\nES6模块加载的机制，与CommonJS模块完全不同。CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。\nCommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。\nES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值，换句话说，ES6的输入有点像Unix系统的“符号连接”，原始值变了，import输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', '模块化', 'es6'],
  },
  {
    name: '不借助变量交换两个数',
    desc: 'var a = 1, b = 2;\nfunction swap(a,b){\n  ....\n}\nswap(a,b)\nconsole.log(a, b)  // 2,1',
    answer:
      '方法一、\n```\nfunction swap(a,b){\n  b=b-a;\n  a=a+b;\n  b=a-b;\n  return [a,b]\n}\n```\n方法二、\n```\nfunction swap(a,b){\n  return [a, b] = [b, a]\n}\n```\n方法三、\n```\nfunction swap(a,b){\n  var a=a^b;\n  var b=b^a;\n  var a=a^b;\n\treturn [a,b]\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '实现垂直居中',
    desc: '```html\n\n    <div id="block">        \n    </div>\n\n```\nid为block的元素不定高不定宽，请实现它在浏览器窗口的居中显示。',
    answer: '```css\n#block {\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n```',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '请回答当我们在使用new操作符时，它在对象操作的过程中具体做了什么',
    desc: '考察候选人对原型链操作和js对象的理解',
    answer:
      '1. 简单回答：\n1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。\n1. 属性和方法被加入到 this 引用的对象中。\n3. 新创建的对象由 this 所引用，并且最后隐式的返回 this 。\n```javascript\nfunction Animal(name) {\n      this.name = name;\n}\n  Animal.prototype.run = function() {\n      console.log(this.name + &#39;can run...&#39;);\n}\nvar cat = new Animal(&#39;cat&#39;); //    \nnew Animal(&#39;cat&#39;)=function(){\nlet obj={}; //       \nobj.__proto__=Animal.prototype; // obj-&gt;Animal.prototype-&gt;Object.prototype-&gt;null\nreturn Animal.call(obj,&#39;cat&#39;);//   this        \n}\n```\n\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['prototype'],
  },
  {
    name: 'css3实现多行文字截断处理',
    desc: '用css分别实现单行截断和多行截断字符串，最后以...为结尾',
    answer:
      '单行：\n```\n.text-overflow ( @class ){\n    .@{class} {\n        overflow: hidden;\n        text-overflow:ellipsis;\n        white-space: nowrap;\n    }\n}\n```\n多行：\n```\n.multi-text-overflow ( @class, @line ){\n    .@{class} {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        display: -webkit-box;\n        display: box;\n        -webkit-line-clamp: @line;\n        -webkit-box-orient: vertical;\n    }\n}\n```',
    types: ['前端领域', 'CSS'],
    tags: ['css3'],
  },
  {
    name: '请介绍react diff算法和策略',
    desc: 'react的diff算法和策略了解多少，为什么react的diff性能好，遵循什么样的策略可以把 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题',
    answer:
      'React分别对 tree diff、component diff 以及 element diff做了算法优化，\n做了一些假设\n1.Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计\n2.拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构\n3.对于同一层级的一组子节点，它们可以通过唯一 id 进行区分\ntree diff：React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较\ncomponent diff：\na.如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。\nb.如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。\nc.对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff\nelement diff：\n允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，减少增加和删除\n详见：https://zhuanlan.zhihu.com/p/20346379',
    types: ['前端领域', 'JavaScript'],
    tags: ['React'],
  },
  {
    name: '函数科里化',
    desc: '<p>实现如下函数add,使如下执行都等于9</p><pre><code>add(2,3,4)=9\nadd(2)(3,4)=9\nadd(2)(3)(4)=9\nadd(2,3)(4)=9</code></pre><p><br/></p>',
    answer:
      '<p><br/></p><pre><code>function curry(fn) {\n  return function res(...args) {\n    if (args.length &gt;= fn.length) {\n      return fn.apply(this, args);\n    } else {\n      return function(...args2) {\n        return res.apply(this, args.concat(args2));\n      }\n    }\n  }\n}</code></pre><p><br/></p>',
    types: ['前端领域'],
    tags: ['编码', '函数式'],
  },
  {
    name: '如果数据库中采用64位长整型存储一个数据的id，前端通过api拿到这个id的话，会有什么问题？应该怎么解决？',
    desc: '如果数据库中采用64位长整型存储一个数据的id，前端通过api拿到这个id的话，会有什么问题？怎么解决？',
    answer:
      '考察一下JS中整数的安全范围的概念，在头条经常会遇到长整型到前端被截断的问题，需要补一个字符串形式的id供前端使用。\n主要会涉及到JS中的最大安全整数问题\nhttps://segmentfault.com/a/1190000002608050',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础'],
  },
  {
    name: 'JavaScript this 考察',
    desc: '<p>下面代码输出的结果是什么？</p><p>var length = 10;</p><p>function fn() {</p><p> return this.length+1;</p><p>}</p><p>var obj = {</p><p> length: 5,</p><p> test1: function() {</p><p>  return fn();</p><p> }</p><p>};</p><p>obj.test2=fn;</p><p>//下面代码输出是什么</p><p>console.log(obj.test1())</p><p>console.log(fn()===obj.test2())</p>',
    answer: '<p>11, false(11===6)</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['this'],
  },
  {
    name: 'requestAnimationFrame 和 setTimeout 的区别',
    desc: 'requestAnimationFrame 和 setTimeout 都可以用来实现动画，它们的区别是什么',
    answer:
      '1. 执行频率不同，前者按照屏幕刷新频率执行，后者自行控制，可能有无用开销（执行频率小于刷新频率，即1帧执行多次）\n2. 前者在页面不可见时，会停止执行（省电），后者在页面不可见时仍会执行，带来不必要开销\n',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '编码-js高阶函数考察',
    desc: '<h3>实现一个repeat方法，要求如下：</h3><p><br/></p><p>// 需要实现的函数</p><p>function repeat (func, times, wait) {</p><p> // 补全</p><p>}</p><p><br/></p><p>// 使下面调用代码能正常工作</p><p>const repeatFunc = repeat(console.log, 4, 3000);</p><p>repeatFunc(&#34;hello world&#34;);    //会输出4次 hello world, 每次间隔3秒</p><p><br/></p>',
    answer:
      '<p>考点1：能意识到repeat返回的是一个函数，知道参数怎么传递。</p><p>考点2：setTimeout的时间，微任务</p><p><br/></p><p>参考答案</p><p>function repeat(fn, times, wait) {</p><p>  if(typeof times !== &#39;number&#39;) return;</p><p>  if(typeof wait !== &#39;number&#39;) return;</p><p>  return function(str){</p><p>    for(let i = 0; i &lt; times; i++){</p><p>      setTimeout(()=&gt;{</p><p>        fn(str)</p><p>      }, i * wait)</p><p>    }</p><p>  }</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['函数式', 'js'],
  },
  {
    name: 'Vue框架中组件消息通信方式',
    desc: '考察候选人对Vue框架的消息通信方式了解程度：\n\n1. vue父子组件通信方式？\n2. 非父子组件通信方式？\n3. 前两问OK，追问：当一个父组件与子组件中间隔着很多层组件怎么办？',
    answer:
      '1. 父子组件通信方式\n在Vue中，父子组件的关系可以总结为props down, events up。父组件通过props向下传递数据给子组件，子组件通过events给父组件发送消息。\n\n2. 非父子组件通信\n两个独立的组件之间通信，可以借助一个空的Vue实例作为中央事件总线，空实例相当于代理人的形式进行消息监听或触发\n\n3. 父子之间层级过多时\n当父子组件之间层级不多的时候，父组件可以一层层的向子组件传递数据或者子组件一层层向父组件发送消息，代码上没有太难维护的地方。可是，一旦父子组件之间层级变多后，传递一个数据或者发送一个消息就变得麻烦。\n这块如果了解开源的Element组件库，就会知道其实现方式：构造一个函数自动向上/向下查询父亲节点，以`[组件名, 消息名, 参数]`三元组进行消息传递，降低长链传播成本;\n具体实现参考：https://github.com/ElemeFE/element/blob/dev/src/mixins/emitter.js',
    types: ['前端领域', 'JavaScript'],
    tags: ['vue'],
  },
  {
    name: '什么是 XSS，怎么造成的，有什么防御方法？',
    desc: '考察面试者对于 XSS 是否了解，是否足够重视。',
    answer:
      'XSS 就是在 web 中能够通过某种方式产生执行任意 JavaScript 脚本的情况，\n最常见的一种情况就是将用户的输入，直接放到当前 runtime 中，比如用户输入直接放到页面的 html 里面，\n立刻显示出来。\nXSS 实际上是非常危险的，因为理论上讲，如果能够执行 JavaScript，实际上攻击者可以做任何事情。\n简单的就是输出点什么，偷偷 cookie，或者结合 CSRF 攻击，或者让浏览器跳转一下，\n复杂点的甚至可以改掉当前整个页面，伪造一切用户看到东西，危害无穷。\n如果这种输入存储到数据库中，就会变成一个永久型的 XSS，危害就更大了。\n防止 XSS 最简单的就是使用各种框架，如 React、Vuejs 等，对用户输入进行 html 转义。\n另外，服务端要设置 httpOnly 的 header，防止 JavaScript 操作 cookie。\n当然，服务端也可以对输入进行转义或者过滤监测。',
    types: ['前端领域', 'JavaScript'],
    tags: ['xss', '防御方法'],
  },
  {
    name: 'webpack插件编写',
    desc: '1. 有用过webpack么？说说该工具的优缺点？\n2. 有开发过webpack插件么？\n3. 假如要在构建过程中去除掉html中的一些字符，如何编写这个插件？',
    answer:
      'webpack优缺点：\n* 概念牛，但文档差，使用起来费劲\n* 模块化，让我们可以把复杂的程序细化为小的文件\n* require机制强大，一切文件介资源\n* 代码分隔\n* 丰富的插件，解决less、sass编译\n\n开发插件的两个关键点Compiler和Compilation：\n* compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并在所有可操作的设置中被配置，包括原始配置，loader 和插件。当在 webpack 环境中应用一个插件时，插件将收到一个编译器对象的引用。可以使用它来访问 webpack 的主环境。\n* compilation 对象代表了一次单一的版本构建和生成资源。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。\n\n插件编写可参考：https://doc.webpack-china.org/development/how-to-write-a-plugin',
    types: ['前端领域', '工程构建'],
    tags: ['框架'],
  },
  {
    name: '如何实现微信扫码登录？',
    desc: '综合题，考察网络、前端、认证等多方面知识',
    answer:
      '参考答案：\nhttps://zhuanlan.zhihu.com/p/22032787\n具体步骤：\n1. 用户 A 访问微信网页版，微信服务器为这个会话生成一个全局唯一的 ID，上面的 URL 中 obsbQ-Dzag== 就是这个 ID，此时系统并不知道访问者是谁。\n2. 用户A打开自己的手机微信并扫描这个二维码，并提示用户是否确认登录。\n3. 手机上的微信是登录状态，用户点击确认登录后，手机上的微信客户端将微信账号和这个扫描得到的 ID 一起提交到服务器\n4. 服务器将这个 ID 和用户 A 的微信号绑定在一起，并通知网页版微信，这个 ID 对应的微信号为用户 A，网页版微信加载用户 A 的微信信息，至此，扫码登录全部流程完成',
    types: ['前端领域', '工程构建'],
    tags: ['产品逻辑', '扫码登录'],
  },
  {
    name: '设计类似 Vue.js 双向绑定功能的核心逻辑“监听对象属性变化”功能',
    desc: '实现一个类，可以监听对象属性的值变化。加分项：考虑对象存在值为数组或对象的属性。\n\n\t\tclass Observe {\n\t\t\tconstructor(data: Object) {\n\t\t\t}\n\t\t\t// 监听属性变更\n\t\t\t$on() {\n\t\t\t}\n\t\t\t// 触发属性变更事件\n\t\t\t$emit() {\n\t\t\t}\n\t\t}\n\t\tconst data = new Observer({\n\t\t\ta: 1\n\t\t});\n\t\tcoonsole.log(data.a) // console: 1\n\t\tdata.$on(&#39;a&#39;, (newValue, oldValue) =&gt; {\n\t\t\t// this === data\n\t\t\tconsole.log(newValue, oldValue);\n\t\t});\n\t\tdata.a = 2 // console: 2 1\n\n\t\n',
    answer: '待补充',
    types: ['前端领域', 'JavaScript'],
    tags: ['defineProperty', 'vue', 'js', '逻辑'],
  },
  {
    name: '请简要描述<script>标签defer或async属性的作用，以及二者的区别',
    desc: '',
    answer:
      '### 作用：\ndefer或async属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。\n### 区别：\ndefer与async的区别是：前者要等到整个页面正常渲染结束，才会执行；后者一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。另外，如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的。',
    types: ['前端领域', 'HTML'],
    tags: ['async'],
  },
  {
    name: '原型链、this指针、自有属性考察',
    desc: '```javascript\nvar a= function () { this.b =3; }\nvar c = new a();\na.protorype.b = 9;\nvar b = 7;\na();\n```\n问：\n```javascript\nconsole.log(b);\nconsole.log(c.b); \n```\n分别输出什么？',
    answer: '- 第一个 `b = 3`\n- 第二个 `c.b = 3`',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'Cookie 和 Session 有什么区别',
    desc: '<div style="white-space: pre;">如题\n</div>',
    answer:
      '<div style="white-space: pre;">cookie 在浏览器中存在，并且每个请求都会带上，而且是可以设置失效时间的，失效前就会有效。 session 是一次会话有效，也就是说，浏览器关闭 session 就会失效。 其实这道题目考察的一个重点是在于，session 这种机制是怎么在浏览器中实现的呢？ 实际上 session 的实现也是在浏览器中放了一个 cookie，失效时间是一次会话失效。\n</div>',
    types: ['前端领域'],
    tags: ['基础概念'],
  },
  {
    name: 'JS异步队列macrotask和microtask',
    desc: '```\nconsole.log(&#39;begin&#39;)\nsetTimeout(() =&gt; {\n\tconsole.log(&#39;setTimeout 1&#39;)\n\tPromise.resolve().then(() =&gt; {\n\t\tconsole.log(&#39;promise 1&#39;)\n\t\tsetTimeout(() =&gt; {\n\t\t\tconsole.log(&#39;setTimeout2 between promise1&amp;2&#39;)\n\t\t})\n\t}).then(() =&gt; {\n\t\tconsole.log(&#39;promise 2&#39;)\n\t})\n}, 0)\nconsole.log(&#39;end&#39;)\n```',
    answer: '```\nbegin\nend\nsetTimeout 1\npromise 1\npromise 2\nsetTimeout2 between promise1&amp;2\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['promise', '异步', 'js'],
  },
  {
    name: '如何理解虚拟DOM?',
    desc: '如何理解虚拟DOM?',
    answer: '对虚拟dom和diff算法中的一些细节理解与考察，[https://github.com/livoras/blog/issues/13](https://github.com/livoras/blog/issues/13)',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '如何判断一个 JS 对象为空对象',
    desc: '如何判断一个 JS 对象为空对象 ？空对象形如`{}`',
    answer:
      '1. 使用 `for in`\n\t```javascript\n\tfunction isEmptyObject(obj){\n  \tfor(var key in obj){\n    \treturn false\n\t\t};\n\t\treturn true\n\t};\n\t```\n2. 通过 JSON.stringify 方法来判断\n\t```javascript\n\tif(JSON.stringify({}) === &#39;{}&#39;){\n\t\tconsole.log(&#39;empty obj&#39;);\n\t}\n\t```\n3. 使用 ES6 增加的 Object.keys()\n\t```javascript\n\tif(Object.keys(obj).length === 0){\n\t\tconsole.log(&#39;empty obj&#39;);\n\t}\n\t```',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'js'],
  },
  {
    name: '什么是闭包？实现每隔1秒输出数组中的一个数字',
    desc: '解释下js中的闭包概念，解释OK，给出编程题目考察基本功',
    answer:
      '```js\nfunction fun(arr) {\n    var i, len;\n    for (i = 0, len = arr.length; i &lt; len; i++) {\n      (function(i){\n        setTimeout(function() {\n          console.log(i);\n        }, i * 1000);\n      })(i);\n    }\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'promise运行过程解答',
    desc: '如下代码的运行结果是什么？\n```javascript\n process.nextTick(() =&gt; {console.log(&#39;nextTick&#39;)})\nPromise.resolve().then(()=&gt; {console.log(&#39;promise1&#39;);}).then(()=&gt; {\n  console.log(&#39;promise2&#39;);\n});\nsetImmediate(() =&gt; {console.log(&#39;setImmediate&#39;)})\nconsole.log(&#39;end&#39;) \n\n```',
    answer:
      '1. end -&gt; nextTick -&gt; promise1 -&gt; promise2-&gt; setImmediate\n1. process.nextTick 和 promise.then 都属于 microtask，而 setImmediate 属于 macrotask，在事件循环的 check 阶段执行。\n1. 事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。',
    types: ['前端领域'],
    tags: ['编码', 'promise', '异步'],
  },
  {
    name: '请简述常见web安全及防护原理',
    desc: '常见web安全及防护原理，请举例说明。',
    answer:
      '1、SQL注入原理  \n\t\t就是通过把SQL命令插入到Web表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令。\n总的来说有以下几点  \n1. 永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双&#34;-&#34;进行转换等。\n2. 永远不要使用动态拼装SQL，可以使用参数化的SQL或者直接使用存储过程进行数据查询存取。\n3. 永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。\n4. 不要把机密信息明文存放，请加密或者hash掉密码和敏感的信息。  \n2、XSS原理及防范  \nXss(cross-site scripting)攻击指的是攻击者往Web页面里插入恶意 html标签或者JavaScript代码。\n看似安全的链接，骗取用户点击后，窃取cookie中的用户私密信息；或者攻击者在论坛中加一个恶意表单，\n当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点。\nXSS防范方法  \n首先代码里对用户输入的地方和变量都需要仔细检查长度和对”&lt;”,”&gt;”,”;”,”’”等字符做过滤；其次任何内容写到页面之前都必须加以encode，避免不小心把html tag 弄出来。这一个层面做好，至少可以堵住超过一半的XSS 攻击。\n首先，避免直接在cookie 中泄露用户隐私，例如email、密码等等。\n其次，通过使cookie 和系统ip 绑定来降低cookie 泄露后的危险。这样攻击者得到的cookie 没有实际价值，不可能拿来重放。\n如果网站不需要再浏览器端对cookie 进行操作，可以在Set-Cookie 末尾加上HttpOnly 来防止javascript 代码直接获取cookie 。\n\n3、CSRF原理及防范  \nCSRF的防御\n服务端的CSRF方式方法很多样，但总的思想都是一致的，就是在客户端页面增加伪随机数。\n通过验证码的方法',
    types: ['前端领域', 'JavaScript'],
    tags: ['安全', 'web'],
  },
  {
    name: '数字格式化问题:1234567890 --> 1,234,567,890',
    desc: '数字格式化问题,将1234567890 --&gt; 1,234,567,890',
    answer:
      '非正则实现\n```javascript\nlet test = &#39;1234567890&#39;\nfunction formatCash(str) {\n  let arr = []\n  for (let i = 1; i &lt; str.length; i++) {\n    if (str.length % 3 &amp;&amp; i == 1)\n      arr.push(str.substr(0, str.length % 3))\n    if (i % 3 === 0)\n      arr.push(str.substr(i - 2, 3))\n  }\n  return arr.join(&#39;,&#39;)\n}\nconsole.log(formatCash(test)) // 1,234,567,890\n```\n正则实现\n```javascript\nlet test1 = &#39;1234567890&#39;\nlet format = test1.replace(/\\B(?=(\\d{3})+(?!\\d))/g, &#39;,&#39;)\nconsole.log(format) // 1,234,567,890\n```',
    types: ['前端领域'],
    tags: ['数字格式化', '编码', '正则表达式'],
  },
  {
    name: '模拟实现loadash中的_.get()函数，实现如下传入参数取值效果',
    desc: '```javascript\nfunction get() {\n  // 请补全函数参数和实现逻辑\n}\nconst obj = { selector: { to: { toutiao: &#39;FE coder&#39; } }, target: [1, 2, { name: &#39;byted&#39; }] };\n// 运行代码\nget(obj, &#39;selector.to.toutiao&#39;, &#39;target[0]&#39;, &#39;target[2].name&#39;)\n\n//  输出结果：\n// [&#39;FE coder&#39;, 1, &#39;byted&#39;]\n```',
    answer:
      '```javascript\nconst get = (from, ...selectors) =&gt;\n  [...selectors].map(s =&gt;\n    s\n      .replace(/\\[([^\\[\\]]*)\\]/g, &#39;.$1.&#39;)\n      .split(&#39;.&#39;)\n      .filter(t =&gt; t !== &#39;&#39;)\n      .reduce((prev, cur) =&gt; prev &amp;&amp; prev[cur], from)\n  );\n```\n1. Use Array.map() for each selector\n2. String.replace() to replace square brackets with dots\n3. String.split(&#39;.&#39;) to split each selector\n4. Array.filter() to remove empty values\n5. Array.reduce() to get the value indicated by it',
    types: ['前端领域', 'JavaScript'],
    tags: ['js对象'],
  },
  {
    name: '合并两个有序数组',
    desc: '合并两个有序数组',
    answer:
      '```\nfunction mergeSortedArray(a, b){\n  var merged = [], \n      aElm = a[0],\n      bElm = b[0],\n      i = 1,\n      j = 1;\n  if(a.length ==0)\n    return b;\n  if(b.length ==0)\n    return a;\n  while(aElm || bElm){\n   if((aElm &amp;&amp; !bElm) || aElm &lt; bElm){\n     merged.push(aElm);\n     aElm = a[i++];\n   }   \n   else {\n     merged.push(bElm);\n     bElm = b[j++];\n   }\n  }\n  return merged;\n}\n```\n验证\n```\nmergeSortedArray([2,5,6,9], [1,2,3,29]);\n结果 [1, 2, 2, 3, 5, 6, 9, 29]\n```',
    types: ['前端领域'],
    tags: ['编码', '编程', '有序数组'],
  },
  {
    name: '进行CSRF漏洞扫描的原理和防御方式是什么？',
    desc: '如题',
    answer:
      'CSRF 就是在用户不知情的情况下，发出了请求，让用户做了不该做的操作。\n举个例子，比如你的一个网站中有个 img 标签，src 指向的是微博关注某人的接口，\n那么当用户访问你的网站时，就会在微博上关注那个人，而且这个操作用户是不知情的。\n因为 img src 发出的跨域请求，也是会携带 cookie 的，所以如果用户在微博登录过，\n那么就会带有微博的登录授权。同理，如果是其他操作，可能也存在这种漏洞，比较危险的情况就是付款。\n一般会采用 CSRF token 的方式防御，就是关键请求得要换取一个一次有效的 token 才有权限。\n',
    types: ['前端领域'],
    tags: ['基础概念'],
  },
  {
    name: '判断一个字符串是否是回文字符串',
    desc: '判断一个字符串是否是回文字符串，回文字符串是对称字符串的形式，例如：did，eve, dad, level',
    answer:
      '```\nfunction isPalindrome(str){\n  var i, len = str.length;\n  for(i=0; i isPalindrome(&#39;madam&#39;)\n  = true\n&gt; isPalindrome(&#39;toyota&#39;)\n  = false\n```',
    types: ['前端领域'],
    tags: ['编码', '编程'],
  },
  {
    name: 'box-sizing 实践',
    desc: '<p><br></p><pre><code>&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n  &lt;head&gt;\n    &lt;style&gt;\n      .box {\n        width: 10px;\n        height: 10px;\n        border: 1px solid red;\n        margin: 2px;\n        padding: 2px;\n        background: blue;\n      }\n\n      #borderBox {\n        box-sizing: border-box;\n      }\n\n      #contentBox {\n        box-sizing: content-box;\n      }\n    &lt;/style&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;div&gt;请问下面两个 div 元素，蓝色区域的宽高各是多少像素？&lt;/div&gt;\n    &lt;div id=&#34;borderBox&#34; class=&#34;box&#34;&gt;&lt;/div&gt;\n    &lt;div id=&#34;contentBox&#34; class=&#34;box&#34;&gt;&lt;/div&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</code></pre><p><br></p>',
    answer:
      '<p>borderBox：10px(width) - 1px(border) * 2 = 8px </p><p>contentBox 10px(width) + 2px(padding) *2 = 14px</p><p><br></p><p>答题要点：除了验证候选人是否真正了解 box-sizing 之外，也考察候选人是否了解 background 会影响元素的 padding 区域，而不影响 margin 区域这个特点</p>',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '链式调用+延迟计算',
    desc: '<p>写一个加法函数sum，支持sum(1)(2)(3,4)(5,6,7....)</p><p><br></p><p>console.log(sum(1,2,3)(4)) =&gt; 输出 10</p><p><br></p><p><br></p><p>考察链式调用，闭包，延迟计算，函数toStirng/valueOf</p><p><br></p><p><br></p><p><br></p>',
    answer:
      '<p><br></p><pre><code>function sum(...args) {\n  function next(...innerArgs) {\n    args.push(...innerArgs);\n    return next;\n  }\n  next.valueOf = next.toString = () =&gt; {\n    return args.reduce((r, c) =&gt; r + c, 0);\n  };\n\n  return next;\n}</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '前端编码'],
  },
  {
    name: '请描述micro task 与 macro task的区别及应用',
    desc: '<p><br></p><pre><code>async function async1() {\n  console.log(&#39;async1 start&#39;);\n  await async2();\n  console.log(&#39;async1 end&#39;);\n}\nasync function async2() {\n  console.log(&#39;async2&#39;);\n}\n\nconsole.log(&#39;script start&#39;);\nsetTimeout(function() {\n    console.log(&#39;setTimeout&#39;);\n}, 0);  \nasync1();\nnew Promise(function(resolve) {\n    console.log(&#39;promise1&#39;);\n    resolve();\n  }).then(function() {\n    console.log(&#39;promise2&#39;);\n});\nconsole.log(&#39;script end&#39;);</code></pre><p><br></p>',
    answer: '<p>script start</p><p>async1 start</p><p>async2</p><p>promise1</p><p>script end</p><p>async1 end</p><p>promise2</p><p>setTimeout</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['promise', 'task'],
  },
  {
    name: '数组flat函数设计',
    desc: '设计一个flat函数将如下数组arr=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]]输出为1,2,&#39;3&#39;,4,&#39;5&#39;,6,7,8,9。至少写出两种方法,要求不能改变数组中的原始数据类型',
    answer:
      '*  方法一：递归\n```javascript\nfunction flat(array) {\n    var result = [];\n    var each = function(arr) {\n      arr.forEach(item =&gt; {\n        if (item instanceof Array) {\n          each(item);\n        } else {\n          result.push(item);\n        }\n      });\n    };\n    each(array);\n    return result;\n  }\nvar arr=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]];flat(arr).forEach(item=&gt;{console.log(item)})\n\n```\n*  方法二：toString（格式转换），无法保证类型\n```javascript\nArray.prototype.toString = function() {\n  return this.join(&#39;,&#39;);\n};\nconsole.log([1,2,[3,4,[5,6,7]]]+&#39;&#39;);\n```\n*  方法三：Iterator\n```javascript\nArray.prototype[Symbol.iterator] = function() {\n  let arr = [].concat(this),\n    index = 0;\n  let getFirst=function(array){\n    let first=array[0];\n    if(first instanceof Array){\n      return getFirst(array[0])\n    }else if(first!==undefined){\n      return array.shift()\n    }else{\n      return &#39;&#39;\n    }\n  }\n  return {\n    next: function() {\n      let item=getFirst(arr);\n      if(item){\n        return {\n          value:item,\n          done:false\n        }\n      }else{\n        return {\n          done:true\n        }\n      }\n    }\n  }\n}\nvar t=[1,2,[&#39;3&#39;,4,&#39;5&#39;,[6,[7,8],9]]];\nfor(let i of t){console.log(i)}\n```',
    types: ['前端领域'],
    tags: ['ES', '编码', '基础算法'],
  },
  {
    name: '存储在 Cookie 和 localStorage 内有什么区别',
    desc: '基础题考察 cookie 和 localStorage 的理解。',
    answer: '存储在 Cookie 中每个 request 都会带上，而放在 localStorage 中，仅有浏览器中会存储。',
    types: ['前端领域', '浏览器'],
    tags: [],
  },
  {
    name: '请说说HTML的Meta标签的用途，并列举一些常用的meta标签',
    desc: '',
    answer:
      '考察对网页结构和语义的理解 \n\n```\nThe HTML  element represents metadata that cannot be represented by other HTML meta-related elements, like , , ',
    types: ['前端领域', 'HTML'],
    tags: ['基础'],
  },
  {
    name: '说说前端优化？图片懒加载原理是什么？',
    desc: '* 考察前端的一些优化方式\n* 图片懒加载原理',
    answer:
      '1. 优化手段：雅虎的34条优化手段，比如：代码压缩、减少请求、cdn、缓存\n2. 图片懒加载原理：img标签设置占位属性(data-src)，存储真正的图片地址；原src设置占位图片地址；当图片(快)进入用户可视区域的时候进行地址替换；',
    types: ['前端领域', '渲染框架'],
    tags: ['优化'],
  },
  {
    name: '请谈谈你对ES6的箭头函数的理解',
    desc: '```\nvar func1 = x =&gt; x;\nvar func2 = x =&gt; {x}; \nvar func3 = x =&gt; ({x});\nconsole.log(func1(1));\nconsole.log(func2(1));\nconsole.log(func3(1));\n```\n请写出程序运行结果。',
    answer: '程序运行结果为：<br>\n第一个：1 <br>\n第二个：undefined <br>\n第三个：{x: 1}  <br>',
    types: ['前端领域', 'JavaScript'],
    tags: ['es6'],
  },
  {
    name: '无重复字符的最长子串',
    desc: '<p>给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。</p><h3>样例：</h3><p><br></p><ul><li>输入: &#34;abcabcbb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;abc&#34;，所以其长度为 3。</p><ul><li>输入: &#34;bbbbb&#34;</li></ul><p>输出: 1</p><p>解释: 因为无重复字符的最长子串是 &#34;b&#34;，所以其长度为 1。</p><ul><li>输入: &#34;pwwkew&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;wke&#34;，所以其长度为 3。</p><ul><li>输入: &#34;dvdf&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;vdf&#34;，所以其长度为 3。</p><ul><li>输入: &#34;asjrgapa&#34;</li></ul><p>输出: 6</p><p>解释: 因为无重复字符的最长子串是 &#34;sjrgap&#34;，所以其长度为 6。</p><ul><li>输入: &#34;aabaab!bb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;ab!&#34;，所以其长度为 3。</p><ul><li>输入: &#34;abcb&#34;</li></ul><p>输出: 3</p><p>解释: 因为无重复字符的最长子串是 &#34;abc&#34;，所以其长度为 3。</p><ul><li>输入: &#34;asljlj&#34;</li></ul><p>输出: 4</p><p>解释: 因为无重复字符的最长子串是 &#34;aslj&#34;，所以其长度为 4。</p><ul><li>输入: &#34;qwnfenpglqdq&#34;</li></ul><p>输出: 8</p><p>解释: 因为无重复字符的最长子串是 &#34;fenpglqd&#34;，所以其长度为 8。</p><h3><br></h3><p><br></p>',
    answer:
      '<p><br></p><pre><code>var lengthOfLongestSubstring = function(s: string) {\n    let list = s.split(&#34;&#34;);\n    let son = [];\n    let max = [];\n    for (let i = 0; i &lt; list.length; i++) {\n        let current = list[i];\n        let index = son.indexOf(current);\n        if (index === -1) {\n            son.push(current);\n        } else {\n            let sameIndex = i - son.length + index;\n            if (son.length &gt; max.length) {\n                max = [...son];\n            }\n            son = son.slice(sameIndex + 1, son.length);\n            son.push(current);\n        }\n    }\n    return max.length;\n};</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '字符串'],
  },
  {
    name: '列举一个近期做的最能体现设计能力的项目',
    desc: '请举出一个你近期做的项目，项目需要最能体现设计能力,  请从以下角度说明：\n1. 项目描述\n2. 技术选型\n3. 模块化\n4. 模块之间通信\n5. 工程化\n6. 前后端数据流 ',
    answer: '这是一个开放式的工程设计题目，没有固定答案，评分参考评分标准',
    types: ['前端领域'],
    tags: ['设计模式'],
  },
  {
    name: '实现一个 JSONP',
    desc: '函数签名如下:\n\n```javascript\nfunction jsonp(url, callback) {\n  // TODO\n}\n```',
    answer:
      '主要考察如何处理第二个参数 `callback` 的问题，\n加分项比如超时处理 onerror 的处理, xss 考虑等等\n\n```\nconst kCallBackMap = {};\nfunction uuid() {\n  return ...;\n}\n\nfunction jsonp(url, callback) {\n  const callbackId = uuid();\n  url += &#39;callback=&#39; + callbackId;\n\twindow[calbackId] = callback;\n\t\n\tconst script = document.createElement(&#39;script&#39;);\n\tscript.src = url;\n\tdocument.head.appendChild(script);\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['jsonp'],
  },
  {
    name: '请谈一谈JAVAscript的作用域和this',
    desc: '```\ninner = &#39;window&#39;;\n\nfunction say() {\n    console.log(inner);\n    console.log(this.inner);\n}\n\nvar obj1 = (function() {\n    var inner = &#39;1-1&#39;;\n    return {\n        inner: &#39;1-2&#39;,\n        say: function() {\n            console.log(inner);\n            console.log(this.inner);\n        }\n    }\n})();\n\nvar obj2 = (function() {\n    var inner = &#39;2-1&#39;;\n    return {\n        inner: &#39;2-2&#39;,\n        say: function() {\n            console.log(inner);\n            console.log(this.inner);\n        }\n    }\n})();\n\n\nsay();\nobj1.say();\nobj2.say();\nobj1.say = say;\nobj1.say();\nobj1.say = obj2.say;\nobj1.say();\n```',
    answer:
      '```\nwindow\nwindow\n\n1-1\n1-2\n\n2-1\n2-2\n\nwindow\n1-2\n\n2-1\n1-2\n\n主要考察javascript的作用域和this指向。作用域是静态的，声明时确定；this是动态的，运行时确定。\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', '语言关键字'],
  },
  {
    name: '请问CSS position有哪些定位方式',
    desc: 'CSS position有哪些定位方式，每种方式是如何定位的？',
    answer:
      '### position取值\nrelative, fixed，absolute和staic、sticky 5种\n### 定位方式\n*  staic-默认位置；元素会像通常那样流入页面。顶部，底部，左，右，z-index属性不适用。  \n*  relative-元素的位置相对于自身进行调整，而不改变布局（从而为未被定位的元素留下一个空白）。  \n*  absolute-该元素从页面的流中移除，并相对于其最近位置的祖先定位（非static）在指定位置，如果有的话，或者与初始包含块相对。绝对定位的框可以有边距，并且不会与其他边距折叠。这些元素不影响其他元素的位置。  \n*  fixed元素是定位在相对于窗口。  \n*  sticky，是相对定位和固定定位的混合。该元素被视为相对位置，直到它越过指定的阈值，此时它被视为固定位置。  \n',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: '请介绍一下Oauth2.0 的认证过程',
    desc: '如题',
    answer:
      '可以参考 http://www.jianshu.com/p/0db71eb445c8 或者 \nhttp://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html 的答案，\n回答的一个重点是 code（授权码）仅一次有效，并且要有失效时间，而且很短，比如一分钟，\n因为浏览器收到会立刻跳转。\n还有就是服务端可以根据 code 结合相应的 sercet 去获取 token，要说清楚。',
    types: ['前端领域'],
    tags: ['安全', 'oauth'],
  },
  {
    name: 'express中间件的原理',
    desc: '<div style="white-space: pre;">express中间件的实现原理 并给出实现\n</div>',
    answer:
      '<div style="white-space: pre;">主要考察候选人对中间件的理解 参考代码 ``` export default function compose(...funcs) { if (funcs.length === 0) { return arg =&gt; arg } if (funcs.length === 1) { return funcs[0] } return funcs.reduce((a, b) =&gt; (...args) =&gt; a(b(...args))) } ``` koa中间件主要使用 generator和promise可参考https://github.com/tj/co\n</div>',
    types: ['前端领域'],
    tags: ['编码'],
  },
  {
    name: '实现es6字符串模板方法sprintf',
    desc: '<p><br></p><pre><code>const template = &#34;My name is ${name},I&#39;m from ${city}&#34;;\nconst result = sprintf(template, {\n\tname: &#39;Yiming Zhang&#39;,\n\tcity: &#39;FuJian&#39;,\n});\nconsole.log(result); // My name is Yiming Zhang,I&#39;m from FuJian</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>const sprintf = (str, data) =&gt; (\n    Object.keys(data).reduce((prev, cur) =&gt; {\n        let reg = new RegExp(&#39;\\\\$\\\\{&#39; + cur + &#39;\\\\}&#39;, &#39;g&#39;);\n        return prev.replace(reg, data[cur]);\n    }, str);\n);</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '正则表达式', '前端基础', 'es6'],
  },
  {
    name: '登录表单设计/扫码登录/第三方登录',
    desc: '1. 请实现一个登录表单\n2. 用GET方法行不行？csrf是什么？如何防御？\n3. cookie-sesssion的工作机制\n4. 你已经登录产品的App端，要在web实现扫码登录，该如何设计？\n5. 接入第三方登录（如微信），如何设计？',
    answer:
      '1. 正确书写html\n2. 正确回答GET和POST的区别，从语义、弊端、安全等方面。csrf的防御：token，samesite，referer校验（弊端）等\n3. 正确理解cookie-session的工作机制，sessionId的设计，存储\n4. 考察对司空见惯的扫码登录，是否有思考其实现。正确设计 Client/Server/App 三方流程，设计二维码存储的内容，client通知有轮训或websocket等解决方案\n5. 正确理解 Client/Server/App/Weixin Server 四方流程，理解oauth2协议',
    types: ['前端领域', 'HTML'],
    tags: ['扫码登录'],
  },
  {
    name: '作用域以及变量提升',
    desc: '### 请写出下题的结果：\n```\nvar a = 1; \nfunction b() { \n    a = 10; \n    return; \n    function a() {} \n} \nb(); \nconsole.log(a);   \n```',
    answer: '结果：1',
    types: ['前端领域'],
    tags: ['语言基础', '基础概念', '提升'],
  },
  {
    name: 'setTimeout 和 Promise',
    desc: '<p>请写出程序的输出内容</p><pre><code>setTimeout(function() {\n  console.log(1)\n}, 0);\nnew Promise(function(resolve) {\n  console.log(2);\n  for(var i=0 ; i &lt; 10000 ; i++) {\n    if (i == 9999) {\n      resolve();\n    }\n  }\n  console.log(3);\n}).then(function() {\n  console.log(4);\n});\nconsole.log(5);</code></pre><p><br></p>',
    answer: '<p>正确答案：2 3 5 4 1。重点关注：候选人是否把 2 写在第一位，以及 4 和 1 的顺序。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: 'requestIdleCallback和requestAnimationFrame有什么区别？',
    desc: '<p>\t<strong>requestIdleCallback和requestAnimationFrame有什么区别？</strong></p>',
    answer:
      '<p>\trequestAnimationFrame的回调会在每一帧确定执行，属于高优先级任务，而requestIdleCallback的回调则不一定，属于低优先级任务。</p><p>\t我们所看到的网页，都是浏览器一帧一帧绘制出来的，通常认为FPS为60的时候是比较流畅的，而FPS为个位数的时候就属于用户可以感知到的卡顿了。</p><p>\t一帧包含了用户的交互、js的执行、以及requestAnimationFrame的调用，布局计算以及页面的重绘等工作。</p><p>\t假如某一帧里面要执行的任务不多，在不到16ms（1000/60)的时间内就完成了上述任务的话，那么这一帧就会有一定的空闲时间，这段时间就恰好可以用来执行requestIdleCallback的回调。</p><p>\t由于requestIdleCallback利用的是帧的空闲时间，所以就有可能出现浏览器一直处于繁忙状态，导致回调一直无法执行，这其实也并不是我们期望的结果（如上报丢失），那么这种情况我们就需要在调用requestIdleCallback的时候传入第二个配置参数timeout了。</p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件循环'],
  },
  {
    name: '请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率>=n的元素列表',
    desc: '请为所有数组对象添加一个findDuplicate(n)方法，用于返回该数组中出现频率&gt;=n的元素列表',
    answer:
      '`\nArray.prototype.findDuplicate = function (n) {\n    var results = [];\n    if (typeof n != &#39;number&#39; || isNaN(n)) {\n        return results;\n    }\n    \n    var itemFreqs = {};\n    this.forEach(function (item) {\n        if (!itemFreqs[item]) {\n            itemFreqs[item] = 0;\n        }\n        itemFreqs[item] ++;\n    });\n    \n    for (var item in itemFreqs) {\n        if (itemFreqs[item] &gt;= n) {\n            results.push(item);\n        }\n    }\n    \n    return results;\n}\n\n`',
    types: ['前端领域'],
    tags: ['编码', '前端编码'],
  },
  {
    name: '请回答DOM中对应创建、移除、追加、复制、查找节点的方法是什么？',
    desc: '考察候选人对原生dom操作的方法的理解和掌握熟练程度',
    answer:
      '1.  创建新节点\n\t*  createDocumentFragment() //创建一个DOM片段\n\t*  createElement() //创建一个具体的元素\n\t*  createTextNode() //创建一个文本节点\n\n1.  克隆节点\n*  cloneNode()\n\n1. 添加节点\n*  appendChild()\n*  insertBefore()\n\n1. 移除节点\n*  removeChild()\n\n1. 替换节点\n*  replaceChild()\n\n1. 查找节点\n*  querySelector()\n*  querySelectorAll()\n*  getElementById()\n*  getElementsByName()\n*  getElementsByTagName()\n\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['dom'],
  },
  {
    name: '请描述如何用原生JS实现数字的货币格式化',
    desc: '<p># 如何用原生JS实现数字的货币格式化，例如数字6123456789格式化后为6,123,456,789，不低于两种方法。</p>',
    answer:
      '<p>方法一： (6123456789).toLocaleString(&#39;en-US&#39;) // 6,123,456,789</p><p><br></p><p>方法二： (6123456789).toString().split(&#39;&#39;).reverse().join(&#39;&#39;).replace(/\\d{3}/g,function($1){return $1+&#39;,&#39;}).split(&#39;&#39;).reverse().join(&#39;&#39;) </p><p><br></p>',
    types: ['前端领域', 'JavaScript'],
    tags: ['数字格式化', 'js'],
  },
  {
    name: 'let,const,var的区别',
    desc: '请说明一下let,const,var的区别 并回答如下代码会不会报错\n```\nconst a = {};\na.test = 1;\n```',
    answer:
      '考察候选人对es6变量声明的理解\n1. let声明的变量拥有块级作用域\n2. let声明的全局变量不是全局对象的属性\n3. let不能重新声明变量\n4. const声明的变量与let声明的变量类似，它们的不同之处在于，const声明的变量只可以在声明时赋值，不可随意修改，否则会导致SyntaxError（语法错误）。\n\n上面代码只是针对a的引用 并不会报错',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '如何实现链式调用',
    desc: '请实现函数 a, b, c，使调用方式为 a().b().c() 时，结果为输出 a b c。\n如果上面问题回答出来了，并且是在 a 函数内部 return Object 实现，\n那么可以补充问下如何能够实现让三个函数任意链式顺序调用。\n如 a().c().b() 或 b().a().c() 。\n',
    answer:
      '这道题主要就是考察面试者对 JavaScript 的 Object 概念理解是否清晰，\n最好的答案是直接将 a b c 三个函数挂载到 runtime 中的某个全局变量中，比如可以是 window。\n然后在每个函数内 return window 就可以了。\n当然，也可以按照第一道题目的顺序，分别在相应函数内 return 下个函数，但是这样做无法调换顺序。',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: '实现千位分隔符',
    desc: '给一个数字，比如：1234567.90，转化成：1,234,567.90',
    answer:
      '```js\nfunction commafy(num) {\n  return num &amp;&amp; num\n      .toString()\n      .replace(/^\\d+/, (m) =&gt; m.replace(/(?=(?!^)(\\d{3})+$)/g, &#39;,&#39;));\n}\nconsole.log(commafy(1234567.90)); //1,234,567.90\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['基础算法'],
  },
  {
    name: '编写javascript深度克隆函数deepClone',
    desc: '编写javascript深度克隆函数deepClone',
    answer:
      '```javascript\nfunction deepClone(obj) {\n    var _toString = Object.prototype.toString;\n\n    // null, undefined, non-object, function\n    if (!obj || typeof obj !== &#39;object&#39;) {\n        return obj;\n    }\n\n    // DOM Node\n    if (obj.nodeType &amp;&amp; &#39;cloneNode&#39; in obj) {\n        return obj.cloneNode(true);\n    }\n\n    // Date\n    if (_toString.call(obj) === &#39;[object Date]&#39;) {\n        return new Date(obj.getTime());\n    }\n\n    // RegExp\n    if (_toString.call(obj) === &#39;[object RegExp]&#39;) {\n        var flags = [];\n        if (obj.global) { flags.push(&#39;g&#39;); }\n        if (obj.multiline) { flags.push(&#39;m&#39;); }\n        if (obj.ignoreCase) { flags.push(&#39;i&#39;); }\n\n        return new RegExp(obj.source, flags.join(&#39;&#39;));\n    }\n\n    var result = Array.isArray(obj) ? [] :\n        obj.constructor ? new obj.constructor() : {};\n\n    for (var key in obj ) {\n        result[key] = deepClone(obj[key]);\n    }\n\n    return result;\n}\n\nfunction A() {\n    this.a = a;\n}\n\nvar a = {\n    name: &#39;qiu&#39;,\n    birth: new Date(),\n    pattern: /qiu/gim,\n    container: document.body,\n    hobbys: [&#39;book&#39;, new Date(), /aaa/gim, 111]\n};\n\nvar c = new A();\nvar b = deepClone(c);\nconsole.log(c.a === b.a);\nconsole.log(c, b);\n```',
    types: ['前端领域', 'JavaScript'],
    tags: [],
  },
  {
    name: '请谈谈你对JS单线程以及setTimeout的理解',
    desc: '```javascript\nsetTimeout(function() {\n\tsetTimeout(function() { console.log(1) }, 100)\n\tconsole.log(2)\n\tsetTimeout(function() { console.log(3) }, 0)\n}, 0)\nsetTimeout(function () {\n\tconsole.log(4)\n}, 100)\nconsole.log(5)\n```\n请说出上面代码的输出顺序以及原因？如果吧4改为101ms呢？',
    answer:
      '正确顺序为：5 2 3 4 1\n如果4改为101ms则执行顺序还是不变\n原因：\n1.  JS单线程\n2. setTimeout不在当前eventloop。且执行顺序依赖入队顺序。setTimeout 0是放入下一个loop的队尾\n3. 虽然4和1都是100ms延迟的标记，但是4先入队列。\n4. setTimeout的time是个标记，会在eventloop循环去检测，符合条件的执行，不符合条件的延后到下一个eventloop，这执行过程本身又有时间，因此尽管101&gt;100，但是在一个执行周期内，他们都会被触发，4先入队所以不变',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', 'js'],
  },
  {
    name: 'async & forEach 考察',
    desc: '以下代码的运行结果\n```javascript\nconst list = [1, 2, 3];\nconst square = num =&gt; {\n    return new Promise((resolve, reject) =&gt; {\n        setTimeout(() =&gt; {\n            resolve(num * num);\n        }, 1000);\n    });\n}\nfunction test() {\n    list.forEach(async x =&gt; {\n        const res = await square(x);\n        console.log(res);\n    });\n}\ntest()\n```\n如果希望每隔1s输出一个结果，应该如何改造？',
    answer:
      '1s 后输出 1 4 9  \n改为 for 循环：\n```javascript\nasync function test() {\n    for (let x of list) {\n        const res = await square(x);\n        console.log(res)\n    }\n}\n```\n',
    types: ['前端领域'],
    tags: ['编码', '代码阅读'],
  },
  {
    name: 'css单位的百分比',
    desc: '给一个div设置它父级div的宽度是100px，然后再设置它的padding-top为20%。 <br>\n问现在的div有多高？如果父级元素定位是absolute呢？',
    answer:
      '现有div的高度等于自身高度+父级块的宽度*20%,如果父级元素定位是absolute，结果不变；<br>\n当margin/padding取形式为百分比的值时，无论是left/right，还是top/bottom，都是以父元素的width为参照物的！<br>\n',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: 'NodeJS实现简单的HTTP代理和隧道代理',
    desc: 'Web代理一般包括普通的HTTP代理和隧道代理，谈谈理解。\nNodeJS实现一个简单的HTTP代理，如在本地 8888 端口开启 HTTP 代理服务，修改浏览器的 HTTP 代理为 127.0.0.1:8888 后再访问 HTTP 网站，代理可以正常工作\n对隧道代理了解多少，能否实现？',
    answer:
      'http普通代理：HTTP 客户端向代理发送请求报文，代理服务器需要正确地处理请求和连接（例如正确处理 Connection: keep-alive），同时向服务器发送请求，并将收到的响应转发给客户端。\n```\n// http 普通代理\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction request(cReq, cRes) {\n  const u = url.parse(cReq.url);\n\n  const options = {\n    hostname: u.hostname,\n    port: u.port || 80,\n    path: u.path,\n    method: cReq.method,\n    headers: cReq.headers\n  };\n\n  const pReq = http.request(options, pRes =&gt; {\n    cRes.writeHead(pRes.statusCode, pRes.headers);\n    pRes.pipe(cRes);\n  }).on(&#39;error&#39;, function(e) {\n    cRes.end();\n  });\n\n  cReq.pipe(pReq);\n}\n\nhttp.createServer().on(&#39;request&#39;, request).listen(8888, &#39;0.0.0.0&#39;);\n```\n隧道代理：HTTP 客户端通过 CONNECT 方法请求隧道代理创建一条到达任意目的服务器和端口的 TCP 连接，并对客户端和服务器之间的后继数据进行盲转发\n```\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction connect(cReq, cSock) {\n  const u = url.parse(&#39;http://&#39; + cReq.url);\n\n  const pSock = net.connect(u.port, u.hostname, function() {\n    cSock.write(&#39;HTTP/1.1 200 Connection Established\\r\\n\\r\\n&#39;);\n    pSock.pipe(cSock);\n  }).on(&#39;error&#39;, function(e) {\n    cSock.end();\n  });\n\n  cSock.pipe(pSock);\n}\n\nhttp.createServer().on(&#39;connect&#39;, connect).listen(8888, &#39;0.0.0.0&#39;);\n```\n合二为一\n```\nconst http = require(&#39;http&#39;);\nconst net = require(&#39;net&#39;);\nconst url = require(&#39;url&#39;);\n\nfunction request(cReq, cRes) {\n  const u = url.parse(cReq.url);\n\n  const options = {\n    hostname: u.hostname,\n    port: u.port || 80,\n    path: u.path,\n    method: cReq.method,\n    headers: cReq.headers\n  };\n\n  const pReq = http.request(options, pRes =&gt; {\n    cRes.writeHead(pRes.statusCode, pRes.headers);\n    pRes.pipe(cRes);\n  }).on(&#39;error&#39;, function(e) {\n    cRes.end();\n  });\n\n  cReq.pipe(pReq);\n}\n\nfunction connect(cReq, cSock) {\n  var u = url.parse(&#39;http://&#39; + cReq.url);\n\n  var pSock = net.connect(u.port, u.hostname, function() {\n    cSock.write(&#39;HTTP/1.1 200 Connection Established\\r\\n\\r\\n&#39;);\n    pSock.pipe(cSock);\n  }).on(&#39;error&#39;, function(e) {\n    cSock.end();\n  });\n\n  cSock.pipe(pSock);\n}\n\nhttp.createServer()\n  .on(&#39;request&#39;, request)\n  .on(&#39;connect&#39;, connect)\n  .listen(8888, &#39;0.0.0.0&#39;);\n```\n需要注意的是，大部分浏览器配完隧道代理，默认只会让https走隧道代理，http如果需要走隧道代理，还需要写个Nodejs的验证\n```\nconst options = {\n  hostname: &#39;127.0.0.1&#39;,\n  port: 8888,\n  path: &#39;toutiao.com:80&#39;,\n  method: &#39;CONNECT&#39;\n};\n\nconst req = http.request(options);\n\nreq.on(&#39;connect&#39;, function(res, socket) {\n  socket.write(&#39;GET / HTTP/1.1\\r\\n&#39; +\n    &#39;Host: toutiao.com\\r\\n&#39; +\n    &#39;Connection: Close\\r\\n&#39; +\n    &#39;\\r\\n&#39;);\n\n  socket.on(&#39;data&#39;, function(chunk) {\n    console.log(chunk.toString());\n  });\n\n  socket.on(&#39;end&#39;, function() {\n    console.log(&#39;socket end.&#39;);\n  });\n});\n\nreq.end();\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['代理'],
  },
  {
    name: '假设一个网页嵌入一个iframe,如何更改iframe内dom样式？',
    desc: '假设一个网页嵌入一个iframe,如何更改这个iframe内dom样式',
    answer:
      '区分同源和不同源解决方案，同源可以通过document.getElementById(&#39;iframeId&#39;).contentWindow.document，\n不同源：分iframe的嵌入的页面是否自己可控，可控可以通过postMessage方式更改，iframe页面监听message事件；如果页面不可控，应该无解。\n可以追问iframe有同源策略限制，举个例子说明',
    types: ['前端领域', '可视化'],
    tags: ['语言基础'],
  },
  {
    name: '数组随机排序',
    desc: '```javascript\nvar arr=[1,2,3,4,5,6]\n```\n',
    answer:
      '方法一、\n```javascript\narr.map(item=&gt;{\n    return {\n        value:item,\n        key:Math.random()\n    }\n})\n.sort((a,b)=&gt;a.key-b.key)\n.map(item=&gt;item.value)\n```\n方法二、\n```\nvar arrayToRand = (arr) =&gt; {\n    for(let i=0; i',
    types: ['前端领域'],
    tags: ['排序', '编码'],
  },
  {
    name: 'js事件模型',
    desc: '浏览器的事件模型？在当前的事件模型中，哪些事件可以冒泡，哪些不会冒泡，为什么？不冒泡的元素，如何来实现事件代理？',
    answer:
      '考察浏览器事件模型，看看是不是了解事件模型背后的设计意图。\n\n浏览器开发团队遇到的问题：页面上哪一部分会拥有某个特定的事件？比如单击一个嵌套的同心div，那么到底哪一个div会拥有这个点击事件？实际上难以确定点击者的意图，团队给出的解决方式是所有div都将拥有这个事件，于是产生了事件流模型。如上一个问题所述，“事件”的概念在GUI编程中如此之重要，而这种流式模型能给予其很大的灵活性和控制\n对于能精确确定意图的（这种冒泡的话一般也会带来问题，比如mouseleave），或者不可能产生嵌套的媒体类元素，冒泡就不是必须的；对于不冒泡的元素，可以在捕获阶段代理，DOM2级规范addEventListener的第三个参数',
    types: ['前端领域', 'JavaScript'],
    tags: ['js', '事件模型'],
  },
  {
    name: '请列举说明几个在web中实现长连接的技术方案或手段',
    desc: '本地主要考察候选人对长连接技术的概念理解和区分，如果能回答答出大致的名词可以继续追问一些具体的激技术实现细节和存在的优缺点等等。\n',
    answer:
      '参考答案：\n1. https://stackoverflow.com/questions/11077857/what-are-long-polling-websockets-server-sent-events-sse-and-comet/12855533#12855533\n1. https://blog.csdn.net/liang0000zai/article/details/40537059\n\n* Long Polling\n* Server-Sent Events\n* Websockets\n* Comet',
    types: ['前端领域'],
    tags: ['长连接', '基础概念', 'web'],
  },
  {
    name: '函数作用域',
    desc: '用代码实现JavaScript中Function的bind方法的polyfill',
    answer:
      '```\nif (!Function.prototype.bind) {\n  Function.prototype.bind = function (oThis) {\n    if (typeof this !== &#34;function&#34;) {\n      // closest thing possible to the ECMAScript 5\n      // internal IsCallable function\n      throw new TypeError(&#34;Function.prototype.bind - what is trying to be bound is not callable&#34;);\n    }\n\n    var aArgs = Array.prototype.slice.call(arguments, 1), \n        fToBind = this, \n        fNOP = function () {},\n        fBound = function () {\n          return fToBind.apply(this instanceof fNOP\n                                 ? this\n                                 : oThis || this,\n                               aArgs.concat(Array.prototype.slice.call(arguments)));\n        };\n\n    fNOP.prototype = this.prototype;\n    fBound.prototype = new fNOP();\n\n    return fBound;\n  };\n}\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['函数作用域'],
  },
  {
    name: 'CSS 属性 box-sizing的值有哪些？分别有什么含义？',
    desc: 'CSS 属性 box-sizing的值有哪些？分别有什么含义？',
    answer: '  - `content-box` 默认值，width内容宽度\n\t- `border-box` width 包含`padding`和`border`',
    types: ['前端领域', 'CSS'],
    tags: [],
  },
  {
    name: 'JS的new操作符具体做了什么',
    desc: 'JS的new操作符具体做了什么，描述一下，最好可以体现在代码上',
    answer:
      '```\nfunction A() {\n  this.name = &#39;a&#39;;\n  this.getName = function() {\n    return this.name;\n  }\n}\nvar a = new A();\n\nvar aa = new Object();\naa.__proto__ = A.prototype;\nA.call(aa);\n// 还有最后一步，如果发现A返回的是一个Object类（非primitive类型），则直接返回A的返回值，否则把aa返回出去\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['语言基础', '语言关键字', 'js'],
  },
  {
    name: 'JS编码二叉树的实现与遍历',
    desc: 'JS编码实现一个二叉树的构造函数，包括节点类Node，树类BST，插入节点函数insert，\n并且满足\n1.左子节点的值 &lt; 父节点的值 &lt;= 右子节点的值\n2.可以实现先序，中序，后续遍历',
    answer:
      '```\n// 二叉树\nfunction BST() {\n  this.root = null;\n}\n\nBST.prototype.insert = function(data) {\n  var n = new Node(data, null, null);\n  if (this.root === null) {\n    this.root = n;\n  } else {\n    var current = this.root;\n    for (;;) {\n      if (data &lt; current.data) {\n        if (current.left === null) {\n          current.left = n;\n          break;\n        } else {\n          current = current.left;\n        }\n      } else {\n        if (current.right === null) {\n          current.right = n;\n          break;\n        } else {\n          current = current.right;\n        }\n      }\n    }\n  }\n}\n\n// 先序遍历\nBST.prototype.preOrder = function(node) {\n  if (node !== null) {\n    console.log(node.show() + &#34; &#34;);\n    this.preOrder(node.left);\n    this.preOrder(node.right);\n  }\n}\n\n// 中序遍历\nBST.prototype.inOrder = function(node) {\n  if (node !== null) {\n    this.inOrder(node.left);\n    console.log(node.show() + &#34; &#34;);\n    this.inOrder(node.right);\n  }\n}\n\n// 后序遍历\nBST.prototype.postOrder = function(node) {\n  if (node !== null) {\n    this.postOrder(node.left);\n    this.postOrder(node.right);\n    console.log(node.show() + &#34; &#34;);\n  }\n}\n\n// 节点对象\nfunction Node(data, left, right) {\n  this.data = data;\n  this.left = left;\n  this.right = right;\n  this.show = function() {\n    return this.data;\n  }\n}\n\n// 测试代码\nvar bst = new BST();\nvar nums = [10, 3, 18, 2, 4, 13, 21, 9, 8, 9];\nfor (var i = 0; i &lt; nums.length; i++) {\n  bst.insert(nums[i]);\n}\nbst.preOrder(bst.root);\nbst.inOrder(bst.root);\nbst.postOrder(bst.root);\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['树', '基础算法', 'js'],
  },
  {
    name: '简述一下src与href的区别',
    desc: '描述一下html中的src与href的区别和使用场景是什么',
    answer:
      '基本答案：src用于指向外部资源的位置替换当前元素，href用于在当前文档和引用资源之间确立联系。\n1.  src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；\n在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。\n\n浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。\n这也是为什么将js脚本放在底部而不是头部。\n \n1.  href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果我们在文档中添加\n\n那么浏览器会识别该文档为css文件，就会并行下载资源并且不会停止对当前文档的处理。\n这也是为什么建议使用link方式来加载css，而不是使用@import方式。',
    types: ['前端领域', 'HTML'],
    tags: [],
  },
  {
    name: 'js运行机制',
    desc: '下面一段代码的输出：\n```\n(function() {\n  console.log(&#39;this is the start&#39;);\n  setTimeout(function cb() {\n    console.log(&#39;this is a msg from call back&#39;);\n  });\n  console.log(&#39;this is just a message&#39;);\n  setTimeout(function cb1() {\n    console.log(&#39;this is a msg from call back1&#39;);\n  }, 0);\n  console.log(&#39;this is the end&#39;);\n})();\n```',
    answer:
      '因为前端编程基本属于「Event-driven programming」范式，这是GUI之类的交互式程序的基础，区别于传统的批处理式编程。一个页面上的交互行为，基本都是由用户发起的，然而用户的行为意图是难以预测的，所以需要异步的驱动机制来应对\n因此有进一步问题：\n平时都说JS是单线程执行的，那它是如何实现非阻塞式执行页面JS的？<br>\n考察对EventLoop概念的理解，核心是会在调用栈之外建立一个Event Table。可以将Event Table想象成一个电话注册本：调用栈会告诉event table注册一些特定的函数，并且在指定事件发生时会调用他们。当这些指定事件发生时，event table仅仅是简单地把要调用的函数移入Event Queue中去。event queue提供了一个简单等待区域，函数在此区域内等待被移入调用栈进行调用。\n『究竟什么情况下，event queue中的函数才会被移入调用栈中？』。实际上，JavaScript 遵从一个简单的法则：存在一个监控进程不断检查调用栈是否为空，当调用栈为空的时候，检查事件队列（event queue）中是否有待调用的函数。如果事件队列中存在待调用的函数，队列头部的函数被移入调用栈执行。如果事件队列为空，监控进程就保持轮询状态。\n这意味着js中的定时器的精度，实际上是没有保障的，你写一个setTimeout(function(){ do xxxx}, 1000)； 并没办法保证它刚好是在1000ms之后调用，因为之前的代码执行可能非常耗时，也可能事件队列中有其他事件排在前面。 这样就出现了题目中的情况。\n更多可参考：http://metaphor.space/2016/04/26/javascript-event-loop/；  https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop；还有《你不知道的Javascript中卷》141页~143页，事件循环章节\n\n值得一提的是：我们平常说JS是单线程执行的，但浏览器不是，浏览器是多线程的，有的线程负责网络请求，有的负责渲染页面等；不要搞混了\n\n另外，ES6给JS带来了新的特性，比如加入了可以创建多线程的worker，以及更精准控制事件调度的Promise',
    types: ['前端领域', 'JavaScript'],
    tags: ['js'],
  },
  {
    name: '请问for of和for in的区别',
    desc: 'for of和for in的区别？ for of可以用在普通对象上吗？',
    answer:
      '考察候选人对for 循环的理解 以及对es6中的for of和iterator理解\n\nfor in不多做解释了 for of主要是对实现了 Symbol.iterator 接口进行遍历\n\n自定义for of\n```\nvar iterable = {\n  [Symbol.iterator]() {\n    return {\n      i: 0,\n      next() {\n        if (this.i &lt; 3) {\n          return { value: this.i++, done: false };\n        }\n        return { value: undefined, done: true };\n      }\n    };\n  }\n};\n```',
    types: ['前端领域', 'JavaScript'],
    tags: ['编码'],
  },
  {
    name: '字符串的排列组合计算',
    desc: '输入一个字符串，打印出该字符串中字符的所有排列的情况。例如输入字符串abc，则打印出由字符a、b、c所能排列出来的所有字符串abc、acb、bac、bca、cab和cba.\n```javascript\nfunction calc(str){\n    var strArray = str.split(&#39;&#39;);\n    // 补全代码\n  }\n  console.log(calc(&#39;ab&#39;)) // [&#39;a&#39;,&#39;b&#39;]  [&#39;b&#39;,&#39;a&#39;]\n```',
    answer:
      '```javascript\nfunction calc(str){\n    var strArray = str.split(&#39;&#39;);\n    var path = [];\n    var docalc = function(array){\n      if(array.length===1){\n        path.push(array[0]);\n        console.log(path);\n        path.pop();\n        return;\n      }\n      for(var i=0;i',
    types: ['前端领域'],
    tags: ['递归', '排列组合', '编码'],
  },
  {
    name: 'DOM中哪些事件是不冒泡的，如何判断事件是不是可以冒泡？',
    desc: 'DOM中哪些事件是不冒泡的，如何判断事件是不是可以冒泡？',
    answer:
      '*  不冒泡的事件有blur、focus、load、unload、abort、error、mouseenter、mouseleave、resize\n*  每个 event 都有一个event.bubbles属性，通过该属性可知是否冒泡',
    types: ['前端领域'],
    tags: ['事件', '基础概念'],
  },
  {
    name: 'JavaScript实现对象深拷贝方法',
    desc: '编码实现JavaScript实现对象深拷贝',
    answer:
      'var clone = function(v) {  \n  var o = v.constructor === Array ? [] : {};  \n  for (var i in v) {  \n    o[i] = typeof v[i] === &#34;Object&#34; ? clone(v[i]) : v[i];  \n  }  \n  return o;  \n}  ',
    types: ['前端领域'],
    tags: ['语言基础', '编码'],
  },
  {
    name: '故障分析-HTTPS证书不被信任',
    desc: '<p>如下图，在不同的设备上，同时访问同一个域名，一个设备显示证书不被信任，另一个设备正常，再使用多个其他设备访问，依然正常。分析可能的原因？以及需要获取的进一步的信息？</p><p>正常的设备</p><img src="https://tosv.byted.org/obj/pgc-fes/marvel/ssl_success.png" width="375" alt="ssl_success.png"><p>异常的设备</p><img src="https://tosv.byted.org/obj/pgc-fes/marvel/ssl_error.png" width="375" alt="ssl_error.png"><p><br></p>',
    answer:
      '<p>需要进行的进一步的操作：</p><p>1) 查看证书详情：路径/SN/哈希值</p><p>2) 查看DNS解析结果</p><p>3) 查看系统时间/版本/浏览器版本</p><p>可能的原因：</p><p>1) 代理工具/安全软硬件</p><p>2) DNS劫持/路由劫持</p><p>3) 时间偏差</p><p>4) 操作系统/浏览器版本差异</p>',
    types: ['前端领域', '浏览器'],
    tags: ['HTTPS', '分析'],
  },
  {
    name: '请实现一个CodingMan函数实现以下功能',
    desc: '<p><br></p><pre><code>实现一个CodingMan，可以按照以下方式调用:\nCodingMan(“Hank”)输出:\nHi! This is Hank!\n\nCodingMan(“Hank”).sleep(10).eat(“dinner”)\n输出\nHi! This is Hank!\n//等待10秒..\nWake up after 10\nEat dinner~\n\nCodingMan(“Hank”).eat(“dinner”).eat(“supper”)\n输出\nHi This is Hank!\nEat dinner~\nEat supper~\n\nCodingMan(“Hank”).sleepFirst(5).eat(“supper”)\n输出\n//等待5秒\nWake up after 5\nHi This is Hank!\nEat supper\n以此类推。</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>class _CodingMan {\n    constructor(name) {\n        this.tasks = [];\n        const task = () =&gt; {\n            console.log(`Hi! This is ${name}`);\n            this.next();\n        }\n        this.tasks.push(task);\n        setTimeout(() =&gt; {               // 把 this.next() 放到调用栈清空之后执行\n            this.next();\n        }, 0);\n    }\n\n    next() {\n        const task = this.tasks.shift(); // 取第一个任务执行\n        task &amp;&amp; task();\n    }\n\n    sleep(time) {\n        this._sleepWrapper(time, false);\n        return this;                     // 链式调用\n    }\n\n    sleepFirst(time) {\n        this._sleepWrapper(time, true);\n        return this;\n    }\n\n    _sleepWrapper(time, first) {\n        const task = () =&gt; {\n            setTimeout(() =&gt; {\n                console.log(`Wake up after ${time}`);\n                this.next();\n            }, time * 1000)\n        }\n        if (first) {\n            this.tasks.unshift(task);     // 放到任务队列顶部\n        } else {\n            this.tasks.push(task);        // 放到任务队列尾部\n        }\n    }\n\n    eat(name) {\n        const task = () =&gt; {\n            console.log(`Eat ${name}`);\n            this.next();\n        }\n        this.tasks.push(task);\n        return this;\n    }\n}\n\nfunction CodingMan(name) {\n    return new _CodingMan(name);\n}\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['事件轮询机制', '队列', '链式调用', '编码', '闭包'],
  },
  {
    name: '实现如下函数add,使如下执行都等于9 ',
    desc: '<p><br></p><pre><code>add(2,3,4)=9\nadd(2)(3,4)=9\nadd(2)(3)(4)=9\nadd(2,3)(4)=9</code></pre><p><br></p>',
    answer:
      '<p>// 较通用的实现</p><p>function currying(fn, length) {</p><p> length = length || fn.length; \t</p><p> return function (...args) {\t\t\t</p><p>  return args.length &gt;= length\t</p><p>  \t? fn.apply(this, args)\t\t\t</p><p>   : currying(fn.bind(this, ...args), length - args.length) </p><p> }</p><p>}</p><p>function add(...args) {</p><p>\treturn args.reduce((t, i) =&gt; t+=i)</p><p>}</p><p>var newAdd = currying(add, 3)</p><p><br></p><p>// 通用实现2</p><p>function currying(fn, length) {</p><p>\treturn function(...args) {</p><p>\t\tif (args.length &gt;= length) {</p><p>\t\t\treturn args.slice(0, length).reduce((t, i) =&gt; t += i);</p><p>\t\t}</p><p>\t\treturn function(..._args) {</p><p>\t\t\treturn add.apply(null, [...args, ..._args]);</p><p>\t\t}</p><p>\t}</p><p>}</p><p>function add(...args) {</p><p>\treturn args.reduce((t, i) =&gt; t+=i)</p><p>}</p><p>var newAdd = currying(add, 3)</p><p><br></p><p>// 直接的实现</p><p>function add(...args) {</p><p>\tif (args.length &gt;= 3) {</p><p>\t\treturn args.slice(0, 3).reduce((t,i) =&gt; t += i);</p><p>\t}</p><p>\treturn function(..._args) {</p><p>\t\treturn add(args.concat(_args));</p><p>\t}</p><p>}</p>',
    types: ['前端领域'],
    tags: ['编码', '柯里化'],
  },
  {
    name: '介绍一下你了解的 WebSocket',
    desc: '简单介绍一下 WebSocket，ws 协议和 http 协议的关系是什么，WebSocket 如何校验权限？ WebSocket 如何实现 SSL 协议的安全连接？',
    answer:
      'WebSocket 是基于 http 的，所以建立 WebSocket 连接前，\n浏览器会通过 http 的方式请求服务器建立连接，\n这个时候可以通过 http  的权限校验方式来校验 WebSocket，比如设置 Cookie。\n同理，WebSocket 实现 SSL 协议也同 https 类似，会升级为 wss 连接。\n另外，当然也可以在 WebSocket 中还可以通过加密或者 token 等方式，实现自己额外的加密传输和权限判断方式。\n更多可参考 https://security.tencent.com/index.php/blog/msg/119\n',
    types: ['前端领域'],
    tags: ['基础概念', 'websocket'],
  },
  {
    name: '请谈谈iframe有哪些缺点？',
    desc: 'iframe通常有哪些用途，主要缺点是什么',
    answer:
      '（1）iframe会阻塞主页面的Onload事件；\n（2）搜索引擎的检索程序无法解读这种页面，不利于SEO;\n（3）iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。\n（4）页面简的通信问题\n使用iframe之前需要考虑这（1）（3）两个缺点。\n如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。',
    types: ['前端领域', '工程构建'],
    tags: [],
  },
  {
    name: '请简述JAVAScript事件模型和事件代理',
    desc: '简述一下JavaScript事件模型和事件代理，事件代理有哪些优点？',
    answer:
      '## 事件模型\n事件三个阶段：事件捕获，目标，事件冒泡（低版本ie不支持捕获阶段）\n## 事件代理及优点： \n把事件委托到其父对象上，借助事件冒泡机制，实现对节点的事件代理。  \n### 优点  \n*  可以大量节省内存占用，减少事件注册\n*  当新增子对象时无需再次对其绑定事件，对于动态内容部分尤为合适',
    types: ['前端领域', 'JavaScript'],
    tags: ['事件', '事件模型'],
  },
  {
    name: '根据id从多叉树里面查找出对应的节点的name',
    desc: '<p><br></p><pre><code>一个树形的数据(如下数据)，面试官给你一个id，然后拿到对应的name?\n  var cityData = [\n      {\n        id: 1,\n        name: &#39;广东省&#39;,\n        children: [\n          {\n            id: 11,\n            name: &#39;深圳&#39;,\n            children: [\n              {\n                id: 111,\n                name: &#39;宝安&#39;,\n                children: [\n                  {\n                    id: 1111,\n                    name: &#39;西乡&#39;,\n                    children:[\n                      {\n                        id: 11111,\n                        name: &#39;坪洲&#39;,\n                        children:[]\n                      },\n                      {\n                        id: 11112,\n                        name: &#39;灵芝&#39;,\n                        children:[]\n                      }\n                    ]\n                  },\n                  {\n                    id: 1112,\n                    name: &#39;南山&#39;,\n                    children:[\n                      {\n                        id: 11121,\n                        name: &#39;科技园&#39;,\n                        children:[]\n                      }\n                    ]\n                  }\n                ]\n              },\n              {\n                id: 112,\n                name: &#39;福田&#39;,\n                children: []\n              }\n            ]\n          },\n          {\n            id: 12,\n            name: &#39;广州&#39;,\n            children: [\n              {\n                id: 122,\n                name: &#39;白云区&#39;,\n                children: [\n                  {\n                    id: 1222,\n                    name: &#39;白云区&#39;,\n                    children: []\n                  }\n                ]\n              },\n              {\n                id: 122,\n                name: &#39;珠海区&#39;,\n                children: []\n              }\n            ]\n          }\n        ]\n      },\n      {\n        id: 2,\n        name: &#39;湖南省&#39;,\n        children: []\n      }\n    ];\n</code></pre><p><br></p>',
    answer:
      '<p><br></p><pre><code>主要考查深度/广度优先遍历,递归算法\n方法1:递归\n\nlet result = &#39;&#39;\n\n// 递归实现\nconst recursion = (cityData, id) =&gt; {\n  // cityData数据为空的时候直接返回\n  if (!cityData || !cityData.length) return;\n  // 常规循环cityData\n  for (let i = 0, len = cityData.length; i &lt; len; i++) {\n    const childs = cityData[i].children;\n    \n    // 如果匹配到id的话，就是我们要的结果\n    if (cityData[i].id === id) {\n      result = cityData[i].name\n    }\n    // 如果还有子节点，执行递归\n    if(childs &amp;&amp; childs.length &gt; 0){\n      recursion(childs, id);\n    }\n  }\n  return result\n};\n\nconst r = recursion(cityData, 11112);\nconsole.log(r) // 灵芝\n\n\n方法2:广度优先遍历\nlet result = &#39;&#39;\n\nconst range = (cityData, id) =&gt; {\n  if (!cityData || !cityData.length) return;\n  // 定义一个数据栈\n  let stack = [];\n\n  let item = null;\n\n  //先将第一层节点放入栈\n  for (var i = 0, len = cityData.length; i &lt; len; i++) {\n    stack.push(cityData[i]);\n  }\n\n  while (stack.length) {\n    // 将数据栈的第一个取出来\n    item = stack.shift();\n    // 如果符合就赋值给result\n    if (item.id === id) {\n      result = item.name\n    }\n    //如果该节点有子节点，继续添加进入栈底\n    if (item.children &amp;&amp; item.children.length) {\n      stack = stack.concat(item.children);\n    }\n  }\n  return result\n};\n\nlet r1 = range(cityData, 11112);\n\nconsole.log(r1) // 灵芝\n\n\n方法3:深度优先遍历\nlet result = &#39;&#39;\n\nconst deep = (cityData, id) =&gt; {\n  // 没有数据直接返回\n  if (!cityData || !cityData.length) return;\n  // 先定义一个数据栈\n  let stack = []\n  let item = null\n\n  //先将第一层节点放入数据栈\n  for (var i = 0, len = cityData.length; i &lt; len; i++) {\n    stack.push(cityData[i])\n  }\n  // 循环\n  while (stack.length) {\n    item = stack.shift()\n    if (item.id === id) {\n      result = item.name\n    }\n    //如果该节点有子节点，继续添加进入栈顶\n    if (item.children &amp;&amp; item.children.length) {\n      // 注意这里调换了顺序\n      stack = item.children.concat(stack);\n    }\n  }\n  return result\n};\n\nlet r3 = deep(cityData, 11112)\nconsole.log(r3) // 灵芝\n\n\n方法4:正则\n\nconst regular = (cityData, id) =&gt; {\n  // 没有数据直接返回\n  if (!cityData || !cityData.length) return;\n  // 数据转成字符串\n  let cityStr = JSON.stringify(cityData)\n  // 定义正则\n  let reg = new RegExp(`&#34;id&#34;:${id},&#34;name&#34;:&#34;([^\\\\x00-\\\\xff]+)&#34;,`)\n  // 取到正则的子字符串并返回\n  return (cityStr.match(reg))[1]\n}\n\nlet r4 = regular(cityData, 11112);\n\nconsole.log(r4) // 灵芝\n\n</code></pre><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', '基础算法'],
  },
  {
    name: 'js浮点运算',
    desc: 'console.info(0.7+0.1)会得到什么',
    answer: '输出0.799999\n',
    types: ['前端领域', 'JavaScript'],
    tags: ['ES', 'js'],
  },
  {
    name: 'macro micro 任务队列（async/await版）',
    desc: '<p>async function async1() {</p><p> console.log(&#39;async1 start&#39;);</p><p> await async2();</p><p> console.log(&#39;async1 end&#39;);</p><p>}</p><p>async function async2() {</p><p> console.log(&#39;async2 start&#39;);</p><p> return new Promise((resolve, reject) =&gt; {</p><p>  resolve();</p><p>  console.log(&#39;async2 promise&#39;);</p><p> })</p><p>}</p><p>console.log(&#39;script start&#39;);</p><p>setTimeout(function() {</p><p> console.log(&#39;setTimeout&#39;);</p><p>}, 0);  </p><p>async1();</p><p>new Promise(function(resolve) {</p><p> console.log(&#39;promise1&#39;);</p><p> resolve();</p><p>}).then(function() {</p><p> console.log(&#39;promise2&#39;);</p><p>}).then(function() {</p><p> console.log(&#39;promise3&#39;);</p><p>});</p><p>console.log(&#39;script end&#39;);</p>',
    answer:
      '<p>chrome 和 node 都是以下顺序</p><img src="http://tosv.byted.org/obj/ttfe/nodebb/1563171801424-5d2c1bd9fcb820021a6b13dc.png" width="375" alt=""><p><br></p>',
    types: ['前端领域'],
    tags: ['编码', 'async'],
  },
];

export default info;
