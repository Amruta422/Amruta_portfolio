import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Amruta_portfolio/', // MUST match your GitHub repo name exactly
});