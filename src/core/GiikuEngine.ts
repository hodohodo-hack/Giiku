import { GiikuState, IGitProvider, IStateStore } from '../types.js';
import { TitleEngine } from './TitleEngine.js';
import { GIIKU_CONFIG } from '../assets/config.js';
import { BASES, Base } from '../assets/parts.js';

export class GiikuEngine {
  private titleEngine: TitleEngine;

  constructor(
    private stateStore: IStateStore,
    private gitProvider: IGitProvider
  ) {
    this.titleEngine = new TitleEngine();
  }

  // Check and update obtained skins based on progress
  private checkUnlockConditions(state: GiikuState): string[] {
    const unlocked = new Set(state.unlockedSkinIds);
    
    // Unlock Mecha: 10 commits
    if (state.totalCommits >= 10) unlocked.add('mecha');
    // Unlock Phantom: 50 commits
    if (state.totalCommits >= 50) unlocked.add('phantom');
    // Unlock Forest: 3 active days
    if (state.daysActive >= 3) unlocked.add('forest');

    return Array.from(unlocked);
  }

  // Get only the skins the user has already obtained
  public getAvailableSkins(): Base[] {
    const state = this.stateStore.get();
    return BASES.filter(b => state.unlockedSkinIds.includes(b.id));
  }

  public processHook(args: string[]): { message: string, state: GiikuState } | null {
    if (args.length === 0) return null;
    
    const command = args[0];
    let currentState = this.refresh();
    
    const history = currentState.history;
    const condition = currentState.condition;
    const cfg = GIIKU_CONFIG.CONDITION;
    
    history.commandCounts[command] = (history.commandCounts[command] || 0) + 1;

    let actionMessage = '';

    if (command === 'commit') {
      condition.satiety = Math.min(cfg.SATIETY.MAX, condition.satiety + cfg.SATIETY.RECOVERY);
      actionMessage = '🍔 満腹度が回復した！ (Satiety UP)';
      
      const hour = new Date().getHours();
      if (hour >= 5 && hour <= 9) {
        history.morningCommits += 1;
      }
      if (args.join(' ').toLowerCase().includes('fix')) {
        history.fixCommits += 1;
      }
      history.lastCommitTime = new Date().toISOString();

    } else if (command === 'push') {
      condition.luster = Math.min(cfg.LUSTER.MAX, condition.luster + cfg.LUSTER.RECOVERY);
      actionMessage = '✨ ツヤが出た！ (Luster UP)';
      history.lastPushTime = new Date().toISOString();

    } else if (command === 'starve') {
      condition.satiety = Math.max(0, condition.satiety - cfg.DEBUG.DECREASE_AMOUNT);
      actionMessage = '💀 お腹が空いてきた... (Satiety DOWN)';
    } else if (command === 'rust') {
      condition.luster = Math.max(0, condition.luster - cfg.DEBUG.DECREASE_AMOUNT);
      actionMessage = '🌫️ ツヤが失われた... (Luster DOWN)';
    }

    const newTitles = this.titleEngine.evaluateTitles(currentState, command);

    const updatedState: GiikuState = {
      ...currentState,
      condition,
      history,
      titles: newTitles,
      unlockedSkinIds: this.checkUnlockConditions(currentState)
    };

    this.stateStore.save(updatedState);
    
    if (!actionMessage && ['pull', 'checkout', 'branch', 'add'].includes(command)) {
      actionMessage = '👾 キャラクターはあなたの作業を見守っている...';
    }

    return { message: actionMessage, state: updatedState };
  }

  public refresh(): GiikuState {
    const currentState = this.stateStore.get();
    const stats = this.gitProvider.getStats();
    const cfg = GIIKU_CONFIG.CONDITION;

    let newSatiety = currentState.condition.satiety;
    let newLuster = currentState.condition.luster;

    const lastUpdate = new Date(currentState.lastUpdate).getTime();
    const now = new Date().getTime();
    const hoursPassed = (now - lastUpdate) / (1000 * 60 * 60);
    
    if (hoursPassed > 1) {
      newSatiety = Math.max(0, newSatiety - Math.floor(hoursPassed * cfg.SATIETY.DECAY_PER_HOUR));
      newLuster = Math.max(0, newLuster - Math.floor(hoursPassed * cfg.LUSTER.DECAY_PER_HOUR));
    }

    const lastUpdateDate = new Date(currentState.lastUpdate).toLocaleDateString();
    const nowDate = new Date().toLocaleDateString();
    let daysActive = currentState.daysActive;
    if (lastUpdateDate !== nowDate) {
      daysActive += 1;
    }

    const tempState: GiikuState = {
      ...currentState,
      totalCommits: stats.totalCommits,
      todayCommits: stats.todayCommits,
      lastUpdate: new Date().toISOString(),
      daysActive,
      condition: {
        ...currentState.condition,
        satiety: newSatiety,
        luster: newLuster,
      }
    };

    const updatedState: GiikuState = {
      ...tempState,
      unlockedSkinIds: this.checkUnlockConditions(tempState)
    };

    this.stateStore.save(updatedState);
    return updatedState;
  }

  public getState(): GiikuState {
    return this.stateStore.get();
  }

  public setSkin(skinId: string): void {
    const currentState = this.stateStore.get();
    this.stateStore.save({
      ...currentState,
      currentSkinId: skinId
    });
  }
}
