import { ReactElement } from 'react';

// コンディション
export interface Condition {
  satiety: number;   // 満腹度 (commitで回復)
  luster: number;    // ツヤ (pushで上昇)
  intellect: number; // 賢さ (status/diff/log等で上昇)
}

// 行動履歴（称号判定などに使用）
export interface ActionHistory {
  lastCommitTime?: string;
  lastPushTime?: string;
  commandCounts: Record<string, number>; // { 'commit': 5, 'status': 10, ... }
  morningCommits: number; // 5:00 - 9:00 のコミット数
  fixCommits: number;     // "fix" が含まれるコミット数
}

// 永続化される状態
export interface GiikuState {
  condition: Condition;
  totalCommits: number;
  lastUpdate: string;
  currentSkinId: string;
  daysActive: number;
  titles: string[];       // [0] がメイン称号
  history: ActionHistory; // 履歴データ
}

// Gitプロバイダ（DI）
export interface IGitStats {
  todayCommits: number;
  totalCommits: number;
  lastCommitHash?: string;
  userName: string;
}

export interface IGitProvider {
  getStats(): IGitStats;
}

// データ保存プロバイダ（DI）
export interface IStateStore {
  get(): GiikuState;
  save(state: GiikuState | Partial<GiikuState>): void;
}

// キャラクター描画プロバイダ（DI）
export interface ICharacterRenderer {
  render(state: GiikuState): ReactElement;
}
