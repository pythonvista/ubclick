<template>
  <div class="wrap">
    <div
      class="navigator bg-white py-4 mb-9 px-3 w-full relative flex items-center"
    >
      <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <p class="ma-0 pa-0 text-center w-full absolute text-title">
        Buy Airtime
      </p>
    </div>
    <div class="buy flex flex-col w-full gap-2 px-4">
      <v-select
        @click="SelectData()"
        v-model="dform.network"
        outlined
        :items="['Mtn', 'Glo', 'Airtel', '9mobile']"
        readonly
        :value="dform.network"
        item-disabled
        label="Select Network"
      ></v-select>

      <v-text-field
        v-model.number="dform.amount"
        label="Amount"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="dform.mobile_number"
        label="Phone Number"
        outlined
      ></v-text-field>
      <v-text-field
        readonly
        v-model.number="dform.amount"
        label="Amount to Pay"
        outlined
      ></v-text-field>

      <v-btn
        :loading="loading"
        class="white--text"
        large
        depressed
        color="#000933"
      >
        Buy Airtime
      </v-btn>
    </div>
    <v-bottom-sheet v-model="networks">
      <v-sheet class="text-center" height="350px">
        <div
          class="bg-white pa-3 flex flex-col justify-center items-center gap-5"
        >
          <div
            @click="SelectNetwork('Mtn')"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <v-avatar size="2rem" tile
              ><v-img src="@/assets/img/mtn.png"></v-img
            ></v-avatar>
            <p class="ma-0 pa-0 font-bold text-lg">Mtn</p>
          </div>
          <div
            @click="SelectNetwork('Glo')"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <v-avatar size="2rem" tile
              ><v-img src="@/assets/img/glo.png"></v-img
            ></v-avatar>
            <p class="ma-0 pa-0 font-bold text-lg">Glo</p>
          </div>
          <div
            @click="SelectNetwork('Airtel')"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <v-avatar size="2rem" tile
              ><v-img src="@/assets/img/airtelpng.png"></v-img
            ></v-avatar>
            <p class="ma-0 pa-0 font-bold text-lg">Airtel</p>
          </div>
          <div
            @click="SelectNetwork('9mobile')"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <v-avatar size="2rem" tile
              ><v-img src="@/assets/img/9mobile.png"></v-img
            ></v-avatar>
            <p class="ma-0 pa-0 font-bold text-lg">9mobile</p>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: "buyairtime",
  data: () => ({
    tab: null,
    dform: {
      network: 0,
      amount: 0,
      mobile_number: '',
      Ported_number: true,
      airtime_type: "VTU",
    },
    networks: false,
    loading: false,
  }),
  methods: {
    SelectData() {
      this.networks = true;
    },
    SelectNetwork(network) {
      this.dform.network = network;
      this.networks = false;
      if (network == "Mtn") {
        this.dform.network = 1;
      }
      if (network == "Glo") {
        this.dform.network = 2;
      }
      if (network == "Airtel") {
        this.dform.network = 4;
      }
      if (network == "9mobile") {
        this.dform.network = 3;
      }
    },
  //  async BuyAirtime(){
  //   this.loading = true
  //   try{

  //   }catch(err){
  //     console.log(err)
  //   }

  //   }
  },
  computed: {
    finalAmount() {
      return this.amount - (10 / 100) * this.amount;
    },
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
