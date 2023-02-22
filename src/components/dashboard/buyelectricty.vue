<template>
  <div class="wrap">
    <div
      class="navigator bg-white py-4 mb-9 px-3 w-full relative flex items-center"
    >
      <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <p class="ma-0 pa-0 text-center w-full absolute text-title">
        Electricity Bill Payment
      </p>
    </div>
    <v-form ref="form" class="buy flex flex-col w-full gap-2 px-4">
      <v-select
        v-model="dform.discoName"
        outlined
        :rules="inputRules"
        readonly
        @click="discos = !discos"
        :items="discoName"
        label="Select DiscoCompany"
      ></v-select>
      <v-select
        v-model="dform.meterType"
        outlined
        :rules="inputRules"
        :items="meterType"
        label="Meter Type"
      ></v-select>
      <v-text-field
        :rules="inputRules"
        v-model="dform.meterno"
        label="Meter Number"
        outlined
      ></v-text-field>
      <v-text-field
        :rules="inputRules"
        v-model="dform.amount"
        label="Amount"
        outlined
      ></v-text-field>
      <v-text-field
        :rules="inputRules"
        v-model="dform.phone"
        label="Customer Phone"
        outlined
      ></v-text-field>
      <v-text-field
        :rules="inputRules"
        v-model="dform.meterName"
        readonly
        label="Customer Meter Name"
        v-if="dform.meterName"
        outlined
      ></v-text-field>
      <v-btn
        v-if="!dform.meterName"
        :loading="loading"
        @click="Validate"
        class="white--text"
        large
        depressed
        color="#000933"
      >
        Validate Meter
      </v-btn>
      <v-btn
        v-else
        :loading="loading"
        @click="PurchaseDisco"
        class="white--text"
        large
        depressed
        color="#000933"
      >
        Purchase Disco
      </v-btn>
    </v-form>
    <v-bottom-sheet v-model="discos">
      <v-sheet class="text-center overflow-y-scroll" height="550px">
        <div
          class="bg-white overflow-y-scroll pa-3 flex flex-col justify-center items-center gap-5"
        >
          <div
            v-for="(elec, i) in electricity.filter((v)=> v.active == true)"
            :key="i"
            @click="SelectDisco(elec)"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <img width="100" :src="elec.img" />
            <p class="ma-0 pa-0 font-bold text-lg">{{ elec.Disconame }}</p>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { snackbar } from "@/main";
import { apiClient } from "@/services/fetch";

export default {
  name: "buycable",
  data: () => ({
    tab: null,
    discos: false,
    loading: false,
    dform: {
      meterTypeId: 1
    },
    inputRules: [(v) => (v && v.length >= 1) || "Field is required"],
  }),
  methods: {
    SelectDisco(disco) {
      this.dform.discoName = disco.Disconame;
      this.dform.DiscoID = disco.DiscoID;
      this.discos = false;
    },
    async Validate() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          const res = await apiClient(
            `electricity/validate?meterNumber=${this.dform.meterno}&disconame=${this.dform.discoName}&mtype=${this.dform.meterType}`,
            "GET"
          );
          const data = await res.json();
          if (data.invalid == false) {
            this.loading = false;
            this.dform.meterName = data.name;
          } else {
            this.loading = false;
            snackbar.$emit("open", {
              color: "error",
              text: "invalid Meter number",
            });
          }
          this.loading = false;
          console.log(data);
        } catch (err) {
          this.loading = false;
          snackbar.$emit("open", {
            color: "error",
            text: err.msg,
          });
        }
      }
    },
    async PurchaseDisco() {
      try {
        if(this.dform.meterType == 'Prepaid'){
          this.dform['meterTypeId'] = 1
          this.dform['uid'] = this.activeUser
        }
        if(this.dform.meterType == 'Postpaid'){
          this.dform['meterTypeId'] = 2
          this.dform['uid'] = this.activeUser
        }
        this.loading = true
        const res = await apiClient('electricity/buy', 'POST', this.dform)
        const response = await res.json()
        if(response.status == 'error'){
          throw {err: response.err, msg: response.msg}
        }
        if(response.status == 'success'){
          snackbar.$emit('open', { color: 'success', text: response.msg})
        }
        console.log(response)
      } catch (err) {
        this.loading = false
        snackbar.$emit("open", {
          color: "error",
          text: err.msg,
        });
      }
    },
  },
  created() {},
  computed: {
    discoName() {
      let all = [];
      this.electricity.forEach((v) => {
        all.push(v.Disconame);
      });
      return all;
    },
    ...mapState(["electricity", "meterType", "activeUser"]),
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
