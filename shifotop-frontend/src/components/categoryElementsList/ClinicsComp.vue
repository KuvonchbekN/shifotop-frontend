<template>
  <div class="clinic-container">
    <div class="clinic-card" v-for="clinic in clinics" :key="clinic.id">
      <div class="clinic-image">
        <img :src="clinic.profilePicture || defaultClinicImage" alt="Clinic's profile" />
      </div>
      <div class="clinic-details">
        <h2 class="clinic-name">{{ clinic.name }}</h2>
        <StarRating :rating="clinic.rating" />
        <p class="clinic-address">
          {{ clinic.address.regionName }}, {{ clinic.address.cityName }}, {{ clinic.address.addressName }}
        </p>
        <p class="clinic-phone">Telefon raqami: {{ clinic.phoneNumber }}</p>
        <router-link :to="{ name: 'clinicDetails', params: { clinicId: clinic.id } }" class="details-button">
          Malumotlarni ko'rish
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import defaultClinicImage from '@/assets/default-clinic-image.png'; // Ensure this path is correct
import StarRating from '../StarRating.vue';

export default {
  name: 'ClinicComp',
  components:{
    StarRating
  },
  data() {
    return {
      clinics: [],
      defaultClinicImage
    };
  },
  created() {
    this.fetchClinics();
  },
  methods: {
    async fetchClinics() {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/clinics');
        this.clinics = response.data;
        console.log(this.clinics);
      } catch (error) {
        console.error('Error fetching clinics:', error);
      }
    }
  }
};
</script>

<style scoped>
.clinic-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
}

.clinic-card {
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background: #fff;
}

.clinic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.clinic-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.clinic-details {
  padding: 1rem;
  text-align: center;
}

.clinic-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #333;
}

.clinic-address {
  font-size: 1rem;
  color: #757575;
}

.clinic-phone {
  font-size: 1rem;
  color: #424242;
  margin: 1rem 0;
}

.details-button {
  padding: 0.5rem 1rem;
  background-color: #0056b3;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  align-self: center;
  margin-bottom: 1rem;
}

.details-button:hover {
  background-color: #003f8a;
}

@media only screen and (max-width: 600px) {
  .clinic-container {
    padding: 1rem;
  }

  .clinic-card {
    width: 100%;
    max-width: 340px;
  }
}
</style>
