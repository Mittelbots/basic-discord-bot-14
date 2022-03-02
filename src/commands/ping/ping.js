const config = require('../../../utils/assets/json/_config/config.json');

module.exports.run = async (bot, message, args) => {
    if(config.deleteCommandsAfterUsage == 'true') {
        message.delete();
    }
    message.channel.send(`Pong!`).then(msg => {
        setTimeout(() => {
            if(config.debug == 'true') console.info('Ping command passed!')
            return msg.edit(`Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
        }, 1000);
    })
}

module.exports.help = {
    name:"ping",
    description: "See the current ping of the discord bot",
    usage: "ping"
}