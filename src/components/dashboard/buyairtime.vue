<template>
  <div class="wrap">
   
    <AppBar title=" Buy Airtime"></AppBar>
    <v-form ref="form" class="buy flex flex-col w-full gap-2 px-4">
      <v-select
        @click="SelectData()"
        v-model="dform.networkName"
        outlined
        :items="networklist"
        readonly
        item-disabled
        label="Select Network"
        :rules="inputRules"
      ></v-select>

      <v-text-field
        v-model.number="dform.amount"
        label="Amount"
         outlined
         prepend-inner-icon="₦"
         :rules="amountRules"
      >
    </v-text-field>
      <v-text-field
      :rules="inputRules"
        v-model="dform.mobile_number"
        label="Phone Number"
        outlined
      ></v-text-field>
      <v-text-field
      prepend-inner-icon="₦"
        readonly
        :min="50"
        v-model.number="dform.amount"
        label="Amount to Pay"
        outlined
      ></v-text-field>

      <v-btn
        :loading="loading"
        class="white--text"
        large
        depressed
        color="#5D153A"
        @click="BuyAirtime"
      >
        Buy Airtime
      </v-btn>
    </v-form>
    <v-bottom-sheet v-model="networks">
      <v-sheet class="text-center" height="350px">
        <div
          class="bg-white pa-3 flex flex-col justify-center items-center gap-5"
        >
          <div
            v-for="(network, i) in networksPack.filter((f)=> f.active == true)"
            :key="i"
            @click="SelectNetwork(network)"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <v-avatar size="2rem" tile
              ><v-img :src="network.img"></v-img
            ></v-avatar>
            <p class="ma-0 pa-0 font-bold text-lg">{{ network.name }}</p>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { snackbar } from "@/main";
import {
  apiClient,
  GenerateRef,
} from "@/services/fetch";

import AppBar from "../utils/AppBar.vue";

export default {
  name: "buyairtime",
  components: {
    AppBar
  },
  data: () => ({
    tab: null,
    networklist: [],
    inputRules: [
    (v) => (v && v.length >= 1) || 'Field is required'
    ],
    amountRules: [
    (v) => (v && v >= 50 ) || "Minimum airtime purchase is ₦50",
  ],
    dform: {
      networkName: "",
      network: 0,
      amount: 0,
      mobile_number: "",
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
      this.dform.networkName = network.name;
      this.dform.network = network.id;
      this.networks = false;
    },
    async BuyAirtime() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          let refs = GenerateRef('Airtime')
          const res = await apiClient('airtime', 'POST', {
            ...this.dform,
             uid: this.activeUser,
             transref: refs.transref,
            channel: refs.channel,
            createdAt: refs.createdAt
            })
          const data = await res.json()
          console.log(data)
          if(data.status == 'error'){
          throw {msg: data.msg, err: data.err}
          }
          if(data.status == 'success'){
            snackbar.$emit('open', { color: 'success', text: data.msg})
            this.$router.push({name: 'Dashboard'})
          }
          this.loading = false
        } catch (err) {
          this.loading = false
          if(err.msg){
            snackbar.$emit('open', { color: 'error', text: err.msg})
          }else{
            snackbar.$emit('open', { color: 'error', text: 'Error Occurred'})
          }
          
        }
      }
    },
  },
  computed: {
    finalAmount() {
      return this.amount - (10 / 100) * this.amount;
    },

    ...mapState(["networksPack", "activeUser"]),
  },
  created() {
    if (this.networksPack) {
      this.networksPack.forEach((v) => {
        this.networklist.push(v.name);
      });
    }
  },
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
