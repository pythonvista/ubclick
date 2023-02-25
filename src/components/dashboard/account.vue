<template>
  <div class="wrap">
    <div
      class="navigator bg-white py-4 mb-9 px-3 w-full relative flex items-center"
    >
      <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <p class="ma-0 pa-0 text-center w-full absolute text-title">
        Account Management
      </p>
    </div>
    <v-form ref="form" class="buy flex flex-col w-full gap-2 px-4">
      <v-select outlined  :items="banks" label="Select Bank" :rules="inputRules" v-model="dform.bankName" ></v-select>
      <v-text-field
        :rules="inputRules"
        v-model="dform.accountName"
        label="Account Name"
        outlined
      ></v-text-field>
      <v-text-field
      :rules="inputRules2"
        v-model="dform.accountNumber"
        label="Account Number"
        outlined
      ></v-text-field>

      <v-btn
        :loading="loading"
        class="white--text"
        large
        depressed
        color="#000933"
        @click="Update"
      >
        Update Account
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { snackbar } from "@/main";
import { apiClient } from "@/services/fetch";

export default {
  name: "Account",
  props: ['userData'],
  data: () => ({
    tab: null,
    inputRules: [(v) => (v && v.length >= 1) || "Field is required"],
    inputRules2: [(v) => (v && v.length == 10) || "Invalid Account Number"],
    amountRules: [(v) => (v && v >= 50) || "Minimum airtime purchase is ₦50"],
    dform: {
    },
    loading: false,
  }),
  methods: {

    async Update() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          this.loading = true
          await apiClient("store/update", "POST", {
            collection: "USERS",
            uid: this.activeUser,
            data: this.dform,
          });
          snackbar.$emit("open", {
            color: "succes",
            text: "Updated Successfully",
          });
          this.loading = false
          this.dialog = false
          location.reload()
          
        } catch (err) {
          this.loading = false
          console.log(err);
          snackbar.$emit("open", { color: "error", text: "Error Eccoured" });
        }
      }
    },
  },
  computed: {
    ...mapState([ "activeUser", "banks"]),
  },
  created() {
    if(this.userData){
        this.dform.accountName = this.userData.accountName
        this.dform.accountNumber = this.userData.accountNumber
        this.dform.bankName = this.userData.bankName
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
