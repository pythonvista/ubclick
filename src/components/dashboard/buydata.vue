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
    <div class="buy flex flex-col w-full gap-2 px-4">
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
        :items="['SME', 'GIFTING', 'CORPORATE GIFTING']"
        item-disabled
        label="Select Plan Type"
      ></v-select>
      <v-select
        :disabled="!dform.network"
        @click="plans = true"
        v-model="dform.plan"
        outlined
        readonly
        :items="planlistItems"
        label="Select Plan"
      ></v-select>

      <v-text-field label="Phone Number" outlined></v-text-field>

      <v-btn class="white--text" large depressed color="#000933">
        Buy Now
      </v-btn>
    </div>
    <v-bottom-sheet v-model="networks">
      <v-sheet class="text-center" height="350px">
        <div class="bg-white pa-3 flex flex-col justify-center items-center gap-5">
          <div
            v-for="(network, i) in networksPack"
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
        <div class="bg-white  pa-3 flex flex-col justify-center items-center gap-5">
          <div
            v-for="(plan, i) in planlist"
            :key="i"
            @click="SelectPlan(plan)"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <p class="ma-0 pa-0 font-bold text-lg">({{ plan.Network }}) {{ plan.Size }} - {{ plan.Amount }} - {{ plan.Validity }}</p>
          </div>

          <p v-if="planlist.length == 0" class="ma-0 pa-0 text-center w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center">No Plan Available</p>
           

        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "buydata",
  data: () => ({
    tab: null,
    dform: {
      network: "",
      type: "",
      plan: "" 
    },
    planlist: [],
    planlistItems: [],
    networks: false,
    networklist: [],
    plans: false,
    inputRules: [
    (v) => (v && v.length >= 1) || 'Field is required'
    ],
    amountRules: [
    (v) => (v && v >= 50 ) || "Minimum airtime purchase is ₦50",]
  }),
  methods: {
    SelectData() {
      this.networks = true
      this.dform.type = ""
      this.plan = ""
    },
    SelectNetwork(network) {
      this.dform.network = network.name;
      this.networks = false
    },
    SelectType(){
      this.dform.plan = ""
      this.planlist = this.dataPacks.filter((v)=> v.planType.toLowerCase() == this.dform.type.toLowerCase() && v.Network.toLowerCase() == this.dform.network.toLowerCase())
      this.planlist.forEach((i)=>{
        this.planlistItems.push(`${i.Size}-${i.Amount}-${i.Validity}`)
      })
    },
    SelectPlan(plan){
      this.dform.planData = plan
      this.dform.plan = `${plan.Size}-${plan.Amount}-${plan.Validity}`
      this.plans = false
      this.formatData(plan.Amount)
    },
    formatData(string){
      let striped = string.slice(1);
      this.dform.planData['amount'] = parseInt(striped)
    }
   
  },
  created() {
    if (this.networksPack) {
      this.networksPack.forEach((v) => {
        this.networklist.push(v.name);
      });
    }
  },
  computed:{
    ...mapState(["networksPack", "activeUser", "dataPacks"]),
  }
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
