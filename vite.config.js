import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "kiri-ui-package", //输出文件名称
    lib: {
      entry: "./package/index.js", //指定组件编译入口文件
      name: "kiri-ui-package",
      fileName: "kiri-ui-package",
    }, //库编译模式配置
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    }, // rollup打包配置
  },
  esbuild: {
    drop: ["console"],
  },
});
