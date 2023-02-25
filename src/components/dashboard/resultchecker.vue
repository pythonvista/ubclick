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
    <v-form ref="form" class="buy flex flex-col w-full gap-2 px-4">
      <v-select
        v-model="dform.examName"
        outlined
        readonly
        @click="OpenExam"
        :items="examItems"
        :rules="inputRules"
        label="Select Exam"
      ></v-select>

      <v-text-field
        v-model.number="dform.quantity"
        type="number"
        :rules="numberRules"
        label="Quantity"
        outlined
      ></v-text-field>
      <v-text-field
        prepend-inner-icon="₦"
        readonly
        :value="TotalAmount"
        max="4"
        :rules="amountRules"
        type="number"
        label="Amount"
        outlined
      ></v-text-field>

      <v-btn
        :loading="loading"
        @click="BuyPin"
        class="white--text"
        large
        depressed
        color="#000933"
      >
        Generate Pin
      </v-btn>
    </v-form>
    <v-bottom-sheet v-model="exam">
      <v-sheet class="text-center" height="350px">
        <div
          class="bg-white pa-3 flex flex-col justify-center items-center gap-5"
        >
          <div
            v-for="(exam, i) in AllExam.filter((i) => i.active == true)"
            :key="i"
            @click="SelectExam(exam)"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <img width="50" :src="exam.img" />
            <p class="ma-0 pa-0 font-bold text-lg">{{ exam.examName }}</p>
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

export default {
  name: "ResultChecker",
  data: () => ({
    tab: null,
    loading: false,
    dform: {
      examName: "",
      examAmount: 0,
    },
    inputRules: [(v) => (v && v.length >= 1) || "Field is required"],
    numberRules: [(v) => (v && v <= 5) || "5 is the Maximum"],
    amountRules: [(v) => (v && v > 0) || "Field is required"],
    exam: false,
  }),
  methods: {
    OpenExam() {
      this.exam = true;
    },
    SelectExam(exam) {
      this.dform.examName = exam.examName;
      this.dform.examAmount = exam.amount;
      this.exam = false;
    },
    async BuyPin() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          let refs = GenerateRef("Epin");
          let data = {
            exam_name: this.dform.examName,
            quantity: this.dform.quantity,
            exam_price: this.dform.examAmount,
            amount: this.TotalAmount,
            uid: this.activeUser,
            transref: refs.transref,
            channel: refs.channel,
            createdAt: refs.createdAt
          };
          let res = await apiClient("buyepin", "POST", data);
          let response = await res.json();
          this.loading = false;
          if (response.status == "error") {
            throw { msg: response.msg, err: response.err };
          }
          if (response.status == "success") {
            snackbar.$emit("open", { color: "success", text: response.msg });
          }
        } catch (err) {
          this.loading = false;
          snackbar.$emit("open", { color: "error", text: err.msg });
        }
      }
    },
  },
  created() {},
  computed: {
    ...mapState(["activeUser", "epin"]),
    examItems() {
      let all = [];
      this.epin.forEach((e) => {
        all.push(e.examName);
      });
      return all;
    },
    AllExam() {
      let all = this.epin;
      return all;
    },
    TotalAmount() {
      return this.dform.quantity * this.dform.examAmount;
    },
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
