import { loadFiles } from '$utils/file_loader';
import { BaseCommand } from '.';

// Types
import type { Nexonite } from '$/nexonite';
import type { AnyCommand, GlobalCommands, GuildCommands, ResolvedCommands } from '$types/commands';

export async function resolveCommands(
    client: Nexonite,
    commandsPath: string,
): Promise<ResolvedCommands> {
    const commands = new Set<AnyCommand>();

    await loadFiles<AnyCommand>(commandsPath, (command) => {
        if (!(command instanceof BaseCommand))
            throw new Error(`Found invalid item "${command}" in options.commands`);

        // Don't load disabled commands
        if (!command.configs?.disabled) {
            commands.add(command);
        }
    });

    const globalCommands: GlobalCommands = new Set();
    const guildCommands: GuildCommands = new Map();

    for (const command of commands) {
        if (command.configs?.disabled) {
            commands.delete(command);
            continue;
        }

        const isInDevMode = client.nexoOptions.dev?.global || command.configs?.devOnly;
        const devGuilds = client.nexoOptions.dev?.guilds || [];

        if (isInDevMode) {
            command.configs!.devOnly = true;
            command.configs!.guilds = [...devGuilds, ...(command.configs!.guilds || [])];
        }

        if (!command.configs?.devOnly) {
            globalCommands.add(command);
        }

        if (command.configs?.guilds) {
            for (const guildId of command.configs.guilds) {
                const existingGuildCommands = guildCommands.get(guildId) || new Set<AnyCommand>();

                existingGuildCommands.add(command);
                guildCommands.set(guildId, existingGuildCommands);
            }
        }
    }

    return {
        commands,
        globalCommands,
        guildCommands,
    };
}
