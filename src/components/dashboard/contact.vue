<template>
    <div class="wrap">
      <AppBar title="Contact Us"></AppBar>
      <div class="bg-primary flex flex-col justify-center ma-4 items-start rounded py-4 px-3">
        <v-btn depressed color="transparent" class="white--text"><v-icon color="white" left>mdi-phone</v-icon> +2349078200758</v-btn>
        <v-btn depressed color="transparent" class="white--text"><v-icon color="white" left>mdi-map-marker</v-icon> Lagos, Nigeria</v-btn>
        <v-btn depressed color="transparent" class="white--text"><v-icon color="white" left>mdi-email</v-icon> ubclick70@gmail.com</v-btn>
      </div>

      <p class="text-primary text-center  text-xl ">Quick Links</p>
      <div class="flex justify-center ma-4 gap-10 items-start rounded  px-3">
        <v-btn depressed color="#5E153A" class="white--text"><v-icon color="white" >mdi-whatsapp</v-icon></v-btn>
        <v-btn depressed color="#5E153A" class="white--text"><v-icon color="white" >mdi-instagram</v-icon></v-btn>
       
      </div>
    </div>
  </template>
  
  <script>
import AppBar from "../utils/AppBar.vue";

export default {
    name: "Contact",
    data: () => ({}),
    components: {
      AppBar,
    },
  };
  
</script>
  
  <style scoped>
  .about_wrap {
    background: #e5e5e5;
  }
  </style>
  