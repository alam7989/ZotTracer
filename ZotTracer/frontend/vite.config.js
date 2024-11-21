import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({ 
  define: {
    "process.env.IS_PREACT": JSON.stringify("true"),
  },
  plugins: [react()],
})
