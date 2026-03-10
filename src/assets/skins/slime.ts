import { SkinDefinition } from './index.js';

export const SlimeSkin: SkinDefinition = {
  id: 'slime',
  name: 'SLIME-GENUS',
  color: 'cyanBright',
  desc: {
    en: 'A life form born from a magic droplet. Has a highly viscous body.',
    ja: '魔法の雫から生まれた生命体。粘性の高い体を持つ。'
  },
  heads: [{ name: 'DROP', pixels: ['      ◢◣      ', '    ◢██◣    '] }],
  bodies: [{ name: 'BODY', pixels: ['  ◢██████◣  ', '◢██  ■  ■  ██◣', '██    ▄▄    ██', '◥████████◤  '] }],
  feet: [{ name: 'FOOT', pixels: [' ◢████████◣ ', ' ◥████████◤ '] }],
  checkUnlock: () => true // 初めから解放
};
