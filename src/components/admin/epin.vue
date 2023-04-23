<template>
  <div>
    <p class="ma-0 pa-0 text-lg text-center font-bold my-4">Epins Settings</p>

    <div
      v-for="(epin, n) in epin"
      :key="n"
      class="pa-3 rounded-sm shadow flex justify-between align-center"
    >
      <img width="100" :src="epin.img" />

      <p class="ma-0 pa-0">{{ epin.examName }}</p>
      <v-switch
        @change="ActivateNetwork(epin)"
        v-model="epin.active"
      ></v-switch>
      <v-btn @click="Edit(epin)" small fab>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>

    <v-dialog max-width="400px" v-model="dialog">
      <v-form
        ref="form"
        class="pa-3 bg-white flex flex-col justify-center items-center"
      >
        <p class="ma-0 pa-0 text-md text-center font-bold">Edit Epin</p>
        <v-text-field
          v-model.number="dform.examName"
          label="Epin Name"
          outlined
          :rules="inputRules"
        >
        </v-text-field>
        <v-text-field
          v-model.number="dform.examid"
          label="Epin Id"
          outlined
          type="number"
          :rules="inputRules2"
        >
        </v-text-field>
        <v-text-field
          v-model.number="dform.img"
          label="Epin Img"
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
    ...mapState(["epin"]),
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
            collection: "EPIN",
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
    async ActivateNetwork(n) {
      try {
        await apiClient("store/update", "POST", {
          collection: "EPIN",
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
