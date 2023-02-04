<template>
  <v-app>
    <div class="lg-screen xs:hidden mdx:block">desktop devices</div>
    <div class="mob-screen xs:block mdx:hidden">
      <v-main>
        <router-view />
      </v-main>
      <v-snackbar v-model="snackbar" timeout="3000" :color="snackColor">
        <div class="flex justify-between items-center px-3 py-1">
          <p class="ma-0 pa-0 text-white font-bold">{{ snackText }}</p>

          <v-btn color="blue" text @click="snackbar = false"> Close </v-btn>
        </div>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import { snackbar } from "@/main";

// import { auth } from "./services";

export default {
  name: 'App',
  methods:{
   checkUser(){
    let user = JSON.parse(localStorage.getItem('activeUser')) || ''
    if(user){
      this.$store.dispatch('ActiveUser', user);
    }else{
      this.$store.dispatch('RemoverUser')
    }
   }
  },

   created(){
    snackbar.$on('open', (e)=>{
      this.snackText = e.text
      this.snackColor = e.color
      this.snackbar = true
    })
    this.checkUser()
  },
  data: () => ({
    snackbar: false,
    snackText: '',
    snackColor: ''
  })


}
</script>
