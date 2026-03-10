import Conf from 'conf';
import { GiikuState, IStateStore } from '../types.js';

export class ConfStateStore implements IStateStore {
  private config: Conf<GiikuState>;

  constructor() {
    this.config = new Conf<GiikuState>({
      projectName: 'giiku-tui',
      defaults: {
        condition: { satiety: 80, luster: 50, intellect: 30 },
        totalCommits: 0,
        lastUpdate: new Date().toISOString(),
        currentSkinId: 'slime',
        daysActive: 1,
        titles: ['Novice Engineer'],
        history: {
          commandCounts: {},
          morningCommits: 0,
          fixCommits: 0
        },
        language: 'en' // Default to English
      }
    });
  }

  get(): GiikuState {
    return this.config.store;
  }

  save(state: GiikuState | Partial<GiikuState>): void {
    const current = this.config.store;
    this.config.set({ ...current, ...state });
  }
}
