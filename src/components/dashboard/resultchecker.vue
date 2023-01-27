<template>
    <div class="wrap">
      <div
        class="navigator bg-white py-4 mb-9 px-3 w-full relative flex items-center"
      >
        <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <p class="ma-0 pa-0 text-center w-full absolute text-title">
        Result Checker
        </p>
      </div>
      <div class="buy flex flex-col w-full gap-2 px-4">
        <v-select
          v-model="dform.exam"
          outlined
          :items="['WAEC', 'NECO', 'JAMB']"
          label="Select Exam"
        ></v-select>
       
        <v-text-field v-model.number="dform.quantity" label="Quantity" outlined></v-text-field>
      
        <v-btn class="white--text" large depressed color="#000933">
         Generate Pin
        </v-btn>
      </div>
      <!-- <v-bottom-sheet v-model="networks">
        <v-sheet class="text-center" height="350px">
          <div class="bg-white pa-3 flex flex-col justify-center items-center gap-5">
              <div @click="SelectNetwork('Mtn')" class="w-full px-2 py-3 border-2 rounded border-solid gap-2  hover:border-black flex items-center">
                 <v-avatar size="2rem" tile><v-img src="@/assets/img/mtn.png"></v-img></v-avatar>
                 <p class="ma-0 pa-0 font-bold text-lg ">Mtn</p>
              </div>
              <div  @click="SelectNetwork('Glo')" class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center">
                 <v-avatar size="2rem" tile><v-img src="@/assets/img/glo.png"></v-img></v-avatar>
                 <p class="ma-0 pa-0 font-bold text-lg ">Glo</p>
              </div>
              <div  @click="SelectNetwork('Airtel')" class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center">
                 <v-avatar size="2rem" tile><v-img src="@/assets/img/airtelpng.png"></v-img></v-avatar>
                 <p class="ma-0 pa-0 font-bold text-lg ">Airtel</p>
              </div>
              <div  @click="SelectNetwork('9m obile')" class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center">
                 <v-avatar size="2rem" tile><v-img src="@/assets/img/9mobile.png"></v-img></v-avatar>
                 <p class="ma-0 pa-0 font-bold text-lg ">9mobile</p>
              </div>
  
          </div>
        </v-sheet>
      </v-bottom-sheet> -->
    </div>
  </template>
  
  <script>
export default {
    name: "buycable",
    data: () => ({
      tab: null,
      dform: {
        network: "",
      },
      networks: false,
    }),
    methods: {
      SelectData() {
        this.networks = true
      },
      SelectNetwork(network){
          this.dform.network = network
          this.networks = false
  
      }
    },
    created() {},
  };
</script>
  
  <style scoped>
  .tabs {
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
  