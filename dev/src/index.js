import 'dotenv/config.js';

import { ActivityType, GatewayIntentBits, Partials } from 'discord.js';
import { Nexonite } from 'nexonite';

const nexoClient = new Nexonite({
    clientOptions: {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMessageReactions,
        ],
        partials: [
            Partials.Reaction,
            Partials.Message,
            Partials.Channel,
            Partials.GuildMember,
            Partials.User,
            Partials.ThreadMember,
            Partials.GuildScheduledEvent,
        ],

        presence: {
            status: 'idle',
            activities: [
                { name: 'martian vibes', type: ActivityType.Custom, state: '🔮 𝗦𝗼𝗹𝘃𝗶𝗻𝗴 𝗠𝘆𝘀𝘁𝗲𝗿𝗶𝗲𝘀' },
            ],
        },
    },
    debug: true,
    events: './src/events',
    dev: ['1171628645379493980'],
});

try {
    console.clear();
    await nexoClient.login();
} catch (error) {
    console.error(error);
}
