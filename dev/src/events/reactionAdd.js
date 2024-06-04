import { event, highlight } from 'nexonite';
import { shared } from './_test.js';

export default event({
    name: 'messageReactionAdd',
    execute: (_, reaction, user) => {
        // _ -> client
        console.log(
            'Reaction added:',
            highlight(reaction.emoji.name || 'Emoji has no name', { bold: true }),
            'by',
            highlight(user.username || "Cannot get user's username", { bold: true }),
        );

        console.log(shared);
    },
});
