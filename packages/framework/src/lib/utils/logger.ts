import { Nexonite } from '$src/nexonite';
import type { Logger } from '../types/logger';

export function createLogger(client: Nexonite): Logger {
    const methods = {
        log: (...messages: any[]) =>
            console.log('\x1b[1m\x1b[32m[Log]\x1b[22m\x1b[39m', ...messages),
        error: (...errors: any[]) =>
            console.error('\x1b[1m\x1b[31m[Error]\x1b[22m\x1b[39m', ...errors),
        debug: (...messages: any[]) => {
            if (client.nexoOptions.debug) {
                console.debug('\x1b[1m\x1b[34m[Debug]\x1b[22m\x1b[39m', ...messages);
            }
        },
    };

    return Object.assign(methods.log, methods);
}
