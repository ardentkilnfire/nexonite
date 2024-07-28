export { Nexonite } from '$/nexonite';
export type { NexoOptions } from '$types/nexonite';

export { Event, event } from '$/events';
export type { EventOptions } from '$types/events';

export { SlashCommand, slashCommand } from '$commands/slash';
export { AutoCompleteHandler, SlashCommandData } from '$types/commands';

export { MessageContextMenuCommand, messageContextMenuCommand } from '$commands/context/message';
export { UserContextMenuCommand, userContextMenuCommand } from '$commands/context/user';
export { ContextCommandData } from '$types/commands';

export {
    AnyCommand,
    CommandConfigs,
    CommandData,
    CommandExec,
    CommandIdMap,
    CommandResponseData,
    GlobalCommands,
    GuildCommands,
    IdResolverMap,
    ResolvedCommands,
} from '$types/commands';

// Utility to highlight strings
export type { HighlightColors } from '$types/utils';
export { highlight } from '$utils/index';
export { clientIdFromToken } from '$utils/token';
