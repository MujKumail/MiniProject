const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/miniproject");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: String,
  email: String,
  password: String,
  profilepic: {
    type: String,
    default: "default.jpg"
  },
  posts: [
    { type: mongoose.Schema.Types.ObjectId, 
      ref: "post" }                         // reference to posts, not users
  ]
});

module.exports = mongoose.model('user', userSchema);

// mongoose.connect(...): This connects your app to a MongoDB database named miniproject running locally.

// userSchema defines the structure of a user document in your MongoDB:

// username, name, age, email, password: These fields store user info.

// posts: This is an array of ObjectIds, each referencing a post document.

// type: mongoose.Schema.Types.ObjectId means each entry stores an ID that links to another document.

// ref: "post" tells Mongoose these IDs refer to documents in the post collection (the posts created by the user).

// module.exports = mongoose.model('user', userSchema); creates a Mongoose model called 'user', which will manage user documents.