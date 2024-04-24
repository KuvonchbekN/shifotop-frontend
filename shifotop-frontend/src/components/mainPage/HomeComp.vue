<template>
  <div class="home">
    <HeaderComp />

    <main class="main-content">
      <p class="description">Website for reviews of Doctors No.1 in Uzbekistan</p>
      <SearchBarComp />

      <section class="popular-section">
        <h2 class="popular-heading">
          <i class="fas fa-fire icon-style"></i> Popular in Tashkent
        </h2>
        <div class="category-cards">
          <CategoryCardComp title="Doctors" :count="doctorsCount" :items="doctorItems" :type="'doctors'" buttonText="All Doctors"/>
          <CategoryCardComp title="Clinics" :count="clinicsCount" :items="clinicItems" :type="'clinics'" buttonText="All Clinics"/>
          <CategoryCardComp title="Services" :count="servicesCount" :items="serviceItems" :type="'services'" buttonText="All Services"/>
          <!-- <CategoryCardComp title="Diagnostics" :count=0 :items="diagnosticItems" :type="'diagnostics'" buttonText="All Diagnostics"/> -->
        </div>
      </section>
    </main>

    <FooterComp />
  </div>
</template>

<script>
import axios from 'axios'; // Import axios to make requests to the backend
import HeaderComp from "@/components/mainPage/HeaderComp.vue";
import CategoryCardComp from "@/components/mainPage/CategoryCardComp.vue";
import FooterComp from "@/components/mainPage/FooterComp.vue";
import SearchBarComp from "@/components/mainPage/SearchBarComp.vue";

export default {
  components: {
    HeaderComp,
    SearchBarComp,
    CategoryCardComp,
    FooterComp
  },
  data() {
    return {
      doctorsCount : 0,
      clinicsCount : 0,
      servicesCount : 0,
      diagnosticsCount : 0,

      doctorItems: [],
      clinicItems: [],
      serviceItems: [],
      diagnosticItems: [],
      
      //these are for fetch all endpoints, not sure if they work correctly 
      doctorsData: null,
      clinicsData: null,
      servicesData: null,
      diagnosticsData: null,
    };
  },
  created(){
    this.fetchData();
  },
  methods:{
    async fetchData(){
      try {
        const doctorsCount  = await axios.get('http://localhost:8081/api/v1/doctors/doctors-count');
        const clinicsCount  = await axios.get('http://localhost:8081/api/v1/clinics/clinics-count');
        const servicesCount = await axios.get('http://localhost:8081/api/v1/services/count');
        // const diagnosticsCount = await axios.get(''); this feature is not implemented yet in backend


        const doctorResponse  = await axios.get('http://localhost:8081/api/v1/doctors/speciality-count');
        const clinicResponse  = await axios.get('http://localhost:8081/api/v1/clinics/speciality-count');
        const serviceResponse = await axios.get('http://localhost:8081/api/v1/clinics/by-services');
        // const diagnosticResponse = await axios.get('/api/diagnostics');

        // Assuming the API returns an array of items with 'name' and 'count' properties
        this.doctorItems = doctorResponse.data;
        this.clinicItems = clinicResponse.data;
        this.serviceItems = serviceResponse.data;
        console.log(this.doctorItems );
        console.log(this.clinicItems );
        console.log(this.serviceItems );

        // this.diagnosticItems = diagnosticResponse.data;

        this.doctorsCount = doctorsCount.data;
        this.clinicsCount = clinicsCount.data;
        this.servicesCount = servicesCount.data;
        // this.diagnosticsCount = diagnosticsCount;
      } catch (error) {
        console.error('There was an error fetching the data:', error);
        // Handle the error as you see fit (e.g., user notification, logging, etc.)
      }
    }  
  }
};
</script>

<style>
.description {
  font-weight: 900;
  text-align: center;
  font-size: 1.4rem;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.popular-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  /* Adjust the background color as needed */
}

.popular-heading {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.popular-heading i{
  color: #ed2227;
}


.category-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* This creates a responsive grid */
  gap: 20px;
  margin-bottom: 20px;
}
 
/* Responsive adjustments */
@media (max-width: 768px) {
  .category-cards {
    grid-template-columns: 1fr;
    /* Stack the cards on smaller screens */
  }
}
</style>
