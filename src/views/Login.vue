<template>
  <div class="login">
    <div class="g-img flex relative justify-center items-center">
      <img class="absolute bottom-0 log_img" src="@/assets/img/login.png" alt="" />
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
       <p @click="dialog = !dialog" class="ma-0 pa-0 text-primary text-sm">Forgot password</p>
      </div>
       
     
      <v-btn :loading="loading" depressed @click="Login" color="#5E153A" class="w-full login_btn white--text mt-2">Login</v-btn>
        <v-btn x-small text :to="{name: 'Register'}" link  class="ma-0 pa-0 mt-2 text-black text-sm"> <p class="ma-0 pa-0 mt-2 text-black text-capitalize text-sm">Dont have an account? <span class="text-primary">Sign up</span></p></v-btn>
     
    </v-form>

    <v-dialog max-width="350" v-model="dialog">
      <v-form ref="form2" class="pa-5 gap-5 flex flex-col justify-center items-center bg-white">
        <p class="text-primary font-bold">Reset Password</p>
        <v-text-field class="w-full" :rules="emailRules" label="email" v-model="dform.email" filled dense></v-text-field>
        <v-btn color="#5E153A" class="white--text" :loading="loading2" @click="ResetEmail">Send Reset Email</v-btn>
      </v-form>
    </v-dialog>
  </div>
</template>

<script>
import { snackbar } from "@/main";
import { apiClient } from "@/services/fetch";

export default {
  name: "Login",
  data:()=>({
    dialog: false,
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
    loading2: false,
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
      
    },
    async ResetEmail(){
      if(this.$refs.form2.validate()){
        this.loading2 = true
        try{
        const res = await apiClient('auth/resetmail', 'POST', {email: this.dform.email})
        const body = await res.json()
        if(body.status == 'success'){
          this.loading2 = false
          snackbar.$emit('open', {color: 'success', text: body.msg})
          this.dialog = false
        }else{
          throw {err: body.err}
        }
      }catch(err){
        this.loading2 = false
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
.log_img{
  left: 50%;
  transform: translateX(-50%);
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
