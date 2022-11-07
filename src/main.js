import './styles/index.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import plugin from './plugins/plugin';

createApp(App).use(router).use(createPinia()).use(plugin).mount('#app');
