<template>
  <div class="register">
    <div
      class="register-box px-5 shadow-md flex flex-col items-center gap-2 justify-start py-4"
    >
      <p class="ma-0 pa-0 text-2xl font-bold">Create Account</p>
      <div class="w-full ">
        <v-text-field prepend-inner-icon="mdi-account" label="Fullname" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field prepend-inner-icon="mdi-account-circle" label="Username" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field prepend-inner-icon="mdi-email" label="Email" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field prepend-inner-icon="mdi-phone" label="Phone Number" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field prepend-inner-icon="mdi-account-plus" label="Referal Username[optional]" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field prepend-inner-icon="mdi-lock" label="Password" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
            
      <v-btn color="black" class="w-full login_btn mt-2">Sign Up</v-btn>
      <p class="ma-0 pa-0 mt-2 text-black text-sm">Already have an account? <span class="text-primary">Sign in</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data: () => ({

  }),
};
</script>

<style scoped>
.register {
  /* height: 100vh; */
}

.g-img {
  /* height: 45%; */
  min-height: 45vh;
}
.login_btn{
    color: #06F354 !important;
}

.password_b .v-messages {
    color: rgba(0, 0, 0, 0.6);
    display: none !important;
}

.g-img img {
  object-fit: contain;
  aspect-ratio: 3/2;
}

.register-box {
  min-height: 100vh;
  background: #ebebeb;
  
}

.password_b{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
