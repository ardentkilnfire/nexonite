export interface Logger {
    (...messages: any[]): void;
    log: (...messages: any[]) => void;
    debug: (...messages: any[]) => void;
    error: (...errors: any[]) => void;
}
