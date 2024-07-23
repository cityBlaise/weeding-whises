import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  server: {
    host: true,
    port: process.env.VITE_PORT?parseInt(process.env.VITE_PORT,10): 5173,
    watch:{
      usePolling:true
    }
  },
})
