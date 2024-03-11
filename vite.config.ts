import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  server: {
    open: true
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'route-animation',
      fileName: (format) => `route-animation.${format}.js`
    },
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      //В пакет не входит external. Пользователь сам это ставит
      external: ['react', 'react-dom','react-router-dom'],//, '@emotion/react', '@emotion/styled', '@mui/material'
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
})
