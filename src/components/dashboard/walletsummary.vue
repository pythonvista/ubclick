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
      <div class="grid grid-cols-1 gap-2 px-3">
        <div v-for="(trans,i) in walletTrans" :key="i">       
        <div v-if="CheckTrans(trans)" class="pa-3 flex justify-between border-2 rounded border-solid">
          <p class="font-bold ma-0 pa-0 capitalize">{{ trans.channel }} Top-Up</p>
          <p :class="{'bg-red-600 text-white': trans.status == 'pending', 'bg-green-600 text-white': trans.status == 'success'}" class="ma-0 pa-0 text-sm px-1 py-1 rounded">{{ trans.status }}</p>
          <p v-if="trans.mode == 'debit'" class="ma-0 text-red-700 pa-0 font-bold">{{ trans.mode == 'debit' ? '-' : '+'  }} {{ trans.amount }}</p>
          <p v-else class="ma-0 text-green-700 pa-0 font-bold">{{ trans.mode == 'debit' ? '-' : '+'  }} {{ trans.amount }}</p>
        </div>
      </div>
      </div>
    </div>
  </template>
  
  <script>
import { apiClient } from "@/services/fetch";

export default {
    name: "walletsummary",
    data: () => ({
      tab: null,
      walletTrans: []
    }),
    methods: {
     async GetTransactions(){
      const res = await apiClient("store", "POST", {
          collection: 'WALLETTRANSACTIONS',
          sort: "desc"
        });
        const data = await res.json()
        this.walletTrans = data
      },
      CheckTrans(trans){
        if(trans.status == 'reversed' && trans.validate == true){
          return false
        }

        return true

      }
    },
    created() {
      this.GetTransactions()
    },
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
  