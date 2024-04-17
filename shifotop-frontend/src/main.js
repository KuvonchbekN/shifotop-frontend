import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import HomeComp from './components/mainPage/HomeComp.vue';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import ItemDetails from './components/mainPage/ItemDetails.vue';
import CategoryViewComp from './components/mainPage/CategoryViewComp.vue';
import SubcategoryComp from './components/mainPage/SubcategoryComp.vue';

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'home', path: '/', component: HomeComp },
        { name: 'itemDetails', path: '/:type/:itemId', component: ItemDetails, props: true },
        { name: 'categoryView', path: '/:category', component: CategoryViewComp, props: true },
        { name: 'subcat', path: '/details/:type/:itemName', component: SubcategoryComp, props: true }
    ]
})


createApp(App).use(router).mount('#app');
