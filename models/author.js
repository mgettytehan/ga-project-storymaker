const mongoose = require('./connection.js');

const AuthorSchema = new mongoose.Schema({
  userName: String,
  password: String
});

AuthorCollection = mongoose.model('Author', AuthorSchema)

const getAuthors = () => AuthorCollection.find();

const addAuthors = (authors) => AuthorCollection.insertMany(authors);

const getAuthor = (authorId) => AuthorCollection.findById(authorId);

const getAuthorByName = (userName) => AuthorCollection.find({userName});

module.exports = {
  addAuthors,
  getAuthor,
  getAuthorByName,
  getAuthors,
}