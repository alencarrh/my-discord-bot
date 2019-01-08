module.exports = {
    getAuthenticationKey() {
        var fs = require('fs');
        var filename = "../.discord-auth.key";
        return new Promise((resolve, reject) => {
            fs.readFile(filename, 'utf8', function (err, data) {
                if (err) reject(new Error("Couldn't read authentication file."));
                // console.log("------\"" + data + "\"-------");
                resolve(data);
            });
        });
    }
};
