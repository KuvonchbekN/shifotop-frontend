<template>
    <div>
      <h3>Diagnostics</h3>
      <ul>
        <li v-for="(diagnostic, index) in data" :key="index">
            something somehting diagnostics page
          <!-- {{ diagnostic.test }} - {{ diagnostic.description }} -->
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
  /* Styles for DiagnosticsDisplayComponent */
  </style>
  