<template>
  <div class="detailed-service-container">
    <div class="detailed-service-card">
      <h1 class="service-title">{{ serviceDetails.name }}</h1>
      <!-- Add other service details here -->
      <p>Cost: {{ serviceDetails.cost }} soums</p>

      <!--showing associated clinics with this service-->
      <div class="clinics-container" v-if="serviceDetails.clinics && serviceDetails.clinics.length">
        <h2 class="clinics-title">Associated Clinics</h2>
        <div class="clinics-list">
          <div v-for="clinic in serviceDetails.clinics" :key="clinic.id" class="clinic-card">
            <div class="clinic-image-wrapper">
              <img class="clinic-image" :src="clinic.image || defaultClinicImage" alt="Clinic"/>
            </div>
            <div class="clinic-details">
              <h3 class="clinic-name">{{ clinic.name }}</h3>
              <StarRating :rating="clinic.rating"/>
              <p class="clinic-phone">Phone: {{ clinic.phoneNumber }}</p>
              <p class="clinic-supervisor">Contact Person: {{ clinic.supervisorName }}</p>
            </div>
            <router-link :to="{ name: 'clinicDetails', params: { clinicId: clinic.id } }" class="details-button">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import StarRating from "@/components/StarRating.vue";
import defaultClinicImage from '@/assets/default-clinic-image.png';


export default {
  name: 'DetailedServiceView',
  components: {
    StarRating
  },
  data() {
    return {
      serviceDetails: {},
      defaultClinicImage
    };
  },
  created() {
    this.fetchServiceDetails();
  },
  methods: {
    fetchServiceDetails() {
      const serviceId = this.$route.params.serviceId;
      axios.get(`http://localhost:8081/api/v1/services/${serviceId}`)
          .then(response => {
            this.serviceDetails = response.data;
            console.log(this.serviceDetails);
          })
          .catch(error => {
            console.error('Error fetching service details:', error);
          });
    }
  }
};
</script>

<style scoped>
.detailed-service-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.detailed-service-card {
  width: 100%;
  max-width: 700px;
  border: 1px solid #eaecef;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 2rem;
  text-align: center;
}

.service-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.associated-clinics {
  margin-top: 2rem;
}

.associated-clinics h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.associated-clinics ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.associated-clinics li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eaecef;
}

.clinics-container {
  margin-top: 2rem;
}

.clinics-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.clinics-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.clinic-card {
  border: 1px solid #eaecef;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: box-shadow 0.3s;
}

.clinic-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.clinic-image-wrapper {
  width: 100%;
  height: 150px;
  background: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clinic-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.clinic-details {
  padding: 1rem;
  text-align: left;
}

.clinic-name {
  font-size: 1.2rem;
  color: #333;
}

.clinic-phone, .clinic-supervisor {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.details-button {
  display: block;
  background-color: #0056b3;
  color: #fff;
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  border-radius: 4px;
  text-decoration: none;
}

.details-button:hover {
  background-color: #003f8a;
}

.clinics-container {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
}

.clinics-title {
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: left;
  border-bottom: 2px solid #2ecc71;
  display: inline-block;
  padding-bottom: 5px;
}

.clinics-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
}

.clinic-card {
  flex: 0 1 300px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.clinic-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.clinic-image-wrapper {
  height: 200px;
  overflow: hidden;
}

.clinic-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  /* Ensures the aspect ratio is maintained and the image fills the area */
  border-radius: 8px;
  /* Adjust as needed, softens edges */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  /* Optional: Adds a shadow to help blend edges */
}

.clinic-image-wrapper:hover .clinic-image {
  transform: scale(1.1);
}

.clinic-details {
  padding: 15px;
  text-align: left;
}

.clinic-name {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #34495e;
  text-decoration: none
}

.clinic-address,
.clinic-phone,
.clinic-supervisor {
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #7f8c8d;
  text-decoration: none !important;
}

.details-button {
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  background-color: #0056b3;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.details-button:hover {
  background-color: #003f8a;
}

/* Add your styles for the detailed service view */
</style>
