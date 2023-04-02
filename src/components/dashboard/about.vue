<template>
  <div class="wrap">
    <AppBar title="About"></AppBar>
    <div class="about_wrap py-4 px-3">
      <div class="flex justify-center flex-col items-center pa-3 my-4">
        <p class="text-xl font-bold text-primary">Welcome to UbClick</p>
        <p class="text-md font-normal text-left">
          We offer instant recharge of Airtime, Data bundle, CableTV (DStv, GOtv
          & Startimes), Electricity Bill Payment and Airtime to Cash.
        </p>
      </div>

      <div class="flex justify-center flex-col items-center pa-3 my-4">
        <p class="text-xl font-bold text-primary">
          We Provide Awesome Services
        </p>
        <p class="text-md font-normal text-left">
          We provide cutting-edge technology to run our services, Our data
          delivery and wallet funding is automated, airtime topup and data
          purchases are automated and get deliver- ed to you almost instantly.
          We offer instant recharge of airtime, Data bundle, CableTV (DStv, GOtv
          & Startimes), Electricity Bill Payment and Airtime to Cash.
        </p>
      </div>
      <div class="flex justify-center flex-col items-center pa-3 my-4">
        <p class="text-xl font-bold text-primary">About UbClick</p>
        <p class="text-md font-normal text-left">
          This is a telecommunication industry playing a major role in
          distribution, selling affordable and most cheapest data, airtime, Dstv
          subscription, Gotv subscription, Startimes sub- scription, Convert
          Airtime to Cash and Electricity bill paym- ent. Certain things are
          hard; making payments shouldn’t be one of them. UbClick helps you make
          payments for services you enjoy right from the comfort of your home or
          office. The experience of total convenience, fast service delivery and
          easy payment is just at your fingertips.
        </p>
      </div>
      <div class="flex justify-center flex-col items-center pa-3 my-4">
        <p class="text-xl font-bold text-primary">We are 100% Secure</p>
        <p class="text-md font-normal text-left">
          Your e-wallet is the safest, easiest and fastest means of carrying out
          transactions with us. Your funds are secured with your e-wallet PIN
          and can be kept for you for as long as you want. Our customers are
          premium to us, hence satisfying them is our topmost priority. Our
          customer service is just a click away and you get 100% value for any
          transaction you carry with us.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from "../utils/AppBar.vue";

export default {
  name: "About",
  data: () => ({}),
  components: {
    AppBar,
  },
};
</script>

<style scoped>
.about_wrap {
  background: #e5e5e5;
}
</style>
