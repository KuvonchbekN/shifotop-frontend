<template>
    <div class="subcategory-details">
      <h2>Details for {{ type }} - {{ itemName }}</h2>
      <!-- Your subcategory details here -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'SubcategoryComp', 
    props: {
      type: String,
      itemName: String
    },
    data() {
      return {
        // Data related to the subcategory can be initialized here
      };
    },
    created() {
      this.fetchSubcategoryDetails();
    },
    methods: {
      fetchSubcategoryDetails() {
        // Here you would fetch data for the specific subcategory using `this.type` and `this.itemName`
        // For example:
        // axios.get(`/api/${this.type}/${this.itemName}`).then(response => {
        //   this.subcategoryDetails = response.data;
        // })
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your CSS styles for SubcategoryComponent here */
  </style>
  