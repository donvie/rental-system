const users = require("./users/users.service.js");
const equipments = require("./equipments/equipments.service.js");
const requests = require("./requests/requests.service.js");
const uploads = require('./uploads/uploads.service.js');
const uploadProfile = require('./upload-profile/upload-profile.service.js');
const passwordReset = require('./password-reset/password-reset.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(equipments);
  app.configure(requests);
  app.configure(uploads);
  app.configure(uploadProfile);
  app.configure(passwordReset);
};
