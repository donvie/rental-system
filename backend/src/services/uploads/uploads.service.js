// Initializes the `uploads` service on path `/uploads`
const { Uploads } = require("./uploads.class");
const createModel = require("../../models/uploads.model");
const hooks = require("./uploads.hooks");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "public/uploads"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
});

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
    whitelist: ["$where", "$regex"],
  };

  // Initialize our service with any options it requires
  app.use(
    "/uploads",
    upload.array("files"),
    (req, _res, next) => {
      req.feathers.files = req.files;
      req.feathers.id = req.feathers.headers.id;
      // req.feathers.routeName = req.feathers.headers.routename;
      req.feathers.path = req.feathers.headers.path;
      req.feathers.createdBy = req.feathers.headers.createdby;
      req.feathers.createdById = req.feathers.headers.createdbyid;
      next();
    },
    new Uploads(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service("uploads");

  service.hooks(hooks);
  service.publish("created", () => app.channel("anonymous", "authenticated"));
  service.publish("removed", () => app.channel("anonymous", "authenticated"));
  service.publish("patched", () => app.channel("anonymous", "authenticated"));
  service.publish("updated", () => app.channel("anonymous", "authenticated"));
};
