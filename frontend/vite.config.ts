import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from "path" 

export default defineConfig({
  define: {
    global: 'window'
  },
  optimizeDeps: {
    include: ['sockjs-client']
  },
  plugins: [react(), tailwindcss()],
  server: {
    port: 4200, 
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
