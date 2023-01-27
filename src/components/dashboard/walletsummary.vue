<template>
    <div class="wrap">
      <div
        class="navigator bg-white py-4 mb-9 px-3 w-full relative  flex items-center"
      >
        <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <p class="ma-0 pa-0 text-center w-full absolute text-title">
          Wallet Summary
        </p>
      </div>
      
    </div>
  </template>
  
  <script>
export default {
    name: "walletsummary",
    data: () => ({
      tab: null
    }),
    methods: {},
    created() {},
  };
</script>
  
  <style scoped>
  
  .tabs{
      padding: 0 !important;
      width: auto !important;
  }
  .text-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .v-slide-group__prev {
      /* visibility: hidden; */
      display: none !important;
  }
  </style>
  