module.exports = (app) => {
  const users = require("../controller/user.controller");

  // Create a new User
  app.post("/users", users.create);

  // Retrieve all users
  app.get("/users", users.findAll);

  // Retrieve a single user with userId
  app.get("/users/:username", users.findOne);

  // Update a User with userId
  // TODO: Resolve Error
  app.put("/users/:username", users.update);

  // Delete a User with userId
  app.delete("/users/:username", users.delete);
};
