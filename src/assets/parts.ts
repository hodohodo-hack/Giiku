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
      }
    ],
    feet: [
      { name: 'FLUID-BASE', pixels: [' ◢████████◣ ', ' ◥████████◤ '] }
    ]
  },
  {
    id: 'mecha',
    name: 'MECHA-GENUS',
    color: 'redBright',
    desc: 'A machine built with robust special alloy. Equipped with heat sinks.',
    heads: [
      { name: 'ANTENNA-S',  pixels: ['      █      ', '    ◢███◣    '] },
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
      }
    ],
    feet: [
      { name: 'HYDRAULIC', pixels: ['   ▰▰    ▰▰   ', '   ◥█    █◤   '] }
    ]
  }
];

export const COLORS = ['cyanBright', 'greenBright', 'magentaBright', 'yellowBright', 'redBright', 'white', 'blueBright'];
