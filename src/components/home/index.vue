<template>
  <div class="wrap px-4 py-6 flex flex-col justify-end">
    <div class="btns  w-full flex flex-col items-start justify-end gap-3">
        <p class="ma-0 pa-0 text-white text-2xl font-bold">Welcome to</p>
        <img src="@/assets/img/logo.png" alt="">
        <v-btn :to="{name: 'Login'}" large class="w-full btn" color="white">Login</v-btn>
        <v-btn :to="{name: 'Register'}" large color="#5E153A" class="w-full white--text btn " >Create an Account</v-btn>
    </div>

  </div>
</template>

<script>
export default {
    name: 'index'

}
</script>

<style scoped>
.wrap{
    overflow: hidden;
    display: flex;
    height: 100vh;
    background: linear-gradient(180deg, rgba(217, 217, 217, 0) 0%, #000418 93.75%), url('@/assets/img/bg.png');
    background-repeat: no-repeat;
    background-size: cover;
}

</style>