const mongoose = require("mongoose");
const conection = "mongodb://localhost:27017/SupermarketOnline";

// Connect to MongoDB using Mongoose:
mongoose.connect(conection,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, mongoClient) => {
        if (err) return console.log(err);
        console.log("We're connected to " + mongoClient.name + " in MongoDB");
    });

module.exports = mongoose;

