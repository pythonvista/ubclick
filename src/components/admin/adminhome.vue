<template>
  <div class="wraped flex flex-col gap-4">
    <div class="p-4 bg-white rounded-sm shadow-md text-gray-500">
      <v-icon large color="black">mdi-account-circle</v-icon>

      <h3 class="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
        Total Registered Users
      </h3>

      <p class="mt-2 text-sm sm:block">
        You have a total of
        <span class="font-bold text-red-600"> {{ userCount }}</span> registered
        users
      </p>
    </div>

    <a
      href="#"
      class="relative block rounded-sm border-t-4 border-black p-4 shadow-xl sm:p-6 lg:p-8"
    >
      <div class="flex items-center gap-4">
        <v-icon large color="black">mdi-cash</v-icon>

        <h3 class="text-3xl font-bold text-green-500 sm:text-4xl">
          ₦{{ TotalDeposit }}+
        </h3>
      </div>

      <p class="mt-4 font-medium text-gray-500">Total deposit made</p>
    </a>

    <a
      href="#"
      class="relative block rounded-sm border-t-4 border-black p-4 shadow-xl sm:p-6 lg:p-8"
    >
      <div class="flex items-center gap-4">
        <v-icon large color="black">mdi-cash</v-icon>

        <h3 class="text-3xl font-bold text-green-500 sm:text-4xl">
          ₦{{ TotalDeposit }}+
        </h3>
      </div>

      <p class="mt-4 font-medium text-gray-500">Total Airtime Recharge</p>
    </a>
  </div>
</template>

<script>
import { apiClient } from "@/services/fetch";

export default {
  name: "AdminHome",
  data: () => ({
    users: [],
    userCount: 0,
    wallettrans: [],
    trans: [],
  }),
  methods: {
    async GetInfo() {
      const userRes = await apiClient("store", "POST", {
        collection: "USERS",
        sort: "",
      });
      const users = await userRes.json();
      this.users = users;
      this.userCount = users.length;

      const walletRes = await apiClient("store", "POST", {
        collection: "WALLETTRANSACTIONS",
        sort: "",
      });

      this.wallettrans = await walletRes.json();

      const transRes = await apiClient("store", "POST", {
        collection: "TRANSACTIONS",
        sort: "",
      });

      this.trans = await transRes.json();
    },

    // TransDetails(network, bill) {
    //   if (bill == "airtime") {
    //     let trans = this.trans.filter(
    //       (v) => v.network == network && v.transType == "Airtime"
    //     );

    //     return {};
    //   }

    //   if ((bill = "data")) {
    //     return {};
    //   }

    //   if ((bill = "cable")) {
    //     return {};
    //   }
    // },
  },
  computed: {
    TotalDeposit() {
      let totalincome = this.wallettrans.filter((v) => v.mode == "credit");
      return totalincome.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );
    },
  },
  created() {
    this.GetInfo();
  },
};
</script>

<style scoped>
.wraped {
  padding: 1rem;
  min-height: 90vh;
}
</style>
