<template>
  <div class="search-bar">
    <input
        type="text"
        placeholder="Doctors, clinics, services"
        v-model="searchQuery"
        @keyup.enter="search"
    />
    <button @click="search">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    search() {
      // Implement your search logic here
      // You can access the searchQuery using this.searchQuery
      // For example, you can perform an API request with the search query
      alert(`Search for: ${this.searchQuery}`);
    }
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
}

input[type="text"] {
  flex: 0.8%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #f39c12; /* Adjust the color to match your design */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
}

/* Add responsive styles as needed */
</style>
