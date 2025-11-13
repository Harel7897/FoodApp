import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // מאפשר גישה לכל הכתובות ברשת (0.0.0.0)
    port: 5173, // אופציונלי: ניתן לשנות את הפורט אם צריך
  }
})
