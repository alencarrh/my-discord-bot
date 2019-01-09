const { createLogger, transports } = require('winston');

logger = createLogger({
    transports: [new transports.Console({ level: 'debug' })]
});

module.exports = {
    logging: logger
}

