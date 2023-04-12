const winston = require("winston");
const path = require("path");

const level = {
    error : 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
};

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({
            label:"driver_service"
        })
    )
})