<template>
  <div class="detailed-clinic-container">
    <div class="detailed-clinic-card">
      <div class="detailed-clinic-header">
        <div class="clinic-image-wrapper">
          <img class="detailed-clinic-image" :src="clinicDetails.image || defaultClinicImage" alt="Clinic's profile" />
        </div>
        <div class="clinic-header-details">
          <h1 class="detailed-clinic-name">{{ clinicDetails.name }}</h1>
          <h2 class="clinic-official-name">{{ clinicDetails.officialName }}</h2>
          <p class="detailed-clinic-address">
            <!-- Use v-if/v-else to handle the existence of the address object -->
            <span v-if="clinicDetails.address">{{ clinicDetails.address.regionName }}, {{ clinicDetails.address.cityName
              }}, {{ clinicDetails.address.addressName }}</span>
            <span v-else>Address not available</span>
          </p>
          <!-- Rating stars -->
          <div class="clinic-rating">
            <StarRating :rating="clinicDetails.rating" />
          </div>
        </div>
      </div>
      <div class="detailed-clinic-info">
        <div class="clinic-contact-info">
          <h3>Aloqa</h3>
          <p class="clinic-phone">Telefon raqami: {{ clinicDetails.phoneNumber }}</p>
          <p class="clinic-supervisor">Javobgar shaxs: {{ clinicDetails.supervisorName }}</p>
        </div>
        <div class="clinic-services">
          <h3>Ko'rsatiladigan xizmatlar</h3>
          <ul>
            <li v-for="service in clinicDetails.medicalServices" :key="service.id">
              {{ service.name }} - {{ service.cost }} so'm
            </li>
          </ul>
        </div>
      </div>
      <div class="clinic-doctors">
        <h3>Bu shifoxonadagi shifokorlar:</h3>
        <div class="doctor-cards-container">
          <div class="doctor-card" v-for="doctor in clinicDetails.doctors" :key="doctor.id">
            <div class="doctor-info">
              <h4 class="doctor-name">{{ doctor.firstname }} {{ doctor.lastname }}</h4>
              <p class="doctor-experience">{{ doctor.experience }} yillik tajriba</p>
              <StarRating :rating="doctor.rating" />
            </div>
            <router-link :to="{ name: 'doctorDetails', params: { doctorId: doctor.id } }" class="view-doctor-button">
              Malumotlarni ko'rish
            </router-link>
          </div>
        </div>
      </div>
      <div class="clinic-reviews">
        <h3>Izohlar:</h3>
        <div class="clinic-rating">
          <!-- <StarRating :rating="clinicDetails.rating" /> -->
          <span>{{ clinicDetails.reviews?.length }} izohlar</span>
        </div>
        <ul>
          <li v-for="review in clinicDetails.reviews" :key="review.id">
            <blockquote class="review-content">{{ review.content }}</blockquote>
            <cite class="review-date">{{ formatReviewDate(review.reviewTime) }}</cite>
          </li>
        </ul>
      </div>

      <!-- adding review for this specific clinic feature -->
      <div class="review-form">
        <h3>Izoh qoldirish:</h3>
        <div class="submit-rating">
          <textarea v-model="newReview.content" placeholder="Izohingizni shu yerga yozing..."></textarea>
          <label for="rating">Baholash:</label>
          <select v-model="newReview.rating" id="rating">
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
        </div>
        <button @click="submitReview">Izoh qoldirish</button>
      </div>
    </div>
    <router-link to="/clinics" class="back-button">← Barcha shifoxonalar</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import defaultClinicImage from '@/assets/default-clinic-image.png';
import StarRating from '@/components/StarRating.vue';

