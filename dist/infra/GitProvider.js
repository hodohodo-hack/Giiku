import { execSync } from 'node:child_process';
export class GitProvider {
    getStats() {
        try {
            const total = execSync('git rev-list --all --count 2>/dev/null').toString().trim();
            const today = execSync('git rev-list --count --since="00:00:00" HEAD 2>/dev/null').toString().trim();
            const name = execSync('git config user.name 2>/dev/null').toString().trim();
            const hash = execSync('git rev-parse --short HEAD 2>/dev/null').toString().trim();
            return {
                totalCommits: parseInt(total, 10) || 0,
                todayCommits: parseInt(today, 10) || 0,
                userName: name || 'Unknown',
                lastCommitHash: hash || 'none'
            };
        }
        catch (e) {
            return {
                totalCommits: 0,
                todayCommits: 0,
                userName: 'Unknown',
                lastCommitHash: 'none'
            };
        }
    }
}
