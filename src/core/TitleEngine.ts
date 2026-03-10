import { GiikuState, ActionHistory } from '../types.js';

export class TitleEngine {
  // 称号の評価と更新
  public evaluateTitles(state: GiikuState, lastCommand?: string): string[] {
    const titles = new Set<string>(['新米エンジニア']); // デフォルト
    const history = state.history;

    // --- 実績称号（永続） ---
    if (history.morningCommits >= 3) {
      titles.add('早起きのエンジニア🌅');
    }
    if (history.fixCommits >= 5) {
      titles.add('デバッグの鬼👹');
    }
    if (state.totalCommits >= 100) {
      titles.add('百戦錬磨⚔️');
    }

    // --- 状態称号（動的） ---
    // 直近のコマンド傾向から判定
    const diffCount = history.commandCounts['diff'] || 0;
    const statusCount = history.commandCounts['status'] || 0;
    const commitCount = history.commandCounts['commit'] || 0;

    if (diffCount > commitCount * 2 && diffCount > 5) {
      titles.add('現在：慎重派🐢');
    }
    if (commitCount > 10 && (new Date().getHours() > 22 || new Date().getHours() < 3)) {
      titles.add('現在：炎上中🔥'); // 夜中の連続コミット
    }

    // メイン称号を先頭にするロジック（最新の状態称号を優先するなど）
    const titleArray = Array.from(titles);
    const dynamicTitle = titleArray.find(t => t.startsWith('現在：'));
    
    if (dynamicTitle) {
      // 状態称号があればそれをメインに
      return [dynamicTitle, ...titleArray.filter(t => t !== dynamicTitle)];
    }

    return titleArray.reverse(); // 新しく獲得したものを優先
  }
}
