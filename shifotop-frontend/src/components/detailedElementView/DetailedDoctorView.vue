<template>
  <div class="detailed-doctor-container">
    <div class="detailed-doctor-card">
      <div class="detailed-doctor-header">
        <img class="detailed-doctor-image" :src="doctorDetails.profilePicture || defaultImage" alt="Doctor's profile" />
        <h1 class="detailed-doctor-name">{{ doctorDetails.firstname }} {{ doctorDetails.lastname }}</h1>
        <div class="doctor-specialities" v-if="doctorDetails.specialities && doctorDetails.specialities.length">
          <h3>Specialities:</h3>
          <ul class="specialities-list">
            <li v-for="speciality in doctorDetails.specialities" :key="speciality.name">
              {{ speciality.name }}
            </li>
          </ul>
        </div>
        <div class="doctor-rating" v-if="doctorDetails.rating || doctorDetails.reviews">
          <div v-if="doctorDetails.rating" class="rating">
          <StarRating :rating="doctorDetails.rating" />
          </div>
          <div v-if="doctorDetails.reviews" class="reviews">
            <span>{{ doctorDetails.reviews.length }} reviews</span>
          </div>
        </div>
        <div class="doctor-price" v-if="doctorDetails.price">
          <span>Price: {{ doctorDetails.price }} soums</span>
        </div>
      </div>
      <div class="detailed-doctor-body">
        <p class="detailed-doctor-experience" v-if="doctorDetails.experience">Experience: {{ doctorDetails.experience }} years</p>
        <p class="detailed-doctor-description" v-if="doctorDetails.bio">Bio: {{ doctorDetails.bio }}</p>
        <div class="detailed-doctor-contact" v-if="doctorDetails.phoneNumber || doctorDetails.email">
          <p class="detailed-doctor-phone" v-if="doctorDetails.phoneNumber">Phone: {{ doctorDetails.phoneNumber }}</p>
          <p class="detailed-doctor-email" v-if="doctorDetails.email">Email: {{ doctorDetails.email }}</p>
        </div>
        <router-link to="/doctors" class="back-button">← Back to List</router-link>
      </div>

      <div class="clinics-container" v-if="doctorDetails.clinics && doctorDetails.clinics.length">
        <h2 class="clinics-title">Associated Clinics</h2>
        <div class="clinics-list">
          <div v-for="clinic in doctorDetails.clinics" :key="clinic.id" class="clinic-card">
            <div class="clinic-image-wrapper">
              <img class="clinic-image" :src="clinic.image || defaultClinicImage" alt="Clinic" />
            </div>
            <div class="clinic-details">
              <h3 class="clinic-name">{{ clinic.name }}</h3>
              <p class="clinic-address">{{ clinic.address }}</p>
              <p class="clinic-phone">Phone: {{ clinic.phoneNumber }}</p>
              <p class="clinic-supervisor">Supervisor: {{ clinic.supervisorName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="reviews-container" v-if="doctorDetails.reviews && doctorDetails.reviews.length">
      <h3 class="reviews-title">Reviews:</h3>
      <ul class="reviews-list">
        <li v-for="review in doctorDetails.reviews" :key="review.id" class="review-item">
          <div class="review-content">{{ review.content }}</div>
          <div class="review-date">{{review.reviewTime }}</div>
        </li>
      </ul>
    </div>
  </div>

  
  
</template>

<script>
import defaultImage from '@/assets/default-doctor.png';
import axios from 'axios';
import StarRating from '@/components/StarRating.vue';
import defaultClinicImage from '@/assets/default-clinic-image.png';


export default {
  name: 'DetailedDoctorView',
  components: {
    StarRating
  },
  data() {
    return {
      doctorDetails: {},
      defaultImage,
      defaultClinicImage
    };
  },
  created() {
    this.fetchDoctorDetails();
  },
  methods: {
    fetchDoctorDetails() {
      axios.get(`http://localhost:8081/api/v1/doctors/${this.$route.params.doctorId}`)
      .then(response => {
        // Normalize the data in case of discrepancies
        const normalizedData = {
          ...response.data,
          specialities: Array.isArray(response.data.specialities) ? response.data.specialities : [],
          reviews: Array.isArray(response.data.reviews) ? response.data.reviews : []
        };
        this.doctorDetails = normalizedData;
        console.log(this.doctorDetails);
      })
      .catch(error => {
        console.error('There was an error fetching the doctor details:', error);
      });
    },

    formatReviewDate(dateString) {
      // Format the review date here. You could use a library like moment.js
      // or the Intl.DateTimeFormat API for more complex formatting.
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    }
  }
};
</script>

<style scoped>
.detailed-doctor-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.detailed-doctor-card {
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  background: #ffffff;
}

.detailed-doctor-header {
  background-color: #f4f4f4;
  text-align: center;
  padding: 2rem;
}

.detailed-doctor-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  object-fit: cover;
  transform: translateY(-50%);
}

.detailed-doctor-name {
  margin-top: -60px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.doctor-specialities {
  font-size: 1rem;
  color: #666;
  margin-top: 1rem;
}

.specialities-list {
  list-style: none;
  padding: 0;
  text-align: center;
}

.specialities-list li {
  display: inline;
  margin: 0.5rem;
  background: #eef;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-weight: 500;
}

.detailed-doctor-body {
  padding: 2rem;
  line-height: 1.6;
}

.detailed-doctor-experience, .detailed-doctor-description, .detailed-doctor-contact {
  margin-bottom: 1rem;
}

.detailed-doctor-phone, .detailed-doctor-email {
  font-weight: bold;
}

.back-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 0.3rem;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
}

.rating, .reviews, .doctor-price {
  text-align: center;
  margin: 0.5rem 0;
}

/* Additional styles for the rating stars */
/* You will need to add your custom styling or component for the stars */
.rating span {
  /* Your styles for the rating */
}

.reviews span {
  /* Your styles for the review count */
}

.doctor-price span {
  /* Your styles for the price */
  font-weight: bold;
  color: #e53935; /* Example color for the price */
}


.reviews-container {
  margin-top: 2rem;
}

.reviews-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.reviews-list {
  list-style-type: none;
  padding: 0;
}

.review-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.review-rating {
  /* Style for the rating section of the review */
}

.review-content {
  font-style: italic;
  color: #555;
}

.review-date {
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.5rem;
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
  object-fit: cover; /* Ensures the aspect ratio is maintained and the image fills the area */
  border-radius: 8px; /* Adjust as needed, softens edges */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); /* Optional: Adds a shadow to help blend edges */
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
}

.clinic-address, .clinic-phone, .clinic-supervisor {
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #7f8c8d;
}

@media only screen and (max-width: 600px) {
  .clinics-list {
    flex-direction: column;
  }

  .clinic-card {
    flex: 0 1 auto;
  }
}
</style>
