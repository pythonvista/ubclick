<template>
  <div class="wrap p-2">
    <div class="w-full flex  gap-1 justify-center items-center">
      <v-select
        v-model="searchtype"
        class="w-full"
        outlined
        dense
        label="Select Transaction Type"
        :items="['Transaction Id', 'User Id']"
      ></v-select>
      <v-text-field
        v-model="searchfield"
        class="w-full"
        outlined
        dense
        :label="`Enter ${searchtype}`"
      ></v-text-field>
    </div>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab> Transactions</v-tab>
      <v-tab>Wallet Transactions </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-expansion-panels>
          <v-expansion-panel v-for="(tr, i) in FilterTrans" :key="i">
            <v-expansion-panel-header>
              <div class="flex items-center justify-center ">
                <div class="flex items-center justify-center " style="width:41%">
                  <p class="ma-0 text-xs pa-0">
                {{ tr.transref }}
              </p>
                </div>
                <div class="flex items-center justify-center " style="width:38%"><span
                  class="text-white text-xs px-2 py-1 rounded ml-1 mr-2"
                  :class="{
                    'bg-green-400': tr.Status == 'successful',
                    'bg-red-400': tr.Status == 'failled',
                    'bg-orange-400': tr.Status == 'pending',
                  }"
                  >{{ tr.Status }}</span
                ></div>
                <div class="flex items-center justify-center " style="width:20%"> ₦{{ tr.amount }}</div>
              </div>
             
            
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <article class="rounded-xl border-2 border-gray-100 bg-white">
                <div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                  <div>
                    <h3 class="font-medium sm:text-lg">
                      <a href="#" class="hover:underline">
                        Transaction Type: {{ tr.transType }} 
                      </a> <br>
                      <a href="#" class="hover:underline">
                        Plan Name: {{ tr.plan_name }}
                      </a>
                      <br>
                      <a href="#" class="hover:underline">
                        Network: {{ tr.plan_network }}
                      </a>
                      <br />
                      <a href="#" class="hover:underline text-xs">
                        UserId: {{ tr.uid }}
                      </a>
                    </h3>

                    <p class="line-clamp-2 text-sm text-gray-700">
                      <span class="text-green-400 font-bold"
                        >Amount: ₦{{ tr.amount }}</span
                      >
                    </p>
                   

                    <v-btn small @click="View(tr)">View</v-btn>

                    <div class="mt-2 sm:flex sm:items-center sm:gap-2">
                      <span class="hidden sm:block" aria-hidden="true"
                        >&middot;</span
                      >
                    </div>
                  </div>
                </div>

                <div class="flex justify-end">
                  <strong
                    :class="{
                      'bg-green-400': tr.status == 'success',
                      'bg-red-400': tr.status == 'reversed',
                      'bg-orange-400': tr.status == 'pending',
                    }"
                    class="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl px-3 py-1.5 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>

                    <span class="text-[10px] font-medium sm:text-xs">{{
                      tr.status
                    }}</span>
                  </strong>
                </div>
              </article>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
         </v-tab-item>
      <v-tab-item>
        <v-expansion-panels>
          <v-expansion-panel v-for="(tr, i) in FilterWalletTrans" :key="i">
            <v-expansion-panel-header>
              <div class="flex items-center justify-center ">
                <div class="flex items-center justify-center " style="width:41%">
                  <p class="ma-0 text-xs pa-0">
                {{ tr.transref }}
              </p>
                </div>
                <div class="flex items-center justify-center " style="width:38%"><span
                  class="text-white text-xs px-2 py-1 rounded ml-1 mr-2"
                  :class="{
                    'bg-green-400': tr.status == 'success',
                    'bg-red-400': tr.status == 'reversed',
                    'bg-orange-400': tr.status == 'pending',
                  }"
                  >{{ tr.status }}</span
                ></div>
                <div class="flex items-center justify-center " style="width:20%"> ₦{{ tr.amount }}</div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <article class="rounded-xl border-2 border-gray-100 bg-white">
                <div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                  <div>
                    <h3 class="font-medium sm:text-lg">
                      <a href="#" class="hover:underline">
                        Email: {{ tr.email }}
                      </a>
                      <br />
                      <a href="#" class="hover:underline text-xs">
                        UserId: {{ tr.uid }}
                      </a>
                    </h3>

                    <p class="line-clamp-2 text-sm text-gray-700">
                      <span class="text-green-400 font-bold"
                        >Amount: ₦{{ tr.amount }}</span
                      >
                    </p>

                    <v-btn small @click="View(tr)">View</v-btn>

                    <div class="mt-2 sm:flex sm:items-center sm:gap-2">
                      <span class="hidden sm:block" aria-hidden="true"
                        >&middot;</span
                      >
                    </div>
                  </div>
                </div>

                <div class="flex justify-end">
                  <strong
                    :class="{
                      'bg-green-400': tr.status == 'success',
                      'bg-red-400': tr.status == 'reversed',
                      'bg-orange-400': tr.status == 'pending',
                    }"
                    class="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl px-3 py-1.5 text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>

                    <span class="text-[10px] font-medium sm:text-xs">{{
                      tr.status
                    }}</span>
                  </strong>
                </div>
              </article>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-tab-item>
    </v-tabs-items>

    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ dform.transref }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="p-5">
          <p class="text-center text-lg font-bold">Transaction Info</p>

          <p>Reference Number: {{ dform.transref }}</p>
          <p>Transaction Mode: {{ dform.mode ?dform.mode : dform.transType }}</p>
          <p>Validated: {{ dform.validate ? dform.validate : dform.Status }}</p>
          <p  v-if="dform.plan_name">Plan Name: {{dform.plan_name}}</p>
          <p v-if="dform.plan_network">Plan Network: {{dform.plan_network}}</p>
          <p>Amount: {{ dform.amount }}</p>
          <p>Date: {{ dform.createdAt ? dform.createdAt : dform.create_date }}</p>
          <p v-if="dform.email">Email: {{ dform.email }}</p>
          <p v-if="dform.channel">Channel: {{ dform.channel }}</p>
                   
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { apiClient } from "@/services/fetch";

