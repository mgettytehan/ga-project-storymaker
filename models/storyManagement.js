const storyApi = require('../models/story.js');
const storyNodeApi = require('../models/storyNode.js');

//when story is created, the first node must be created
const createStory = async (story) => {
    const title = story.title ? story.title : "Untitled";
    const storyNode = await storyNodeApi.addStoryNodes({
        nodeTitle: "Start",
        storyText: "",
        choices: []
    });
    const newStory = await storyApi.addStories({
        title,
        firstNodeId: storyNode[0]._id.toString()
    });
    return newStory;
}

const getStoryNodes = async (storyId) => {
    
}

module.exports = {
    createStory
}