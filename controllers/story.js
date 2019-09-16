const express = require('express')

const storyApi = require('../models/story.js')

const storyRouter = express.Router()

storyRouter.route('/')
  .post( (req, res) => {
    storyApi(req.body)
    .then(newStory => res.send(newStory))
    .catch(next);
  });

// templateRouter.get('/', (req, res) => {
//   res.json(templateApi.getHelloWorldString())
// })

module.exports = {
  storyRouter
}
