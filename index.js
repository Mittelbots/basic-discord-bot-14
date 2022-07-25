//?MODULES --
try {
  var { Client, Options, GatewayIntentBits, Collection, ActivityType } = require("discord.js");
}catch(err) {
  console.error(`[ERROR] Please install all modules first by typing "npm install or npm i" in the terminal.`);
  process.exit(1);
}
const { errorhandler } = require("./utils/functions/errorhandler/errorhandler");
const { deployCommands } = require("./utils/functions/deployCommands/deployCommands");
const { messageCreate } = require("./bot/events/messageCreate");
const { getLinesOfCode } = require("./utils/functions/getLinesOfCode/getLinesOfCode");
const { log } = require("./logs");

//? JSON --
const token = require('./_secret/token.json');
const config = require('./utils/assets/json/_config/config.json');
const activity = require('./utils/assets/json/activity/activity.json');
const { createSlashCommands } = require("./utils/functions/deployCommands/deploySlashCommands");
const { interactionCreate } = require("./bot/events/interactionCreate");
const version = require('./package.json').version;

const bot = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent],
    makeCache: Options.cacheWithLimits({
        MessageManager: 10,
        PresenceManager: 0,
        disableMentions: 'everyone'
        // Add more class names here
    }),
});

bot.setMaxListeners(0);

bot.commands = new Collection();
deployCommands({bot});
createSlashCommands();

interactionCreate({bot});

bot.on("messageCreate", async message => {
    return await messageCreate({message, bot});
});

bot.once('ready', async () => {

  getLinesOfCode((cb) => {
    var codeLines = ` | Lines of Code: ${cb}` || '';
    bot.user.setActivity({
      name: activity.name + ' ' +  version + codeLines,
      type: ActivityType.Playing // ActivityType.WATCHING, ActivityType.LISTENING, ActivityType.PLAYING
    });
  });

    console.log(`****Ready! Logged in as ${bot.user.tag}! I'm on ${bot.guilds.cache.size} Server****`);

    if(config.debug) log.info('------------BOT SUCCESSFULLY STARTED------------', new Date());
});

bot.login(token.BOT_TOKEN).catch(err => {
  console.error(err);
})

//! ERROR --
process.on('unhandledRejection', err => {
    return errorhandler({err, fatal:true})
});

process.on('uncaughtException', err => {
    return errorhandler({err, fatal:true})
});