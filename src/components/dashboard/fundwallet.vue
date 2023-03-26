<template>
  <div class="wrap">
    <AppBar title="Fund Wallet"></AppBar>
    <div class="buy flex flex-col w-full gap-2 px-4">
      <v-select
        @click="OpenPayment()"
        v-model="dform.payment"
        outlined
        :items="['Paystack', 'Bank Transfer']"
        readonly
        :value="paymentType"
        item-disabled
        label="Select Payment Gateway"
      ></v-select>

      <v-text-field
        v-model.number="dform.amount"
        label="Amount"
        outlined
      ></v-text-field>
      <v-text-field
        readonly
        :value="userData.email"
        label="Email"
        outlined
      ></v-text-field>

      <v-btn
      @click="FundWallet"
        :loading="loading"
        class="white--text"
        large
        depressed
        color="#5D153A"
      >
        Fund Wallet
      </v-btn>
    </div>
    <v-bottom-sheet v-model="payments">
      <v-sheet class="text-center" height="350px">
        <div
          class="bg-white pa-3 flex flex-col justify-center items-center gap-5"
        >
          <div
            @click="SelectPayment('Paystack')"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <img width="100" src="@/assets/img/Paystack.png" />
          </div>
          <div
            @click="SelectPayment('Bank Transfer')"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <img width="100" src="@/assets/img/banktransfer.png" />
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { snackbar } from "@/main";
// import { apiClient } from "@/services/fetch";
import PaystackPop from "@paystack/inline-js";

import AppBar from "../utils/AppBar.vue";

export default {
  name: "buyairtime",
  props: ['userData'],
  components: {
    AppBar
  },
  data: () => ({
    tab: null,
    paymentType: "",
    dform: {
      payment: "",
      ref: 0,
      amount: 0,
    },
    payments: false,
    loading: false,
  }),
  methods: {
    OpenPayment() {
      this.payments = true;
    },
    SelectPayment(payment) {
      this.paymentType = payment;
      this.payments = false;
      if (payment == "Paystack") {
        this.dform.payment = payment;
      }
      if (payment == "Bank Transfer") {
        this.dform.payment = payment;
      }
    },
    async FundWallet() {
        this.loading = true
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: 'pk_test_c31fd9513a0a16e86c7ca974b870b148ae14f159',
        email: this.userData.email,
        amount: this.dform.amount * 100,
        metadata: this.userData,
        onSuccess: async (transaction) => {
            if(transaction){
                this.loading = false
                snackbar.$emit('open', { color: 'success', text: 'Transaction Processed'})
                this.$router.push({name:'Dashboard'})
            }
        },
        onCancel: () => {
            this.dform = {}
            this.loading = false
            snackbar.$emit('open', { color: 'error', text: 'Process Aborted'})
        },
      });
    },
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