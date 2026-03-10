export const translations = {
  en: {
    labels: {
      satiety: 'Satiety',
      luster: 'Luster',
      title: 'Title',
      totalCommits: 'Total Commits',
      todayCommits: 'Today\'s Commits',
      activeDays: 'Active Days',
      status: 'STATUS',
      quit: 'Press q to exit | Arrows: Switch Skin | Growth logic linked to Git'
    },
    titles: {
      novice: 'Novice Engineer',
      earlyBird: 'Early Bird Engineer🌅',
      debugDemon: 'Debug Demon👹',
      veteran: 'Veteran Warrior⚔️',
      cautious: 'Currently: Cautious🐢',
      burning: 'Currently: On Fire🔥'
    },
    cli: {
      startup: (name: string, satiety: number) => `\n👾 Hey ${name}! Let's code today! [Satiety: ${satiety}%]`,
      hungry: (name: string, satiety: number) => `\n🤤 Hey ${name}... so hungry... [Satiety: ${satiety}%]`,
      statusLine: (s: number, l: number, t: string) => 
        `👾 [Satiety: ${s}% | Luster: ${l}% | Title: ${t}]`,
      help: `
  👾 Giiku - Grow your digital pet with Git!
  ==========================================
  Giiku is a cross-project growth tool. Your pet lives in your terminal, 
  not just in one repository. It tracks your local Git actions to grow.

  USAGE:
    giiku [options]

  OPTIONS:
    (none)            Launch TUI (Full-screen mode). Customize skins and view stats.
    --setup [--ja]    Install Git hooks to your shell (.zshrc/.bashrc).
    --remove-setup    Remove all Giiku hooks and configurations.
    --startup         Show greeting. Best used in your shell's startup script.
    --help, -h        Show this help message.
    --version, -v     Show current version.

  STATUS GUIDE:
    - Satiety (Hunger): 
      Goes up with "git commit". If it hits 0%, your pet might starve!
    - Luster (Shine):   
      Goes up with "git push". High luster adds a beautiful aura to your pet.
    - Days Active:      
      Total days you have developed with Giiku.

  TIPS:
    - Committing in the morning (5:00-9:00) might earn you a special title.
    - Frequent use of "git diff" and "git status" reflects a cautious dev style.
      `,
      debugHelp: `
  DEBUG & ADVANCED OPTIONS:
  -------------------------
  --hook <cmd>        Manually trigger an action (e.g., --hook commit).
  --status-line       Display the current status in a single line.
  --commit-reaction   Trigger the rich TUI reaction for a commit.

  FORCE GROWTH / DECREASE (for testing):
    - Increase Satiety: giiku --hook commit
    - Increase Luster:  giiku --hook push
    - Decrease Satiety: giiku --hook starve
    - Decrease Luster:  giiku --hook rust
    - Check Titles:     giiku --status-line
      `
    }
  },
  ja: {
    labels: {
      satiety: '満腹度',
      luster: 'ツヤ',
      title: '称号',
      totalCommits: '合計コミット数',
      todayCommits: '今日のコミット数',
      activeDays: '活動日数',
      status: 'ステータス',
      quit: 'qキーで終了 | 左右キー: スキン切り替え | Git操作で育ちます'
    },
    titles: {
      novice: '新米エンジニア',
      earlyBird: '早起きのエンジニア🌅',
      debugDemon: 'デバッグの鬼👹',
      veteran: '百戦錬磨⚔️',
      cautious: '現在：慎重派🐢',
      burning: '現在：炎上中🔥'
    },
    cli: {
      startup: (name: string, satiety: number) => `\n👾 やあ ${name}！ 今日の開発も頑張ろう！ [満腹度: ${satiety}%]`,
      hungry: (name: string, satiety: number) => `\n🤤 やあ ${name}... お腹空いたよ... [満腹度: ${satiety}%]`,
      statusLine: (s: number, l: number, t: string) => 
        `👾 [満腹度: ${s}% | ツヤ: ${l}% | 称号: ${t}]`,
      help: `
  👾 Gi育 (Giiku) - Git操作でキャラクターを育てる育成ツール
  ==========================================================
  Gi育は、特定のプロジェクトではなく「あなたのパソコン上」で
  キャラクターを育てるツールです。日々のGit操作がキャラの糧になります。

  使い方:
    giiku [オプション]

  オプション:
    (なし)            TUI (フル画面モード) を起動します。スキンの変更や詳細確認ができます。
    --setup [--ja]    Gitフックをシェル (.zshrc/.bashrc) にインストールします。
    --remove-setup    設定をすべて削除し、アンインストールします。
    --startup         キャラクターからの挨拶を表示します (シェル起動時に自動実行されます)。
    --help, -h        このヘルプを表示します。
    --version, -v     バージョン情報を表示します。

  パラメータ解説:
    - 満腹度 (Satiety):
      "git commit" で回復します。0%になると餓死の危機に瀕します。
    - ツヤ (Luster):
      "git push" で上昇します。高いとキャラクターの周囲にオーラが発生します。
    - 活動日数:
      Gi育と一緒に開発を行った通算日数です。

  ヒント:
    - 朝（5:00-9:00）にコミットすると特別な称号がもらえるかもしれません。
    - コミット前に "git diff" や "git status" を多用すると「慎重派」と見なされます。
      `,
      debugHelp: `
  デバッグ・詳細オプション:
  -------------------------
  --hook <cmd>        Gitアクションを手動で実行します (例: --hook commit)。
  --status-line       現在のステータスを1行で表示します。
  --commit-reaction   コミット時のリッチな演出をテスト表示します。

  強制成長・減少（テスト用）:
    - 満腹度を上げる: giiku --hook commit
    - ツヤを出す:     giiku --hook push
    - 満腹度を下げる: giiku --hook starve
    - ツヤを下げる:   giiku --hook rust
    - 称号を確認する: giiku --status-line
      `
    }
  }
};
