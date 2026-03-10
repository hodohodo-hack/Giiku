export interface Part {
  name: string;
  pixels: string[];
}

export interface Base {
  id: string;
  name: string;
  color: string;
  desc: string;
  heads: Part[];
  bodies: Part[];
  feet: Part[];
}

export const BASES: Base[] = [
  {
    id: 'slime',
    name: 'SLIME-GENUS',
    color: 'cyanBright',
    desc: 'A life form born from a magic droplet. Has a highly viscous body.',
    heads: [{ name: 'DROP', pixels: ['      ◢◣      ', '    ◢██◣    '] }],
    bodies: [{ name: 'BODY', pixels: ['  ◢██████◣  ', '◢██  ■  ■  ██◣', '██    ▄▄    ██', '◥████████◤  '] }],
    feet: [{ name: 'FOOT', pixels: [' ◢████████◣ ', ' ◥████████◤ '] }]
  },
  {
    id: 'mecha',
    name: 'MECHA-GENUS',
    color: 'redBright',
    desc: 'A machine built with robust special alloy. Equipped with heat sinks.',
    heads: [{ name: 'ANTENNA', pixels: ['      █      ', '    ◢███◣    '] }],
    bodies: [{ name: 'PLATE', pixels: [' ◢████████◣ ', ' █  ■    ■  █ ', ' █    ▀▀    █ ', ' ◥████████◤ '] }],
    feet: [{ name: 'CRAWLER', pixels: [' ▆▆▆▆▆▆▆▆▆▆ ', ' ◥████████◤ '] }]
  },
  {
    id: 'phantom',
    name: 'GHOST-GENUS',
    color: 'magentaBright',
    desc: 'A phantom made of pure energy. It distorts the space around it.',
    heads: [{ name: 'HALO', pixels: ['   ◢▇▇▇▇◣   ', '   ◥▇▇▇▇◤   '] }],
    bodies: [{ name: 'CORE', pixels: ['    ◢██◣    ', '  ◢█ ■  ■ █◣  ', '  ██  ▄▄  ██  ', '    ◥██◤    '] }],
    feet: [{ name: 'TAIL', pixels: ['    ◥████◤    ', '     ◥██◤     ', '      ◥◤      '] }]
  },
  {
    id: 'forest',
    name: 'PLANT-GENUS',
    color: 'greenBright',
    desc: 'Guardian of the forest. Its appearance changes with the seasons.',
    heads: [{ name: 'LEAF', pixels: ['  ◢◣      ◢◣ ', '  ◥██◣  ◢██◤ '] }],
    bodies: [{ name: 'LOG', pixels: ['  ◢██████◣  ', ' ███ ■  ■ ███ ', ' ███  ■■  ███ ', '  ◥██████◤  '] }],
    feet: [{ name: 'ROOT', pixels: ['    █    █    ', '   ◢█◣  ◢█◣   '] }]
  }
];

export const COLORS = ['cyanBright', 'greenBright', 'magentaBright', 'yellowBright', 'redBright', 'white', 'blueBright'];
