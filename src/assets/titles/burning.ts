import { TitleDefinition } from './index.js';

export const BurningTitle: TitleDefinition = {
  id: 'burning',
  names: {
    en: 'Currently: On Fire🔥',
    ja: '現在：炎上中🔥'
  },
  isDynamic: true,
  check: (state) => {
    // 深夜（22:00-3:00）に累計10回以上のコミット
    const START_HOUR = 22;
    const END_HOUR = 3;
    const MIN_COMMIT = 10;
    const currentHour = new Date().getHours();
    const commitCount = state.history.commandCounts['commit'] || 0;
    const isLateNight = currentHour >= START_HOUR || currentHour <= END_HOUR;
    return commitCount >= MIN_COMMIT && isLateNight;
  }
};
