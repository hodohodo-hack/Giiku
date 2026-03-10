import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
export class SetupManager {
    getShellConfigFiles() {
        const home = os.homedir();
        return [
            path.join(home, '.bashrc'),
            path.join(home, '.zshrc')
        ].filter(file => fs.existsSync(file));
    }
    getHookScript(lang) {
        return `
# === Giiku Environment Setup ===
# Start: Giiku integration
giiku_git_wrapper() {
  command git "$@"
  local exit_code=$?
  
  if [[ "$1" == "commit" ]]; then
    # Show full character reaction for commits
    giiku --commit-reaction "$@"
  else
    # Background update for other commands
    giiku --hook "$@" > /dev/null 2>&1
    if [[ "$1" == "status" || "$1" == "push" ]]; then
      giiku --status-line
    fi
  fi

  return $exit_code
}

alias git="giiku_git_wrapper"
# End: Giiku integration
`;
    }
    getStartupScript() {
        return `
# === Giiku Startup Greeting ===
giiku --startup
# End: Giiku Startup Greeting
`;
    }
    install(lang) {
        const files = this.getShellConfigFiles();
        if (files.length === 0) {
            console.log(lang === 'ja' ? '❌ 設定ファイルが見つかりませんでした。' : '❌ Shell config files not found.');
            return;
        }
        const hookScript = this.getHookScript(lang);
        const startupScript = this.getStartupScript();
        for (const file of files) {
            let content = fs.readFileSync(file, 'utf8');
            let updated = false;
            if (!content.includes('Giiku Environment Setup')) {
                content += `\n${hookScript}\n`;
                updated = true;
            }
            if (!content.includes('Giiku Startup Greeting')) {
                content += `\n${startupScript}\n`;
                updated = true;
            }
            if (updated) {
                fs.writeFileSync(file, content);
                console.log(lang === 'ja' ? `✅ ${file} に設定をインストールしました。` : `✅ Installed Giiku to ${file}.`);
            }
        }
        if (lang === 'ja') {
            console.log('\n🎉 インストール完了！ターミナルを再起動してください。');
        }
        else {
            console.log('\n🎉 Setup complete! Please restart your terminal.');
        }
    }
    uninstall(lang) {
        const files = this.getShellConfigFiles();
        for (const file of files) {
            let content = fs.readFileSync(file, 'utf8');
            const originalContent = content;
            content = content.replace(/\n# === Giiku Environment Setup ===[\s\S]*?# End: Giiku integration\n/g, '');
            content = content.replace(/\n# === Giiku Startup Greeting ===[\s\S]*?# End: Giiku Startup Greeting\n/g, '');
            if (content !== originalContent) {
                fs.writeFileSync(file, content);
                console.log(lang === 'ja' ? `🗑️ ${file} から設定を削除しました。` : `🗑️ Removed Giiku from ${file}.`);
            }
        }
    }
}
