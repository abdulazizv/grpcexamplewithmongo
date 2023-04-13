const cfg = require("./index");
const mongoose = require("mongoose");
const logger = require("./logger");

let mongoDBURL =
    "mongodb://" +
    cfg.mongoUser +
    ":" + cfg.mongoPassword +
    "@" + cfg.mongoHost +
    ":" + cfg.mongoPort +
    "/" + cfg.mongoDatabase;

mongoose.set ('strictQuery', true);

mongoose.connect(
    mongoDBURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log("Error while connecting to database (" +
                mongoDBURL + ") "+ err.message);
            logger.error("Error while connecting to database (" +
                mongoDBURL + ") "+ err.message);
        }

        logger.info("Connected to mongoDB")
    }
);
console.log(mongoDBURL)