import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({path: '../.env'});

const PORT = process.env.DASHBOARD_PORT ? parseInt(process.env.DASHBOARD_PORT, 10) : 3000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: PORT
  },
  preview: {
    port: PORT
  }
})
