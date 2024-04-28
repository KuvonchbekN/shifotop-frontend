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
import AboutCompany from "@/components/footerComps/AboutCompany.vue";
import AboutProject from "@/components/footerComps/AboutProject.vue";
import Press from "@/components/footerComps/PressComp.vue";
import ReviewBattle from "@/components/footerComps/ReviewBattle.vue";
import VacanciesComp from "@/components/footerComps/VacanciesComp.vue";
import SocialMedia from "@/components/footerComps/SocialMedia.vue";
import PatientInfo from "@/components/footerComps/PatientInfo.vue";
import ClinicInfo from "@/components/footerComps/ClinicInfo.vue";
import CitiesComp from "@/components/footerComps/CitiesComp.vue";
import RegionsComp from "@/components/footerComps/RegionsComp.vue";
import HelpComp from "@/components/footerComps/HelpComp.vue";
import PerformancesComp from "@/components/footerComps/PerformancesComp.vue";
import ContactComp from "@/components/footerComps/ContactComp.vue";
import TermsComp from "@/components/footerComps/TermsComp.vue";
import CabinetComp from "@/components/mainPage/CabinetComp.vue";

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
        {name: 'cabinet', path:'/cabinet', component: CabinetComp},

        //footer elements
        {name: 'searchResults', path: '/search', component: SearchResults},
        { name: 'aboutCompany', path: '/about-company', component: AboutCompany },
        { name: 'aboutProject', path: '/about-project', component: AboutProject },
        { name: 'press', path: '/press', component: Press },
        { name: 'performances', path: '/performances', component: PerformancesComp },
        { name: 'reviewBattle', path: '/review-battle', component: ReviewBattle },
        { name: 'vacancies', path: '/vacancies', component: VacanciesComp },
        { name: 'socialMedia', path: '/social-media', component: SocialMedia },
        { name: 'contact', path: '/contact', component: ContactComp },
        { name: 'help', path: '/help', component: HelpComp },
        { name: 'patientInfo', path: '/patient-info', component: PatientInfo },
        { name: 'clinicInfo', path: '/clinic-info', component: ClinicInfo },
        { name: 'cities', path: '/cities', component: CitiesComp },
        { name: 'regions', path: '/regions', component: RegionsComp },
        { name: 'terms', path: '/terms', component: TermsComp },
    ]
})


createApp(App).use(router).mount('#app');
