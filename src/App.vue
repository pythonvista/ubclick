<template>
  <v-app>
    <div class="lg-screen xs:hidden mdx:block">desktop devices</div>
    <div class="mob-screen  xs:block mdx:hidden">
      <v-main>
        <router-view />
      </v-main>
      <v-snackbar v-model="snackbar" timeout="3000" :color="snackColor">
        <div class="flex justify-between items-center px-2">
          <p class="ma-0 pa-0 text-white text-md font-bold">{{ snackText }}</p>
          <v-btn small color="blue" text @click="snackbar = false">
            Close
          </v-btn>
        </div>
      </v-snackbar>
      <v-bottom-navigation
        :value="value"
        color="teal"
        grow
      >
        <v-btn>
          <img src="@/assets/img/home.png" alt="" />
          <span>Home</span>
        </v-btn>

        <v-btn>
          <span>Favorites</span>

          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn>
          <span>Nearby</span>

          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </v-app>
</template>

<script>
import { snackbar } from "@/main";

import { apiClient } from "./services/fetch";

// import { auth } from "./services";

export default {
  name: "App",
  methods: {
    checkUser() {
      let user = JSON.parse(localStorage.getItem("activeUser")) || "";
      if (user) {
        this.$store.dispatch("ActiveUser", user);
      } else {
        this.$store.dispatch("RemoveUser");
      }
    },
    async GetStores(collection, state) {
      try {
        const res = await apiClient("store", "POST", {
          collection: collection,
        });
        const data = await res.json();
        if (state == "networks") {
          this.$store.dispatch("SetNetwork", data);
        }
        if (state == "datapacks") {
          this.$store.dispatch("SetDatas", data);
        }
        if (state == "cables") {
          this.$store.dispatch("SetCables", data);
        }
        if (state == "cableplan") {
          this.$store.dispatch("SetCablesPlan", data);
        }
        if (state == "electricity") {
          this.$store.dispatch("SetElectricity", data);
        }
        if (state == "epin") {
          this.$store.dispatch("SetPin", data);
        }
        if (state == "atc") {
          this.$store.dispatch("SetAtc", data);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async RunGet() {
      try {
        await this.GetStores("NETWORKS", "networks");
        await this.GetStores("DATAPACKS", "datapacks");
        await this.GetStores("CABLES", "cables");
        await this.GetStores("CABLESPLAN", "cableplan");
        await this.GetStores("ELECTRICITY", "electricity");
        await this.GetStores("EPIN", "epin");
        await this.GetStores("ATC", "atc");
      } catch (err) {
        err;
      }
    },
  },

  created() {
    snackbar.$on("open", (e) => {
      this.snackText = e.text;
      this.snackColor = e.color;
      this.snackbar = true;
    });
    this.checkUser();
    this.RunGet();
  },
  data: () => ({
    snackbar: false,
    snackText: "",
    snackColor: "",
    value: 1,
  }),
};
</script>

<style scoped>
.dapp{
  height:  100vh !important;
}
</style>
