const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || "mongodb://localhost/storymaker";

mongoose.connect(connectionString, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongo at: " + connectionString);
  });

module.exports = mongoose;