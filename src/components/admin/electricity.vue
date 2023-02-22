<template>
  <div>
    <p class="ma-0 pa-0 text-lg text-center font-bold my-4">
      Electricity Settings
    </p>

    <div
      v-for="(elec, n) in electricity"
      :key="n"
      class="pa-3 rounded-sm shadow flex justify-between align-center"
    >
      <img width="100" :src="elec.img" />

      <p class="ma-0 pa-0">{{ elec.Disconame }}</p>
      <v-switch
        @change="ActivateNetwork(elec)"
        v-model="elec.active"
      ></v-switch>
      <v-btn @click="Edit(elec)" small fab>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>

    <v-dialog max-width="400px" v-model="dialog">
      <v-form
        ref="form"
        class="pa-3 bg-white flex flex-col justify-center items-center"
      >
        <p class="ma-0 pa-0 text-md text-center font-bold">Edit Cable</p>
        <v-text-field
          v-model="dform.Disconame"
          label="Disco Name"
          outlined
          :rules="inputRules"
        >
        </v-text-field>
        <v-text-field
          v-model.number="dform.DiscoID"
          label="Disco Id"
          outlined
          :rules="inputRules2"
        >
        </v-text-field>
        <v-text-field
          v-model="dform.img"
          label="Disco Img"
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
  name: "cable",
  computed: {
    ...mapState(["electricity"]),
  },
  data: () => ({
    loading: false,
    dform: {},
    dialog: false,
    inputRules: [(v) => (v && v.length >= 1) || "Field is required"],
    inputRules2: [(v) => v || "Field is required"],
  }),
  methods: {
    Edit(n) {
      this.dform = n;
      this.dialog = true;
    },
    async UpdateNetwork() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          await apiClient("store/update", "POST", {
            collection: "ELECTRICITY",
            uid: this.dform.uid,
            data: this.dform,
          });
          snackbar.$emit("open", {
            color: "succes",
            text: "Updated Successfully",
          });
          this.loading = false;
          this.dform = {};
          this.dialog = false;
        } catch (err) {
          this.loading = false;
          console.log(err);
          snackbar.$emit("open", { color: "error", text: "Error Eccoured" });
        }
      }
    },
    async ActivateNetwork(n) {
      try {
        await apiClient("store/update", "POST", {
          collection: "ELECTRICITY",
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
