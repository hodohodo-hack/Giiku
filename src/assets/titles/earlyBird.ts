import { TitleDefinition } from './index.js';

export const EarlyBirdTitle: TitleDefinition = {
  id: 'early-bird',
  names: {
    en: 'Early Bird Engineer🌅',
    ja: '早起きのエンジニア🌅'
  },
  isDynamic: false,
  check: (state) => {
    // 5:00 - 9:00 のコミットが3回以上
    const THRESHOLD = 3;
    return state.history.morningCommits >= THRESHOLD;
  }
};
