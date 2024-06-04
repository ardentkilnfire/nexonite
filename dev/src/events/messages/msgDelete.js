import { event, highlight } from 'nexonite';
import { shared } from '../_test.js';

export default event({
    name: 'messageDelete',
    execute: (_, msg) => {
        // _ -> client
        console.log('Message deleted:', highlight(msg.id, { bold: true }));
        console.log(shared);
    },
});
