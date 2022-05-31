// Schema of Comment

const mongoose = require('mongoose');
const Comment = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    

});


const NewComment = mongoose.model('comments', Comment)
module.exports = NewComment;