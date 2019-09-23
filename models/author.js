const mongoose = require('./connection.js');

const AuthorSchema = new mongoose.Schema({
  username: String,
  password: String
});

AuthorCollection = mongoose.model('Author', AuthorSchema)

const getAuthors = () => AuthorCollection.find();

const addAuthors = (authors) => AuthorCollection.insertMany(authors);

const getAuthor = (authorId) => AuthorCollection.findById(authorId);
//case insensitive search
const getAuthorByName = (username) => AuthorCollection.findOne({username : { $regex : new RegExp(username, "i") }});

module.exports = {
  addAuthors,
  getAuthor,
  getAuthorByName,
  getAuthors,
}