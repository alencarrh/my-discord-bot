
const Auth = require("./auth.js");
const Discord = require('discord.js');
const client = new Discord.Client();

client.on("message", message => {

    var prefix = '?';

    if (message.content === "ping") {

        // the robot answers pong!
        message.channel.send("Pong!");

    };

    if (message.content.startsWith(prefix + "help")) {
        message.channel.send("You did `?help` to get help.");
    };

    if (message.content == "mp") {
        message.author.send("Here is a private message !")
    };

});


Auth.getAuthenticationKey().then(token => client.login(token)).catch(error => {
    console.log(error)
    throw error;
});