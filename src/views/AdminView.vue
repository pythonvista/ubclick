<template>
  <v-card v-if="isAdmin">
    <v-toolbar color="black" dark flat>
      <v-toolbar-title>Admin Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn :to="{ path: '/' }" icon>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <adminhomeVue></adminhomeVue>
      </v-tab-item>
      <v-tab-item>
        <usersVue></usersVue>
      </v-tab-item>
      <v-tab-item>
        <AdmintransactionsVue></AdmintransactionsVue>
      </v-tab-item>
      <v-tab-item>
        <networkcomponent></networkcomponent>
      </v-tab-item>
      <v-tab-item>
        <datacomponent></datacomponent>
      </v-tab-item>
      <v-tab-item>
        <cables></cables>
      </v-tab-item>
      <v-tab-item>
        <cablesplan></cablesplan>
      </v-tab-item>
      <v-tab-item>
        <electricity></electricity>
      </v-tab-item>
      <v-tab-item>
        <epinVue></epinVue>
      </v-tab-item>
      <v-tab-item>
        <airtimetocash></airtimetocash>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
  <div
    v-else
    class="h-screen gap-2 w-full flex flex-col justify-center items-center"
  >
    <div
      v-if="spinner"
      class="spinner around absolute top-0 left-0 bg-white z-10 flex justify-center items-center w-full h-screen"
    >
      <img width="80" src="@/assets/spinner.gif" alt="" />
    </div>
    <p v-if="!isAdmin" class="text-red-600 text-center">
      Access Denied!! <br />
      Dont know how you got here.. but you are violating a route policy.
    </p>
    <v-btn v-if="!isAdmin" :to="{ path: '/dashboard' }">Go Home</v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";

import adminhomeVue from "@/components/admin/adminhome.vue";
import AdmintransactionsVue from "@/components/admin/Admintransactions.vue";
import airtimetocash from "@/components/admin/airtimetocash.vue";
import cables from "@/components/admin/cables.vue";
import cablesplan from "@/components/admin/cablesplan.vue";
import datacomponent from "@/components/admin/dataplans.vue";
import electricity from "@/components/admin/electricity.vue";
import epinVue from "@/components/admin/epin.vue";
import networkcomponent from "@/components/admin/networks.vue";
import usersVue from "@/components/admin/users.vue";
import { apiClient } from "@/services/fetch";

export default {
  name: "AdminView",
  computed: {
    isAdmin() {
      console.log(this.userData.account)
      if (this.userData.account == "ADMIN") {
        return true;
      }

      return false;
    },

    ...mapState(['activeUser'])
  },
  components: {
    networkcomponent,
    datacomponent,
    electricity,
    cables,
    cablesplan,
    AdmintransactionsVue,
    epinVue,
    airtimetocash,
    adminhomeVue,
    usersVue,
  },
  methods: {
    async getUserData() {
      
      try {
        const res = await apiClient("userData", "POST", {
          uid: this.activeUser,
        });
        if (res) {
          this.userData = await res.json();
          this.spinner = false
        } else {
          this.getUserData();
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  data: () => ({
    tab: null,
    items: [
      "Hompage",
      "Users Dashboard",
      "Transactions",
      "Network Settings",
      "Dataplans Setting",
      "Cables",
      "Cables Plan",
      "Electricity",
      "Epins",
      "Airtime To Cash",
    ],
    userData: {},
    spinner: true
  }),
  created() {
    this.getUserData();
  },
};
</script>

<style></style>
