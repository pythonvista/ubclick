import Vue from "vue";

import VueRouter from "vue-router";

import HomeView from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresGuest: true },
  },
  {
    path: "/login",
    name: "Login",
    meta: { requiresGuest: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: { requiresGuest: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/dashboard",
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  let User = JSON.parse( localStorage.getItem('activeUser'))
  // console.log(this.$store.activeUser)
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (User) {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.fullPath } });
      
    }
  } else {
    next();
  }
  if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (!User) {
      next();
    } else {
      next({ path: "/dashboard", query: { redirect: to.fullPath } });
      
    }
  } else {
    next();
  }
});

export default router;
