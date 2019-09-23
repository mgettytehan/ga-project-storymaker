const mongoose = require('./connection.js');

const ChoiceSchema = new mongoose.Schema({
  choiceText: String,
  nextNode: mongoose.Schema.Types.ObjectId
});

const StoryNodeSchema = new mongoose.Schema({
  nodeTitle: String,
  storyText: String,
  choices: [ChoiceSchema],
  storyId: mongoose.Schema.Types.ObjectId
});

StoryNodeCollection = mongoose.model('StoryNode', StoryNodeSchema)

//add one or more stories
const addStoryNodes = (storyNodes) => StoryNodeCollection.insertMany(storyNodes);

const getStoryNodeById = (storyNodeId) => StoryNodeCollection.findById(storyNodeId);

const getStoryNodeByStoryId = (storyId) => StoryNodeCollection.find({storyId});

const updateStoryNode = (storyNodeId, storyNode) => StoryNodeCollection.findByIdAndUpdate(storyNodeId, storyNode, {new:true});

module.exports = {
  addStoryNodes,
  getStoryNodeById,
  getStoryNodeByStoryId,
  updateStoryNode
}