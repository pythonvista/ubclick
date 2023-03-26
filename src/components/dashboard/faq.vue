<template>
  
   <div class="wrap bg-white overflow-hidden px-3">
    <AppBar title="Frequently Asked Questions"></AppBar>
    <v-expansion-panels  flat>
    <v-expansion-panel flat
    class="my-3 rounded-md elevation-0"
      v-for="(item,i) in faq"
      :key="i"
    >
      <v-expansion-panel-header class="slatepri" >{{ item.question }}</v-expansion-panel-header>
      <v-expansion-panel-content class="pa-4">
        {{ item.answer }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  </div>
</template>

<script>
import AppBar from "../utils/AppBar.vue";

export default {
    name:'Faq',
    components: {
    AppBar
  },
    data: ()=>({
        faq:[
            {question:'How do i fund my wallet?', answer: 'You can fund your wallet by using any of the two payment methods.Paystack Payment method Bank Transfer'},
            {question: 'Can i have a similar platfrom or intergrate my website using API on the platform?', answer: 'No, UbClick doesn’t have any API integration.'},
            {question: 'How do i reset my password?', answer: 'To reset your password you’re to follow this step by step process; Click on settings Go to “change password” Enter your email Enter a new password of your choice'},
            {question: 'Does UbClick have a Whatsapp group for the retailer?', answer: 'No, UbClick doesn’t have any Whatsapp groups.'},
            {question: 'Can i transfer money from my wallet to my bank account?', answer: 'No! You can’t transfer funds from UbClick wallet to a bank account..'},
            {question: 'What is the minimum amount i can fund into my wallet?', answer: 'Minimum amount of funding is N100. Transaction charges will be deducted for every funding as stipulated on the App.'}
        ]
    })
}
</script>

<style scoped>
.slatepri{
    background: #F4F3F3 !important;
}

</style>