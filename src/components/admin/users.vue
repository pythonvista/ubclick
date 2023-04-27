<template>
  <div class="wrap p-2">
    <div class="w-full p-3 flex flex-col gap-1 justify-center items-center">
      <v-select
        v-model="userType"
        class="w-full"
        outlined
        dense
        label="Select User Type"
        :items="['ADMIN', 'USERS', 'ALL']"
      ></v-select>
      <v-select
        v-model="searchtype"
        class="w-full"
        outlined
        dense
        label="Select Search Type"
        :items="['Email', 'Name', 'User Id']"
      ></v-select>
      <v-text-field
        v-model="searchfield"
        class="w-full"
        outlined
        dense
        :label="`Enter ${searchtype}`"
      ></v-text-field>
    </div>

    <v-expansion-panels>
      <v-expansion-panel v-for="(user, i) in FilterUser" :key="i">
        <v-expansion-panel-header>
          {{ user.fullname }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <article class="rounded-xl border-2 border-gray-100 bg-white">
            <div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
              <a href="#" class="block shrink-0">
                <img
                  alt="Speaker"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  class="h-14 w-14 rounded-lg object-cover"
                />
              </a>

              <div>
                <h3 class="font-medium sm:text-lg">
                  <a href="#" class="hover:underline">
                    {{ user.fullname }}
                  </a>
                  <br>
                  <a href="#" class="hover:underline text-xs">
                    {{ user.userId }}
                  </a>
                </h3>

                <p class="line-clamp-2 text-sm text-gray-700">
                  {{ user.email }} <br>
                  {{ user.phone }} <br>
                  {{ user.account }} <br>
                 <span class="text-green-400 font-bold">Balance: ₦{{ user.balance }}</span>
                </p>

                <div class="mt-2 sm:flex sm:items-center sm:gap-2">
                 

                  <span class="hidden sm:block" aria-hidden="true"
                    >&middot;</span
                  >

                  <p class="hidden sm:block sm:text-xs sm:text-gray-500">
                    Posted by
                    <a
                      href="#"
                      class="font-medium underline hover:text-gray-700"
                    >
                      John
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <strong
                class="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white"
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

                <span class="text-[10px] font-medium sm:text-xs">Active!</span>
              </strong>
            </div>
          </article>

         
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { apiClient } from "@/services/fetch";

export default {
  name: "Users",
  data: () => ({
    allUsers: [],
    userType: "",
    searchtype: "",
    searchfield: "",
  }),
  computed: {
    FilterUser() {
      if (this.userType == "ADMIN") {
        if (this.searchtype == "Email") {
          return this.allUsers.filter(
            (v) =>
              v.account == this.userType &&
              v.email.toLowerCase().match(this.searchfield.toLowerCase())
          );
        }
        if (this.searchtype == "Name") {
          return this.allUsers.filter(
            (v) =>
              v.account == this.userType &&
              v.fullname.toLowerCase().match(this.searchfield.toLowerCase())
          );
        }
        if (this.searchtype == "User Id") {
          return this.allUsers.filter(
            (v) =>
              v.account == this.userType &&
              v.userId.toLowerCase() == this.searchfield.toLowerCase()
          );
        }

        return this.allUsers;
      }
      if (this.userType == "USERS") {
        if (this.searchtype == "Email") {
          return this.allUsers.filter(
            (v) =>
              v.account == "smart earner" &&
              v.email.toLowerCase().match(this.searchfield.toLowerCase())
          );
        }
        if (this.searchtype == "Name") {
          return this.allUsers.filter(
            (v) =>
              v.account == "smart earner" &&
              v.fullname.toLowerCase().match(this.searchfield.toLowerCase())
          );
        }
        if (this.searchtype == "User Id") {
          return this.allUsers.filter(
            (v) =>
              v.account == "smart earner" &&
              v.userId.toLowerCase() == this.searchfield.toLowerCase()
          );
        }
        return this.allUsers;
      }
      if (this.userType == "ALL") {
        if (this.searchtype == "Email") {
          return this.allUsers.filter((v) =>
            v.email.toLowerCase().match(this.searchfield.toLowerCase())
          );
        }
        if (this.searchtype == "Name") {
          return this.allUsers.filter((v) =>
            v.fullname.toLowerCase().match(this.searchfield.toLowerCase())
          );
        }
        if (this.searchtype == "User Id") {
          return this.allUsers.filter(
            (v) => v.userId.toLowerCase() == this.searchfield.toLowerCase()
          );
        }
        return this.allUsers;
      }

      return this.allUsers;
    },
  },
  methods: {
    async GetUsers() {
      try {
        const userRes = await apiClient("store", "POST", {
          collection: "USERS",
          sort: "",
        });
        const data = await userRes.json();
        this.allUsers = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    this.GetUsers();
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
</style>
