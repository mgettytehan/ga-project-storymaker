const mongoose = require('./connection.js');

const ChoiceSchema = new mongoose.Schema({
  choiceText: String,
  nextNode: mongoose.Schema.Types.ObjectId
});

const StoryNodeSchema = new mongoose.Schema({
  nodeTitle: String,
  storyId: mongoose.Schema.Types.ObjectId,
  storyText: String,
  choices: [ChoiceSchema]
});

StoryNodeCollection = mongoose.model('StoryNode', StoryNodeSchema)

//add one or more stories
const addStoryNodes = (storyNodes) => {
  return StoryNodeCollection.insertMany(storyNodes);
}

module.exports = {
  addStoryNodes
}