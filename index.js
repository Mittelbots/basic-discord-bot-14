//?MODULES --
const Discord = require("discord.js");
const { errorhandler } = require("./utils/functions/errorhandler/errorhandler");
const { deployCommands } = require("./utils/functions/deployCommands/deployCommands");
const { messageCreate } = require("./bot/events/messageCreate");
const { getLinesOfCode } = require("./utils/functions/getLinesOfCode/getLinesOfCode");
const { log } = require("./logs");

//? JSON --
const token = require('./_secret/token.json');
const config = require('./utils/assets/json/_config/config.json');
const activity = require('./utils/assets/json/activity/activity.json');

const bot = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_VOICE_STATES"],
    makeCache: Discord.Options.cacheWithLimits({
        MessageManager: 10,
        PresenceManager: 0,
        disableMentions: 'everyone'
        // Add more class names here
    }),
});

bot.setMaxListeners(0);

bot.commands = new Discord.Collection();
deployCommands(bot);

bot.on("messageCreate", async message => {
    return await messageCreate(message, bot);
});

bot.once('ready', async () => {

  getLinesOfCode((cb) => {
    setTimeout(() => {
      var codeLines = ` | Lines of Code: ${cb}` || '';
      bot.user.setActivity({
        name: config.activity.playing.name + ' ' +  version + codeLines,
        type: config.activity.playing.type
      });
    }, 10000);
  });

    console.log(`****Ready! Logged in as ${bot.user.tag}! I'm on ${bot.guilds.cache.size} Server****`);

    if(config.debug) log.info('------------BOT SUCCESSFULLY STARTED------------', new Date());
});

bot.login(token.BOT_TOKEN);


//! ERROR --
process.on('unhandledRejection', err => {
    return errorhandler(err, null, null)
});

process.on('uncaughtException', err => {
    return errorhandler(err, null, null)
});