<template>
  <div class="category-card">
    <div class="header-container">
      <h3 class="title">{{ title }}</h3>
      <span class="count">{{ count }}</span>
    </div>

    <hr class="divider" />

    <ul class="list">
      <li v-for="(item, index) in items" :key="index">
        <a href="#" @click.prevent="fetchRelatedData(item.name)">
          {{ item.name }} <span class="value">{{ item.count }}</span>
        </a>
      </li>
    </ul>
    <button class="btn-all">{{ buttonText }}</button>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios to make requests to the backend

export default {
  name: 'CategoryCardComp',
  props: {
    title: String,
    buttonText: String,
    //these below will come from backend
    count: Number, //this is for items(doctor, clinic, service, diagnostic) count
    items: Array
  },
  methods: {
    async fetchRelatedData(itemName) {
      try {
        // Replace '/api/related-data/' with the actual endpoint
        // and append the item name to fetch its related data
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/related-data/${itemName}`);

        // Now, you can either update the state with this data to show it in a list on this page
        this.relatedData = response.data;

        // Or you can route to a new page with this data, depending on your app's structure
        this.$router.push({ name: 'ItemDetails', params: { itemName, data: response.data } });
      } catch (error) {
        console.error('Error fetching related data:', error);
        // Handle the error as you see fit
      }
    }
  },
  data() {
    return {
      relatedData: null,
    }
  }
};
</script>

<style scoped>
.category-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  text-align: left;
  /* Changed to left align */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  /* Assuming a white background */
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  /* Gives space between the header and the list */
}

.title {
  font-size: 1.3rem;
  margin: 0;
  /* Removes default margin */
}

.count {
  font-size: 1.3rem;
  font-weight: bold;
}

.list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 1rem;
}

.list li {
  margin: 5px 0;
}

.value {
  float: right;
}

.btn-all {
  background-color: #ecf1fb;
  color: #5788dc;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 0 auto;
}

.btn-all:hover {
  background-color: #1E88E5;
  color: #ddd;
}
</style>