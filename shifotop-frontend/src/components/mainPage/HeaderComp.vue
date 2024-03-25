<template>
  <header>
    <div class="logo">ShifoTop</div>
    <div class="location-selector">Tashkent</div>
    <div class="search-bar">
      <input type="text" placeholder="Search..." v-model="searchQuery" @keyup.enter="onSearch">
      <button @click="onSearch">🔍</button>
    </div>
    <div class="user-cabinet">
      <button>Cabinet</button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    onSearch() {
      // Logic to handle the search goes here
      alert(`Searching for: ${this.searchQuery}`);
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;
  /* Rest of your styles */
}

/* Add additional styles here */
</style>
