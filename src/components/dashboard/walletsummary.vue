<template>
    <div class="wrap relative">
      
      <AppBar title="Wallet Summary"></AppBar>
      <div v-if="spin" class="spinner around flex justify-center items-center w-full h-screen">
        <img width="80"  src="@/assets/spinner.gif" alt="">
      </div>
     
      <div class="grid grid-cols-1 gap-2 px-3">
        <div v-for="(trans,i) in walletTrans" :key="i">       
        <div v-if="CheckTrans(trans)" class="pa-3 flex justify-between border-2 rounded border-solid">
          <div class="trans_info ">
            <p class="font-bold ma-0 pa-0 capitalize">{{ trans.channel }} Top-Up</p>
          </div>
          <div class="trans_status  flex justify-center items-center ">
            <p :class="{'bg-red-600 text-white': trans.status == 'pending', 'bg-green-600 text-white': trans.status == 'success'}" class="ma-0 pa-0 text-xs px-4 py-1 rounded-md">{{ trans.status }}</p>
          </div>

          <div class="trans_amount flex justify-end items-center">
            <p :class="{'text-red-700': trans.mode=='debit', 'text-green-700': trans.mode=='credit'}" class="ma-0 pa-0 font-bold">{{ trans.mode == 'debit' ? '-' : '+'  }} {{ trans.amount }}</p>
        
          </div>
        
          
         
        </div>
        
      </div>
      </div>
    </div>
  </template>
  
  <script>
import { mapState } from "vuex";

import { apiClient } from "@/services/fetch";

import AppBar from "../utils/AppBar.vue";

export default {
    name: "walletsummary",
    data: () => ({
      tab: null,
      walletTrans: [],
      spin: true
    }),
    components: {
    AppBar
  },
    methods: {
     async GetTransactions(){
      const res = await apiClient("store", "POST", {
          collection: 'WALLETTRANSACTIONS',
          sort: "desc"
        });
        const data = await res.json()
        this.walletTrans = data.filter((v)=> v.userId == this.activeUser || v.uid == this.activeUser);
        this.spin = false
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
    computed:{
    ...mapState(['activeUser'])
  }
  };
</script>
  
  <style scoped>
  .spinner{
    position: absolute;
    top: 0;
    left: 0;
    height:  100vh !important;
    background: rgba(194, 194, 194, 0.52);
    backdrop-filter: blur(5px);
  }
  .tabs{
      padding: 0 !important;
      width: auto !important;
  }

  .trans_info{
    width: 33% !important;
  }

  .trans_status{
    width: 33%;
  }
  .trans_amount{
    width: 33%;
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
  