const sql = require("./db");

// Constructor
const User = (user) => {
  this.username = user.username;
  this.password = user.password;
  this.firstName = user.firstName;
  this.middleName = user.middleName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.bio = user.bio;
  this.batch = user.batch;
  this.degree = user.degree;
  this.field = user.field;
  this.rollNo = user.rollNo;
  this.dob = user.dob;
  this.mobileNumber = user.mobileNumber;
};

module.exports = User;
