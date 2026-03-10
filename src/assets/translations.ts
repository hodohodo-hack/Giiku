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
      quit: 'Press q to exit | Growth logic linked to your Git history'
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

  Usage:
    giiku [options]

  Options:
    (none)            Launch TUI (Full-screen mode).
    --setup [--ja]    Install hooks and startup greeting (use --ja for Japanese).
    --remove-setup    Remove Giiku from shell config.
    --startup         Show character greeting.
    --help, -h        Show this help.
    --version, -v     Show version.

  Growth Tips:
    - git commit      Feed your pet (Satiety UP)
    - git push        Polish your pet (Luster UP)
      `,
      debugHelp: `
  Debug Options:
    --hook <args>        Process git command hook manually.
    --status-line        Show 1-line status.
    --commit-reaction    Show rich commit reaction UI.
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
      quit: 'qキーで終了 | あなたのGit操作でキャラクターが育ちます'
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

  使い方:
    giiku [オプション]

  オプション:
    (なし)            TUI (フル画面モード) を起動します。
    --setup [--ja]    フックと起動時挨拶をインストールします (--ja で日本語化)。
    --remove-setup    設定を削除します。
    --startup         キャラクターからの挨拶を表示します。
    --status-line     現在のステータスを1行で表示します。
    --help, -h        ヘルプを表示します。
    --version, -v     バージョン情報を表示します。
      `,
      debugHelp: `
  デバッグ用オプション:
    --hook <args>        Gitフックを手動で実行します。
    --status-line        1行ステータスを表示します。
    --commit-reaction    コミット時のリッチなリアクションを表示します。
      `
    }
  }
};
