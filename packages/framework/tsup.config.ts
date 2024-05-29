import type { Options } from 'tsup';

export const tsup: Options = {
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: true,
    keepNames: true,
    target: 'esnext',
    format: ['cjs', 'esm'],
    entryPoints: ['src/index.ts'],
    shims: true,
    noExternal: [/^[a-zA-Z]:/],
};
