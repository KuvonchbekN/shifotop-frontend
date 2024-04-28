<template>
  <HeaderComp/>
  <div class="search-results">
    <section v-if="searchResults.doctors.length">
      <h2>Doctors</h2>
      <ul class="results-list doctors">
        <li v-for="doctor in searchResults.doctors" :key="doctor.id" class="doctor-item">
          <div class="doctor-details">
            <h3 class="doctor-name">{{ doctor.firstname }} {{ doctor.lastname }}</h3>
            <p class="doctor-phone">Telefon nomeri: {{ doctor.phoneNumber }}</p>
            <p class="doctor-price">Narxi: {{ doctor.price }} so'm</p>
            <StarRating :rating="doctor.rating"/>
            <span class="reviews">{{ doctor.reviews.length }} izohlar</span>
          </div>
          <router-link :to="{ name: 'doctorDetails', params: { doctorId: doctor.id } }" class="view-profile">
            Malumotlarni ko'rish
          </router-link>
        </li>
      </ul>
    </section>

    <section v-if="searchResults.clinics.length">
      <h2>Clinics</h2>
      <ul class="results-list clinics">
        <li v-for="clinic in searchResults.clinics" :key="clinic.id" class="clinic-item">
          <div class="clinic-details">
            <h3 class="clinic-name">{{ clinic.name }}</h3>
            <p class="clinic-phone">Telefon raqami: {{ clinic.phoneNumber }}</p>
            <p class="clinic-supervisor">Javobgar shaxs: {{ clinic.supervisorName }}</p>
            <StarRating :rating="clinic.rating"/>
            <span class="reviews">{{ clinic.reviews?.length }} izohlar</span>
          </div>
          <router-link :to="{ name: 'clinicDetails', params: { clinicId: clinic.id } }" class="view-details">
            Malumotlarni ko'rish
          </router-link>
        </li>
      </ul>
    </section>

    <section v-if="searchResults.services?.length">
      <h2>Medical Services</h2>
      <div class="service-container">
        <div class="service-card" v-for="service in searchResults.services" :key="service.id">
          <div class="service-details">
            <h2 class="service-name">{{ service.name }}</h2>
            <p class="service-cost">Xizmat Narxi: {{ service.cost }} so'm</p>
            <router-link :to="{ name: 'serviceDetails', params: { serviceId: service.id } }" class="details-button">
              Malumotlarni ko'rish
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <p v-if="isEmptySearchResults" class="no-results">
      No results found for "{{ this.$route.query.q }}"
    </p>
  </div>
  <FooterComp/>
</template>

<script>
import axios from 'axios';
import StarRating from "@/components/StarRating.vue";
import HeaderComp from "@/components/mainPage/HeaderComp.vue";
import FooterComp from "@/components/mainPage/FooterComp.vue";

export default {
  data() {
    return {
      searchResults: {
        doctors: [],
        clinics: [],
        services: [],
      },
    };
  },
  components: {
    FooterComp,
    HeaderComp,
    StarRating
  },
  created() {
    this.fetchSearchResults();
  },
  methods: {
    async fetchSearchResults() {
      const searchTerm = this.$route.query.q;
      if (!searchTerm || searchTerm.length === 0) {
        alert("You cannot search for an empty term");
      }
      console.log("clicked");
      try {
        const response = await axios.get(`http://localhost:8081/api/v1/search?term=${encodeURIComponent(searchTerm)}`);
        this.searchResults = response.data;
        console.log(this.searchResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  },
  computed: {
    isEmptySearchResults() {
      return (
          !this.searchResults.doctors?.length &&
          !this.searchResults.clinics?.length &&
          !this.searchResults.services?.length
      )
    },
  }
}
</script>

<style scoped>
.search-results {
  padding: 1rem;
}

.results-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.results-list li {
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  flex: 1;
  min-width: 250px;
  /* minimum width for each card */
  padding: 1rem;
  transition: box-shadow 0.3s ease;
}

.results-list li:hover {
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

.doctor-details,
.clinic-details {
  margin-bottom: 1rem;
}

.doctor-name,
.clinic-name {
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
}

.doctor-phone,
.clinic-phone,
.doctor-price,
.clinic-supervisor {
  font-size: 1rem;
  margin: 0;
}

.view-profile,
.view-details {
  background-color: #007bff;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
  display: inline-block;
  margin-top: 0.5rem;
}

.view-profile:hover,
.view-details:hover {
  background-color: #0056b3;
}

.no-results {
  text-align: center;
  font-style: italic;
  margin-top: 2rem;
}

/* Responsive layout adjustments */
@media (max-width: 768px) {
  .results-list {
    flex-direction: column;
  }
}

.clinic-details {
  /* Flex item, it will grow to take the available height */
  flex: 1;
}

.view-details {
  align-self: center;
  /* Center button in the card */
  margin-top: auto;
  /* Push the button to the bottom */
}
</style>