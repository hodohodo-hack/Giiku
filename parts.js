/**
 * ピクセル・パーツ定義
 * █, ◢, ◥, ■ などのブロック記号のみを使用。
 * HEAD, BODY, FEET を組み合わせてカスタマイズ可能です。
 */

export const HEADS = [
  { name: 'NONE', pixels: ['              '] },
  { 
    name: 'ROYAL-CROWN', 
    pixels: [
      '  █  █  █   ', 
      '  ███████   '
    ] 
  },
  { 
    name: 'WITCH-HAT', 
    pixels: [
      '    ◢◣      ', 
      '   ◢██◣     ', 
      '  ━━━━━━    '
    ] 
  },
  { 
    name: 'VALKYRIE', 
    pixels: [
      ' ◢◣      ◢◣ ', 
      ' ◥████████◤ '
    ] 
  },
  { 
    name: 'DINO-HORN', 
    pixels: [
      '    ◢▇▇▇    ', 
      '   ◢████    '
    ] 
  }
];

export const BODIES = [
  { 
    name: 'SLIME-CORE', 
    pixels: [
      '  ◢████◣    ', 
      '◢██      ██◣', 
      '██  ■  ■  ██', 
      '◥████████◤  '
    ] 
  },
  { 
    name: 'MECHA-FRAME', 
    pixels: [
      ' ┏━━━━━━┓   ', 
      ' ┃  ■  ■ ┃   ', 
      ' ┃       ┃   ', 
      ' ┗━━━━━━┛   '
    ] 
  },
  { 
    name: 'HEAVY-ARMOR', 
    pixels: [
      ' ◢██████◣   ', 
      ' ██████████ ', 
      ' ██  ■■  ██ ', 
      ' ◥████████◤ '
    ] 
  },
  { 
    name: 'GHOST-WRAP', 
    pixels: [
      '   ◢▇▇▇◣    ', 
      '  ◢█ ■ ■ █◣  ', 
      '  ████████  ', 
      '   ◥▇▇▇▇◤   '
    ] 
  }
];

export const FEET = [
  { name: 'SLIM-LEGS', pixels: ['    █  █    '] },
  { name: 'HEAVY-BOOTS', pixels: ['   ▰▰  ▰▰   '] },
  { name: 'FLOAT-JET', pixels: ['    v v v   '] },
  { name: 'TANK-TREAD', pixels: ['  ▆▆▆▆▆▆▆▆  '] },
  { name: 'GHOST-TAIL', pixels: ['     v v     ', '      v      '] }
];

export const COLORS = ['cyanBright', 'greenBright', 'magentaBright', 'yellowBright', 'redBright', 'white', 'blueBright'];
