import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true
  },
  build: {
    lib: {
      entry: path.resolve("src", 'src/RouteAnimation/RouteAnimation.jsx'),
      name: 'route-animation',
      fileName: (format) => `route-animation.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
})
