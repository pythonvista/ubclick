<template>
  <div class="wrap">
    <AppBar title="Airtime To Cash"></AppBar>
    
    <v-form ref="form" class="buy flex flex-col w-full gap-2 px-4">
      <v-select
        outlined
        :items="networklist"
        label="Select Network"
        :rules="inputRules"
        v-model="dform.network"
      ></v-select>
      <v-text-field
        :rules="inputRules"
        v-model="dform.mobile"
        label="Mobile Number"
        @change="SelectAtc"
        outlined
      ></v-text-field>
      <v-text-field
        :rules="inputRules2"
        prepend-inner-icon="₦"
        v-model="dform.amount"
        label="Amount"
        type="number"
        outlined
      ></v-text-field>
      <v-text-field
        :value="AmountRecieved"
        prepend-inner-icon="₦"
        label="You will receive"
        type="number"
        outlined
        readonly
      ></v-text-field>
      <v-text-field
        :rules="inputRules"
        :value="userData.bankName"
        label="Bank Name"
        outlined
        readonly
      ></v-text-field>
      <v-text-field
        :rules="inputRules"
        :value="userData.accountNumber"
        label="Account Number"
        outlined
        readonly
      ></v-text-field>

      <v-btn
       
        class="white--text"
        large
        depressed
        color="#5D153A"
        @click="Proceed"
      >
        Procced
      </v-btn>
    </v-form>

    <v-dialog max-width="500" v-model="proceed" persistent>
      <div class="bg-white flex flex-col pa-3 justify-start items-center">
        <div class="w-full pa-2 flex flex-col justify-between items-center">
          <p class="ma-0 pa-0 text-lg text-center text-black font-bold">
            To complete this request, follow the instructions below.
          </p>
        </div>
        <v-divider class="w-full h-3 bg-black my-4"></v-divider>
        <p class="text-center ma-0 pa-0">
          How to Transfer on {{ dform.network }}
        </p>
        <p v-if="dform.network == '9MOBILE'" class="text-center ma-0 pa-0 mb-3">
          Before you send an airtime, <br />
          you Must have a 4 digit pin <br />
          Create Pin: Press *247*0000*newpin# <br />
          Transfer through Transfer Code: <br />
          Press: *131*PIN*1*{{ dform.amount }}*{{ dform.atcNumber }}*
        </p>
        <p v-if="dform.network == 'MTN'" class="text-center ma-0 pa-0 mb-3">
          Before you send an airtime, <br />
          you Must have a 4 digit pin <br />
          Press: *600 *000*Newpin*Newpin #<br />
          Transfer through Transfer Code: <br />
          Press: *600*{{ dform.atcNumber }}*{{ dform.amount }}*PIN#
        </p>
        <p v-if="dform.network == 'GLO'" class="text-center ma-0 pa-0 mb-3">
          Before you send an airtime, <br />
          you Must have a 4 digit pin <br />
          Press: *132 *00000*Newpin *Newpin #<br />
          Transfer through Transfer Code: <br />Press: *131*{{
            dform.atcNumber
          }}*{{ dform.amount }}*PIN#
        </p>
        <p v-if="dform.network == 'AIRTEL'" class="text-center ma-0 pa-0 mb-3">
          Press: *432# <br />
          Select 'Pin Management' @ number4 option. <br />
          Press 1 to change pin. <br />
          Your current Pin should be your default pin -- 0000 <br />
          Then Enter any NewPin. <br />
          <br />

          Transfer through Transfer Code: Press: *432 * 1 Input the phone number
          you want to transfer to
          <span class="text-red-500 font-bold">({{ dform.atcNumber }})</span>.
          Input the amount involve ₦{{ dform.amount }}
        </p>

        <p class="ma-0 pa-0 text-center">
          <span class="text-xl mb-3 font-bold text-red">NOTE</span> <br />
          Ensure you have seent airtime into the Number above before clicking on
          airtime sent. Also, you must send exactly ₦{{ dform.amount }} Airtime
          within 30 minutes or this transaction will be cancelled. <br />
          Confirmation is instant and payment is automated usually within
          5-30mins. Also note that to send to us, you need to send from your
          personal sim . <br />
          <br />
          <span class="text-red-600 fontt-bold">
            Click on comfirmation button without sending the airtime can lead to
            your account and email been ban.
          </span>
        </p>

        <div class="w-full mt-4 flex justify-center items-center gap-5">
          <v-btn  :loading="loading" @click="Confirm" tile color="blue" class="white--text"
            >Confirm</v-btn
          >
          <v-btn
            tile
            @click="proceed = !proceed"
            color="red"
           
            class="white--text"
            >Cancel</v-btn
          >
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { snackbar } from "@/main";
// import { snackbar } from "@/main";
import {
  apiClient,
  GenerateRef,
} from "@/services/fetch";

import AppBar from "../utils/AppBar.vue";

export default {
  name: "Airtimetocash",
  props: ["userData"],
  data: () => ({
    tab: null,
    inputRules: [(v) => (v && v.length >= 1) || "Field is required"],
    inputRules2: [(v) => (v && v >= 1000) || "Amount is 1000 and above"],
    dform: {
      percent: 0,
      amount: 0,
      atcNumber: "",
    },
    proceed: false,
    loading: false,
  }),
  components: {
    AppBar
  },
  methods: {
    SelectAtc() {
      let tempatc = this.atc.find((v) => v.network == this.dform.network);
      this.dform.percent = tempatc.percent;
      this.dform.atcNumber = tempatc.number;
    },
    async Confirm() {
      try {
        this.loading = true;
        let ref = GenerateRef("AirtimeToCash");
        this.dform["transref"] = ref.transref;
        this.dform["channel"] = ref.channel;
        this.dform["createdAt"] = ref.createdAt;
        const response = await apiClient("atc/place-order", "POST", {...this.dform, reciveAmount: this.AmountRecieved});
        const res = await response.json()
        if (res.status == "error") {
          throw { msg: res.msg, err: res.err };
        }

        if (res.status == "success") {
          snackbar.$emit("open", { color: "success", text: res.msg });
          this.proceed = false 
          this.loading = false
        }
      } catch (err) {
        console.log(err)
        this.loading = false;
        snackbar.$emit("open", { color: "error", text: err.msg });
      }
    },
    Proceed() {
      if (this.$refs.form.validate()) {
        this.proceed = true
      }
    },
  },
  computed: {
    ...mapState(["activeUser", "atc"]),
    AmountRecieved() {
      let amount = (this.dform.percent / 100) * this.dform.amount;
      return this.dform.amount - amount;
    },
    networklist() {
      let temp = [];
      this.atc.forEach((v) => {
        if (v.active) {
          temp.push(v.network);
        }
      });

      return temp;
    },
  },
  created() {
    if (this.userData) {
      this.dform.accountName = this.userData.accountName;
      this.dform.accountNumber = this.userData.accountNumber;
      this.dform.bankName = this.userData.bankName;
    }
    if (this.atc) {
      this.atc.forEach((v) => {
        if (v.active) {
          this.networklist.push(v.network);
        }
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
