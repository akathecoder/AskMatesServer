# AskMates Server API Documentation

<!-- TODO: AUTHENTICATION -->

AskMates Server has many api endpoints available to use but they can be divided in three general categories.

- [AskMates Server API Documentation](#askmates-server-api-documentation)
  - [User Routes](#user-routes)

The API endpoints interact with on of the three entities in our Database. They are:

- User
- Question
- Answer

The API can be accessed through the url [`https://localhost:4001/`](https://localhost:4001/)

## User Routes

| HTTP Method | Endpoint                                                       | Uses                                |
| ----------- | -------------------------------------------------------------- | ----------------------------------- |
| GET         | [users](documentation/User.md/#users-get)                      | Retrieve the data all users         |
| GET         | [users/:username](documentation/User.md/#usersusername-get)    | Retrieve a single                   |
| POST        | [users](documentation/User.md/#users-post)                     | Create a new User                   |
| PUT         | [users/:username](documentation/User.md/#usersusername-put)    | Update a User                       |
| DELETE      | [users/:username](documentation/User.md/#usersusername-delete) | Delete a User                       |
| GET         | [username](documentation/User.md/#username-get)                | Checks if a username already exists |
| GET         | [email](documentation/User.md/#email-get)                      | Checks if a email already exists    |
| POST        | [authenticate](documentation/User.md/#authenticate-post)       | Login by Authenticating Password    |