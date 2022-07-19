/*
 * @Author: zhouran
 * @Date: 2022-05-10 10:57:23
 * @LastEditors: zhouran
 * @LastEditTime: 2022-05-30 10:22:21
 * @Description:
 */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import svgLoader from 'vite-svg-loader';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// 20220526 该插件会引起项目 debugger 异常
// import VueSetupExtend from 'vite-plugin-vue-setup-extend'; // setup name 增强，可以直接在 setup 上注明名称，便于keep-alive 和 递归 时使用

const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
  '@': pathResolve('src'),
};
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: './',
    plugins: [
      vue(),
      vueJsx(),
      svgLoader(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      AutoImport({
        // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
        dts: 'src/auto-imports.d.ts',
        imports: ['vue'],
      }),
      // VueSetupExtend(),
    ],
    resolve: {
      alias,
    },
    // 指定传递给 CSS 预处理器的选项，地址：https://vitejs.cn/config/#css-preprocessoroptions
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/index.scss";',
        },
      },
    },
    // 开发服务器选项，地址： https://vitejs.cn/config/#server-options
    server: {
      port: 8082,
      https: false,
      // open: true,
      // proxy: {
      //   '/api': {
      //     target: 'http://124.223.98.68:3000',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },

    build: {
      // @ts-ignore
      sourcemap: true,
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      outDir: 'music',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: command !== 'serve',
          drop_debugger: command !== 'serve',
        },
      },
    },
  };
});
