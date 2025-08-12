import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    tailwindcss(),
    svgr(),
  ],
  build: {
    rollupOptions:{
      input: {
        main: 'index.html',
        "tray-menu": 'tray-menu.html',
      }
    }
  }

});
