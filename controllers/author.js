const express = require('express');

const authorManagementApi = require('../models/authorManagement.js');

const authorRouter = express.Router();

authorRouter.route('/')
    .post( (req, res) => {
        authorManagementApi.registerUser(req.body.username)
            .then(author => author ? res.send(author) : res.sendStatus(400))
            .catch(err => console.log(err));
    });

authorRouter.route('/login')
    .get( (req, res) => {
        authorManagementApi.validateUser(req.body)
            .then( result => {
                if (result.result)
                    res.cookie('storyauthor', result.authorId);
                else
                    res.send(400);
            })
            .catch(err => console.log(err))
    });

module.exports = {
    authorRouter
}