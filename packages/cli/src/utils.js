/**
 * Supports npm, pnpm, Yarn, cnpm, bun and any other package manager that sets the
 * npm_config_user_agent env variable.
 * Thanks to https://github.com/zkochan/packages/tree/main/which-pm-runs for this code!
 */
function packageManager() {
    if (!process.env.npm_config_user_agent) {
        return undefined;
    }
    const user_agent = process.env.npm_config_user_agent;
    const pm_spec = user_agent.split(' ')[0];
    const separator_pos = pm_spec.lastIndexOf('/');
    const name = pm_spec.substring(0, separator_pos);
    return name === 'npminstall' ? 'cnpm' : name;
}

export const pm = packageManager() || 'npm';
