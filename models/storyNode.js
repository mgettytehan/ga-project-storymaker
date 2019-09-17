const mongoose = require('./connection.js');

const ChoiceSchema = new mongoose.Schema({
  choiceText: String,
  nextNode: mongoose.Schema.Types.ObjectId
});

const StoryNodeSchema = new mongoose.Schema({
  storyId: mongoose.Schema.ObjectId,
  nodeTitle: String,
  storyText: String,
  choices: [ChoiceSchema]
});

StoryNodeCollection = mongoose.model('StoryNode', StoryNodeSchema)

//add one or more stories
const addStoryNodes = (storyNodes) => StoryNodeCollection.insertMany(storyNodes);

const getStoryNodeById = (storyNodeId) => StoryNodeCollection.findById(storyNodeId);

const updateStoryNode = (storyNodeId, storyNode) => StoryNodeCollection.findByIdAndUpdate(storyNodeId, storyNode);

module.exports = {
  addStoryNodes,
  getStoryNodeById,
  updateStoryNode
}