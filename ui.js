import React, { useState } from 'react';
import { render, Text, Box, useInput, useApp } from 'ink';

// --- (3) メガ・オーグメント (巨大な外部パーツ) ---
const AUGMENTS = [
  { name: 'NONE', l: '      ', r: '      ' },
  { 
    name: 'GIGA-WINGS', 
    l: '  ◢█\n  ██\n  ◥█', 
    r: '█◣\n██\n█◤' 
  },
  { 
    name: 'MEGA-SHIELDS', 
    l: '┏━━┓\n┃  ┃\n┗━━┛', 
    r: '┏━━┓\n┃  ┃\n┗━━┛' 
  },
  { 
    name: 'ORBITAL-CORES', 
    l: ' ( ◯ )\n      \n ( ◯ )', 
    r: '( ◯ )\n     \n( ◯ )' 
  },
  { 
    name: 'THRUSTER-PACK', 
    l: ' ◢◤ \n◢◤  \n◥◣  ', 
    r: ' ◥◣ \n  ◥◣\n  ◢◤' 
  }
];

// --- (4) カラー・オーラ (属性と全体の雰囲気) ---
const COLORS = [
  { name: 'NEON-CYAN',  val: 'cyanBright',    aura: '⚡  NEON-STORM  ⚡' },
  { name: 'HELL-FIRE',  val: 'redBright',     aura: '🔥  INFERNO-MODE  🔥' },
  { name: 'BIO-HAZARD', val: 'greenBright',   aura: '🌿  TOXIC-PULSE  🌿' },
  { name: 'SUN-LIGHT',  val: 'yellowBright',  aura: '✨  SOLAR-FLARE  ✨' },
  { name: 'VOID-GHOST', val: 'white',         aura: '☁️  ECHO-GHOST  ☁️' },
  { name: 'DEEP-SEA',   val: 'blueBright',    aura: '🌊  TIDAL-FORCE  🌊' },
  { name: 'DARK-EYE',   val: 'magentaBright', aura: '👁️  PSYCHO-VOID  👁️' },
];

// --- (1) シャーシ (骨格) ---
const CHASSIS = [
  { 
    name: 'CORE-SHELL', 
    render: (color, expr) => React.createElement(
      Box, { borderStyle: 'round', borderColor: color, paddingX: 2, height: 3, alignItems: 'center', justifyContent: 'center' },
      React.createElement(Text, { color: 'white', bold: true }, expr)
    )
  },
  { 
    name: 'TITAN-TANK', 
    render: (color, expr) => React.createElement(
      Box, { flexDirection: 'column', alignItems: 'center' },
      React.createElement(
        Box, { borderStyle: 'bold', borderColor: color, paddingX: 3, height: 3, alignItems: 'center', justifyContent: 'center' },
        React.createElement(Text, { color: 'white', bold: true }, expr)
      ),
      React.createElement(Text, { color: color, bold: true }, '▄▄▄▄▄▄▄▄▄▄')
    )
  },
  { 
    name: 'STRIKE-FRAME', 
    render: (color, expr) => React.createElement(
      Box, { flexDirection: 'column', alignItems: 'center' },
      React.createElement(Text, { color: color, bold: true }, ' ◢▇◣ '),
      React.createElement(
        Box, { borderStyle: 'single', borderColor: color, paddingX: 1, height: 3, alignItems: 'center', justifyContent: 'center' },
        React.createElement(Text, { color: 'white', bold: true }, expr)
      ),
      React.createElement(Text, { color: color, bold: true }, ' ◥▇◤ ')
    )
  }
];

// --- (2) 顔モジュール ---
const VISORS = ['◕ ◡ ◕', ' [=] ', ' <o> ', ' ═══ ', ' (x) ', ' ::: ', ' ◈ ◈ '];

/**
 * ギガ・カスタマイザー アプリケーション
 */
const App = () => {
  const { exit } = useApp();
  const [cIdx, setCIdx] = useState(0); // Chassis
  const [vIdx, setVIdx] = useState(0); // Visor
  const [aIdx, setAIdx] = useState(0); // Augment
  const [colIdx, setColIdx] = useState(0); // Color

  useInput((input) => {
    if (input === 'q') exit();
    if (input === '1') setCIdx(p => (p + 1) % CHASSIS.length);
    if (input === '2') setVIdx(p => (p + 1) % VISORS.length);
    if (input === '3') setAIdx(p => (p + 1) % AUGMENTS.length);
    if (input === '4') setColIdx(p => (p + 1) % COLORS.length);
  });

  const activeColor = COLORS[colIdx];
  const activeChassis = CHASSIS[cIdx];
  const activeAug = AUGMENTS[aIdx];

  return React.createElement(
    Box,
    { 
      flexDirection: 'column', 
      alignItems: 'center', 
      borderStyle: 'single', 
      padding: 1, 
      width: 66, 
      borderColor: 'gray' 
    },
    
    // 現在の属性オーラ (カラー選択で変化)
    React.createElement(
      Box, { marginBottom: 1, width: '100%', justifyContent: 'center' },
      React.createElement(Text, { color: activeColor.val, bold: true, underline: true }, activeColor.aura)
    ),

    // メインプレビューエリア (シルエットの変化を強調)
    React.createElement(
      Box,
      { 
        width: 60, 
        height: 14, 
        borderStyle: 'double', 
        borderColor: activeColor.val, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 1 
      },
      
      React.createElement(
        Box, { alignItems: 'center' },
        // オーグメント左側 (巨大パーツ)
        React.createElement(Text, { color: activeColor.val, bold: true }, activeAug.l),
        
        // シャーシ (中央)
        React.createElement(
          Box, { marginX: 2, minWidth: 10, justifyContent: 'center' },
          activeChassis.render(activeColor.val, VISORS[vIdx])
        ),

        // オーグメント右側 (巨大パーツ)
        React.createElement(Text, { color: activeColor.val, bold: true }, activeAug.r)
      )
    ),

    // インタラクティブ・コントロールパネル
    React.createElement(
      Box,
      { 
        flexDirection: 'column', 
        width: 60, 
        borderStyle: 'round', 
        borderColor: 'cyan', 
        paddingX: 2 
      },
      [
        { key: '1', label: 'CHASSIS (Base Structure)', val: activeChassis.name },
        { key: '2', label: 'VISOR   (Face Module)  ', val: 'Variant ' + (vIdx + 1) },
        { key: '3', label: 'AUGMENT (Mega-Armor)   ', val: activeAug.name, c: activeColor.val },
        { key: '4', label: 'COLOR   (Aura Essence) ', val: activeColor.name, c: activeColor.val },
      ].map(row => 
        React.createElement(
          Box,
          { key: row.key, justifyContent: 'space-between' },
          React.createElement(Box, {}, 
            React.createElement(Text, { color: 'cyan', bold: true }, `[${row.key}] `),
            React.createElement(Text, { color: 'white' }, row.label)
          ),
          React.createElement(Text, { color: row.c || 'gray', bold: !!row.c }, row.val)
        )
      ),
      
      // 保存・終了ボタン
      React.createElement(
        Box,
        { justifyContent: 'center', marginTop: 1, borderStyle: 'bold', borderColor: 'red', paddingX: 3 },
        React.createElement(Text, { color: 'redBright', bold: true }, ' [q] SAVE CONFIGURATION ')
      )
    )
  );
};

render(React.createElement(App));
