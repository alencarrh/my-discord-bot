
const Auth = require("./auth.ts");
const Discord = require("discord.js");
var logging = require("./features/logging/logging.ts").label("app.js").level('debug').get();
const client = new Discord.Client();
const blackjackHandler = require("./features/games/blackjack.ts");
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
    if (message.channel.name == "bot") {
        var handle = messageHandler[message.content];
        console.log(message);
        handle(message);
    }
});

//response.contratos.some(contrato => contrato.parcelas.find(parcela => parcela.pagavel));

Auth.getAuthenticationKey().then(token => {
    logging.info("Login in...");
    client.login(token);
    logging.info("Logged.");

}).catch(error => {
    console.log(error);
    throw error;
});