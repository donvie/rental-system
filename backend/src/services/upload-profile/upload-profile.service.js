// Initializes the `upload-profile` service on path `/upload-profile`
const { UploadProfile } = require('./upload-profile.class');
const createModel = require('../../models/upload-profile.model');
const hooks = require('./upload-profile.hooks');

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "public/uploads-profile"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
});

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    multi: true,
    whitelist: ["$where", "$regex"],
  };

  // Initialize our service with any options it requires
  // Initialize our service with any options it requires
  app.use(
    "/upload-profile",
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
    new UploadProfile(options, app)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('upload-profile');

  service.hooks(hooks);
  service.publish("created", () => app.channel("anonymous", "authenticated"));
  service.publish("removed", () => app.channel("anonymous", "authenticated"));
  service.publish("patched", () => app.channel("anonymous", "authenticated"));
  service.publish("updated", () => app.channel("anonymous", "authenticated"));
};
