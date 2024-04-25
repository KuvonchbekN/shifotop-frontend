<template>
    <div class="search-results">
        <section v-if="searchResults.doctors.length">
            <h2>Doctors</h2>
            <ul class="results-list doctors">
                <li v-for="doctor in searchResults.doctors" :key="doctor.id" class="doctor-item">
                    <div class="doctor-details">
                        <h3 class="doctor-name">{{ doctor.firstname }} {{ doctor.lastname }}</h3>
                        <p class="doctor-phone">Phone: {{ doctor.phoneNumber }}</p>
                        <p class="doctor-price">Price: {{ doctor.price }} soums</p>
                        <StarRating :rating="doctor.rating" />
                        <span class="reviews">{{ doctor.reviews.length }} reviews</span>
                    </div>
                    <router-link :to="{ name: 'doctorDetails', params: { doctorId: doctor.id } }" class="view-profile">
                        View Profile
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
                        <p class="clinic-phone">Phone: {{ clinic.phoneNumber }}</p>
                        <p class="clinic-supervisor">Supervisor: {{ clinic.supervisorName }}</p>
                        <StarRating :rating="clinic.rating" />
                        <span class="reviews">{{ clinic.reviews.length }} reviews</span>
                    </div>
                    <router-link :to="{ name: 'clinicDetails', params: { clinicId: clinic.id } }" class="view-details">
                        View Details
                    </router-link>
                </li>
            </ul>
        </section>

        <!-- Services Section (if needed) -->
        <!-- No results message -->
        <p v-if="isEmptySearchResults" class="no-results">
            No results found for "{{ this.$route.query.q }}"
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import StarRating from '../StarRating.vue';

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

/* StarRating component styles if needed */
.star-rating {
    color: #ffd700;
    /* Gold color for stars */
}

.clinic-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    /* Spacing between cards */
    justify-content: flex-start;
    /* Align cards to the start of the container */
}

.clinic-card {
    flex: 1;
    /* Allows the card to grow */
    min-width: calc(33.333% - 1rem);
    /* Three items per row, minus the gap */
    max-width: calc(33.333% - 1rem);
    /* Same as min-width to prevent growth beyond 33.333% */
    min-height: 200px;
    /* Minimum height for all cards */
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    box-sizing: border-box;
    /* Include padding and border in the width and height */
    display: flex;
    /* Makes the card a flex container */
    flex-direction: column;
    /* Stack items vertically */
    justify-content: space-between;
    /* Distribute space evenly */
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

@media (max-width: 768px) {
    .clinic-card {
        /* On smaller screens, let the card take full width minus the gap */
        min-width: calc(100% - 1rem);
        max-width: calc(100% - 1rem);
    }
}
</style>