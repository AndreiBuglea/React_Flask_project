import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['daiptest.e-uvt.ro'],
    proxy: {
      '/api': {
        target: 'http://10.66.7.1:5000',
        changeOrigin: true
      },
      '/static': {        // << aici adăugăm static
        target: 'http://10.66.7.1:5000',
        changeOrigin: true
      }
    }
  }
})







//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//export default defineConfig({
//  plugins: [react()],
///})
