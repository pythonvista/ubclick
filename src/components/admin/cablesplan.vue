<template>
    <div>
      <p class="ma-0 pa-0 text-lg text-center font-bold my-4">Cables Plan</p>
      <div v-for="(cab, mn) in cables" :key="mn" class="pa-2">
        <p class="ma-0 pa-0 text-center text-lg font-bold">{{ cab.CableName }}</p>

        <div
        v-for="(cable, n) in cablesPlan.filter((v) => v.category == cab.CableName.toLowerCase())"
        :key="n"
        class="pa-3 rounded-sm shadow flex justify-between align-center"
      >
        <p class="ma-0 pa-0">{{ cable.CableplanName }}</p>
        <p class="ma-0 pa-0">₦{{ cable.amount }}</p>
        <v-switch
          @change="ActivateNetwork(cable)"
          v-model="cable.active"
        ></v-switch>
        <v-btn @click="Edit(cable)" small fab>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </div>
      </div>
  
      <v-dialog max-width="400px" v-model="dialog">
        <v-form ref="form" class="pa-3 bg-white flex flex-col justify-center items-center">
          <p class="ma-0 pa-0 text-md text-center font-bold">Edit Cable</p>
          <v-text-field
            v-model.number="dform.CableplanName"
            label="Cable Name"
            outlined
            :rules="inputRules"
          >
          </v-text-field>
          <v-text-field
            v-model.number="dform.CableplanID"
            label="Cable Id"
            outlined
            type="number"
            :rules="inputRules2"
          > </v-text-field>
          <v-text-field
            v-model.number="dform.amount"
            label="Cable Id"
            outlined
            type="text"
            :rules="inputRules2"
          >
          </v-text-field>
          <v-text-field
            v-model.number="dform.category"
            label="Cable Category"
            outlined
            :rules="inputRules"
          >
          </v-text-field>
  
          <v-btn :loading="loading" @click="UpdateNetwork">Save Changes</v-btn>
      </v-form>
      </v-dialog>
    </div>
  </template>
  
  <script>
import { mapState } from "vuex";

import { snackbar } from "@/main";
import { apiClient } from "@/services/fetch";

export default {
    name: "cablesplan",
    computed: {
      ...mapState(["cablesPlan", "cables"]),
    },
    data: () => ({
      loading: false,
      dform: {},
      dialog: false,
      inputRules: [
      (v) => (v && v.length >= 1) || 'Field is required'
      ],
      inputRules2: [
      (v) => (v) || 'Field is required'
      ],
    }),
    methods: {
      Edit(n){
          this.dform = n
          this.dialog = true
      },
     async UpdateNetwork(){
      if(this.$refs.form.validate()){
          try {
          this.loading = true
          await apiClient("store/update", "POST", {
            collection: "CABLESPLAN",
            uid: this.dform.uid,
            data: this.dform,
          });
          snackbar.$emit("open", {
            color: "succes",
            text: "Updated Successfully",
          });
          this.loading = false
          this.dform = {}
          this.dialog = false
          
        } catch (err) {
          this.loading = false
          console.log(err);
          snackbar.$emit("open", { color: "error", text: "Error Eccoured" });
        }
      }
      
     },
      async ActivateNetwork(n) {
        try {
          await apiClient("store/update", "POST", {
            collection: "CABLESPLAN",
            uid: n.uid,
            data: n,
          });
          snackbar.$emit("open", {
            color: "succes",
            text: "Updated Successfully",
          });
        } catch (err) {
          console.log(err);
          snackbar.$emit("open", { color: "error", text: "Error Eccoured" });
        }
      },
    },
  };
  
</script>
  
  <style></style>
  