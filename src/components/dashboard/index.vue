<template>
  <div class="wrap py-3 px-2 relative">
    <div class="flex justify-between w-full px-3 py-2">
      <div class="flex flex-col justify-center items-start">
        <p class="ma-0 pa-0 text-lg font-bold">John Doe</p>
        <p class="ma-0 pa-0 text-sm">Smart Earner</p>
      </div>
      <v-btn @click="drawer = !drawer" text fab small
        ><img src="@/assets/img/menusvg.svg" alt=""
      /></v-btn>
    </div>

    <div class="flex justify-between w-full gap-2 my-3 py-3 px-1">
      <div
        class="bg-prigreen wallet pa-3 flex-1 flex justify-center items-start flex-col gap-1 rounded-md shadow-sm"
      >
        <v-icon color="white">mdi-wallet</v-icon>
        <p class="ma-0 pa-0 text-white text-sm">Wallet Balance</p>
        <p class="text-white text-lg ma-0 pa-0">₦{{ 50.0 }}</p>
      </div>
      <div class="bg-priblue bonus pa-3 flex-1 gap-1 rounded-md shadow-sm">
        <v-icon color="white">mdi-wallet</v-icon>
        <p class="ma-0 pa-0 text-white text-sm">Bonus Balance</p>
        <p class="text-white text-lg ma-0 pa-0">₦{{ 0 }}</p>
      </div>
    </div>

    <div class="flex rounded w-full my-3 py-3 px-3 bg-lightgreen justify-around items-center"
    >
      <div
        class="py-1 hover:bg-slate-100 rounded flex flex-col items-center justify-center"
      >
        <v-btn color="transparent" small text class=""
          ><img src="@/assets/img/fund-wallet.svg" alt=""
        /></v-btn>
        <p class="pa-0 ma-0 text-xs font-medium">Fund Wallet</p>
      </div>
      <div
        class="flex py-1 hover:bg-slate-100 rounded flex-col items-center justify-center"
      >
        <v-btn color="transparent" small text
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
        <v-btn color="transparent" small text
          ><img src="@/assets/img/trans.svg" alt=""
        /></v-btn>
        <p class="pa-0 ma-0 text-xs font-medium">Transactions</p>
      </div>
    </div>

    <p class="w-full text-left text-lg my-3 py-3 px-1 font-bold">Services</p>

    <div class="grid grid-cols-4 place-items-center gap-1 ">
      <div
        v-for="(i, index) in services"
        :key="index"
        class="flex flex-col gap-1 justify-center mt-3 text-center items-center"
      >
        <div
          class="flex justify-center items-center rounded pa-4 hover:bg-white hover:shadow-lg bg-lightgreen"
        >
          <img :src="i.img" alt="" />
        </div>
        <p class="ma-0 pa-0 text-xs">{{ i.title }}</p>
      </div>
    </div>
    <div class="pa-3 fixed bottom-0 right-0">
        <!-- <v-btn color="green" fab><img src="@/assets/img/subway_menu.svg" alt=""></v-btn> -->
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
        <v-btn
          v-model="fab"
          color="green"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <img v-else src="@/assets/img/subway_menu.svg" alt="">
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    </div>
  
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "Index",
  data: () => ({
    direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    drawer: false,
    services: [
      {
        title: "Buy Data",
        img: require("@/assets/img/buydata.png"),
      },
      {
        title: "Buy Airtime",
        img: require("@/assets/img/airtime.png"),
      },
      {
        title: "Cable Sub",
        img: require("@/assets/img/cablesub.png"),
      },
      {
        title: "Electricity",
        img: require("@/assets/img/bulb.png"),
      },
      {
        title: "Recharge Pin",
        img: require("@/assets/img/bulb.png"),
      },
      {
        title: "Education Pin",
        img: require("@/assets/img/airtime.png"),
      },
      {
        title: "Airtime to cash",
        img: require("@/assets/img/buydata.png"),
      },
      {
        title: "Wallet Bonus",
        img: require("@/assets/img/cablesub.png"),
      },
    ],
    items: []
  }),
  watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      },
    },
};
</script>

<style scoped>
.wrap {
  background: #e5e5e5;
  min-height: 100vh;
}

.wallet {
  width: 50% !important;
  flex: 50% !important;
}
.bonus {
  width: 50% !important;
  flex: 50% !important;
}
#create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>
