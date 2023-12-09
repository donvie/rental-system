// Initializes the `equipments` service on path `/equipments`
const { Equipments } = require("./equipments.class");
const createModel = require("../../models/equipments.model");
const hooks = require("./equipments.hooks");

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get("paginate");

  const options = {
    Model,
    paginate,
    whitelist: ["$where", "$regex", "$elemMatch"],
  };

  // Initialize our service with any options it requires
  app.use("/equipments", new Equipments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("equipments");

  service.hooks(hooks);
};
