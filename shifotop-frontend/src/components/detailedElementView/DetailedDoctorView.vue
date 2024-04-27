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
        <p class="detailed-doctor-experience" v-if="doctorDetails.experience">Experience: {{ doctorDetails.experience }}
          years</p>
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
              <StarRating :rating="clinic.rating" />
              <p class="clinic-address">{{ clinic.address.regionName }}, {{ clinic.address.cityName }}, {{
                clinic.address.addressName }}</p>
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


    <div class="reviews-container" v-if="doctorDetails.reviews && doctorDetails.reviews.length">
      <!-- adding review for this specific clinic feature -->
      <div class="review-form">
        <h3>Add a review for this doctor:</h3>
        <textarea v-model="newReview.content" placeholder="Write your review here..."></textarea>
        <div class="submit-rating">
          <label for="rating">Your Rating:</label>
          <select v-model="newReview.rating" id="rating">
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
        </div>
        <button @click="submitReview">Submit Review</button>
      </div>

      <h3 class="reviews-title">Reviews:</h3>
      <ul class="reviews-list">
        <li v-for="review in doctorDetails.reviews" :key="review.id" class="review-item">
          <div class="review-content">{{ review.content }}</div>
          <div class="review-date">{{ review.reviewTime }}</div>
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
      defaultClinicImage,
      newReview: {
        rating: 5, // Default to 5 stars
        content: '',
      },
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
          this.doctorDetails = {
            ...response.data,
            specialities: Array.isArray(response.data.specialities) ? response.data.specialities : [],
            reviews: Array.isArray(response.data.reviews) ? response.data.reviews : []
          };
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
    },

    submitReview() {
      console.log(this.newReview);
      if(this.newReview.content.trim().length === 0){
        alert("You cannot submit empty form");
        return;
      }
      const doctorId = this.$route.params.doctorId;
      const reviewData = {
        ...this.newReview,
        doctorId: doctorId,
      };
      axios.post(`http://localhost:8081/api/v1/doctors/${doctorId}/reviews`, reviewData)
        .then(response => {
          // Add the new review to the list of reviews without refreshing the page
          this.doctorDetails.reviews.push(response.data);
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

.detailed-doctor-experience,
.detailed-doctor-description,
.detailed-doctor-contact {
  margin-bottom: 1rem;
}

.detailed-doctor-phone,
.detailed-doctor-email {
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

.rating,
.reviews,
.doctor-price {
  text-align: center;
  margin: 0.5rem 0;
}

.doctor-price span {
  /* Your styles for the price */
  font-weight: bold;
  color: #e53935;
  /* Example color for the price */
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

@media only screen and (max-width: 600px) {
  .clinics-list {
    flex-direction: column;
  }

  .clinic-card {
    flex: 0 1 auto;
  }
}
</style>
