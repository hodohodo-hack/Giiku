import { SkinDefinition } from './index.js';

export const HamburgerSkin: SkinDefinition = {
  id: 'hamburger',
  name: 'DEBUKAWA-BURGER',
  color: 'yellow',
  desc: { en: 'The ultimate cute burger that inherited the soul of onigiri.', ja: 'おにぎりの魂を受け継いだ、究極のでぶかわハンバーガー。' },
  heads: [
    {
      name: 'BASIC-BUN',
      pixels: [
        [ {c: 'yellow', t: '█████████'} ],
        [ {c: 'yellow', t: '█████████████'} ],
        [ {c: 'green',  t: '█████████████████'} ],
        [ {c: 'red',    t: '█████████████████'} ]
      ]
    },
    {
      name: 'TSUKIMI-BUN',
      pixels: [
        [ {c: 'yellow', t: '█████████'} ],
        [ {c: 'yellow', t: '█████████████'} ],
        [ {c: 'white', t: '████'}, {c: 'yellow', t: '█████████'}, {c: 'white', t: '████'} ],
        [ {c: 'magenta', t: '█████████████████'} ]
      ]
    },
    {
      name: 'CROWN-BUN',
      pixels: [
        [ {c: 'yellow', t: '███  ███  ███'} ],
        [ {c: 'yellow', t: '███████████'} ],
        [ {c: 'yellow', t: '█████████████'} ],
        [ {c: 'yellow', t: '█████████████████'} ]
      ]
    }
  ],
  bodies: [
    {
      name: 'NORMAL-FACE',
      pixels: [
        [ {c: 'white', t: '███████████████'} ],
        [ {c: 'white', t: '███'}, {c: 'black', t: '██'}, {c: 'white', t: '█████'}, {c: 'black', t: '██'}, {c: 'white', t: '███'} ],
        [ {c: 'white', t: '███'}, {c: 'black', t: '██'}, {c: 'white', t: '█████'}, {c: 'black', t: '██'}, {c: 'white', t: '███'} ],
        [ {c: 'white', t: '█████████████████'} ]
      ]
    },
    {
      name: 'NINJA-FACE',
      pixels: [
        [ {c: 'white', t: '███████████████'} ],
        [ {c: 'white', t: '███'}, {c: 'black', t: '██'}, {c: 'white', t: '█████'}, {c: 'black', t: '██'}, {c: 'white', t: '███'} ],
        [ {c: 'black', t: '████'}, {c: 'white', t: '█████████'}, {c: 'black', t: '████'} ],
        [ {c: 'black', t: '█████████████████'} ]
      ]
    }
  ],
  feet: [
    {
      name: 'BASIC-BOTTOM',
      pixels: [
        [ {c: 'yellow', t: '█████████████████'} ],
        [ {c: 'gray',   t: '█████████████████'} ],
        [ {c: 'yellow', t: '███████████████'} ],
        [ {c: 'yellow', t: '███████████'} ]
      ]
    },
    {
      name: 'EBI-BOTTOM',
      pixels: [
        [ {c: 'red', t: '█ '}, {c: 'yellow', t: '█████████████████'}, {c: 'red', t: ' █'} ],
        [ {c: 'gray',   t: '█████████████████'} ],
        [ {c: 'yellow', t: '███████████████'} ],
        [ {c: 'yellow', t: '███████████'} ]
      ]
    },
    {
      name: 'DOUBLE-BOTTOM',
      pixels: [
        [ {c: 'yellow', t: '█████████████████'} ],
        [ {c: 'gray',   t: '█████████████████'} ],
        [ {c: 'yellow', t: '█████████████████'} ],
        [ {c: 'gray',   t: '█████████████████'} ],
        [ {c: 'yellow', t: '███████████████'} ],
        [ {c: 'yellow', t: '███████████'} ]
      ]
    }
  ],
  checkUnlock: () => true
};
