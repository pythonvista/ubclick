<template>
    <div class="wrap bg-white overflow-hidden px-3">
     <div
       class="navigator bg-white py-4 mb-9 px-3 w-full relative flex items-center"
     >
       <v-btn :to="{ name: 'Dashboard' }" fab text small class="z-10"
         ><v-icon>mdi-arrow-left</v-icon></v-btn
       >
       <p class="ma-0 pa-0 text-center w-full absolute text-title">
         Change Password
       </p>
 
     </div>
    
 
   </div>
 </template>
 
 <script>
export default {
     name:'ChangePassword',
     data: ()=>({
         
     })
 }
</script>
 
 <style scoped>
 .slatepri{
     background: #F4F3F3 !important;
 }
 
 </style>