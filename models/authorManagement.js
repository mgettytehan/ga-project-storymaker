const authorApi = require('./author.js');

const registerUser = async (author) => {
    const checkAuthor = await authorApi.getAuthorByName(author.username);
    if (checkAuthor) {
        return false;
    }
    else {
        newAuthor = await authorApi.addAuthors(author);
        return newAuthor[0];
    }
}

const validateUser = async (authorCheck) => {
    const author = await authorApi.getAuthorByName({username : authorCheck.username });
    if (author && author.password === authorCheck.password)
        return {result: true, authorId: author._id};
    else
        return {result: false};
}

module.exports = {
    registerUser,
    validateUser
}