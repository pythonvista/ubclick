<template>
  <div class="login">
    <div class="g-img flex justify-center items-center">
      <img class="" src="@/assets/img/login.png" alt="" />
    </div>
    <div
      class="login-box px-5 shadow-md flex flex-col items-center gap-2 justify-center"
    >
      <p class="ma-0 pa-0 text-2xl font-bold">Sign In</p>
      <div class="w-full ">
        <v-text-field prepend-inner-icon="mdi-email" label="Email" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field prepend-inner-icon="mdi-lock" label="Password" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class=" w-full password_b">
        <v-checkbox dense class="ma-0 pa-0 "
          label="Save my password"
        ></v-checkbox>
       <p class="ma-0 pa-0 text-primary text-sm">Forgot password</p>
      </div>
       
     
      <v-btn color="black" class="w-full login_btn mt-2">Login</v-btn>
      <p class="ma-0 pa-0 mt-2 text-black text-sm">Dont have an account? <span class="text-primary">Sign up</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.login {
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

.login-box {
  min-height: 55vh;
  background: #ebebeb;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
}

.password_b{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
