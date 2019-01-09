
const Auth = require("./auth.js");
const Discord = require("discord.js");
const { logging } = require("./features/logging/logging.js");
const client = new Discord.Client();


client.on("message", message => {
    if (message.author.bot) {
        logging.debug("Message receive from a bot, ignoring it.");
        return;
    }


    if (message.content === "ping") {
        // the robot answers pong!
        message.channel.send("Pong!");
    };

    if (message.content == "mp") {
        message.author.send("Here is a private message !")
    };

});


Auth.getAuthenticationKey().then(token => {
    logging.info("Login in...");
    client.login(token);
    logging.info("Logged.");

}).catch(error => {
    console.log(error);
    throw error;
});