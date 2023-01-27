<template>
  <div class="wrap">
    <div
      class="navigator bg-white py-4 mb-9 px-3 w-full relative  flex items-center"
    >
      <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <p class="ma-0 pa-0 text-center w-full absolute text-title">
        Transactions
      </p>
    </div>
    <v-tabs v-model="tab" class="pa-0 ma-0" background-color="white" light>
      <v-tab class="pa-0 tabs"><p class="ma-0 pa-0 text-black text-xs">Data</p></v-tab>
      <v-tab class="pa-0 tabs"><p class="ma-0 pa-0 text-black text-xs">Airtime</p></v-tab>
      <v-tab class="pa-0 tabs"><p class="ma-0 pa-0 text-black text-xs">Cable</p></v-tab>
      <v-tab class="pa-0 tabs"><p class="ma-0 pa-0 text-black text-xs">Electricity</p></v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
        <v-tab-item class="text-black pa-5">Hello data</v-tab-item>
        <v-tab-item>hello airtime</v-tab-item>
        <v-tab-item>hello cable</v-tab-item>
        <v-tab-item>hello Electricity</v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: "transactions",
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
