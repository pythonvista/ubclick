<template>
  <div class="register">
    <v-form ref="form"
      class="register-box px-5 shadow-md flex flex-col items-center gap-2 justify-start py-4"
    >
      <p class="ma-0 pa-0 text-2xl font-bold">Create Account</p>
      <div class="w-full ">
        <v-text-field :rules="inputRules"  v-model="dform.fullname" prepend-inner-icon="mdi-account" label="Fullname" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field :rules="inputRules"  v-model="dform.username" prepend-inner-icon="mdi-account-circle" label="Username" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field :rules="emailRules" v-model="dform.email" prepend-inner-icon="mdi-email" label="Email" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field :rules="inputRules"  v-model="dform.phone" prepend-inner-icon="mdi-phone" label="Phone Number" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field v-model="dform.referal" prepend-inner-icon="mdi-account-plus" label="Referal Username[optional]" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
      <div class="w-full ">
        <v-text-field :rules="inputRules"  v-model="dform.passwd" prepend-inner-icon="mdi-lock" label="Password" solo dense class="ma-0 pa-0"></v-text-field>
      </div>
            
      <v-btn @click="Register"  :loading="loading" color="black" class="w-full login_btn mt-2">Sign Up</v-btn>
        <v-btn x-small text :to="{name: 'Login'}" link  class="ma-0 pa-0 mt-2 text-black text-sm">Already have an account? <span class="text-primary">Sign in</span></v-btn>
     
    </v-form>
  </div>
</template>

<script>
import { snackbar } from "@/main";
// import {
//   authfunc,
//   crud,
// } from "@/services";
import { apiClient } from "@/services/fetch";

export default {
  name: "Register",
  data: () => ({
    dform: {
      fullname: '',
      email: '',
      passwd: '',
      phone: '',
      referal: ''

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
    async Register(){
      if(this.$refs.form.validate()){
        this.loading = true
        try{
          let data = {
            fullname: this.dform.fullname,
            passwd: this.dform.passwd,
            email: this.dform.email,
            phone: this.dform.phone,
            account: 'smart earner',
            balance: 0,
            bonusBalance: 0,
            referal: this.referal
          }
          const res = await apiClient('signup',"POST", data)
          const body = await res.json()
         if(body.status == 'success'){
          this.loading = false
          snackbar.$emit('open', { color: 'success', text: 'Account Created Successfully' })
          snackbar.$emit('open', { color: 'success', text: 'Login to your account' })
          this.$router.push({path: '/login'})
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
