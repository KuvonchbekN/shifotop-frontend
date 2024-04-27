<template>
  <div class="service-container">
    <div class="service-card" v-for="service in services" :key="service.id">
      <div class="service-details">
        <h2 class="service-name">{{ service.name }}</h2>
        <p class="service-cost">Cost: {{ service.cost }} soums</p>
        <router-link :to="{ name: 'serviceDetails', params: { serviceId: service.id } }" class="details-button">
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ServiceComp',
  data() {
    return {
      services: [],
    };
  },
  created() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/services');
        this.services = response.data;
        console.log(this.services);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }
  }
};
</script>

<style scoped>
.service-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
}

.service-card {
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.service-details {
  padding: 1rem;
  text-align: center;
}

.service-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 0.5rem;
}

.service-cost {
  font-size: 0.9rem;
  color: #757575;
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
