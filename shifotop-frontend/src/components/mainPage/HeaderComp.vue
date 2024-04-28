<template>
  <header>
    <div class="location-selector">
      <i class="fas fa-map-marker-alt"></i>
      Toshkent
    </div>
    <div class="logo">Shifo<span>Top</span></div>
    <div class="user-cabinet">
      <button>
        <router-link to="/cabinet" class="back-home">
          <i class="fa fa-user"></i>Kabinet
        </router-link>
      </button>
    </div>
  </header>
</template>


<script>
export default {};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f8f8;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

i {
  margin-right: 5px;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: #1a7ddc;
}

.logo > span {
  color: red;
}

.location-selector {
  display: flex; /* For inline layout of icon and text */
  align-items: center;
  background: #eee;
  padding: 5px 10px;
  border-radius: 5px;
  color: #1a7ddc; /* Assuming the location text needs to be blue */
}

.location-selector img {
  margin-right: 5px; /* Space between icon and text */
}

.search-container input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 200px; /* Adjust the width as needed */
}

.search-container button {
  border: none;
  background: #1a7ddc; /* Match the design color */
  color: white;
  padding: 0 15px;
  margin-left: -40px; /* Overlap the button on the input field */
  cursor: pointer;
}

.user-cabinet button {
  background: none;
  border: 1px solid #1a7ddc; /* Match the design color */
  color: #1a7ddc; /* Match the design color */
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.back-home{
  text-decoration: none;
}

</style>

