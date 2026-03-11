import { SkinDefinition } from './index.js';

export const OnigiriSkin: SkinDefinition = {
  id: 'onigiri',
  name: 'DEBUKAWA-ONIGIRI',
  color: 'white',
  desc: { en: 'A mysterious carbohydrate consisting of white rice and seaweed.', ja: '白米と海苔から成る神秘の炭水化物。あなたが愛した真の「でぶかわ」の姿。' },
  heads: [
    {
      name: 'SHORT-ROUND-TOP',
      pixels: [
        [ {c: 'white', t: '██████'} ],
        [ {c: 'white', t: '██████████'} ],
        [ {c: 'white', t: '██████████████'} ]
      ]
    },
    {
      name: 'UME-TOP',
      pixels: [
        [ {c: 'white', t: '██'}, {c: 'red', t: '██'}, {c: 'white', t: '██'} ],
        [ {c: 'white', t: '██████████'} ],
        [ {c: 'white', t: '██████████████'} ]
      ]
    },
    {
      name: 'EBI-TEN-TOP',
      pixels: [
        [ {c: 'white', t: '█'}, {c: 'red', t: '████'}, {c: 'white', t: '█'} ],
        [ {c: 'white', t: '██'}, {c: 'yellow', t: '██████'}, {c: 'white', t: '██'} ],
        [ {c: 'white', t: '██████████████'} ]
      ]
    },
    {
      name: 'BURGER-BUN-TOP',
      pixels: [
        [ {c: 'yellow', t: '██████'} ],
        [ {c: 'yellow', t: '██████████'} ],
        [ {c: 'green', t: '██████████████'} ]
      ]
    }
  ],
  bodies: [
    {
      name: 'DOT-EYES',
      pixels: [
        [ {c: 'white', t: '█████'}, {c: 'black', t: '█'}, {c: 'white', t: '████'}, {c: 'black', t: '█'}, {c: 'white', t: '█████'} ],
        [ {c: 'white', t: '██████████████████'} ],
        [ {c: 'white', t: '████████████████████'} ]
      ]
    },
    {
      name: 'BLUSH-EYES',
      pixels: [
        [ {c: 'white', t: '█████'}, {c: 'black', t: '█'}, {c: 'white', t: '████'}, {c: 'black', t: '█'}, {c: 'white', t: '█████'} ],
        [ {c: 'white', t: '████'}, {c: 'red', t: '██'}, {c: 'white', t: '██████'}, {c: 'red', t: '██'}, {c: 'white', t: '████'} ],
        [ {c: 'white', t: '████████████████████'} ]
      ]
    },
    {
      name: 'NINJA-MASK',
      pixels: [
        [ {c: 'white', t: '█████'}, {c: 'black', t: '█'}, {c: 'white', t: '████'}, {c: 'black', t: '█'}, {c: 'white', t: '█████'} ],
        [ {c: 'black', t: '██████████████████'} ],
        [ {c: 'black', t: '████████████████████'} ]
      ]
    }
  ],
  feet: [
    {
      name: 'FAT-NORI',
      pixels: [
        [ {c: 'white', t: '███'}, {c: 'black', t: '████████████████'}, {c: 'white', t: '███'} ],
        [ {c: 'white', t: '█'}, {c: 'black', t: '██████████████████████'}, {c: 'white', t: '█'} ],
        [ {c: 'black', t: '████████████████████████'} ],
        [ {c: 'black', t: '████████████████████'} ]
      ]
    },
    {
      name: 'BURGER-BOTTOM',
      pixels: [
        [ {c: 'gray', t: '██████████████████████'} ],
        [ {c: 'yellow', t: '████████████████████████'} ],
        [ {c: 'yellow', t: '████████████████████████'} ],
        [ {c: 'yellow', t: '████████████████████'} ]
      ]
    },
    {
      name: 'SKATEBOARD',
      pixels: [
        [ {c: 'white', t: '███'}, {c: 'black', t: '████████████████'}, {c: 'white', t: '███'} ],
        [ {c: 'white', t: '█'}, {c: 'black', t: '██████████████████████'}, {c: 'white', t: '█'} ],
        [ {c: 'magenta', t: '████████████████████████'} ],
        [ {c: 'black', t: '██'}, {c: 'white', t: '████████████████'}, {c: 'black', t: '██'} ]
      ]
    }
  ],
  checkUnlock: () => true
};
