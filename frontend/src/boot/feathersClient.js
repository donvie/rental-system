import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import auth from "@feathersjs/authentication-client";

const socket = io("http://localhost:3030");
const feathersClient = feathers();

feathersClient.configure(socketio(socket));
feathersClient.configure(auth());

export default ({ app }) => {
  app.config.globalProperties.$feathersClient = feathersClient;
};
