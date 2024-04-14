<template>
  <div class="category-card">
    <div class="header-container">
      <h3 class="title">{{ title }}</h3>
      <span class="count">{{ count }}</span>
    </div>

    <hr class="divider" />

    <ul class="list">
      <li v-for="(item, index) in items" :key="index">
        <a href="#" @click="handleItemClick(item)">
          {{ item.name }} <span class="value">{{ item.count }}</span>
        </a>
      </li>
    </ul>
    <button class="btn-all" @click="fetchAllData">{{ buttonText }}</button>

    <ItemDetails v-if="showDetails" :itemName="selectedItem" :details="relatedData" />
  </div>
</template>

<script>
import axios from 'axios';
import ItemDetails from "@/components/mainPage/ItemDetails.vue";

export default {
  name: 'CategoryCardComp',
  components: {
    ItemDetails
  },
  props: {
    title: String,
    buttonText: String,
    count: Number, //this is for items(doctor, clinic, service, diagnostic) count
    items: Array,
    type: String, // Add type as a prop if it's not part of each item
  },
  data() {
    return {
      relatedTitle: '',
      showDetails: false,
      relatedData: null
    };
  },
  methods: {
    handleItemClick(item) {
      this.fetchRelatedData(item.name, this.type);
    },
    
    async fetchRelatedData(itemName, type) {
      try {
        const response = await axios.get(`/api/related-data/${type}/${itemName}`);
        this.relatedData = response.data;
        this.relatedTitle = `${type.charAt(0).toUpperCase() + type.slice(1)}`; // Capitalize the first letter of the type
        this.showDetails = true; // Show the ItemDetails component
      } catch (error) {
        console.error('Error fetching related data:', error);
      }
    }, 

    async fetchAllData() {
      console.log("button all is clicked, type:"  + this.type); 
      this.$emit('fetch-category', this.type);
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