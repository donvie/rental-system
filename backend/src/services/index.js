const users = require('./users/users.service.js');
const equipments = require('./equipments/equipments.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(equipments);
};
