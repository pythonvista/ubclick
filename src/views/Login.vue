<template>
  <div class="login">
    <div class="g-img flex justify-center items-center">
      <img class="" src="@/assets/img/login.png" alt="" />
    </div>
    <v-form ref="form"
      class="login-box px-5 shadow-md flex flex-col items-center gap-2 justify-center"
    >
      <p class="ma-0 pa-0 text-2xl font-bold">Sign In</p>
      <div class="w-full ">
        <v-text-field :rules="emailRules" v-model="dform.email" prepend-inner-icon="mdi-email" label="Email" background-color="white" solo flat  class="ma-0 elevation-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field :rules="inputRules" type="password" v-model="dform.passwd" prepend-inner-icon="mdi-lock" label="Password" solo flat  class="ma-0 pa-0"></v-text-field>
      </div>
      <div class=" w-full password_b">
        <v-checkbox depressed dense background-color="transparent"  class="ma-0 pa-0 "
          label="Save my password"
        ></v-checkbox>
       <p class="ma-0 pa-0 text-primary text-sm">Forgot password</p>
      </div>
       
     
      <v-btn :loading="loading" depressed @click="Login" color="black" class="w-full login_btn mt-2">Login</v-btn>
        <v-btn x-small text :to="{name: 'Register'}" link  class="ma-0 pa-0 mt-2 text-black text-sm"> <p class="ma-0 pa-0 mt-2 text-black text-capitalize text-sm">Dont have an account? <span class="text-primary">Sign up</span></p></v-btn>
     
    </v-form>
  </div>
</template>

<script>
import { snackbar } from "@/main";
import { apiClient } from "@/services/fetch";

export default {
  name: "Login",
  data:()=>({
    dform: {
      email: '',
      passwd: ''

    },
    inputRules: [
    (v) => (v && v.length >= 1) || 'Field is required'
  ],
  emailRules: [
    (v) => !!v || 'E-mail is required',
    (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ],
    loading: false,
  }),
  methods:{
    async Login(){
      if(this.$refs.form.validate()){
        this.loading = true
        try{
        const res = await apiClient('login', 'POST', this.dform)
        const body = await res.json()
        if(body.status == 'success'){
          this.loading = false
          snackbar.$emit('open', { color: 'success', text: 'Logged in Successfully' })
          this.$store.dispatch('ActiveUser', body.data.uid);
          this.$router.push({name: 'Dashboard'})
        }else{
          throw {message: body.msg.code}
        }
      }catch(err){
        this.loading = false
        snackbar.$emit('open', { color: 'error', text: err.message })
      }
      }
      
    }
  
  }
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
