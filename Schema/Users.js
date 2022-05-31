const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const Register = new mongoose.Schema({
    name  : {
        type: String,
        required: true,
    },
    username  : {
        type: String,
        required: true,
        unique:true,
    },
    email  : {
        type: String,
        required: true,
        unique:true,
    },

    password: {
        type: String,
        required: true,
    },
  
});

/* Register.pre("save",async function(next){
    if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password,12)
    }
    next();
  });
 */
const User = mongoose.model('USER', Register)
module.exports = User;