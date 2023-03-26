<template>
  <div
       class="navigator bg-white py-4 mb-9 px-3 w-full relative flex items-center"
     >
       <v-btn @click="$router.go(-1)" fab text small class="z-10"
         ><v-icon>mdi-arrow-left</v-icon></v-btn
       >
       <p class="ma-0 pa-0 text-center w-full absolute text-title">
         {{ title }}
       </p>
 
     </div>
</template>

<script>
export default {
    name: "AppBar",
    props:['title']

}
</script>

<style>

</style>