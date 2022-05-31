// Schema of Post or Blog

const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: false,
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,ref:"Comment"
    }]
});


const Post = mongoose.model('Post', PostSchema)
module.exports = Post;