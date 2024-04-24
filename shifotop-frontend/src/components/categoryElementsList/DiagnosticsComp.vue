<template>
    <!-- Custom layout for doctors -->
    <p> hello </p>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [],
        // ... other data properties specific to doctors
      };
    },
    created() {
      this.fetchDoctorsData();
    },
    methods: {
      fetchDoctorsData() {
        // fetch data from the backend specific to doctors
      },
      // ... other methods specific to doctors
    }
  };
  </script>
  