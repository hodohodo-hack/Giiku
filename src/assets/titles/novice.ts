import { TitleDefinition } from './index.js';

export const NoviceTitle: TitleDefinition = {
  id: 'novice',
  names: {
    en: 'Novice Engineer',
    ja: '新米エンジニア'
  },
  isDynamic: false,
  check: () => true // 常に獲得可能
};
