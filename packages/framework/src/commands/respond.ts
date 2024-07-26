import { SlashCommand } from './slash';

// Types
import type { CommandResponseData } from '$types/commands';
import { UserContextMenuCommand } from './context/user';
import { MessageContextMenuCommand } from './context/message';

export async function respond(data: CommandResponseData) {
    const { client, interaction, commandIdMap } = data;

    const isCommandOrAutocomplete =
        interaction.isCommand() ||
        interaction.isContextMenuCommand() ||
        interaction.isAutocomplete();

    if (!isCommandOrAutocomplete) return;

    const command = commandIdMap.get(interaction.commandId);

    // If command is not found return - if unknownCommand message send
    if (!command)
        return void (
            !interaction.isAutocomplete() &&
            client.nexoOptions.messages?.unknownCommand &&
            interaction.reply(client.nexoOptions.messages.unknownCommand)
        );

    if (interaction.isAutocomplete()) {
        if (command instanceof SlashCommand)
            await command.autocomplete?.({
                interaction,
                client,
            });

        return; // @ts-ignore
    }

    // If deffer, deffer
    if (command.configs?.defer)
        await interaction.deferReply(
            typeof command.configs.defer == 'object' ? command.configs.defer : {},
        );

    // Run the command
    try {
        // @ts-ignore
        await command.execute({ client, interaction });
    } catch (e) {
        console.error(
            `There was an error running command ${command.data.name}`,
            `interaction: ${interaction.id}, channel: ${interaction.channel}, guild: ${interaction.guild}`,
            e,
        );
    }
}
