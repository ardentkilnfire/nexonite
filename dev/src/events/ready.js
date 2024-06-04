import { event, highlight } from 'nexonite';
import { shared } from './_test.js';

export default event({
    name: 'ready',

    // Ignore the second argument, we don't need it. Client is already passed as a first argument by the event loader.
    execute: (client, _) => {
        console.log(
            highlight(`Message from ready event! Client Id is: ${client.user?.id}`, {
                color: 'magenta',
                bold: true,
            }),
        );

        console.log(shared);
    },
});
