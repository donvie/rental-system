import { LocalStorage } from "quasar";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import auth from "@feathersjs/authentication-client";

const socket = io("http://localhost:3030/");
const feathersClient = feathers();

feathersClient.configure(socketio(socket));
feathersClient.configure(auth());

export default async ({ app, router }) => {
  app.config.globalProperties.$feathersClient = feathersClient;
  app.config.globalProperties.$user = null;

  if (LocalStorage.getItem("feathers-jwt")) {
    const data = await feathersClient.reAuthenticate();
    app.config.globalProperties.$user = data.user;
  }

  router.beforeEach((to, from, next) => {
    let currentUser = LocalStorage.getItem("feathers-jwt");
    let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
      next("/login");
    } else if (!requiresAuth && currentUser) {
      next("/");
    } else {
      next();
    }
  });
};
