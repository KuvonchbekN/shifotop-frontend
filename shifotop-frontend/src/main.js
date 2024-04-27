import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import HomeComp from './components/mainPage/HomeComp.vue';
import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import SubcategoryComp from './components/mainPage/SubcategoryComp.vue';
import DoctorsComp from './components/categoryElementsList/DoctorsComp.vue';
import ClinicsComp from './components/categoryElementsList/ClinicsComp.vue';
import ServicesComp from './components/categoryElementsList/ServicesComp.vue';
import DetailedDoctorView from './components/detailedElementView/DetailedDoctorView.vue';
import DetailedClinicView from './components/detailedElementView/DetailedClinicView.vue';
import SearchResults from './components/search/SearchResults.vue';
import DetailedServiceView from "@/components/detailedElementView/DetailedServiceView.vue";

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {name: 'home', path: '/', component: HomeComp},
        {name: 'subcat', path: '/details/:type/:itemName', component: SubcategoryComp, props: true},
        {name: 'doctorDetails', path: '/doctors/:doctorId', component: DetailedDoctorView, props: true},
        {name: 'clinicDetails', path: '/clinics/:clinicId', component: DetailedClinicView, props: true},
        {name: 'serviceDetails', path: '/services/:serviceId', component: DetailedServiceView, props: true},
        //I am adding them, because having only one generic comp for all 4 created a problem for showing different UI for each comp.
        {name: 'doctors', path: '/doctors', component: DoctorsComp},
        {name: 'clinics', path: '/clinics', component: ClinicsComp},
        {name: 'services', path: '/services', component: ServicesComp},
        {name: 'searchResults', path: '/search', component: SearchResults}
    ]
})


createApp(App).use(router).mount('#app');
