<template>
  <div class="search-bar">
    <input
      type="text"
      placeholder="Search for doctors, clinics, services"
      v-model="searchQuery"
      @keyup.enter="performSearch"
    />
    <button @click="performSearch">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    performSearch() {
      if (!this.searchQuery) {
        alert("You cannot search for empty");
        return;
      }

      if (this.searchQuery.trim()) {
        // Use Vue Router to navigate to the search results route
        this.$router.push({ name: 'searchResults', query: { q: this.searchQuery } });
      }
    },
  },
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
</style>
