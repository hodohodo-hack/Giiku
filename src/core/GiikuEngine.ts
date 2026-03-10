import { GiikuState, IGitProvider, IStateStore } from '../types.js';
import { TitleEngine } from './TitleEngine.js';
import { GIIKU_CONFIG } from '../assets/config.js';
import { SKIN_DEFINITIONS, SkinDefinition } from '../assets/skins/definitions.js';

export interface ProcessResult {
  message: string;
  state: GiikuState;
  newSkins: string[];
  newTitles: string[];
}

export class GiikuEngine {
  private titleEngine: TitleEngine;

  constructor(
    private stateStore: IStateStore,
    private gitProvider: IGitProvider
  ) {
    this.titleEngine = new TitleEngine();
  }

  // 解放条件のチェックと新しく解放されたもののリストを返す
  private checkUnlockConditions(state: GiikuState): { unlockedIds: string[], newlyUnlockedNames: string[] } {
    const newlyUnlockedNames: string[] = [];
    const currentUnlockedIds = new Set(state.unlockedSkinIds);
    const lang = state.language || 'en';

    for (const skin of SKIN_DEFINITIONS) {
      if (!currentUnlockedIds.has(skin.id) && skin.checkUnlock(state)) {
        currentUnlockedIds.add(skin.id);
        newlyUnlockedNames.push(skin.name);
      }
    }

    return { 
      unlockedIds: Array.from(currentUnlockedIds), 
      newlyUnlockedNames 
    };
  }

  public getAvailableSkins(godMode = false): SkinDefinition[] {
    if (godMode) return SKIN_DEFINITIONS;
    const state = this.stateStore.get();
    return SKIN_DEFINITIONS.filter(s => state.unlockedSkinIds.includes(s.id));
  }

  public processHook(args: string[]): ProcessResult | null {
    if (args.length === 0) return null;
    
    const command = args[0];
    const prevState = this.refresh();
    const currentState = { ...prevState }; // refresh後の最新状態
    
    const history = currentState.history;
    const condition = currentState.condition;
    const cfg = GIIKU_CONFIG.CONDITION;
    
    history.commandCounts[command] = (history.commandCounts[command] || 0) + 1;

    let actionMessage = '';

    if (command === 'commit') {
      condition.satiety = Math.min(cfg.SATIETY.MAX, condition.satiety + cfg.SATIETY.RECOVERY);
      actionMessage = '🍔 満腹度が回復した！ (Satiety UP)';
      const hour = new Date().getHours();
      if (hour >= 5 && hour <= 9) history.morningCommits += 1;
      if (args.join(' ').toLowerCase().includes('fix')) history.fixCommits += 1;
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

    // 称号判定
    const newTitles = this.titleEngine.evaluateTitles(currentState, command);
    const newlyEarnedTitles = newTitles.filter(t => !prevState.titles.includes(t));

    // スキンアンロック判定
    const { unlockedIds, newlyUnlockedNames } = this.checkUnlockConditions(currentState);

    const updatedState: GiikuState = {
      ...currentState,
      condition,
      history,
      titles: newTitles,
      unlockedSkinIds: unlockedIds
    };

    this.stateStore.save(updatedState);
    
    if (!actionMessage && ['pull', 'checkout', 'branch', 'add'].includes(command)) {
      actionMessage = '👾 キャラクターはあなたの作業を見守っている...';
    }

    return { 
      message: actionMessage, 
      state: updatedState,
      newSkins: newlyUnlockedNames,
      newTitles: newlyEarnedTitles
    };
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
      condition: { ...currentState.condition, satiety: newSatiety, luster: newLuster }
    };

    const { unlockedIds } = this.checkUnlockConditions(tempState);
    const updatedState = { ...tempState, unlockedSkinIds: unlockedIds };

    this.stateStore.save(updatedState);
    return updatedState;
  }

  public getState(): GiikuState { return this.stateStore.get(); }
  public setSkin(skinId: string): void {
    const currentState = this.stateStore.get();
    this.stateStore.save({ ...currentState, currentSkinId: skinId });
  }
}
