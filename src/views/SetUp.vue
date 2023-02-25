<template>
  <div class="flex h-screen justify-center items-center" v-if="!loadDom">
    <v-skeleton-loader
      class="w-full"
      type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
    ></v-skeleton-loader>
  </div>
  <div v-else>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">
          WURLD MOBILE SERVICES V.1.3!
        </h1>

        <p class="mt-4 text-gray-500">
          Installation <br />
          Note you need a very strong internet connection to complete this
          installation process
        </p>
      </div>

      <form action="" class="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <div>
          <label for="email" class="sr-only">Full Name</label>
          <div class="relative">
            <input
              type="text"
              v-model="dform.fullname"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Full Name"
            />
          </div>
        </div>
        <div>
          <label for="email" class="sr-only">App Name</label>

          <div class="relative">
            <input
              type="text"
              v-model="dform.appname"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter AppName"
            />
          </div>
        </div>
        <div>
          <label for="email" class="sr-only">System Support Mail</label>

          <div class="relative">
            <input
              type="email"
              v-model="dform.supportmail"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Support email"
            />
          </div>
        </div>
        <div>
          <label for="email" class="sr-only">Company Mobile Number</label>

          <div class="relative">
            <input
              type="phone"
              v-model="dform.phone"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Mobile Number"
            />
          </div>
        </div>
        <div>
          <label for="email" class="sr-only">Paystack Public Key</label>

          <div class="relative">
            <input
              type="password"
              v-model="dform.pystackpublickey"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Paystack Public Key"
            />
          </div>
        </div>
        <div>
          <label for="email" class="sr-only">Backend Api Domain Url</label>

          <div class="relative">
            <input
              type="text"
              v-model="dform.apiurl"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Api Domain Url"
            />
          </div>
        </div>
        <div>
          <label for="email" class="sr-only">Website URL</label>

          <div class="relative">
            <input
              type="text"
              v-model="dform.websiteUrl"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Website Url"
            />
          </div>
        </div>
        <div>
          <label for="email" class="sr-only">Email</label>

          <div class="relative">
            <input
              type="email"
              v-model="dform.email"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter Email"
            />
          </div>
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <div class="relative">
            <input
              type="password"
              v-model="dform.passwd"
              class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
            />
          </div>
        </div>
        <v-btn @click="FirstStep()" block color="red" class="white--text"
          >Begin Installation</v-btn
        >
      </form>
    </div>

    <v-dialog v-model="dialog" max-width="300">
      <div class="bg-white px-3 py-4 flex flex-col justify-center items-center gap-3 rounded shadow-md">
        <p class="ma-0 pa-0">{{ title.info }}</p>
        <p class="ma-0 pa-0">{{ title.descrp }}</p>
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
          v-if="progress"
        ></v-progress-circular>
        <p class="ma-0 pa-0">{{ title.status }}</p>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import atc from "@/json_database/atcnumbers.json";
import cableplans from "@/json_database/cableplans.json";
import cables from "@/json_database/cables.json";
import dataPacks from "@/json_database/dataplans.json";
import epins from "@/json_database/educationpin.json";
import electricity from "@/json_database/electricity.json";
import network from "@/json_database/networks.json";
import { snackbar } from "@/main";
import { apiClient } from "@/services/fetch";

export default {
  name: "SetUp",
  data: () => ({
    Admin: {},
    loadDom: false,
    dform: {
      
    },
    title: { info: "", descrp: "", status: '' },
    temp: {},
    dialog: false,
    progress: false
  }),
  methods: {
    async GetSetup() {
      try {
        const res = await apiClient("setup", "GET");
        const data = await res.json();
        if(data.length > 0){
          this.Admin = data[0];
         
        }
        this.AllowSetup();
      } catch (err) {
        console.log(err);
      }
    },
    AllowSetup() {
      if (!this.Admin?.id || !this.Admin?.setUpProcess) {
        this.loadDom = true;
      } else {
        alert(
          "Installation Aborted, System has being Installed, If you need a fresh installation. Backup and clear your database system manually"
        );
        this.$router.push({ path: "/" });
      }
    },
    PopulateInfo(title, descrp){
      this.title.info = title;
      this.title.descrp = descrp;
    },
    async FirstStep() {
      try {
        this.dialog = true
        this.PopulateInfo('Step 1', 'Creating Admin Account Pls Wait....')
        this.progress = true
        const res = await apiClient("setup/createadmin", "POST", this.dform);
        const data = await res.json()
        if (data.status == "success") {
          this.temp.userId = data.uniqueId;
          this.title.status = data.msg
         await this.Steps('Step 2', dataPacks, 'DATAPACKS')
         await this.Steps('Step 3', network, 'NETWORKS')
         await this.Steps('Step 4', electricity, 'ELECTRICITY')
         await this.Steps('Step 5', cables, 'CABLES')
         await this.Steps('Step 6', cableplans, 'CABLESPLAN')
         await this.Steps('Step 7', epins, 'EPIN')
         await this.Steps('Step 7', atc, 'ATC')
         await apiClient("setup/finalsetup", "POST", {id: this.temp.userId, setUpProcess: true});
         this.progress = false
          this.dialog = false
          snackbar.$emit('open', { color: 'success', text: 'Installation Completed' })
        }
      } catch (err) {
        this.progress = false
        console.log(err);
        snackbar.$emit('open', { color: 'error', text: 'Error Eccoured' })
      }
    },
    async Steps(step, jsondata,collection){
      try{
        this.PopulateInfo(step, `Migrating ${collection} Pls Wait....`)
        const res = await apiClient("setup/migrate", "POST", {data: jsondata, collection: collection});
        const data = await res.json()
        if (data.status == "success") {
          this.title.status = data.msg
        }
      }catch(err){
        console.log(err)
        snackbar.$emit('open', { color: 'error', text: 'Error Eccoured' })
      }
    }

  },
  computed: {},
  created() {
    this.GetSetup();
  },
  props: {},
  components: {},
};
</script>

<style></style>
