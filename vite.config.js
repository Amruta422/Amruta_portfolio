import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'portifolio' with your exact GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/Amruta_portfolio/',  // <-- MUST match your GitHub repo name exactly
})