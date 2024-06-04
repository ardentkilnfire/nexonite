import { event, highlight } from 'nexonite';

export default event({
    name: 'messageCreate',
    execute: (_, msg) => {
        // _ -> client
        console.log('Message received:', highlight(msg.content, { color: 'yellow' }));
    },
});
