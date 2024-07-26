import { getAuthData } from '$utils/token';
import { REST, Routes } from 'discord.js';

// Types
import type { Nexonite } from '$/nexonite';
import type { CommandIdMap, ResolvedCommands } from '$types/commands';
import type { APIApplicationCommand } from 'discord.js';

export async function registerCommands(
    client: Nexonite,
    { globalCommands, guildCommands }: ResolvedCommands,
): Promise<CommandIdMap> {
    const globalCommandsArray = Array.from(globalCommands);
    const commandIdMap: CommandIdMap = new Map();
    const { clientId, token } = getAuthData(client);

    const rest = new REST().setToken(token);

    const registeredGlobalCommands = (await rest.put(Routes.applicationCommands(clientId), {
        body: globalCommandsArray.map((command) => command.commandData),
    })) as APIApplicationCommand[];

    client.log.debug(
        `Registered ${registeredGlobalCommands.length} global application { / } commands`,
    );

    registeredGlobalCommands.forEach((command, i) => {
        commandIdMap.set(command.id, globalCommandsArray[i]);
    });

    for (const [guildId, commands] of guildCommands) {
        const commandsArray = Array.from(commands);

        const res = (await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commandsArray.map((command) => command.commandData),
        })) as APIApplicationCommand[];

        client.log.debug(
            `Registered ${res.length} guild application { / } commands in guild: ${guildId}`,
        );
        res.forEach((command, i) => {
            commandIdMap.set(command.id, commandsArray[i]);
        });
    }

    return commandIdMap;
}
