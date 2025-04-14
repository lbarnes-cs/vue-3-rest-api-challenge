// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';

import { vuetify } from './plugins/vuetify';

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

// Import global styles
import './assets/styles/main.scss';

const app = createApp(App);

// Create a query client instance
const queryClient = new QueryClient();

// Use plugins
app.use(vuetify);
app.use(VueQueryPlugin, { queryClient });

app.mount('#app');
