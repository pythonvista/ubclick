<template>
  <div class="wrap bg-white overflow-hidden px-3">
   <div
     class="navigator bg-white py-4 mb-9 px-3 w-full relative flex items-center"
   >
     <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
       ><v-icon>mdi-arrow-left</v-icon></v-btn
     >
     <p class="ma-0 pa-0 text-center w-full absolute text-title">
       Settings
     </p>

   </div>

   <div>
    <v-list class="bg-grey-200">
    <v-list-item-group v-model="model">
      <v-list-item
      >
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >@{{ userData.username}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
      >
        <v-list-item-icon>
          <v-icon>mdi-phone</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >{{ userData.phone }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
      >
        <v-list-item-icon>
          <v-icon>mdi-email</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >{{ userData.email }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <p class="pa-0 text-primary mx-4 font bold ma-0 my-5">Security</p>

      <v-list-item
      >
        <v-list-item-icon>
          <v-icon>mdi-lock</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >Change Password</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
      >
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <p class="pa-0 text-primary mx-4 font bold ma-0 my-5">About</p>
      <v-list-item
      >
        <v-list-item-icon>
          <v-icon>mdi-information</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >About Ubclicks</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
      >
        <v-list-item-icon>
          <v-icon>mdi-card-account-mail</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >Contact Us</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
   </div>
  

 </div>
</template>

<script>
export default {
   name:'Settings',
   props: ["userData"],
   data: ()=>({
    model: 1,
   })
}
</script>

<style scoped>
.slatepri{
   background: #F4F3F3 !important;
}

</style>