const { SlashCommandBuilder } = require('discord.js');

module.exports.run = async ({main_interaction, bot}) => {
    main_interaction.reply({
        content: 'Pong!',
        ephemeral: true
    });
    setTimeout(() => {
        return main_interaction.editReply(`Latency is ${Date.now() - main_interaction.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
    }, 1000);

}

module.exports.data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies the ping of the bot')