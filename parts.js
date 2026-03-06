/**
 * ベース固有パーツ定義 (v7.0)
 * 各ベースキャラクターが自分専用のパーツリストを持ちます。
 */

export const BASES = [
  {
    id: 'slime',
    name: 'SLIME-GENUS',
    color: 'cyanBright',
    desc: '弾力性のある電脳生物。形態変化に富む。',
    heads: [
      { name: 'STANDARD', pixels: ['              '] },
      { name: 'ROYAL-CROWN', pixels: ['  █  █  █   ', '  ███████   '] },
      { name: 'WITCH-HOOD', pixels: ['    ◢██◣      ', '   ◢████◣     ', '  ━━━━━━━    '] }
    ],
    bodies: [
      { name: 'SLIME-CORE', pixels: ['  ◢████◣    ', '◢██      ██◣', '██  ■  ■  ██', '◥████████◤  '] },
      { name: 'FLUID-WRAPPED', pixels: ['  ◢▇▇▇▇◣    ', '◢▇      ▇▇◣', '▇▇  ■  ■  ▇▇', '◥▇▇▇▇▇▇▇▇◤  '] }
    ],
    feet: [
      { name: 'TENTACLES', pixels: ['    v v v   ', '     v v     '] },
      { name: 'FLUID-DROP', pixels: ['     ◢◣     ', '     ◥◤     '] }
    ]
  },
  {
    id: 'mecha',
    name: 'MECHA-GENUS',
    color: 'redBright',
    desc: '堅牢な装甲を持つ戦闘ドロイド。高出力が特徴。',
    heads: [
      { name: 'SENSOR-EYE', pixels: ['      █      ', '    ◢███◣    '] },
      { name: 'COMMAND-HORN', pixels: ['    ◢▇▇▇    ', '   ◢████    '] },
      { name: 'VALKYRIE-FIN', pixels: [' ◢◣      ◢◣ ', ' ◥████████◤ '] }
    ],
    bodies: [
      { name: 'PLATE-ARMOR', pixels: [' ◢██████◣   ', ' ██████████ ', ' ██  ■■  ██ ', ' ◥████████◤ '] },
      { name: 'BOLTED-FRAME', pixels: [' ┏━━━━━━┓   ', ' ┃  ■  ■ ┃   ', ' ┃       ┃   ', ' ┗━━━━━━┛   '] }
    ],
    feet: [
      { name: 'TANK-TREAD', pixels: ['  ▆▆▆▆▆▆▆▆  '] },
      { name: 'HYDRAULIC', pixels: ['   ▰▰  ▰▰   '] },
      { name: 'BOOSTER', pixels: ['    ▲  ▲    ', '    v  v    '] }
    ]
  },
  {
    id: 'phantom',
    name: 'GHOST-GENUS',
    color: 'magentaBright',
    desc: '次元の狭間に住む生命体。物理攻撃が効かない。',
    heads: [
      { name: 'HALO-RING', pixels: ['    .---.    ', '   (     )   '] },
      { name: 'VOID-FLAME', pixels: ['     ◢◣     ', '    ◢██◣    ', '    ◥██◤    '] }
    ],
    bodies: [
      { name: 'ENERGY-WRAPS', pixels: ['   ◢▇▇▇◣    ', '  ◢█ ■ ■ █◣  ', '  ████████  ', '   ◥▇▇▇▇◤   '] },
      { name: 'ETHEREAL-CORE', pixels: ['    ◢██◣    ', '  ◢█ ■ █◣  ', '    ◥██◤    '] }
    ],
    feet: [
      { name: 'MIST-TAIL', pixels: ['     v v     ', '      v      '] },
      { name: 'WAVE-FORM', pixels: ['  ~ ~ ~ ~ ~  '] }
    ]
  },
  {
    id: 'forest',
    name: 'PLANT-GENUS',
    color: 'greenBright',
    desc: '植物と機械が共生するドロイド。自己修復が可能。',
    heads: [
      { name: 'SPROUT', pixels: ['      🌱      ', '      █      '] },
      { name: 'FLOWER', pixels: ['    ◢█◣     ', '    ◥█◤     '] }
    ],
    bodies: [
      { name: 'VINE-CORE', pixels: ['  ◢████◣    ', ' ███  ███   ', '  ◥████◤    '] },
      { name: 'WOODEN-SHELL', pixels: ['  ◢▇▇▇▇◣    ', ' ▇▇ ■  ■ ▇▇  ', '  ◥▇▇▇▇◤    '] }
    ],
    feet: [
      { name: 'ROOTS', pixels: ['    █  █    ', '   ◢█  █◣   '] },
      { name: 'LEAF-PAD', pixels: ['  ◢▇◣◢▇◣  '] }
    ]
  }
];

export const COLORS = ['cyanBright', 'greenBright', 'magentaBright', 'yellowBright', 'redBright', 'white', 'blueBright'];
