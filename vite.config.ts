/*
 * @Author: zhouran
 * @Date: 2022-05-10 10:57:23
 * @LastEditors: zhouran
 * @LastEditTime: 2022-07-19 16:02:19
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
import viteCompression from 'vite-plugin-compression';
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
      viteCompression(),
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
      sourcemap: false,
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
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks: (id, { getModuleInfo }) => {
            // if (id.includes('node_modules')) {
            //   return id.toString().split('node_modules/')[1].split('/')[0].toString();
            // }
            const match = /.*\.strings\.(\w+)\.js/.exec(id);
            if (match) {
              const language = match[1]; // e.g. "en"
              const dependentEntryPoints = [];

              // we use a Set here so we handle each module at most once. This
              // prevents infinite loops in case of circular dependencies
              const idsToHandle = new Set(getModuleInfo(id).dynamicImporters);

              for (const moduleId of idsToHandle) {
                const { isEntry, dynamicImporters, importers } = getModuleInfo(moduleId);
                if (isEntry || dynamicImporters.length > 0) dependentEntryPoints.push(moduleId);

                // The Set iterator is intelligent enough to iterate over elements that
                // are added during iteration
                for (const importerId of importers) idsToHandle.add(importerId);
              }

              // If there is a unique entry, we put it into a chunk based on the entry name
              if (dependentEntryPoints.length === 1) {
                return `${dependentEntryPoints[0].split('/').slice(-1)[0].split('.')[0]}.strings.${language}`;
              }
              // For multiple entries, we put it into a "shared" chunk
              if (dependentEntryPoints.length > 1) {
                return `shared.strings.${language}`;
              }
            }
          },

          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js', // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: '[ext]/[name].[hash].[ext]', // 拆分js到模块文件夹 // chunkFileNames: (chunkInfo) => { //     const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []; //     const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'; //     return `js/${fileName}/[name].[hash].js`; // },
        },
      },
    },
  };
});
