import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import router from './router'
import elementPlus from './plugins/element-plus'

createApp(App).use(router).use(autoAnimatePlugin).use(elementPlus).mount('#app')
