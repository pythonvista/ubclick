<template>
  <div>
    <p class="ma-0 pa-0 text-lg text-center font-bold my-4">Network Settings</p>

    <div
      v-for="(network, n) in networksPack"
      :key="n"
      class="pa-3 rounded-sm shadow flex justify-between align-center"
    >
      <v-avatar size="2rem">
        <v-img :src="network.img"></v-img>
      </v-avatar>
      <p class="ma-0 pa-0">{{ network.name }}</p>
      <v-switch
        @change="ActivateNetwork(network)"
        v-model="network.active"
      ></v-switch>
      <v-btn @click="Edit(network)" small fab>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>

    <v-dialog max-width="400px" v-model="dialog">
      <v-form ref="form" class="pa-3 bg-white flex flex-col justify-center items-center">
        <p class="ma-0 pa-0 text-md text-center font-bold">Edit Network</p>
        <v-text-field
          v-model.number="dform.name"
          label="Network Name"
          outlined
          :rules="inputRules"
        >
        </v-text-field>
        <v-text-field
          v-model.number="dform.id"
          label="Network Id"
          outlined
          type="number"
          :rules="inputRules2"
        >
        </v-text-field>
        <v-text-field
          v-model.number="dform.img"
          label="Network Img"
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
  name: "networks",
  computed: {
    ...mapState(["networksPack"]),
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
          collection: "NETWORKS",
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
          collection: "NETWORKS",
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
