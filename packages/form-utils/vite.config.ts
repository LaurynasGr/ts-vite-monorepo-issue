import path from 'path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    sourcemap: false,
    target: 'esnext',
    emptyOutDir: false,
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        '@demo/utils',
      ],
    },
  },
});
