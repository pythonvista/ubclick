<template>
  <div class="wrap">
    <div
      class="navigator bg-white py-4 mb-9 px-3 w-full relative flex items-center"
    >
      <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <p class="ma-0 pa-0 text-center w-full absolute text-title">
        Buy Data Bundle
      </p>
    </div>
    <v-form ref="form" class="buy flex flex-col w-full gap-2 px-4">
      <v-select
        @click="SelectData()"
        v-model="dform.network"
        outlined
        :items="networklist"
        readonly
        item-disabled
        label="Select Network"
      ></v-select>
      <v-select
        @change="SelectType"
        v-model="dform.type"
        outlined
        :rules="inputRules"
        :items="['SME', 'GIFTING', 'CORPORATE GIFTING']"
        item-disabled
        label="Select Plan Type"
      ></v-select>
      <v-select
      :rules="inputRules"
        :disabled="!dform.network"
        @click="plans = true"
        v-model="dform.plan"
        outlined
        readonly
        :items="planlistItems"
        label="Select Plan"
      ></v-select>

      <v-text-field
       :rules="inputRules"
        label="Phone Number"
        v-model="dform.mobile"
        outlined
      ></v-text-field>

      <v-btn
        :loading="loading"
        @click="BuyData"
        class="white--text"
        large
        depressed
        color="#000933"
      >
        Buy Now
      </v-btn>
    </v-form>
    <v-bottom-sheet v-model="networks">
      <v-sheet class="text-center" height="350px">
        <div
          class="bg-white pa-3 flex flex-col justify-center items-center gap-5"
        >
          <div
            v-for="(network, i) in networksPack.filter((f) => f.active == true)"
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
    <v-bottom-sheet v-model="plans">
      <v-sheet class="text-center overflow-y-scroll" height="550px">
        <div
          class="bg-white pa-3 flex flex-col justify-center items-center gap-5"
        >
          <div
            v-for="(plan, i) in planlist.filter((f) => f.active == true)"
            :key="i"
            @click="SelectPlan(plan)"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <p class="ma-0 pa-0 font-bold text-lg">
              ({{ plan.Network }}) {{ plan.Size }} - {{ plan.Amount }} -
              {{ plan.Validity }}
            </p>
          </div>

          <p
            v-if="planlist.length == 0"
            class="ma-0 pa-0 text-center w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            No Plan Available
          </p>
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
  name: "buydata",
  data: () => ({
    tab: null,
    dform: {
      network: "",
      type: "",
      plan: "",
      mobile: "",
      planData: {
        network_id: 0,
      },
    },
    loading: false,
    planlist: [],
    planlistItems: [],
    networks: false,
    networklist: [],
    plans: false,
    inputRules: [(v) => (v && v.length >= 1) || "Field is required"],
    amountRules: [(v) => (v && v >= 50) || "Minimum airtime purchase is ₦50"],
  }),
  methods: {
    SelectData() {
      this.networks = true;
      this.dform.type = "";
      this.plan = "";
    },
    SelectNetwork(network) {
      this.dform.network = network.name;
      this.networks = false;
      this.dform.network_id = network.id;
    },
    SelectType() {
      this.dform.plan = "";
      this.planlist = this.dataPacks.filter(
        (v) =>
          v.planType.toLowerCase() == this.dform.type.toLowerCase() &&
          v.Network.toLowerCase() == this.dform.network.toLowerCase()
      );
      this.planlist.forEach((i) => {
        this.planlistItems.push(`${i.Size}-${i.Amount}-${i.Validity}`);
      });
    },
    SelectPlan(plan) {
      this.dform.planData = plan;
      this.dform.plan = `${plan.Size}-${plan.Amount}-${plan.Validity}`;
      this.plans = false;
      this.formatData(plan.Amount);
    },
    formatData(string) {
      let striped = string.slice(1);
      this.dform.planData["amount"] = parseInt(striped);
    },
    async BuyData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          let data = {
            ...this.dform.planData,
            uid: this.activeUser,
            mobile: this.dform.mobile,
            network_id: this.dform.network_id,
          };
          const res = await apiClient("data", "POST", data);
          const response = await res.json();
          this.loading = false
          if (response.status == "error") {
            throw { err: response, msg: response.msg };
          }
          if(response.status == 'success'){
            snackbar.$emit('open', { color: 'success', text:response.msg })
          }
        } catch (err) {
          this.loading  = false
          snackbar.$emit('open', { color: 'error', text: err.msg })

        }
      }
    },
  },
  created() {
    if (this.networksPack) {
      this.networksPack.forEach((v) => {
        this.networklist.push(v.name);
      });
    }
  },
  computed: {
    ...mapState(["networksPack", "activeUser", "dataPacks"]),
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
