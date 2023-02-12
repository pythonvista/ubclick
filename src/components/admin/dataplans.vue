<template>
  <div>
    <p class="ma-0 pa-0 text-lg text-center font-bold my-4">
      Data Plan Settings
    </p>

    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab v-for="(network, n) in networksPack" :key="n">
        {{ network.name }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(network, n) in networksPack" :key="n">
        <div
          v-for="(data, d) in dataPacks.filter(
            (v) => v.Network.toLowerCase() == network.name.toLowerCase()
          )"
          :key="d"
          class="pa-3 border-2 mx-3 my-2 md:flex-row xs:flex-col border-solid rounded-sm shadow flex justify-between align-center"
        >
          <p class="ma-0 pa-0">{{ data.planType }}</p>
          <p class="ma-0 pa-0">{{ data.Size }}</p>
          <p class="ma-0 pa-0">{{ data.Validity }}</p>
          <p class="ma-0 pa-0">{{ data.Amount }}</p>
          <v-switch
            @change="ActivateData(data)"
            v-model="data.active"
          ></v-switch>
          <v-btn @click="Edit(data)" small fab>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </v-tab-item>
    </v-tabs-items>

    <v-dialog max-width="400px" v-model="dialog">
      <v-form
        ref="form"
        class="pa-3 bg-white flex flex-col justify-center items-center"
      >
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
  name: "dataplans",
  computed: {
    ...mapState(["dataPacks", "networksPack"]),
  },
  data: () => ({
    loading: false,
    dform: {},
    dialog: false,
    tab: null,
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
            collection: "DATAPACKS",
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
    async ActivateData(n) {
      try {
        await apiClient("store/update", "POST", {
          collection: "DATAPACKS",
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