export default{
  name: "AdminTransactions",
  data: () => ({
    wtransactions: [],
    alltransactions: [],
    tab: null,
    searchtype: "",
    searchfield: "",
    dialog: false,
    dform: {},
  }),
  computed: {
    FilterWalletTrans() {
      let dkey = this.searchtype == "Transaction Id" ? "transref" : "uid";
      if (this.searchtype) {
        return this.wtransactions.filter((v) =>
          v[dkey].toLowerCase().match(this.searchfield.toLowerCase())
        );
      }

      return this.wtransactions;
    },
    FilterTrans() {
      let dkey = this.searchtype == "Transaction Id" ? "transref" : "uid";
      if (this.searchtype) {
        return this.alltransactions.filter((v) =>
          v[dkey].toLowerCase().match(this.searchfield.toLowerCase())
        );
      }

      return this.alltransactions;
    },
  },
  methods: {
    async GetWTransaction() {
      try {
        const userRes = await apiClient("store", "POST", {
          collection: "WALLETTRANSACTIONS",
          sort: "",
        });
        const data = await userRes.json();
        this.wtransactions = data;

        const res = await apiClient("store", "POST", {
          collection: "TRANSACTIONS",
          sort: "",
        });
        const data2 = await res.json();
        this.alltransactions = data2;
      } catch (err) {
        console.log(err);
      }
    },

    View(trans) {
      this.dform = trans;
      this.dialog = true;
    },
  },
  created() {
    this.GetWTransaction();
  },
};
</script>

<style scoped>
.v-text-field__details {
  padding-top: 0px;
  margin-bottom: 8px;
  display: none !important;
}
.wrap {
  min-height: 100vh;
}

.wrap {
  min-height: 100vh;
}
</style>
