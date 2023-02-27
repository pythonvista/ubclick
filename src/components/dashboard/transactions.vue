<template>
  <div class="wrap">
    <div
      class="navigator bg-white py-4 mb-9 px-3 w-full relative flex items-center"
    >
      <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <p class="ma-0 pa-0 text-center w-full absolute text-title">
        Transactions
      </p>
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
import { apiClient } from "@/services/fetch";

export default {
  name: "transactions",
  data: () => ({
    tab: null,
    Transactions: [],
    TransItem: ["Airtime", "Data", "Cable", "Electricity", "Epin"],
  }),
  methods: {
    async GetTransactions() {
      const res = await apiClient("store", "POST", {
        collection: "TRANSACTIONS",
        sort: "",
      });
      const data = await res.json();
      this.Transactions = data;
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
