/**
 * 種族固有パーツ定義 (復元版 v10.0)
 * 各種族のコンセプトに忠実なパーツのみを収録。
 * すべて幾何学ブロックで構成し、安っぽさを排除しています。
 */

export const BASES = [
  {
    id: 'slime',
    name: 'SLIME-GENUS',
    color: 'cyanBright',
    desc: '魔法の雫から生まれた生命体。粘性の高い体を持つ。',
    heads: [
      { name: 'DROP-POINT', pixels: ['      ◢◣      ', '    ◢██◣    '] },
      { name: 'WITCH-HOOD',  pixels: ['     ◢█◣     ', '   ◢███◣    ', ' ◢███████◣  '] },
      { name: 'CROWN-DOTS', pixels: ['  ■  ■  ■   ', '  ███████   '] }
    ],
    bodies: [
      { 
        name: 'JIGGLY-BODY', 
        pixels: [
          '  ◢██████◣  ', 
          '◢██  ■  ■  ██◣', 
          '██    ▄▄    ██',
          '◥████████◤  '
        ] 
      },
      { 
        name: 'SQUARE-BODY', 
        pixels: [
          ' ◢████████◣ ', 
          ' ██  ■  ■  ██ ', 
          ' ██   ■■   ██ ',
          ' ◥████████◤ '
        ] 
      }
    ],
    feet: [
      { name: 'FLUID-BASE', pixels: [' ◢████████◣ ', ' ◥████████◤ '] },
      { name: 'TRIPLE-DRIP', pixels: ['  ◢█◣ ◢█◣ ◢█◣ ', '  ◥◤  ◥◤  ◥◤  '] },
      { name: 'TINY-STUB',  pixels: ['    ◢◣  ◢◣    '] }
    ]
  },
  {
    id: 'mecha',
    name: 'MECHA-GENUS',
    color: 'redBright',
    desc: '堅牢な特殊合金で組まれた機体。放熱板を備える。',
    heads: [
      { name: 'ANTENNA-S',  pixels: ['      █      ', '    ◢███◣    '] },
      { name: 'HEAVY-HORN', pixels: ['  ◢█    █◣  ', '  ████████  '] },
      { name: 'VISOR-UNIT', pixels: [' ◢████████◣ ', ' ◥████████◤ '] }
    ],
    bodies: [
      { 
        name: 'PLATE-ARMOR', 
        pixels: [
          ' ◢████████◣ ', 
          ' █  ■    ■  █ ', 
          ' █    ▀▀    █ ',
          ' ◥████████◤ '
        ] 
      },
      { 
        name: 'CORE-REACTOR', 
        pixels: [
          ' ◢██▇▇▇▇██◣ ', 
          ' █▇  ■  ■  ▇█ ', 
          ' █▇   ▄▄   ▇█ ',
          ' ◥██▇▇▇▇██◤ '
        ] 
      }
    ],
    feet: [
      { name: 'CRAWLER',   pixels: [' ▆▆▆▆▆▆▆▆▆▆ ', ' ◥████████◤ '] },
      { name: 'HYDRAULIC', pixels: ['   ▰▰    ▰▰   ', '   ◥█    █◤   '] },
      { name: 'THRUSTER',  pixels: ['    ◢▇▇◣    ', '    ◥▆▆◤    '] }
    ]
  },
  {
    id: 'phantom',
    name: 'GHOST-GENUS',
    color: 'magentaBright',
    desc: '実体を持たないエネルギーの残滓。空間を歪める。',
    heads: [
      { name: 'BLOCK-HALO', pixels: ['   ◢▇▇▇▇◣   ', '   ◥▇▇▇▇◤   '] },
      { name: 'VOID-FLAME', pixels: ['      ◢◣      ', '     ◢██◣     ', '     ◥██◤     '] }
    ],
    bodies: [
      { 
        name: 'WISP-CORE', 
        pixels: [
          '    ◢██◣    ', 
          '  ◢█ ■  ■ █◣  ', 
          '  ██  ▄▄  ██  ', 
          '    ◥██◤    '
        ] 
      },
      { 
        name: 'MIST-WRAP', 
        pixels: [
          '   ◢▇▇▇▇◣   ', 
          '  ◢▇ ■  ■ ▇◣  ', 
          '  ◥▇  ■■  ▇◤  '
        ] 
      }
    ],
    feet: [
      { name: 'GHOST-TAIL', pixels: ['    ◥████◤    ', '     ◥██◤     ', '      ◥◤      '] },
      { name: 'WAVE-BOTTOM', pixels: [' ◥◣◢◤◥◣◢◤◥◣ ', '  ◥◤  ◥◤  ◥◤ '] }
    ]
  },
  {
    id: 'forest',
    name: 'PLANT-GENUS',
    color: 'greenBright',
    desc: '森の守護者。季節によってその姿を変える。',
    heads: [
      { name: 'DUAL-LEAF', pixels: ['  ◢◣      ◢◣ ', '  ◥██◣  ◢██◤ '] },
      { name: 'THORN-CROWN', pixels: ['  ◢◣  ◢◣  ◢◣ ', '  ◥██████◤  '] }
    ],
    bodies: [
      { 
        name: 'LOG-CHEST', 
        pixels: [
          '  ◢██████◣  ', 
          ' ███ ■  ■ ███ ', 
          ' ███  ■■  ███ ', 
          '  ◥██████◤  '
        ] 
      },
      { 
        name: 'VINE-BODY', 
        pixels: [
          '   ◢▇▇▇▇◣   ', 
          ' ◢▇▇ ■  ■ ▇▇◣ ', 
          '  ◥▇  ▄▄  ▇◤  '
        ] 
      }
    ],
    feet: [
      { name: 'ROOT-BASE', pixels: ['    █    █    ', '   ◢█◣  ◢█◣   '] },
      { name: 'WIDE-LEAF', pixels: ['  ◢██◣  ◢██◣  ', '  ◥██◤  ◥██◤  '] }
    ]
  }
];

export const COLORS = ['cyanBright', 'greenBright', 'magentaBright', 'yellowBright', 'redBright', 'white', 'blueBright'];
