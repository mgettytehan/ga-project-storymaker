const express = require('express');

const authorManagementApi = require('../models/authorManagement.js');

const authorRouter = express.Router();

authorRouter.route('/register')
    .post( (req, res, next) => {
        authorManagementApi.registerUser(req.body)
            .then(author => author ? res.sendStatus(200) : res.sendStatus(400))
            .catch(err => next(err));
    });

authorRouter.route('/login')
    .post( (req, res, next) => {
        authorManagementApi.validateUser(req.body)
            .then( result => {
                if (result.result) {
                    res.cookie('storyauthor', result.authorId.toString(), {httpOnly: false, maxAge: 9000})
                    .sendStatus(200);
                }
                else
                    res.sendStatus(400);
            })
            .catch(err => next(err))
    });

authorRouter.route('/logout')
    .get( (req, res) => {
        res.clearCookie('storyauthor', {httpOnly: false})
    })
    

module.exports = {
    authorRouter
}