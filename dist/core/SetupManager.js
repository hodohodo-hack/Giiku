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
    getHookScript() {
        return `
# === Giiku Environment Setup ===
# Start: Giiku integration
giiku_git_wrapper() {
  command git "$@"
  local exit_code=$?
  giiku --hook "$@" > /dev/null 2>&1
  
  if [[ "$1" == "status" || "$1" == "commit" || "$1" == "push" ]]; then
    giiku --status-line
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
    install() {
        const files = this.getShellConfigFiles();
        if (files.length === 0) {
            console.log('❌ 設定ファイル (.bashrc, .zshrc) が見つかりませんでした。');
            return;
        }
        const hookScript = this.getHookScript();
        const startupScript = this.getStartupScript();
        for (const file of files) {
            let content = fs.readFileSync(file, 'utf8');
            let updated = false;
            // フックの追加
            if (!content.includes('Giiku Environment Setup')) {
                content += `\n${hookScript}\n`;
                updated = true;
            }
            // 起動時挨拶の追加
            if (!content.includes('Giiku Startup Greeting')) {
                content += `\n${startupScript}\n`;
                updated = true;
            }
            if (updated) {
                fs.writeFileSync(file, content);
                console.log(`✅ ${file} にGiikuのフックと起動時挨拶をインストールしました。`);
            }
            else {
                console.log(`⚠️ ${file} は既に設定済みです。`);
            }
        }
        console.log('\n🎉 インストール完了！ターミナルを再起動するか `source ~/.bashrc` 等を実行してください。');
    }
    uninstall() {
        const files = this.getShellConfigFiles();
        for (const file of files) {
            let content = fs.readFileSync(file, 'utf8');
            const originalContent = content;
            // フックの削除
            content = content.replace(/\n# === Giiku Environment Setup ===[\s\S]*?# End: Giiku integration\n/g, '');
            // 起動時挨拶の削除
            content = content.replace(/\n# === Giiku Startup Greeting ===[\s\S]*?# End: Giiku Startup Greeting\n/g, '');
            if (content !== originalContent) {
                fs.writeFileSync(file, content);
                console.log(`🗑️ ${file} からGiikuの設定を削除しました。`);
            }
        }
        console.log('👋 アンインストール完了。');
    }
}
