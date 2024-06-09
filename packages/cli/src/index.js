import kleur from 'kleur';
import fs from 'node:fs';
import path from 'node:path';
import { setTimeout } from 'node:timers/promises';
import { pm } from './utils.js';

import { cancel, confirm, group, intro, note, outro, select, spinner, text } from '@clack/prompts';

export async function init() {
    /* ------------------------------------------------------------------------
        Initialize
    ------------------------------------------------------------------------*/
    intro(kleur.bgYellow(kleur.black(kleur.bold(' Welcome to Nexonite '))));

    const project = await group(
        {
            path: () =>
                text({
                    message: 'Where should we create your project?',
                    initialValue: process.argv[2] || undefined,
                    placeholder: process.argv[2] ? undefined : './my-cool-bot',
                    validate: (value) => {
                        if (!value) return 'Please enter a path.';
                        if (!value.startsWith('./')) return 'Please enter a relative path.';
                        if (fs.existsSync(value) && fs.readdirSync(value).length > 0)
                            return 'Directory already exists and is not empty. Please choose another path.';
                    },
                }),

            template: ({ results }) =>
                select({
                    message: `Pick a project type within "${results.path}"`,
                    initialValue: 'basic',
                    maxItems: 2,
                    options: [
                        {
                            label: 'Basic',
                            value: 'basic',
                            hint: 'Scaffolded with examples',
                        },
                        {
                            label: 'Minimal',
                            value: 'minimal',
                            hint: 'Scratch project',
                        },
                    ],
                }),

            useTypescript: () =>
                confirm({
                    message: 'Do you want to use Typescript?',
                    initialValue: true,
                }),
        },
        {
            onCancel: exit,
        },
    );

    /* ------------------------------------------------------------------------
        Copy project files
     ------------------------------------------------------------------------*/
    const s = spinner();

    s.start('Creating your project.');

    // TODO: Implement actual project creation
    await setTimeout(3000);

    s.stop('Copied project files.');

    /* ------------------------------------------------------------------------
        Finish up 
     ------------------------------------------------------------------------*/
    const relativePath = path.relative(process.cwd(), project.path);

    const steps = [
        relativePath && `cd ${kleur.yellow(relativePath)}`,
        `git init && git add -A && git commit -m \"Initial commit\" ${kleur.yellow('(Optional)')}`,
        `${pm} install`,
        `${pm} run dev`,
    ]
        .filter(Boolean)
        .map((step, index) => kleur.bold(`    ${kleur.blue(`${index + 1})`)} ${kleur.cyan(step)}`));

    note(steps.join('\n'), kleur.bgGreen(kleur.black(kleur.bold(' Next Steps '))));

    outro(
        `${kleur.green(kleur.bold('Your project is ready!'))} Found any problems? Open an issue at ${kleur.cyan('https://github.com/ardentkilnfire/nexonite/issues')}`,
    );
}

function exit() {
    cancel(kleur.bgRed(kleur.bold(kleur.black(' Operation canceled! create-nexonite exited. '))));
    process.exit(0);
}
