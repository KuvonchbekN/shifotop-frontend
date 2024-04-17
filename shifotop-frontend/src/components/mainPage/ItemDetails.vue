<template>
    <div>
      <h2>{{ itemDetails.name }} Details</h2>
      <p>{{ itemDetails.description }}</p>
      <!-- Display other details as needed -->
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['type', 'itemId'],
    data() {
      return {
        itemDetails: {}
      };
    },
    created() {
      this.fetchItemDetails();
    },
    methods: {
      async fetchItemDetails() {
        try {
          const response = await axios.get(`/api/${this.type}/${this.itemId}`);
          this.itemDetails = response.data;
        } catch (error) {
          console.error('Failed to fetch item details:', error);
        }
      }
    }
  };
  </script>
  