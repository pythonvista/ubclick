<template>
  <div class="wrap bg-white overflow-hidden px-3">
    <AppBar title="Settings"></AppBar>
   <div>
    <v-list class="bg-grey-200">
    <v-list-item-group >
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

      <v-list-item link :to="{name: 'ChangePassword'}"
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
import AppBar from "../utils/AppBar.vue";

export default {
   name:'Settings',
   props: ["userData"],
   components: {
    AppBar
  },
   data: ()=>({
   })
}
</script>

<style scoped>
.slatepri{
   background: #F4F3F3 !important;
}

</style>