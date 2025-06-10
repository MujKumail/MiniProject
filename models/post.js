const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: String,
    likes:[
        {type:mongoose.Schema.Types.ObjectId, ref: "user"}
    ]
})

module.exports = mongoose.model('post', postSchema)

// postSchema defines the structure of a post document:

// user: stores the ID of the user who created the post.

// type: mongoose.Schema.Types.ObjectId: references a user document.

// ref: "user" tells Mongoose this ObjectId points to a user in the user collection.

// date: stores the date when the post was created.

// default: Date.now means it will automatically use the current date/time if none is provided.

// content: text content of the post.

// likes: an array of ObjectIds, each referring to a user who liked the post.

// This allows many users to like a single post, and you can keep track of who liked it by their user IDs.

