<template>
  <div class="wrap">
    <AppBar title="Transactions"></AppBar>
    <div v-if="spin" class="spinner around flex justify-center items-center w-full h-screen">
        <img  width="80"  src="@/assets/spinner.gif" alt="">
      </div>
   
    <v-tabs v-model="tab" class="pa-0 ma-0" background-color="white" light>
      <v-tab v-for="(trans, i) in TransItem" :key="i" class="pa-0 tabs"
        ><p class="ma-0 pa-0 text-black text-xs">{{ trans }}</p></v-tab
      >
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(tr, i) in TransItem" :key="i" class="text-black pa-3">
        <div class="grid grid-cols-1 gap-2">
         
          <div
            v-for="(trans, i) in Transactions.filter(
              (i) => i.transType == tr && !i.error
            )"
            :key="i"
          >
            <div
              class="py-2 px-2 flex justify-between border-2 items-center rounded border-solid"
            >
            <div class="flrx flex-col justify-center items-start">
              <p class="ma-0 pa-0 text-sm font-bold">{{ tr }}</p>
              <p class="ma-0 pa-0 text-sm font-light">{{ ConvertDate(trans.CreatedAt)}}</p>

            </div>
            <div class="flex flex-col justify-center  items-end">
              <p class="ma-0 pa-0 font-bold">- ₦{{ trans.plan_amount }}</p>
              
              <p
                :class="{
                  'bg-red-600 text-white': trans.Status == 'failed',
                  'bg-green-600 text-white': trans.Status == 'successful',
                }"
                class="ma-0 pa-0 text-sm px-1 py-1 rounded"
              >
                {{ trans.Status }}
              </p>
            </div>
             
              <!-- <p class="ma-0 pa-0 font-bold">{{ trans.mobile_number }}</p>
              -->
            </div>
          </div>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { apiClient } from "@/services/fetch";

import AppBar from "../utils/AppBar.vue";

export default {
  name: "transactions",
  components: {
    AppBar
  },
  data: () => ({
    tab: null,
    Transactions: [],
    TransItem: ["Airtime", "Data", "Cable", "Electricity", "Epin"],
    spin: true
  }),
  methods: {
    async GetTransactions() {
      const res = await apiClient("store", "POST", {
        collection: "TRANSACTIONS",
        sort: "",
      });
      const data = await res.json();
      this.Transactions = data.filter((v)=> v.uid == this.activeUser);
      this.spin = false
    },
    ConvertDate(date){
      const fireBaseTime = new Date(
      date.seconds * 1000 + date.nanoseconds / 1000000,
    );
    const newdate = fireBaseTime.toDateString();
    const atTime = fireBaseTime.toLocaleTimeString();
    return  (newdate + " " + atTime).toString()
    }
  },
  created() {
    this.GetTransactions();
  },
  computed:{
    ...mapState(['activeUser'])
  }
};
</script>

<style scoped>
.tabs {
  padding: 0 !important;
  width: auto !important;
}
.spinner{
    position: absolute;
    top: 0;
    left: 0;
    height:  100vh !important;
    background: rgba(194, 194, 194, 0.52);
    backdrop-filter: blur(5px);
    z-index: 100;
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
