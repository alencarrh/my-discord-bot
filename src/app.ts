
const Auth = require("./auth.ts");
const Discord = require("discord.js");
var logging = require("./features/logging/logging.ts").logging;
const client = new Discord.Client();
const blackjackHandler = require("./features/games/blackjack/blackjackHandler.ts");
var prefix = "-";

//TODO refactor this into another module/class/component
var messageHandler = {
    "-blackjack": blackjackHandler.process,
    "-21": blackjackHandler.process,
    "-bj": blackjackHandler.process
}

client.on("message", message => {
    if (message.author.bot) {
        logging.debug("Message receive from a bot, ignoring it.");
        return;
    }
    if (message.content[0] != prefix) {
        logging.debug("Message receive doesn't start with prefix, ignoring it.");
        return;
    }

    var handle = messageHandler[message.content];
    // console.log(message);
    handle(message);

});


Auth.getAuthenticationKey().then(token => {
    logging.info("Login in...");
    client.login(token);
    logging.info("Logged.");

}).catch(error => {
    console.log(error);
    throw error;
});