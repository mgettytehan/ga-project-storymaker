const express = require('express');

const storyApi = require('../models/story.js');
const storyNodeApi = require('../models/storyNode.js');
const storyManagementApi = require('../models/storyManagement.js');

const storyRouter = express.Router();

storyRouter.route('/')
  .get( (req, res, next) => {
    storyApi.getStories()
      .then(stories => res.json(stories))
      .catch(err => next(err))
  })
  .post( (req, res, next) => {
    storyManagementApi.createStory(req.body)
      .then(newStory => res.send(newStory))
      .catch(err => next(err));
  });

storyRouter.route('/:storyId')
  .get( (req, res, next) => {
    storyApi.getStory(req.params.storyId)
      .then(story => res.json(story))
      .catch(err => next(err));
  })
  .put( (req, res, next) => {
    storyApi.updateStory(req.params.storyId, req.body)
    .then(oldStory => res.json(oldStory))
    .catch(err => next(err));
  });

storyRouter.route('/:storyId/storynodes/')
  .post( (req, res, next) => {
    const newStoryNode = {...req.body, storyId: req.params.storyId}
    storyNodeApi.addStoryNodes(newStoryNode)
      .then(newStoryNode => res.send(newStoryNode))
      .catch(err => next(err));
  });

storyRouter.route('/:storyId/storynodes/:sNodeId')
  .get( (req, res, next) => {
    storyNodeApi.getStoryNodeById(req.params.sNodeId)
      .then(storyNode => res.json(storyNode))
      .catch(err => next(err));
  })
  .put( (req, res, next) => {
    storyNodeApi.updateStoryNode(req.params.sNodeId, req.body)
      .then(oldNode => res.send(oldNode))
      .catch(err => next(err));
  });

module.exports = {
  storyRouter
}