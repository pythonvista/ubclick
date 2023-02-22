<template>
  <div class="wrap">
    <div
      class="navigator bg-white py-4 mb-9 px-3 w-full relative flex items-center"
    >
      <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <p class="ma-0 pa-0 text-center w-full absolute text-title">
        Cable Subcription
      </p>
    </div>
    <div class="buy flex flex-col w-full gap-2 px-4">
      <v-select
        v-model="dform.CableName"
        outlined
        readonly
        item-disabled
        :items="allCables"
        label="Select Cable"
        @click="OpenCable"
      ></v-select>
      <v-select
        v-model="dform.CableplanName"
        outlined
        readonly
        item-disabled
        @click="OpenPlan"
        :items="allCablePlansitems"
        label="Select Plan"
      ></v-select>
      <v-text-field
        v-model="dform.iuc"
        label="Smart Card"
        outlined
      ></v-text-field>
      <v-text-field outlined  label="Iuc Name" readonly v-if="dform.iucName" v-model="dform.iucName"></v-text-field>
      <v-btn v-if="dform.iucName" :loading="loading" @click="BuyCable" class="white--text" large depressed color="#000933">
        Buy Cable
      </v-btn>
      <v-btn v-else  :loading="loading" large depressed color="black" class="white--text" @click="ValidateIuc">Validate Iuc Number</v-btn>
     

    </div>
    <v-bottom-sheet v-model="sCables">
      <v-sheet class="text-center" height="350px">
        <div
          v-for="(cab, i) in cables.filter((v)=> v.active == true )"
          :key="i"
          class="bg-white pa-3 flex flex-col justify-center items-center gap-5"
        >
          <div
            @click="SelectCable(cab)"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex justify-center items-center"
          >
            <img width="150" :src="cab.img" />
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <v-bottom-sheet v-model="sCablesplan">
      <v-sheet class="text-center overflow-y-scroll" height="650px">
        <div
          v-for="(cab, i) in allCablePlans.filter((v)=> v.active == true )"
          :key="i"
          class="bg-white pa-3 flex flex-col justify-center items-center gap-5"
        >
          <div
            @click="SelectPlan(cab)"
            class="w-full px-2 py-3 border-2 rounded border-solid gap-2 hover:border-black flex items-center"
          >
            <p class="ma-0 pa-0 font-bold text-lg">
              {{ cab.CableplanName }}- ₦{{ cab.amount }}
            </p>
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
    sCables: false,
    sCablesplan: false,
    dform: {
      network: "",
      iucName: ""
    },
    loading: false,
    allCablePlans: []
  }),
  methods: {
    OpenCable() {
      this.sCables = true;
    },
    SelectCable(cable) {
      this.dform.CableName = cable.CableName;
      this.dform.CableplanName = "";
      this.dform.iucName = ""
      this.dform.CableID = cable.CableID;
      this.allCablePlans = this.cablesPlan.filter(
        (i) => i.category.toLowerCase() == cable.CableName.toLowerCase()
      );
      this.sCables = false;
    },
    OpenPlan() {
      this.sCablesplan = true;
    },
    SelectPlan(plan) {
      this.dform.CableplanName = plan.CableplanName;
      this.dform.plan = { ...plan };
      this.sCablesplan = false;
    },
    async ValidateIuc() {
      this.loading = true
      try {
        const res = await apiClient(`cables/validate?iucNumber=${this.dform.iuc}&cableName=${this.dform.CableName}`, 'GET')
        const data = await res.json()
        if(data.invalid == false){
          this.loading = false
          this.dform.iucName = data.name
        }else{
          this.loading = false
          snackbar.$emit('open', { color: 'error', text: 'invalid iuc name'})
        }
      } catch (err) {
        this.loading = false
        snackbar.$emit('open', { color: 'error', text: 'Error Occured'})
      }
    },
    async BuyCable(){
      this.loading = true
      try{
        let data = {
          cableID: this.dform.CableID,
          cablePlanId: this.dform.plan.CableplanID,
          cableName: this.dform.CableName,
          planName: this.dform.CableplanName,
          iuc: this.dform.iuc,
          IucAccName: this.dform.iucName,
          uid: this.activeUser,
          amount: this.dform.plan.amount
        }
        const res = await apiClient('cables/buy', 'POST', data)
        const response = await res.json()
        this.loading = false
        if(response.status == 'error'){
          throw {msg: response.msg, err: response.err}
        }
        if(response.status == 'success'){
          snackbar.$emit('open', { color: 'success', text: response.msg})
        }
      }catch(err){
        this.loading = false
        snackbar.$emit('open', { color: 'error', text: err.msg})
      }
    }
  },
  created() {
    // if (this.cables) {
    //   this.cables.forEach((v) => {
    //     this.allCables.push(v.CableName);
    //   });
    // }
    // if (this.cablesPlan) {
    //   this.cablesPlan.forEach((e) => {
    //     this.allCablePlansitems.push(e.CableplanName);
    //   });
    //   this.allCablePlans = this.cablesPlan;
    // }
  },
  computed: {
    ...mapState(["cables", "cablesPlan", "activeUser"]),
    allCables(){
      let all = []
      this.cables.forEach((v) => {
        all.push(v.CableName);
      });

      return all
    },
    allCablePlansitems(){
      let all = []
      this.cablesPlan.forEach((e) => {
        all.push(e.CableplanName);
      });

      return all
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
