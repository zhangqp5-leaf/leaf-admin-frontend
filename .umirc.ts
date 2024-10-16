import { defineConfig } from '@umijs/max';
import { routes } from './src/route';

export default defineConfig({
  antd: {
    appConfig: {},
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'leaf-admin',
  },
  routes,
  npmClient: 'pnpm',
  plugins: [require.resolve('@umijs/plugins/dist/unocss')],
  unocss: {
    // 检测 className 的文件范围，若项目不包含 src 目录，可使用 `pages/**/*.tsx`
    watch: ['src/**/*.tsx'],
  },
  // 配置代理
  proxy: {
    '/api': {
      // target: 'http://192.168.2.181:2119/',
      // target: 'http://192.168.2.181:7001/',
      target: 'http://122.51.12.76:7001/',
      changeOrigin: true,
      // rewrite: (path) => path.replace(/^\/api/, ''),
    },
    // '/socket.io': {
    //   target: 'ws://192.168.2.181:2119/',
    //   changeOrigin: true,
    //   // rewrite: (path: string) => path.replace(/^\/socket/, ''),
    // },
  },
});
