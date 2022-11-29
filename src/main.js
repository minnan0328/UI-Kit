import './styles/index.scss';
import './assets/icon-fonts/icon-font.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import plugin from './plugins/plugin';

createApp(App).use(router).use(createPinia()).use(plugin).mount('#app');
