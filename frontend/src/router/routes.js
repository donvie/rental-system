const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "profile", component: () => import("pages/ProfilePage.vue") },
      { path: "rentals", component: () => import("pages/RequestPage.vue") },
      { path: "users", component: () => import("pages/UsersPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
    ],
    meta: { requiresAuth: true },
  },
  { path: "/login", component: () => import("src/pages/LoginPage.vue") },
  { path: "/signup", component: () => import("src/pages/SignupPage.vue") },
  {
    path: "/forgot-password",
    component: () => import("src/pages/ForgotPasswordPage.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
