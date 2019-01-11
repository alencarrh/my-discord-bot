const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

function newLogger(_label, _level) {
    return createLogger({
        level: _level,
        format: format.combine(
            label({ label: _label }),
            format.splat(),
            timestamp(),
            prettyPrint()
        ),
        transports: [new transports.Console()]
    });
}

var loggerLevel = 'info';
var loggerLabel = 'default';
const defaultLogger = newLogger(loggerLabel, loggerLevel);

module.exports = {
    default: defaultLogger,
    label(label) {
        loggerLabel = label;
        return this;
    },
    level(level) {
        loggerLevel = level;
        return this;
    },
    get() {
        return newLogger(loggerLabel, loggerLevel);
    }
}
