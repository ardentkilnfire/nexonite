export { Nexonite } from '$/nexonite';
export type { NexoOptions } from '$types/nexonite';

export { Event, event } from '$events/.';
export type { EventOptions } from '$types/events';

export { PrefixCommandBuilder } from '$commands/builders';
export { PrefixCommand, prefixCommand } from '$commands/prefix';
export type { PrefixCommandExec, PrefixCommandsJSONBody } from '$types/commands';

// prettier-ignore
export { MessageContextMenuCommand, UserContextMenuCommand, messageContextMenuCommand, userContextMenuCommand } from '$commands/context';
export type { ContextMenuCommandsJSONBody } from '$types/commands';

export { SlashCommand, slashCommand } from '$commands/slash';
export { AutoCompleteHandler, SlashCommandsJSONBody } from '$types/commands';

export { BaseCommand } from '$commands/.';
export type { APICommandExec, CommandConfigs, CommandJSONBody } from '$types/commands';

// Utility to highlight strings
export type { HighlightColors } from '$types/utils';
export { highlight, setDevMode } from '$utils/.';
