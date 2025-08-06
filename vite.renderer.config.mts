import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions:{
      input: {
        main: 'index.html',
        "tray-menu": 'tray-menu.html',
      }
    }
  }

});
