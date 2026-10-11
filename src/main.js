import { createSSRApp } from 'vue'
import App from './App.vue'
import './common/runtime.js'

export function createApp() {
  const app = createSSRApp(App)
  return { app }
}