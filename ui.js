import React, { useState } from 'react';
import { render, Text, Box, useInput, useApp } from 'ink';

// --- (1) HEAD: 被り物 (シルエットのトップを支配) ---
const HEADS = [
  { name: 'NORMAL', render: (c) => null },
  { 
    name: 'DINO-MASK', 
    render: (c) => React.createElement(
      Box, { flexDirection: 'column', alignItems: 'center', marginBottom: -1 },
      React.createElement(Text, { color: c, bold: true }, '  ◢▇▇▇◣  '),
      React.createElement(Text, { color: c, bold: true }, ' ◢█▼▼▼█◣ ') 
    )
  },
  { 
    name: 'SAMURAI-KABUTO', 
    render: (c) => React.createElement(
      Box, { flexDirection: 'column', alignItems: 'center', marginBottom: -1 },
      React.createElement(Text, { color: 'yellow', bold: true }, '   ◢◣   '),
      React.createElement(Text, { color: c, bold: true }, ' ◢█████◣ ')
    )
  },
  { 
    name: 'WITCH-HAT', 
    render: (c) => React.createElement(
      Box, { flexDirection: 'column', alignItems: 'center', marginBottom: -1 },
      React.createElement(Text, { color: c, bold: true }, '   ▲   '),
      React.createElement(Text, { color: c, bold: true }, '  ◢█◣  '),
      React.createElement(Text, { color: c, bold: true }, ' ━━━━━━━ ')
    )
  }
];

// --- (2) BODY-WRAP: 胴体の外装 ---
const BODIES = [
  { 
    name: 'DEFAULT', px: 2, py: 0, 
    l: React.createElement(Text, {}, '      '), 
    r: React.createElement(Text, {}, '      ') 
  },
  { 
    name: 'HOTDOG-BUNS', 
    px: 1, py: 0, 
    l: React.createElement(Text, { color: 'yellow' }, ' ◢\n █\n ◥'), 
    r: React.createElement(Text, { color: 'yellow' }, '◣ \n█ \n◤ ') 
  },
  { 
    name: 'GIGA-WINGS', 
    px: 2, py: 0, 
    l: React.createElement(Text, { color: 'magentaBright' }, '◢▇\n▇ \n◥▇'), 
    r: React.createElement(Text, { color: 'magentaBright' }, '▇◣\n ▇\n▇◤') 
  },
  { 
    name: 'SHOGUN-ARMOR', 
    px: 1, py: 0, 
    l: React.createElement(Text, { color: 'redBright' }, ' ◢█\n ◥█'), 
    r: React.createElement(Text, { color: 'redBright' }, '█◣ \n█◤ ') 
  }
];

// --- (3) FEET: 足元 ---
const FEET = [
  { name: 'NORMAL-FEET', val: '  ┛    ┗  ' },
  { name: 'HEAVY-BOOTS', val: ' ▰▰    ▰▰ ' },
  { name: 'FLOAT-JET  ', val: '  v v v v  ' },
  { name: 'TANK-TREAD ', val: ' ▆▆▆▆▆▆▆▆ ' },
];

const COLORS = ['cyanBright', 'greenBright', 'magentaBright', 'yellowBright', 'redBright', 'white'];
const FACES = ['( • ◡ • )', '( ◕ ◡ ◕ )', '( > ◡ < )', '( 🕶️ _ 🕶️ )', '( ◉ ▿ ◉ )'];

/**
 * フルボディ・着せ替えエンジン (修正版)
 */
const App = () => {
  const { exit } = useApp();
  const [hIdx, setHIdx] = useState(0);
  const [bIdx, setBIdx] = useState(0);
  const [fIdx, setFIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [faceIdx, setFaceIdx] = useState(0);

  useInput((input) => {
    if (input === 'q') exit();
    if (input === '1') setHIdx(p => (p + 1) % HEADS.length);
    if (input === '2') setBIdx(p => (p + 1) % BODIES.length);
    if (input === '3') setFIdx(p => (p + 1) % FEET.length);
    if (input === '4') setCIdx(p => (p + 1) % COLORS.length);
    if (input === '5') setFaceIdx(p => (p + 1) % FACES.length);
  });

  const color = COLORS[cIdx];
  const head = HEADS[hIdx];
  const body = BODIES[bIdx];
  const foot = FEET[fIdx];

  return React.createElement(
    Box,
    { flexDirection: 'column', alignItems: 'center', padding: 1, width: 60, borderStyle: 'double', borderColor: 'gray' },
    
    React.createElement(
      Box, { marginBottom: 1 },
      React.createElement(Text, { color: 'yellow', bold: true }, '✨ Gi育: フルボディ・カスタムスタジオ ✨')
    ),

    React.createElement(
      Box,
      { 
        flexDirection: 'column', 
        alignItems: 'center', 
        height: 12, 
        justifyContent: 'center', 
        borderStyle: 'round',
        borderColor: 'dim',
        width: 54,
        marginBottom: 1
      },
      
      // HEAD
      head.render(color),

      // BODY
      React.createElement(
        Box, { flexDirection: 'row', alignItems: 'center' },
        body.l,
        React.createElement(
          Box, 
          { 
            borderStyle: 'round', 
            borderColor: color, 
            paddingX: body.px, 
            paddingY: body.py,
            minWidth: 10,
            alignItems: 'center'
          },
          React.createElement(Text, { color: 'white', bold: true }, FACES[faceIdx])
        ),
        body.r
      ),

      // FEET
      React.createElement(
        Box, { marginTop: -1 }, 
        React.createElement(Text, { color: color, bold: true }, foot.val)
      )
    ),

    // 操作パネル
    React.createElement(
      Box, 
      { flexDirection: 'column', width: 54, borderStyle: 'round', borderColor: 'cyan', paddingX: 2 },
      [
        { k: '1', l: 'HEAD-GEAR ', v: head.name },
        { k: '2', l: 'BODY-SUIT ', v: body.name },
        { k: '3', l: 'FOOT-WEAR ', v: foot.name },
        { k: '4', l: 'BASE-COLOR', v: color, c: color },
        { k: '5', l: 'FACE-EXPR ', v: 'Expression ' + (faceIdx + 1) },
      ].map(r => 
        React.createElement(
          Box, { key: r.k, justifyContent: 'space-between' },
          React.createElement(
            Box, {},
            React.createElement(Text, { color: 'cyan', bold: true }, `[${r.k}] `),
            React.createElement(Text, { color: 'white' }, r.l)
          ),
          React.createElement(Text, { color: r.c || 'gray', bold: !!r.c }, r.v)
        )
      ),
      React.createElement(
        Box, { justifyContent: 'center', marginTop: 1 },
        React.createElement(Text, { dimColor: true }, 'Press [q] to exit')
      )
    )
  );
};

render(React.createElement(App));
