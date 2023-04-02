<template>
    <div class="wrap bg-white overflow-hidden">
      <div class="app-bar">
        <AppBar :dark="true" title="Reset Password"></AppBar>
      </div>
  
      <v-form
        ref="form"
        class="login-box px-5 shadow-md flex flex-col items-center gap-2 justify-center"
      >
        <p class="ma-0 pa-0 text-2xl font-bold">Reset Password</p>
        <div class="w-full">
          <v-text-field
            :rules="inputRules"
            type="password"
            v-model="dform.Newpassword"
            prepend-inner-icon="mdi-lock"
            label="New Password"
            solo
            flat
            class="ma-0 pa-0"
          ></v-text-field>
        </div>
        <div class="w-full">
          <v-text-field
            :rules="[(v) => v == dform.Newpassword || 'Password Mismatch']"
            type="password"
            prepend-inner-icon="mdi-lock"
            label="Re-enter New Password"
            solo
            flat
            class="ma-0 pa-0"
          ></v-text-field>
        </div>
  
        <v-btn
          :loading="loading"
          depressed
          @click="ChangePass"
          
          color="#5E153A"
          class="w-full login_btn white--text mt-2"
          >Reset Password</v-btn
        >
      </v-form>
    </div>
  </template>
  
  <script>
import { snackbar } from "@/main";
import { apiClient } from "@/services/fetch";

import AppBar from "../utils/AppBar.vue";

export default {
    name: "ResetPassword",
    props: ["userData"],
    data: () => ({
      inputRules: [(v) => (v && v.length >= 1) || "Field is required"],
      dform: {
        Newpassword: "",
      },
      loading:false
    }),
    methods:{
      async ResetPass(){
        if(this.$refs.form.validate()){
          this.loading = true
          try{
          if(this.dform.oldPassword == this.userData.passwd){
            const res2 = await apiClient('auth/resetpass', 'POST', {})
            const data = await res2.json()
            if(data.status == 'success'){
              snackbar.$emit('open', { color: 'success', text: data.msg })
              this.loading = false
              this.$router.go(-1)
            }else{
              throw {message: 'Error occured changing password'}
            }
          }else{
            throw {message: 'Old Password is Incorrect'}
          }
        }catch(err){
          this.loading = false
          snackbar.$emit('open', { color: 'error', text: err.message })
        }
        }
        
      }
    },
    components: {
      AppBar,
    },
  };
  
</script>
  
  <style scoped>
  .wrap {
    background: url(@/assets/chp.png);
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .slatepri {
    background: #f4f3f3 !important;
  }
  
  .app-bar {
    height: 35vh;
  }
  
  .login-box {
    height: 65vh;
    background: #ebebeb;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
  }
  
  .password_b {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>
  