
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "antd/dist/antd.css";` 
      }
    }
  }
})
