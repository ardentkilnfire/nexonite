
import { SlashCommandBuilder } from 'discord.js';
import { slashCommand } from 'nexonite';

export default slashCommand({
    data: new SlashCommandBuilder().setName('ping').setDescription('jdsjsjkf').toJSON(),
    execute: async ({ client, interaction }) => {
        await interaction.reply('Pong!');
    },
});
