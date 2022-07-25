const { handleSlashCommands } = require("../../src/slash_commands");

module.exports.interactionCreate = ({
    bot
}) => {
    bot.on('interactionCreate', async (main_interaction) => {
        main_interaction.bot = bot;
       
        return handleSlashCommands({
            main_interaction,
            bot
        })
    });
}