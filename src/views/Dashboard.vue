<template>
   <div class="flex h-screen justify-center items-center" v-if="!userData.id">
    <v-skeleton-loader class="w-full"   type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"></v-skeleton-loader>
  </div>
  <div v-else>
    <router-view :userData="userData" />
   
  </div>
 
</template>

<script>
import { mapState } from "vuex";

import { apiClient } from "@/services/fetch";

export default {
  name: 'Dashboard',
  data: ()=>({
    userData: {}
  }),
  created(){
    this.getUserData()
  },
  computed:{
    ...mapState(['activeUser'])
  },
  methods:{
  async  getUserData(){
    try{
    const res = await apiClient('userData', 'POST', {uid: this.activeUser})
    if(res){
      this.userData = await res.json()
    }else{
      this.getUserData()
    }
    }catch(err){
      console.log(err)
    }
    }

  }


}
</script>

<style  scoped>

.meto{
  position: fixed !important;
  bottom: 0;
  left: 0;
  width: 100% !important;
}

</style>