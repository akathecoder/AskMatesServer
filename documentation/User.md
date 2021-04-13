# User Endpoints

<!-- TODO: STATUS CODES && ERRORs -->

- [User Endpoints](#user-endpoints)
  - [users (GET)](#users-get)
    - [Sample Query](#sample-query)
  - [users/:username (GET)](#usersusername-get)
    - [Parameters](#parameters)
    - [Sample Query](#sample-query-1)
  - [users (POST)](#users-post)
    - [Body Parameters](#body-parameters)
    - [Sample Query](#sample-query-2)
  - [users/:username (PUT)](#usersusername-put)
    - [Parameters](#parameters-1)
    - [Sample Query](#sample-query-3)
  - [users/:username (DELETE)](#usersusername-delete)
    - [Parameters](#parameters-2)
    - [Sample Query](#sample-query-4)
  - [username (GET)](#username-get)
    - [Query Parameters](#query-parameters)
    - [Sample Query](#sample-query-5)
  - [email (GET)](#email-get)
    - [Query Parameters](#query-parameters-1)
    - [Sample Query](#sample-query-6)
  - [authenticate (POST)](#authenticate-post)
    - [Query Parameters](#query-parameters-2)
    - [Sample Query](#sample-query-7)

## users (GET)

Retrieve the data all users

`http://localhost:4001/users`

### Sample Query

`http://localhost:4001/users/`

**Response**

```json
[
  {
    username: "akathecoder",
    firstName: "Sparsh",
    middleName: "",
    lastName: "Agarwal",
    email: "sparshagarwal@jklu.edu.in",
    bio: "This is my Bio",
    batch: "2023",
    degree: "btech",
    field: "cse",
    rollNo: "052",
    dob: "2001-12-24T18:30:00.000Z",
  },
  {
    username: "nonit",
    firstName: "Nonit",
    middleName: "",
    lastName: "Mittal",
    email: "nonit@jklu.edu.in",
    bio: "This is my Bio",
    batch: "2023",
    degree: "btech",
    field: "cse",
    rollNo: "036",
    dob: "2001-05-01T18:30:00.000Z",
  },
  {
    username: "rg12301",
    firstName: "Raghav",
    middleName: "",
    lastName: "Goyal",
    email: "raghav@jklu.edu.in",
    bio: "This is my Bio",
    batch: "2023",
    degree: "btech",
    field: "cse",
    rollNo: "040",
    dob: "2001-03-11T18:30:00.000Z",
  },
  {
    username: "vineet_ks",
    firstName: "Vineet",
    middleName: "Kumar",
    lastName: "Sharma",
    email: "vineetkumar@jklu.edu.in",
    bio: "This is my Bio",
    batch: "2023",
    degree: "btech",
    field: "cse",
    rollNo: "060",
    dob: "2000-11-23T18:30:00.000Z",
  },
];
```

## users/:username (GET)

Retrieves the data of a single user

`http://localhost:4001/users/:username`

### Parameters

**Required**

- `username`

### Sample Query

`http://localhost:4001/users/akathecoder`

**Response**

```json
{
  "username": "akathecoder",
  "firstName": "Sparsh",
  "middleName": "",
  "lastName": "Agarwal",
  "email": "sparsh@email.com",
  "bio": "This is my Bio",
  "batch": "2023",
  "degree": "Btech",
  "field": "CSE",
  "rollNo": "052",
  "dob": "2001-12-24T18:30:00.000Z"
}
```

## users (POST)

Create a new User

`http://localhost:4001/users/`

### Body Parameters

In a single JSON file

**Required**

- `username`
- `password`
- `firstName`
- `lastName`
- `email`
- `batch`
- `degree`
- `field`
- `rollNo`

**Optional**

- `dob`
- `mobileNumber`
- `middleName`
- `bio`

### Sample Query

`http://localhost:4001/users/`

**JSON Body**

```json
{
  "username": "vineet",
  "password": "password",
  "firstName": "Vineet",
  "middleName": "Kumar",
  "lastName": "Sharma",
  "email": "vineetkumarsharma@jklu.edu.in",
  "batch": "2023",
  "degree": "Btech",
  "field": "cse",
  "rollNo": "096"
}
```

**Response**

```json
{
  "message": "user created with username vineet"
}
```

<!-- TODO -->

## users/:username (PUT)

Update a User Data

`http://localhost:4001/users/:username`

### Parameters

- `username` - The username of the user

### Sample Query

`http://localhost:4001/users/akathecoder`

**JSON Body**

```json

```

**Response**

```json

```

## users/:username (DELETE)

Delete a User

`http://localhost:4001/users/:username`

### Parameters

- `username` - The username of the user

### Sample Query

`http://localhost:4001/users/vineet`

**Response**

```json
{
  "message": "User was deleted successfully!"
}
```

## username (GET)

Checks if a username already exists

`http://localhost:4001/username/`

### Query Parameters

- `username` - The username of the user

### Sample Query

- If a username is already taken

  `http://localhost:4001/username?username=rg12301`

  **Response**

  ```json
  {
    "message": "username already exists"
  }
  ```

- If a username is not taken

  `http://localhost:4001/username?username=vineet`

  **Response**

  ```json
  {
    "message": "username does not already exists"
  }
  ```

## email (GET)

Checks if a email already exists

`http://localhost:4001/email/`

### Query Parameters

- `email` - The email of the user

### Sample Query

- If a email is already taken

  `http://localhost:4001/email?email=raghavgoyal@jklu.edu.in`

  **Response**

  ```json
  {
    "message": "email already exists"
  }
  ```

- If a username is not taken

  `http://localhost:4001/email?email=johndoe@jklu.edu.in`

  **Response**

  ```json
  {
    "message": "email does not already exists"
  }
  ```

<!-- TODO: JWT -->

## authenticate (POST)

Checks the password of the user and provides the JWT if it matches

`http://localhost:4001/authenticate/`

### Query Parameters

- `username` - The username of the user
- `password` - The password of the user

### Sample Query

- If both are correct

  `http://localhost:4001/authenticate`

  **JSON Body**

  ```json
  {
    "username": "akathecoder",
    "password": "password"
  }
  ```

  **Response**

  ```json
  {
    "message": "authentication successful"
  }
  ```

- If any one of them is incorrect

  `http://localhost:4001/authenticate`

  **JSON Body**

  ```json
  {
    "username": "vineet",
    "password": "password"
  }
  ```

  **Response**

  ```json
  {
    "message": "authentication unsuccessful"
  }
  ```

---
