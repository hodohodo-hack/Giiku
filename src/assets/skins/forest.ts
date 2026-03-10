import { SkinDefinition } from './index.js';

export const ForestSkin: SkinDefinition = {
  id: 'forest',
  name: 'PLANT-GENUS',
  color: 'greenBright',
  desc: {
    en: 'Guardian of the forest. Its appearance changes with the seasons.',
    ja: '森の守護者。季節によってその姿を変える。'
  },
  heads: [{ name: 'LEAF', pixels: ['  ◢◣      ◢◣ ', '  ◥██◣  ◢██◤ '] }],
  bodies: [{ name: 'LOG', pixels: ['  ◢██████◣  ', ' ███ ■  ■ ███ ', ' ███  ■■  ███ ', '  ◥██████◤  '] }],
  feet: [{ name: 'ROOT', pixels: ['    █    █    ', '   ◢█◣  ◢█◣   '] }],
  checkUnlock: (state) => state.daysActive >= 3 // 活動3日で解放
};
