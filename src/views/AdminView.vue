<template>
    <v-card>
      <v-toolbar
        color="black"
        dark
        flat
      >
       
  
        <v-toolbar-title>Admin Dashboard</v-toolbar-title>
  
        <v-spacer></v-spacer>

  
        <v-btn :to="{path: '/'}" icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
  
        <template v-slot:extension>
          <v-tabs
            v-model="tab"
            align-with-title
          >
            <v-tabs-slider color="yellow"></v-tabs-slider>
  
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
  
      <v-tabs-items v-model="tab">
        <v-tab-item>
            <div class="h-screen flex justify-center align-center">
                <p>Welcome To Ubclciks App</p>
            </div>
            
        </v-tab-item>
        <v-tab-item>
            <div class="h-screen flex justify-center align-center">
                <p>Users Dashboard</p>
            </div>
            
        </v-tab-item>
        <v-tab-item>
            <div class="h-screen flex justify-center align-center">
                <p>Transactions</p>
            </div>
            
        </v-tab-item>
        <v-tab-item>
            <networkcomponent ></networkcomponent>
            
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
      </v-tabs-items>
    </v-card>
  </template>

<script>
import cables from "@/components/admin/cables.vue";
import cablesplan from "@/components/admin/cablesplan.vue";
import datacomponent from "@/components/admin/dataplans.vue";
import electricity from "@/components/admin/electricity.vue";
import networkcomponent from "@/components/admin/networks.vue";

export default {
    name: 'AdminView',
    components:{
        networkcomponent,
        datacomponent,
        electricity,
        cables,
        cablesplan 
    },
    data:()=>({
        tab: null,
        items: [
          'Hompage', 'Users Dashboard', 'Transactions', 'Network Settings', 'Dataplans Setting', 'Cables', 'Cables Plan','Electricity'
        ],
    })
}
</script>

<style>

</style>