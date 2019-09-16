const mongoose = require('./connection.js');

const StorySchema = new mongoose.Schema({
  title: String,
  firstNodeId: mongoose.Schema.Types.ObjectId
});

StoryCollection = mongoose.model('Story', StorySchema)

//add one or more stories
const addStories = (stories) => {
  return StoryCollection.insertMany(stories);
}

module.exports = {
  addStories
}