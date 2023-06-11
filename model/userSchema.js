const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'name must be provided'],
    minlength:2,
    maxlength:40
  }  ,
  email:{
    type:String,
    required:[true,'email must be provided'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email address'],
    unique:[true,'replication of email']
  }  ,
  password:{
    type:String,
    required:[true,'password must be provided'],
  }  ,
})

module.exports = mongoose.model("User", userSchema);