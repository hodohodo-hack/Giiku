import { GiikuState, IGitProvider, IStateStore } from '../types.js';
import { TitleEngine } from './TitleEngine.js';

export class GiikuEngine {
  private titleEngine: TitleEngine;

  constructor(
    private stateStore: IStateStore,
    private gitProvider: IGitProvider
  ) {
    this.titleEngine = new TitleEngine();
  }

  // Gitコマンドのフック処理（ターミナルでの操作ごとに呼ばれる）
  public processHook(args: string[]): { message: string, state: GiikuState } | null {
    if (args.length === 0) return null;
    
    const command = args[0]; // 'commit', 'push', 'status', etc.
    let currentState = this.refresh(); // 基本の減衰や日数計算を先に適用
    
    const history = currentState.history;
    const condition = currentState.condition;
    
    // コマンド実行回数のカウント
    history.commandCounts[command] = (history.commandCounts[command] || 0) + 1;

    let actionMessage = '';

    // コマンド別のパラメータ上昇ロジック
    if (command === 'commit') {
      condition.satiety = Math.min(100, condition.satiety + 20);
      actionMessage = '🍔 満腹度が回復した！ (Satiety UP)';
      
      const hour = new Date().getHours();
      if (hour >= 5 && hour <= 9) {
        history.morningCommits += 1;
      }
      
      // コミットメッセージの解析（ここでは簡易的にargsの中に "fix" があるか等）
      if (args.join(' ').toLowerCase().includes('fix')) {
        history.fixCommits += 1;
      }
      
      history.lastCommitTime = new Date().toISOString();

    } else if (command === 'push') {
      condition.luster = Math.min(100, condition.luster + 15);
      actionMessage = '✨ ツヤが出た！ (Luster UP)';
      history.lastPushTime = new Date().toISOString();

    } else if (command === 'status' || command === 'diff' || command === 'log') {
      condition.intellect = Math.min(100, condition.intellect + 5);
      if (condition.intellect > 90) {
        actionMessage = '📚 状況を深く理解しているようだ。 (Intellect UP)';
      } else {
        actionMessage = '💡 状況を確認した。(Intellect UP)';
      }
    }

    // 称号の再評価
    const newTitles = this.titleEngine.evaluateTitles(currentState, command);

    const updatedState: GiikuState = {
      ...currentState,
      condition,
      history,
      titles: newTitles,
    };

    this.stateStore.save(updatedState);
    
    // ステータス表示やアクションがないコマンド（pullなど）は無視しても良いが、
    // ここでは何らかの反応を返す。
    if (!actionMessage && ['pull', 'checkout', 'branch', 'add'].includes(command)) {
      actionMessage = '👾 キャラクターはあなたの作業を見守っている...';
    }

    return { message: actionMessage, state: updatedState };
  }

  // 基本的な時間の経過や、コミット数の同期処理
  public refresh(): GiikuState {
    const currentState = this.stateStore.get();
    const stats = this.gitProvider.getStats();

    let newSatiety = currentState.condition.satiety;
    let newLuster = currentState.condition.luster;

    // 時間経過によるパラメータの減衰 (シミュレーション)
    const lastUpdate = new Date(currentState.lastUpdate).getTime();
    const now = new Date().getTime();
    const hoursPassed = (now - lastUpdate) / (1000 * 60 * 60);
    
    if (hoursPassed > 1) {
      // 1時間ごとに満腹度とツヤが低下
      newSatiety = Math.max(0, newSatiety - Math.floor(hoursPassed * 2));
      newLuster = Math.max(0, newLuster - Math.floor(hoursPassed * 1));
    }

    // 日数更新
    const lastUpdateDate = new Date(currentState.lastUpdate).toLocaleDateString();
    const nowDate = new Date().toLocaleDateString();
    let daysActive = currentState.daysActive;
    if (lastUpdateDate !== nowDate) {
      daysActive += 1;
    }

    const updatedState: GiikuState = {
      ...currentState,
      totalCommits: stats.totalCommits,
      lastUpdate: new Date().toISOString(),
      daysActive,
      condition: {
        ...currentState.condition,
        satiety: newSatiety,
        luster: newLuster,
      }
    };

    this.stateStore.save(updatedState);
    return updatedState;
  }

  public getState(): GiikuState {
    return this.stateStore.get();
  }
}
