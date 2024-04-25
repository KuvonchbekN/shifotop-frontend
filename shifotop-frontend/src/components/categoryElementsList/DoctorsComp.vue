<template>
  <div class="doctor-container">
    <div class="doctor-card" v-for="doctor in doctors" :key="doctor.id">
      <div class="doctor-image">
        <img :src="doctor.profilePicture || defaultImage" alt="Doctor's profile" />
      </div>
      <div class="doctor-details">
        <h2 class="doctor-name">{{ doctor.firstname }} {{ doctor.lastname }}</h2>
        <p class="doctor-specialty">{{ doctor.specialities.map(speciality => speciality.name).join(', ') }}</p>
        <div class="doctor-experience">Experience: {{ doctor.yearOfExperience }} years</div>
        <div class="doctor-rating">
          <StarRating :rating="doctor.rating" /> <!-- Use the StarRating component -->
          <span class="reviews">{{ doctor.reviews.length }} reviews</span>
        </div>
        <div class="doctor-contact">
          <p class="doctor-phone">{{ doctor.phoneNumber }}</p>
          <router-link :to="{ name: 'doctorDetails', params: { doctorId: doctor.id } }" class="details-button">
            View Profile
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import defaultImage from '@/assets/default-doctor.png'; // Assume you have a default image for doctors
// Import your star-rating component if you have one
import StarRating from '@/components/StarRating.vue';

export default {
  components: {
    StarRating
  },
  data() {
    return {
      doctors: [],
      defaultImage
    };
  },
  created() {
    this.fetchDoctors();
  },
  methods: {
    async fetchDoctors() {
      console.log("fetching list of doctors");
      try {
        const response = await axios.get('http://localhost:8081/api/v1/doctors');
        this.doctors = response.data;
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    }
  }
};
</script>

<style scoped>
.doctor-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
}

.doctor-card {
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.doctor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.doctor-image img {
  width: 100%;
  height: auto;
  display: block;
}

.doctor-details {
  padding: 1rem;
  text-align: center;
}

.doctor-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

.doctor-specialty {
  font-size: 0.9rem;
  color: #757575;
  margin: 0.5rem 0;
}

.doctor-experience {
  font-size: 0.9rem;
  color: #424242;
}

.doctor-rating .stars {
  color: #ffd700;
  /* Gold color for stars */
}

.doctor-rating .reviews {
  font-size: 0.8rem;
  color: #757575;
  margin-left: 0.5rem;
}

.doctor-contact .doctor-phone {
  font-size: 0.9rem;
  color: #424242;
  margin: 0.5rem 0;
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
</style>