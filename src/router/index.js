import Vue from "vue";

import VueRouter from "vue-router";

import HomeView from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/components/dashboard/index.vue"),
      },
      {
        path: "/transactions",
        name: "Transactions",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/components/dashboard/transactions.vue"),
      },
      {
        path: "/wallet-summary",
        name: "WalletSummary",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/components/dashboard/walletsummary.vue"),
      },
      {
        path: "/buy-data",
        name: "BuyData",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/components/dashboard/buydata.vue"),
      },
      {
        path: "/buy-airtime",
        name: "BuyAirtime",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/components/dashboard/buyairtime.vue"),
      },
      {
        path: "/buy-cable",
        name: "BuyCable",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/components/dashboard/buycable.vue"),
      },
      {
        path: "/buy-electricity",
        name: "BuyElectricity",
        component: () =>
        import(/* webpackChunkName: "about" */ "@/components/dashboard/buyelectricty.vue"),
      },
      {
        path: "/resultchecker",
        name: "ResultChecker",
        component: () =>
        import(/* webpackChunkName: "about" */ "@/components/dashboard/resultchecker.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
