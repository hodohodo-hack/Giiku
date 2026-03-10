import { execSync } from 'node:child_process';

const gitStats = {
  // Get All commit
  getTotalCommits() {
    try {
      return parseInt(execSync('git rev-list --count HEAD').toString().trim(), 10);
    } catch (e) {
      return 0;
    }
  },

  // Get Today's commit
  getTodayCommits() {
    try {
      return parseInt(execSync('git rev-list --count --since="00:00:00" HEAD').toString().trim(), 10);
    } catch (e) {
      return 0;
    }
  },

  // Get User's info
  getUserInfo() {
    try {
      const name = execSync('git config user.name', { stdio: 'pipe' }).toString().trim();
      const email = execSync('git config user.email', { stdio: 'pipe' }).toString().trim();
      return { name, email };
    } catch (e) {
      return { name: 'Unknown', email: 'Unknown' };
    }
  }
};

// example
console.log(`User: ${gitStats.getUserInfo().name}`);
console.log(`Today's Commits: ${gitStats.getTodayCommits()}`);
console.log(`All Commit: ${gitStats.getTotalCommits()}`);