export default {
  name: 'DetailedClinicView',
  components: {
    StarRating
  },
  data() {
    return {
      clinicDetails: {},
      defaultClinicImage,
      newReview: {
        rating: 5, // Default to 5 stars
        content: '',
      },
    }
  },
  created() {
    this.fetchClinicDetails();
  },
  methods: {
    fetchClinicDetails() {
      const clinicId = this.$route.params.clinicId;
      axios.get(`http://localhost:8081/api/v1/clinics/${clinicId}`)
        .then(response => {
          this.clinicDetails = response.data;
          console.log(this.clinicDetails);
        })
        .catch(error => {
          console.error('There was an error fetching the clinic details:', error);
        });
    },

    formatReviewDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    },
    // adding the review method
    submitReview() {
      if(this.newReview.content.trim().length === 0){
        alert("You cannot submit empty form");
        return;
      }

      const clinicId = this.$route.params.clinicId;
      const reviewData = {
        ...this.newReview,
        clinicId: clinicId,
      };
      axios.post(`http://localhost:8081/api/v1/clinics/${clinicId}/reviews`, reviewData)
        .then(response => {
          // Add the new review to the list of reviews without refreshing the page
          this.clinicDetails.reviews.push(response.data);
          // Clear the form
          this.newReview.content = '';
          this.newReview.rating = 5;
          location.reload();
        })
        .catch(error => {
          console.error('There was an error posting the review:', error);
        });
      }
  }
}
</script>

<style scoped>
.detailed-clinic-container {
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.detailed-clinic-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.clinic-image-wrapper {
  margin-top: -60px;
}

.detailed-clinic-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
}

.detailed-clinic-header {
  text-align: center;
  padding: 1rem;
  background-color: #f4f4f4;
  width: 100%;
  position: relative;
}

.detailed-clinic-name {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.5rem;
  color: #333;
}

.clinic-official-name {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1rem;
}

.detailed-clinic-address {
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
}

.detailed-clinic-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* Divide the container into two columns */
  gap: 2rem;
  /* Add space between the columns */
  border-top: 1px solid #eaeaea;
  padding-top: 1rem;
  margin-top: 1rem;
}

.clinic-contact-info,
.clinic-services {
  padding: 1rem;
  background-color: #f9f9f9;
  /* A light background to visually separate the sections */
  border-radius: 8px;
  /* Rounded corners for aesthetics */
}

/* Adjust h3 styles to add more spacing and differentiate the sections */
.clinic-contact-info h3,
.clinic-services h3 {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ccc;
  /* A subtle line under the section title */
  color: #333;
  font-size: 1.2rem;
}

.clinic-phone,
.clinic-supervisor {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.clinic-services ul,
.clinic-doctors ul,
.clinic-reviews ul {
  list-style: none;
  padding: 0;
}

.clinic-services li,
.clinic-doctors li,
.clinic-reviews li {
  background: #f9f9f9;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
}

.clinic-doctors {
  margin-top: 2rem;
  width: 100%;
}

.clinic-reviews {
  margin-top: 2rem;
  width: 100%;
}

.review-content {
  quotes: "“" "”" "‘" "’";
  font-style: italic;
  display: block;
  margin-bottom: 0.5rem;
}

.review-date {
  font-size: 0.85rem;
  color: #999;
  text-align: right;
}

.back-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  align-self: flex-start;
}

.back-button:hover {
  background-color: #0056b3;
}

.clinic-doctors {
  margin-top: 1rem;
}

.clinic-doctors h3 {
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
}

.doctor-cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}

.doctor-card {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  width: calc(50% - 1rem); /* Two items per row */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.doctor-info {
  margin-bottom: 1rem;
}

.doctor-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.doctor-experience {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.view-doctor-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
  align-self: center;
}

.view-doctor-button:hover {
  background-color: #0056b3;
}

.review-form {
  margin-top: 1rem;
}

.review-form h3 {
  margin-bottom: 0.5rem;
}

.review-form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  height: 100px; /* You can adjust the height */
}

.submit-rating {
  margin-bottom: 0.5rem;
}

.submit-rating label {
  margin-right: 0.5rem;
}

.review-form button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.review-form button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {

  .doctor-card {
    width: 100%; /* Full width on smaller screens */
  }

  .detailed-clinic-info {
    grid-template-columns: 1fr;
    /* Stack the sections on top of each other on smaller screens */
  }

  .clinic-contact-info,
  .clinic-services {
    /* Optionally, remove or adjust padding and background on smaller screens for a tighter layout */
    padding: 0.5rem;
    background-color: transparent;
    border-radius: 0;
  }

  /* Adjust heading styles on smaller screens if needed */
  .clinic-contact-info h3,
  .clinic-services h3 {
    font-size: 1rem;
  }

  .back-button {
    align-self: center;
  }

  .clinic-rating {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
  }
}
</style>
