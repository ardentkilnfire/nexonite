import { ApplicationCommandType, ContextMenuCommandBuilder } from 'discord.js';
import { userContextMenuCommand } from 'nexonite';

export default userContextMenuCommand({
    data: new ContextMenuCommandBuilder().setName('User Info').setType(ApplicationCommandType.User),
    config: {
        disabled: true,
    },
    execute: async ({ client, interaction }) => {
        const user = interaction.targetUser;

        await interaction.reply(`User: ${user.tag} (${user.id})`);
    },
});
