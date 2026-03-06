import React, { useState } from 'react';
import { render, Text, Box, useInput, useApp } from 'ink';
import { HEADS, BODIES, FEET, COLORS } from './parts.js';

/**
 * カスタム・ピクセル・スタジオ
 * HEAD, BODY, FEET の各パーツを独立して組み替えられます。
 */
const App = () => {
  const { exit } = useApp();
  
  // 各部位のインデックスを管理
  const [hIdx, setHIdx] = useState(0);
  const [bIdx, setBIdx] = useState(0);
  const [fIdx, setFIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);

  // キー入力処理: 1(頭), 2(体), 3(足), 4(色) をサイクル
  useInput((input) => {
    if (input === 'q') exit();
    if (input === '1') setHIdx(p => (p + 1) % HEADS.length);
    if (input === '2') setBIdx(p => (p + 1) % BODIES.length);
    if (input === '3') setFIdx(p => (p + 1) % FEET.length);
    if (input === '4') setCIdx(p => (p + 1) % COLORS.length);
  });

  const color = COLORS[cIdx];

  return React.createElement(
    Box, 
    { 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: 2, 
      width: 60, 
      borderStyle: 'single', 
      borderColor: 'gray' 
    },
    
    // キャラクター表示エリア
    // 各パーツの pixels 配列を順番に描画して一つのキャラにする
    React.createElement(
      Box, 
      { 
        flexDirection: 'column', 
        alignItems: 'center', 
        height: 14, 
        justifyContent: 'center', 
        marginBottom: 1 
      },
      // 1. HEAD
      HEADS[hIdx].pixels.map((line, i) => 
        React.createElement(Text, { key: `h-${i}`, color, bold: true }, line)
      ),
      // 2. BODY
      BODIES[bIdx].pixels.map((line, i) => 
        React.createElement(Text, { key: `b-${i}`, color, bold: true }, line)
      ),
      // 3. FEET
      FEET[fIdx].pixels.map((line, i) => 
        React.createElement(Text, { key: `f-${i}`, color, bold: true }, line)
      )
    ),

    // カスタマイズ・コントロールパネル
    React.createElement(
      Box, 
      { 
        flexDirection: 'column', 
        width: 48, 
        borderStyle: 'round', 
        borderColor: 'cyan', 
        paddingX: 2 
      },
      [
        { key: '1', label: 'HEAD  (帽子/角) ', val: HEADS[hIdx].name },
        { key: '2', label: 'BODY  (胴体)    ', val: BODIES[bIdx].name },
        { key: '3', label: 'FEET  (足元)    ', val: FEET[fIdx].name },
        { key: '4', label: 'COLOR (メイン)  ', val: color, c: color },
      ].map(item => 
        React.createElement(
          Box, 
          { key: item.key, justifyContent: 'space-between' },
          React.createElement(
            Box, {},
            React.createElement(Text, { color: 'cyan', bold: true }, `[${item.key}] `),
            React.createElement(Text, { color: 'white' }, item.label)
          ),
          React.createElement(Text, { color: item.c || 'gray', bold: !!item.c }, item.val)
        )
      ),
      
      // フッター
      React.createElement(
        Box, { justifyContent: 'center', marginTop: 1 },
        React.createElement(Text, { dimColor: true }, 'Press [q] to exit studio')
      )
    )
  );
};

render(React.createElement(App));
