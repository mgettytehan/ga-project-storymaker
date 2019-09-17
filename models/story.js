const mongoose = require('./connection.js');

const StorySchema = new mongoose.Schema({
  title: String,
  firstNodeId: mongoose.Schema.Types.ObjectId
});

StoryCollection = mongoose.model('Story', StorySchema)

const getStories = () => StoryCollection.find();

//add one or more stories
const addStories = (stories) => StoryCollection.insertMany(stories);

const getStory = (storyId) => StoryCollection.findById(storyId);

module.exports = {
  addStories,
  getStories,
  getStory,
}