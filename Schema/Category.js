const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
});


const Categories = mongoose.model('Categories', CategorySchema)
module.exports = Categories;