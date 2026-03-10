import { TitleDefinition } from './index.js';

export const CautiousTitle: TitleDefinition = {
  id: 'cautious',
  names: {
    en: 'Currently: Cautious🐢',
    ja: '現在：慎重派🐢'
  },
  isDynamic: true,
  check: (state) => {
    // diff が commit の2倍以上、かつ diff が5回以上
    const RATIO = 2;
    const MIN_DIFF = 5;
    const diffCount = state.history.commandCounts['diff'] || 0;
    const commitCount = state.history.commandCounts['commit'] || 0;
    return diffCount > commitCount * RATIO && diffCount > MIN_DIFF;
  }
};
