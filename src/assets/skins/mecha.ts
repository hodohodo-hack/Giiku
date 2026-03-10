import { SkinDefinition } from './index.js';

export const MechaSkin: SkinDefinition = {
  id: 'mecha',
  name: 'MECHA-GENUS',
  color: 'redBright',
  desc: {
    en: 'A machine built with robust special alloy. Equipped with heat sinks.',
    ja: '堅牢な特殊合金で組まれた機体。放熱板を備える。'
  },
  heads: [{ name: 'ANTENNA', pixels: ['      █      ', '    ◢███◣    '] }],
  bodies: [{ name: 'PLATE', pixels: [' ◢████████◣ ', ' █  ■    ■  █ ', ' █    ▀▀    █ ', ' ◥████████◤ '] }],
  feet: [{ name: 'CRAWLER', pixels: [' ▆▆▆▆▆▆▆▆▆▆ ', ' ◥████████◤ '] }],
  checkUnlock: (state) => state.totalCommits >= 10 // 10コミットで解放
};
