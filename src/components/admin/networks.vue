<template>
  <div>
    <p class="ma-0 pa-0 text-lg text-center font-bold">Networks Settingss</p>

    <div
      v-for="(network, n) in networksPack"
      :key="n"
      class="pa-3 rounded-sm shadow flex  justify-between align-center"
    >
      <v-avatar size="2rem">
        <v-img :src="network.img"></v-img>
      </v-avatar>
      <p class="ma-0 pa-0">{{ network.name }}</p>
      <v-switch
      @change="ActivateNetwork(network)"
        v-model="network.active"
      ></v-switch>
      <v-btn small fab>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "networks",
  computed:{
    ...mapState(['networksPack'])
  },
  data: () => ({
    dform: {},
  }),
  methods:{
    async ActivateNetwork(n){
        console.log(n)
    }
  }
};
</script>

<style></style>
