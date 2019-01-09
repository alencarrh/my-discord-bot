const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.splat(),
        format.simple()
    ),
    transports: [new transports.Console({ level: 'debug' })]
});

module.exports = {
    logging: logger
}

