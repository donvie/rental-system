const fs = require("fs");
const search = require("feathers-nedb-fuzzy-search");

module.exports = {
  before: {
    all: [],
    find: [
      search({
        // fields: ['orignalName'],
        deep: true,
      }),
    ],
    get: [],
    create: [
      async function (context) {
        const body = [];
        console.log("context.params.files", context.params.files);
        for (const file of context.params.files) {
          body.push({
            id: context.params.headers.id,
            path: context.params.headers.path,
            createdBy: context.params.headers.createdby,
            createdById: context.params.headers.createdbyid,
            orignalName: file.originalname,
            newNameWithPath: file.path,
            mimetype: file.mimetype,
            size: file.size,
            createdAt: Date.now(),
          });
        }

        try {
          const userIdToUpdate = context.params.headers.id;
          console.log('userIdToUpdate', userIdToUpdate)
          const response = await context.app.service("users").patch(userIdToUpdate, {
            imagePath: context.params.files[0].path,
          });
          console.log('response232', response)

          context.data = body;
        } catch (error) {
          console.error("Error finding/updating equipment:", error);
        }
      },
    ],
    update: [
      async function (context) {
        try {
          const body = [];
          console.log("context.params.files", context.params.files);
    
          for (const file of context.params.files) {
            body.push({
              id: context.params.headers.id,
              path: context.params.headers.path,
              createdBy: context.params.headers.createdby,
              createdById: context.params.headers.createdbyid,
              orignalName: file.originalname,
              newNameWithPath: file.path,
              mimetype: file.mimetype,
              size: file.size,
              createdAt: Date.now(),
            });
          }
    
          const userIdToUpdate = context.params.headers.id;
          console.log("equipmentIdToUpdate:", userIdToUpdate);
    
          // Ensure that context.params.files is an array and not empty
          if (Array.isArray(context.params.files) && context.params.files.length > 0) {
            // Attempt to update the equipment
            const result = await context.app.service("users").patch(
              userIdToUpdate,
              {
                imagePath: context.params.files[0].path,
              }
            );
    
            console.log("Equipment updated successfully:", result);
          } else {
            console.error("No files found in context.params.files.");
          }
    
          // Optionally, you can set context.data to body if needed
          // context.data = body;
    
        } catch (error) {
          console.error("Error finding/updating equipment:", error);
        }
      },
    ],
    
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      (hook) => {
        fs.unlink(hook.result.newNameWithPath, function (err) {
          if (err) throw err;
        });
      },
    ],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
