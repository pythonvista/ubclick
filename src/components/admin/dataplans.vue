<template>
  <div>
    <p class="ma-0 pa-0 text-lg text-center font-bold my-4">
      Data Plan Settings
    </p>
    <div class="flex justify-center items-center pa-3">
      <v-btn small color="blue" class="white--text" @click="OpenPlan"
        >Add New Plan</v-btn
      >
    </div>
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
          v-model="dform.Network"
          label="Network Name"
          outlined
          :rules="inputRules"
        >
        </v-text-field>
        <v-text-field
          v-model="dform.planType"
          label="Plan Type"
          outlined
          :rules="inputRules"
        >
        </v-text-field>
        <v-text-field
          v-model="dform.Size"
          label="Plan Size"
          outlined
          :rules="inputRules"
        >
        </v-text-field>
        <v-text-field
          v-model="dform.Validity"
          label="Plan Validity"
          outlined
          :rules="inputRules"
        >
        </v-text-field>

        <v-text-field
          v-model="dform.dataId"
          label="Data Id"
          outlined
          type="number"
          :rules="inputRules2"
        >
        </v-text-field>
        <v-text-field
          v-model="dform.Amount"
          label="Data Price"
          outlined
          :rules="inputRules"
        >
        </v-text-field>

        <v-btn v-if="dform.docid" :loading="loading" @click="UpdateNetwork"
          >Save Changes</v-btn
        >

        <v-btn
          v-else
          color="blue"
          class="white--text"
          :loading="loading"
          @click="AddPlan"
          >Add Plan</v-btn
        >
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
            uid: this.dform.docid,
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
    OpenPlan() {
      this.dform = {};
      this.dialog = true;
    },
    async AddPlan() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          const response = await apiClient("store/add", "POST", {
            data: this.dform,
            collection: "DATAPACKS",
          });
          const res = await response.json();
          if (res.status == "error") {
            throw res;
          }

          if (res.status == "success") {
            this.loading = false;
            this.dialog = false;
            snackbar.$emit("open", { color: "success", text: res.msg });
          }
        } catch (err) {
          this.loading = false;
          snackbar.$emit("open", { color: "error", text: "Error Eccoured" });
        }
      }
    },
    async ActivateData(n) {
      try {
        await apiClient("store/update", "POST", {
          collection: "DATAPACKS",
          uid: n.docid,
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
