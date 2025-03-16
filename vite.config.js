import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true
  },
  // Ensure assets are properly handled
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.gif'],
})
