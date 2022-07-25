const config = require('../../../utils/assets/json/_config/config.json');

//! NOTE: This sort of command are not recommended to use. If you are aiming to get the bot over 75 servers you have to switch to slash commands.
module.exports.run = async ({bot, message, args}) => {
    message.channel.send(`Pong!`).then(msg => {
        setTimeout(() => {
            if(config.debug) console.info('Ping command passed!')
            return msg.edit(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
        }, 1000);
    })
}

module.exports.help = {
    name:"ping",
    description: "See the current ping of the discord bot",
    usage: "ping"
}