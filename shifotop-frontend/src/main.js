import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import DoctorsDisplayComp from './components/listPages/DoctorsDisplayComp.vue';
import HomeComp from './components/mainPage/HomeComp.vue';
import ClinicsDisplayComp from './components/listPages/ClinicsDisplayComp.vue';
import ServicesDisplayComp from './components/listPages/ServicesDisplayComp.vue';
import DiagnosticsDisplayComp from './components/listPages/DiagnosticsDisplayComp.vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeComp },
        { path: '/doctors', component: DoctorsDisplayComp },
        { path: '/clinics', component: ClinicsDisplayComp },
        { path: '/services', component: ServicesDisplayComp },
        { path: '/diagnostics', component: DiagnosticsDisplayComp },
        // { path: '/', component: HomeComp },
    ]
})
  

createApp(App).use(router).mount('#app');
