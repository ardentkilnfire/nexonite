import { slashCommand } from 'nexonite';
import { SlashCommandBuilder } from 'discord.js';

export default slashCommand({
    data: new SlashCommandBuilder()
        .setName('autocomplete')
        .setDescription('Autocomplete test')
        .addStringOption((opt) => opt.setName('test').setDescription('test').setAutocomplete(true))
        .toJSON(),

    execute: async ({ interaction }) => {
        const val = interaction.options.getString('test');
        if (val) interaction.reply(val);
        else interaction.reply('No value provided');
    },

    autocomplete: async ({ interaction }) => {
        const focused = interaction.options.getFocused();
        const choices = [
            'Popular Topics: Threads',
            'Sharding: Getting started',
            'Library: Voice Connections',
            'Interactions: Replying to slash commands',
            'Popular Topics: Embed preview',
        ];
        const filtered = choices.filter((choice) =>
            choice.toLowerCase().trim().includes(focused.toLowerCase().trim()),
        );

        await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
    },
});
