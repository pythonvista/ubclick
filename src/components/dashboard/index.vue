<template>
  <div class="wrap py-3 px-3 relative overflow-y-scroll">
    <div class="flex justify-between w-full px-3 py-2">
      <div class="flex flex-col justify-center items-start">
        <p class="ma-0 pa-0 text-lg font-bold">{{ userData.fullname }}</p>
        <p class="ma-0 pa-0 text-sm">{{ userData.account }}</p>
      </div>
      
      <v-btn @click="drawer = !drawer" text fab small
        ><img src="@/assets/img/menusvg.svg" alt=""
      /></v-btn>
    </div>

    <div class="flex justify-center items-center w-full gap-2 my-3 py-3 px-1">
      <div 
        class="wallet pa-3 h-32 relative flex-1 flex justify-center items-start flex-col gap-1 rounded-lg shadow-md"
      >
        <img src="@/assets/img/wal.png" alt="">
        <div class="balance flex flex-col justify-center items-center gap-1">
          <p class="ma-0 pa-0 text-white text-sm">Wallet Balance</p>
         <p class="text-white text-2xl font-bold  ma-0 pa-0">₦{{ show ? new Intl.NumberFormat().format( userData.balance) : ' xxxxxx' }} <v-icon @click="show = !show" color="white">{{ show ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon></p>
        </div>
 
        <span @click="WalletSumary" class="absolute ser_txt text-white top-3 right-2 ">Wallet History <v-icon small color="white"> mdi-arrow-right</v-icon></span>
      
      </div>
     
    </div>

    <div
      class="flex rounded w-full my-3 py-3 px-3 bg-lightgreen justify-around items-center"
    >
      <div
        class="py-1 hover:bg-slate-100 rounded flex flex-col items-center justify-center"
      >
        <v-btn :to="{path: '/fundwallet'}" color="transparent" small text class=""
          ><img src="@/assets/img/fund-wallet.svg" alt=""
        /></v-btn>
        <p class="pa-0 ma-0 text-xs font-medium">Fund Wallet</p>
      </div>
      <div
        class="flex py-1 hover:bg-slate-100 rounded flex-col items-center justify-center"
      >
        <v-btn :to="{name: 'BuyAirtime'}" color="transparent" small text
          ><img src="@/assets/img/topup.svg" alt=""
        /></v-btn>
        <p class="pa-0 ma-0 text-xs font-medium">Topup</p>
      </div>
      <div
        class="flex py-1 hover:bg-slate-100 rounded flex-col items-center justify-center"
      >
        <v-btn color="transparent" small text
          ><img src="@/assets/img/bill.svg" alt=""
        /></v-btn>
        <p class="pa-0 ma-0 text-xs font-medium">Bill Payment</p>
      </div>
      <div
        class="flex py-1 hover:bg-slate-100 rounded flex-col items-center justify-center"
      >
        <v-btn :to="{name: 'Transactions'}" color="transparent" small text
          ><img src="@/assets/img/trans.svg" alt=""
        /></v-btn>
        <p class="pa-0 ma-0 text-xs font-medium">Transactions</p>
      </div>
    </div>

    <p class="w-full pa-0 ma-0 text-left text-lg my-1 py-2 px-1 font-bold">Services</p>

    <div class="grid grid-cols-4 place-items-center gap-1">
      <div
        v-for="(i, index) in services"
        :key="index"
        class="flex flex-col gap-1 justify-center mt-3 text-center items-center"
      >
        <div @click="Goto(i.url)"
          class="flex justify-center h-14 w-14  items-center rounded pa-4 hover:bg-white hover:shadow-lg bg-lightgreen"
        >
          <img :src="i.img" alt="" />
        </div>
        <p class="ma-0 pa-0  ser_txt  text-black">{{ i.title }}</p>
      </div>
    </div>

    <div class="flex w-full justify-center items-center my-2 pa-3">
      <img class="w-full h-full object-cover " src="@/assets/img/refer.png" alt="">
    </div>
    <!-- <div class="pa-3 fixed bottom-0 right-0">
     
      <v-speed-dial 
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="green" dark fab>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <img v-else src="@/assets/img/subway_menu.svg" alt="" />
          </v-btn>
        </template>
        <v-btn fab dark small color="green">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab dark small color="indigo">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark small color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </div> -->

    <v-navigation-drawer v-model="drawer" class="z-1"  absolute temporary>
      <div class="bg-priblue h-full" >
      <v-list-item class="py-5">
        <v-list-item-avatar size="3rem">
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-white">{{ userData.fullname }}</v-list-item-title>
          <v-list-item-title  class="text-white">Balance: ₦{{ userData.balance }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mx-5 bg-white"></v-divider>

      <v-list dense class="listss">
        <v-list-item link :to="{path: '/'}" class="bg-white mx-4 mb-3 rounded-md flex items-center gap-2">
            <v-icon color="black">mdi-home</v-icon>
            <v-list-item-title  class="text-black text-lg pa-0 ma-0">Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{path: '/admin'}" v-if="userData.account == 'ADMIN'" link class="border-2 border-solid border-white mx-4 mb-3 rounded-md flex items-center gap-2">
            <v-icon color="white">mdi-menu</v-icon>
            <v-list-item-title  class="text-white text-lg pa-0 ma-0">Admin Dashboard</v-list-item-title>
        </v-list-item>


        <v-list-item v-for="item in items" :to="{name: item.url}" class="mx-4 mb-2 flex items-center gap-3" :key="item.title" link>
            <v-icon color="white">{{ item.icon }}</v-icon>
            <v-list-item-title  class="text-white">{{ item.title }}</v-list-item-title>
          
        </v-list-item>

        <v-list-item @click="LogOut"  class="mx-4 mb-2 flex items-center gap-3"  link>
            <v-icon color="white">mdi-logout</v-icon>
            <v-list-item-title  class="text-white">Logout</v-list-item-title>

        </v-list-item>
      </v-list>
    </div>
    </v-navigation-drawer>
    <v-bottom-navigation
        grow
        class="meto"
      >
        <v-btn :to="{path: '/'}">
          <span>Home</span>
          <img src="@/assets/img/home.png" alt="" />
         
        </v-btn>

        <v-btn :to="{name: 'Transactions'}">
          <span>Transactions</span>
          <img src="@/assets/img/trans.png" alt="" />
        </v-btn>

        <v-btn>
          <span>Faqs</span>
          <img src="@/assets/img/faq.png" alt="" />
        </v-btn>
        <v-btn>
          <span>Settings</span>
          <img src="@/assets/img/settings.png" alt="" />
        </v-btn>
    </v-bottom-navigation>
   
  </div>
</template>

<script>
export default {
  name: "Index",
  props: ['userData'],
  data: () => ({
    direction: "top",
    value: 0,
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    show: false,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-reverse-transition",
    drawer: false,
    services: [
      {
        title: "Buy Data",
        url: 'BuyData',
        img: require("@/assets/img/buydata.png"),
      },
      {
        title: "Buy Airtime",
        url: 'BuyAirtime',
        img: require("@/assets/img/airtime.png"),
      },
      {
        title: "Cable Sub",
        url: 'BuyCable',
        img: require("@/assets/img/cablesub.png"),
      },
      {
        title: "Bill Payment",
        url: 'BuyElectricity',
        img: require("@/assets/img/bulb.png"),
      },
      
      {
        title: "Scratch Card",
        url: 'ResultChecker',
        img: require("@/assets/img/epin.png"),
      },
      {
        title: "Airtime to cash",
        img: require("@/assets/img/atc.png"),
        url: 'AirtimeCash',
      },
      {
        title: "Bonus",
        img: require("@/assets/img/wallet.png"),
        url: 'WalletBonus',
      },
      {
        title: "Chat",
        img: require("@/assets/img/buydata.png"),
        url: 'WalletBonus',
      },
    ],
    items: [
      {title: 'Buy Data', type: 'dash', icon: 'mdi-network-strength-4', url: 'BuyData'},
      {title: 'Buy Airtime', type: 'dash', icon: 'mdi-card-account-phone-outline', url: 'BuyData'},
      {title: 'Buy Scratch Card', type: 'dash', icon: 'mdi-credit-card', url: 'ResultChecker'},
      {title: 'Utility Payment', type: 'dash', icon: 'mdi-lightbulb', url: 'BuyElectricity'},
      {title: 'Fund Wallet', type: 'dash', icon: 'mdi-wallet', url: 'FundWallet'},
      // {title: 'Pricing', type: 'dash', icon: 'mdi-cash',},
      {title: 'Account', type: 'dash', icon: 'mdi-account-circle', url: 'AccountManager'},
      {title: 'Change Password', type: 'dash', icon: 'mdi-cog-outline', url: 'ChangePassword'},
      // {title: 'Transaction Pin', type: 'dash', icon: 'mdi-shield-lock'},
      {title: 'Settings', type: 'dash', icon: 'mdi-cog-outline', url: 'Seetings'},

    ],
  }),
  methods:{
    Goto(url){
      this.$router.push({name: url})
    },
    
    LogOut(){
      this.$store.dispatch('RemoveUser', '')
      this.$router.push({path: '/'})
    },
    WalletSumary(){
      this.$router.push({name: 'WalletSummary'})
    }
  },
  watch: {
    top(val) {
      this.bottom = !val;
    },
    right(val) {
      this.left = !val;
    },
    bottom(val) {
      this.top = !val;
    },
    left(val) {
      this.right = !val;
    },
  },
};
</script>

<style scoped>
.wrap {
}
.listss{
  overflow-y: scroll;
  overflow: hidden;
  height: 100% !important;
  
}
.wallet {
  width: 50% !important;
  flex: 50% !important;
  background: #04DF85 !important;
}
.bonus {
  width: 50% !important;
  flex: 50% !important;
}
.ser_txt{
  font-size: .5rem;
  font-weight:bold ;
}
.meto{
  position: fixed !important;
  bottom: 0;
  left: 0;
  width: 100% !important;
}

.balance{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
</style>
