import { TitleDefinition } from './index.js';

export const VeteranTitle: TitleDefinition = {
  id: 'veteran',
  names: {
    en: 'Veteran Warrior⚔️',
    ja: '百戦錬磨⚔️'
  },
  isDynamic: false,
  check: (state) => {
    // 累計コミットが100回以上
    const THRESHOLD = 100;
    return state.totalCommits >= THRESHOLD;
  }
};
