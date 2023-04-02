<template>
  <div
    v-if="spinner"
    class="spinner around flex justify-center items-center w-full h-screen"
  >
    <img width="80" src="@/assets/spinner.gif" alt="" />
  </div>
  <div v-else class="wrap bg-white overflow-hidden">
    <div v-if="valid" class="app-bar">
      <AppBar :dark="true" title="Reset Password"></AppBar>
    </div>

    <v-form
      v-if="valid"
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
        @click="ResetPass"
        color="#5E153A"
        class="w-full login_btn white--text mt-2"
        >Reset Password</v-btn
      >
    </v-form>
    <div
      v-else
      class="bg-white h-screen flex-col pa-3 flex justify-center items-center gap-2"
    >
      <p class="text-xl text-center">Password reset link expired</p>

      <v-btn color="#5E153A" class="white--text" :to="{ path: 'login' }"
        >Go Home</v-btn
      >
    </div>
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
    loading: false,
    valid: false,
    spinner: true,
  }),
  methods: {
    async ResetPass() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          const res = await apiClient("auth/resetpassword", "POST", {
            code: this.$route.query.oobCode,
            newpassword: this.dform.Newpassword,
          });
          const data = await res.json();
          if (data.status == "success") {
            this.loading = false;
            snackbar.$emit("open", { color: "success", text: data.msg });
            this.$router.push({ name: "Login" });
          } else {
            throw { message: "Password Reset Failed" };
          }
        } catch (err) {
          this.loading = false;
          snackbar.$emit("open", { color: "error", text: err.message });
        }
      }
    },

    async CheckCode() {
      try {
        const res = await apiClient("auth/verifycode", "POST", {
          code: this.$route.query.oobCode,
        });
        const data = await res.json();
        console.log(data);
        if (data.status == "error") {
          throw { message: data.msg.code };
        }
        if (data.status == "success") {
          this.valid = true;
          this.spinner = false
        }
      } catch (err) {
        this.loading = false;
        this.spinner = false
        snackbar.$emit("open", { color: "error", text: err.message });
      }
    },
  },
  created() {
    this.CheckCode();
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
