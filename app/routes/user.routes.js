module.exports = (app) => {
  const users = require("../controller/user.controller");

  // Create a new User
  app.post("/users", users.create);

  // Authenticate Forgot Password
  app.post(
    "/authenticateForgotPassword",
    users.authenticateForgotPassword
  );

  // Retrieve all users
  app.get("/users", users.findAll);

  // Retrieve a single user with username
  app.get("/user", users.findOne);

  // Update a User with username
  app.patch("/users/data/:username", users.update);

  // Update a User Email with username
  app.patch("/users/email/:username", users.updateEmail);

  // Update forgotten password
  app.patch(
    "/updateForgottenPassword",
    users.updateForgottenPassword
  );

  // Delete a User with username
  app.delete("/users/:username/", users.delete);

  // Login by Authenticate Password
  app.post("/authenticate", users.authenticate);

  // Checks if a username already exists
  app.get("/username", users.username);

  // Checks if a email already exists
  app.get("/email", users.email);

  // Confirms a Email JWT
  app.get("/confirmEmail/:token", users.confirmEmail);

  // Update Password
  app.put("/updatePassword", users.updatePassword);

  // Update Email
  app.put("/updateEmail");

  // Update Mobile
  app.put("/updateMobile", users.updateMobileNumber);
};
