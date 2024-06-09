#!/usr/bin/env node
import { readFile } from 'fs/promises';
import updateNotifier from 'update-notifier';

// CLI
import { init } from './index.js';
init();

// Notify for package updates
try {
    const pkg = await readFile('../package.json', 'utf-8');
    updateNotifier({ pkg: JSON.parse(pkg) }).notify();
} catch {}
