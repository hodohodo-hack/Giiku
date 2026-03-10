import { SkinDefinition } from './index.js';

export const PhantomSkin: SkinDefinition = {
  id: 'phantom',
  name: 'GHOST-GENUS',
  color: 'magentaBright',
  desc: {
    en: 'A phantom made of pure energy. It distorts the space around it.',
    ja: '実体を持たないエネルギーの残滓。空間を歪める。'
  },
  heads: [{ name: 'HALO', pixels: ['   ◢▇▇▇▇◣   ', '   ◥▇▇▇▇◤   '] }],
  bodies: [{ name: 'CORE', pixels: ['    ◢██◣    ', '  ◢█ ■  ■ █◣  ', '  ██  ▄▄  ██  '] }],
  feet: [{ name: 'TAIL', pixels: ['    ◥████◤    ', '     ◥██◤     ', '      ◥◤      '] }],
  checkUnlock: (state) => state.totalCommits >= 50 // 50コミットで解放
};
