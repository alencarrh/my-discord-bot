var logging = require("./features/logging/logging.ts").logging;

module.exports = {
    getAuthenticationKey() {
        var fs = require('fs');
        var filename = "../.discord-auth.key";
        logging.debug('Loading authentication file: %s', filename);
        return new Promise((resolve, reject) => {
            fs.readFile(filename, 'utf8', function (err, data) {
                if (err) reject(new Error("Couldn't read authentication file."));
                resolve(data);
            });
        });
    }
};
