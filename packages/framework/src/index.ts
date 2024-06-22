export { Nexonite } from '$/nexonite';
export type { NexoOptions } from '$types/nexonite';

export { Event, event } from '$events/.';
export type { EventOptions } from '$types/events';

export { BaseCommand } from '$commands/.';
export type { CommandConfigs, CommandExec, CommandJSONBody } from '$types/commands';

export { SlashCommand, slashCommand } from '$commands/slash';
export { AutoCompleteHandler, SlashCommandsJSONBody } from '$types/commands';

// prettier-ignore
export { MessageContextMenuCommand, UserContextMenuCommand, messageContextMenuCommand, userContextMenuCommand } from '$commands/context';
export type { ContextMenuCommandsJSONBody } from '$types/commands';

// Utility to highlight strings
export type { HighlightColors } from '$types/utils';
export { highlight, setDevMode } from '$utils/.';
