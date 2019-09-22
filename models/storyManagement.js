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
    await storyNodeApi.updateStoryNode(storyNode[0]._id, {storyId : newStory[0]._id});
    return newStory[0];
}

const getAllStorysNodes = async (storyId) => {
    const allNodes = await storyNodeApi.getStoryNodeByStoryId(storyId);
    return allNodes.reduce( (nodesObj, node) =>
        { nodesObj[node._id] = node; return nodesObj; }
        ,{});
}

module.exports = {
    createStory,
    getAllStorysNodes
}