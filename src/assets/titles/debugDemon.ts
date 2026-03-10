import { TitleDefinition } from './index.js';

export const DebugDemonTitle: TitleDefinition = {
  id: 'debug-demon',
  names: {
    en: 'Debug Demon👹',
    ja: 'デバッグの鬼👹'
  },
  isDynamic: false,
  check: (state) => {
    // "fix" コミットが5回以上
    const THRESHOLD = 5;
    return state.history.fixCommits >= THRESHOLD;
  }
};
