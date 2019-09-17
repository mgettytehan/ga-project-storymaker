const express = require('express');

const storyApi = require('../models/story.js');
const storyNodeApi = require('../models/storyNode.js')

const storyRouter = express.Router();

storyRouter.route('/')
  .post( (req, res) => {
    storyApi.addStories(req.body)
      .then(newStory => res.send(newStory))
      .catch(err => next(err));
  });

storyRouter.route('/:storyId/storynodes/')
  .post( (req, res) => {
    const newStoryNode = {...req.body, storyId: req.params.storyId}
    storyNodeApi.addStoryNodes(newStoryNode)
      .then(newStoryNode => res.send(newStoryNode))
      .catch(err => next(err));
  });

// templateRouter.get('/', (req, res) => {
//   res.json(templateApi.getHelloWorldString())
// })

module.exports = {
  storyRouter
}