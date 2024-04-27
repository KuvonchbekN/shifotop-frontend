<template>
  <div class="category-card">
    <div class="header-container">
      <h3 class="title">{{ title }}</h3>
      <span class="count">{{ count }}</span>
    </div>

    <hr class="divider" />

    <ul class="list">
      <li v-for="(subcat, index) in items" :key="index">  <!-- subcat==subcategory in doctor,clinic card -->
        <router-link :to="{ name: 'subcat', params: { type: type, itemName: subcat.name } }">
          <a @click="goToSubCategory(subcat.name)">{{ subcat.name }} <span class="value">{{ subcat.count }}</span></a>
        </router-link>
      </li>
    </ul>

    <button class="btn-all" @click="goToCategory">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: 'CategoryCardComp',
  components: {},
  props: { //these are all passed from HomeComp 
    title: String,
    buttonText: String,
    count: Number, //this is for items(doctor, clinic, service, diagnostic) count
    items: Array,
    type: String, // Add type as a prop if it's not part of each item
  },

  methods: {
    goToCategory() {
      console.log(this.type);
      this.$router.push({ name: this.type });
    },
    goToSubCategory(itemName) {
      // You might want to encode the itemName if it could contain special characters
      this.$router.push({ name: 'subcat', params: { type: this.type, itemName } });
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