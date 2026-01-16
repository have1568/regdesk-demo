import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // 前端启动端口
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // 后端地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''), // /api/todos -> /todos
      },
    },
  },
});