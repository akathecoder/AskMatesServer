const sql = require("./db");

// Constructor
const User = (user) => {
  this.Username = user.Username;
  this.Password = user.Password;
  this.First_Name = user.First_Name;
  this.Middle_Name = user.Middle_Name || "";
  this.Last_Name = user.Last_Name;
  this.Email = user.Email;
  this.Bio = user.Bio || "";
  this.Batch = user.Batch;
  this.Degree = user.Degree;
  this.Field = user.Field;
  this.Roll_No = user.Roll_No;
  this.DOB = user.DOB;
  this.Mobile_Number = user.Mobile_Number;
};
