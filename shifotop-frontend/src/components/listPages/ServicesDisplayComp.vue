<template>
    <div>
      <h3>Medical Services</h3>
      <ul>
        <li v-for="(service, index) in data" :key="index">
            bla blaa service page
          <!-- {{ service.name }} - {{ service.description }} -->
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      data: Array
    }
  }
  </script>
  
  <style>
  /* Styles for ServicesDisplayComponent */
  </style>
  