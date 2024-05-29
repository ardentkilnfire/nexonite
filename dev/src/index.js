import 'dotenv/config.js';
import { Nexonite } from 'nexonite';
import { ActivityType, GatewayIntentBits } from 'discord.js';

const nexoClient = new Nexonite({
    clientOptions: {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
        ],
        presence: {
            status: 'idle',
            activities: [{ name: 'martian vibes', type: ActivityType.Custom, state: "🔮 𝗦𝗼𝗹𝘃𝗶𝗻𝗴 𝗠𝘆𝘀𝘁𝗲𝗿𝗶𝗲𝘀" }],
        },
    },
    debug: true,
});

try {
    await nexoClient.login();
} catch (error) {
    console.error(error);
}
