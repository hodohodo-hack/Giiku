import { ReactElement } from 'react';

export type Language = 'en' | 'ja';

export interface Condition {
  satiety: number;
  luster: number;
}

export interface ActionHistory {
  lastCommitTime?: string;
  lastPushTime?: string;
  commandCounts: Record<string, number>;
  morningCommits: number;
  fixCommits: number;
}

export interface GiikuState {
  condition: Condition;
  totalCommits: number;
  todayCommits: number; // Added
  lastUpdate: string;
  currentSkinId: string;
  daysActive: number;
  titles: string[];
  history: ActionHistory;
  language: Language;
}

export interface IGitStats {
  todayCommits: number;
  totalCommits: number;
  lastCommitHash?: string;
  userName: string;
}

export interface IGitProvider {
  getStats(): IGitStats;
}

export interface IStateStore {
  get(): GiikuState;
  save(state: GiikuState | Partial<GiikuState>): void;
}

export interface ICharacterRenderer {
  render(state: GiikuState): ReactElement;
}
