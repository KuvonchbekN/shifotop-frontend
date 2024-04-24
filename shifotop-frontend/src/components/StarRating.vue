<template>
    <div class="star-rating">
      <span v-for="star in computedRating" :key="star" class="star" :class="{ filled: star <= rating }">
        ★
      </span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StarRating',
    props: {
      rating: {
        type: Number,
        required: true
      },
      maxRating: {
        type: Number,
        default: 5
      }
    },
    computed: {
      computedRating() {
        return Array.from({ length: this.maxRating }, (_, i) => i + 1);
      }
    }
  };
  </script>
  
  <style scoped>
  .star-rating {
    display: inline-block;
  }
  
  .star {
    color: #d0d0d0; /* Default empty star color */
  }
  
  .star.filled {
    color: #ffd055; /* Filled star color */
  }
  </style>
  