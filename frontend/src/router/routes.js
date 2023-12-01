const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "profile", component: () => import("pages/ProfilePage.vue") },
      { path: "history", component: () => import("pages/HistoryPage.vue") },
      { path: "basket", component: () => import("pages/BasketPage.vue") },
      { path: "admin", component: () => import("pages/AdminPage.vue") },
      {
        path: "checkout",
        component: () => import("src/pages/CheckoutPage.vue"),
      },
      {
        path: "dashboard",
        component: () => import("src/pages/DashboardPage.vue"),
      },
    ],
  },
  { path: "/login", component: () => import("src/pages/LoginPage.vue") },
  { path: "/register", component: () => import("src/pages/RegisterPage.vue") },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
