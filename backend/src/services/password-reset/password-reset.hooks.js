
module.exports = {
  before: {
    all: [],
    find: [
      async function (context) {
        try {
          const response = await context.app.service("users").find({
            query: {
              email: context.params.query.email,
              securityQuestions: context.params.query.securityQuestions,
              answer: context.params.query.answer,
            }
          });

          const newPassword = context.params.query.password;
          if (response.data.length != 0) {
            await context.app.service('users').patch(response.data[0]._id, { password: newPassword });
            context.result = { message: 'Password reset successfully' };
          } else {
            context.result = { message: 'error' };
          }

          return context;
        } catch (error) {
          console.error("Error:", error);
          throw new Error('Password reset failed');
        }
      },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  // ... (other hooks)

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
