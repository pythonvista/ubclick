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
          ₦{{ TotalAirtime }}+
        </h3>
      </div>

      <p class="mt-4 font-medium text-gray-500">Total Airtime Recharge</p>

      <div class="flex flex-col gap-2">
        <div
          class="text-black flex justify-between items-center p-3 border-2 border-grey-200"
        >
          MTN:
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Total ₦{{ TransDetails(1, "airtime").total }}</span
          >
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Profit ₦{{ TransDetails(1, "airtime").profit }}</span
          >
        </div>
        <div
          class="text-black flex justify-between items-center p-3 border-2 border-grey-200"
        >
          GLO:
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Total ₦{{ TransDetails(2, "airtime").total }}</span
          >
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Profit ₦{{ TransDetails(2, "airtime").profit }}</span
          >
        </div>
        <div
          class="text-black flex justify-between items-center p-3 border-2 border-grey-200"
        >
          AIRTEL:
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Total ₦{{ TransDetails(4, "airtime").total }}</span
          >
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Profit ₦{{ TransDetails(4, "airtime").profit }}</span
          >
        </div>
        <div
          class="text-black flex justify-between items-center p-3 border-2 border-grey-200"
        >
          9MOBILE:
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Total ₦{{ TransDetails(3, "airtime").total }}</span
          >
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Profit ₦{{ TransDetails(3, "airtime").profit }}</span
          >
        </div>
      </div>
    </a>
    <a
      href="#"
      class="relative block rounded-sm border-t-4 border-black p-4 shadow-xl sm:p-6 lg:p-8"
    >
      <div class="flex items-center gap-4">
        <v-icon large color="black">mdi-cash</v-icon>

        <h3 class="text-3xl font-bold text-green-500 sm:text-4xl">
          ₦{{ TotalData }}+
        </h3>
      </div>

      <p class="mt-4 font-medium text-gray-500">Total Data Recharge</p>

      <div class="flex flex-col gap-2">
        <div
          class="text-black flex justify-between items-center p-3 border-2 border-grey-200"
        >
          MTN:
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Total ₦{{ TransDetails(1, "data").total }}</span
          >
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Profit ₦{{ TransDetails(1, "data").profit }}</span
          >
        </div>
        <div
          class="text-black flex justify-between items-center p-3 border-2 border-grey-200"
        >
          GLO:
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Total ₦{{ TransDetails(2, "data").total }}</span
          >
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Profit ₦{{ TransDetails(2, "data").profit }}</span
          >
        </div>
        <div
          class="text-black flex justify-between items-center p-3 border-2 border-grey-200"
        >
          AIRTEL:
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Total ₦{{ TransDetails(4, "data").total }}</span
          >
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Profit ₦{{ TransDetails(4, "data").profit }}</span
          >
        </div>
        <div
          class="text-black flex justify-between items-center p-3 border-2 border-grey-200"
        >
          9MOBILE:
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Total ₦{{ TransDetails(3, "data").total }}</span
          >
          <span class="p-1 text-sm bg-blue-400 rounded text-white">
            Profit ₦{{ TransDetails(3, "data").profit }}</span
          >
        </div>
      </div>
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

    TransDetails(network, bill) {
      if (bill == "airtime") {
        let trans = this.trans.filter(
          (v) =>
            v.network == network &&
            v.transType == "Airtime" &&
            v.Status == "successful"
        );

        let total = trans.reduce((ac, cv) => ac + parseInt(cv.amount), 0);
        let profit =
          total - trans.reduce((ac, cv) => ac + parseInt(cv.plan_amount), 0);
        return { total: total, profit: profit };
      }

      if (bill == "data") {
        let trans = this.trans.filter(
          (v) => v.network == network && v.transType == "Data"
        );
        console.log(trans);
        let total = trans.reduce(
          (accumulator, currentValue) =>
            accumulator + parseInt(currentValue.amount),
          0
        );
        let profit =
          total -
          trans.reduce(
            (accumulator, currentValue) =>
              accumulator + parseInt(currentValue.amount),
            0
          );
        return { total: total, profit: profit };
      }

      if (bill == "cable") {
        let trans = this.trans.filter(
          (v) => v.network == network && v.transType == "Cable"
        );
        let total = trans.reduce(
          (accumulator, currentValue) => accumulator + currentValue.amount,
          0
        );
        let profit =
          total -
          trans.reduce(
            (accumulator, currentValue) => accumulator + currentValue.amount,
            0
          );
        return { total: total, profit: profit };
      }

      return { total: 0, profit: 0 };
    },
  },
  computed: {
    TotalDeposit() {
      let totalincome = this.wallettrans.filter((v) => v.mode == "credit");
      return totalincome.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );
    },
    TotalAirtime() {
      let total = this.trans.filter(
        (v) => v.transType == "Airtime" && v.Status == "successful"
      );
      return total.reduce(
        (accumulator, currentValue) =>
          accumulator + parseInt(currentValue.amount),
        0
      );
    },
    TotalData() {
      let total = this.trans.filter(
        (v) => v.transType == "Data" && v.Status == "successful"
      );
      console.log(total);
      return total.reduce(
        (accumulator, currentValue) =>
          accumulator + parseInt(currentValue.amount),
        0
      );
    },
    TotalCable() {
      let total = this.trans.filter((v) => v.transType == "Cable");
      return total.reduce(
        (accumulator, currentValue) =>
          accumulator + parseInt(currentValue.amount),
        0
      );
    },
    TotalEpins() {
      let total = this.trans.filter((v) => v.transType == "Epins");
      return total.reduce(
        (accumulator, currentValue) =>
          accumulator + parseInt(currentValue.amount),
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
