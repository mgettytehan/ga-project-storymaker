const express = require('express');

const authorApi = require('../models/author.js');

const authorRouter = express.Router();

authorRouter.route('/')
    .post( (req, res) => {
        authorApi.getAuthorByName(req.body.username)
            .then(author => {
                if (author)
                    res.send(400)
                else
                    authorApi.addAuthors(req.body)
                    .then(author => res.send(author))
            })
            .catch(err => console.log(err));
    });