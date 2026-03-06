import React, { useState } from 'react';
import { render, Text, Box, useInput, useApp } from 'ink';

/**
 * 共通のベースボディ (ドット絵)
 * 記号の密度を統一し、安っぽさを排除したソリッドなデザインです。
 */
const BASE_BODY = [
  '      ◢██◣      ',
  '    ◢██████◣    ',
  '  ◢██      ██◣  ',
  '  ██  ■  ■  ██  ',
  '  ██        ██  ',
  '  ◥████████◤  '
];

/**
 * スキン・バリエーション
 * 共通のボディに対して、頭部(top)や足元(bottom)のドットを差し替えます。
 */
const SKINS = [
  {
    name: 'BASIC SLIME',
    color: 'cyanBright',
    top:    ['                ', '                '],
    bottom: ['                '],
    desc: 'もっとも　ピュアな　スライム。'
  },
  {
    name: 'KING SLIME',
    color: 'yellowBright',
    top:    ['    █  █  █     ', '    ███████     '], // ドットの王冠
    bottom: ['                '],
    desc: 'すべてを　統べる　スライムの王。'
  },
  {
    name: 'WARRIOR SLIME',
    color: 'redBright',
    top:    ['     ◢██◣       ', '   ◢██████◣     '], // 重厚な兜
    bottom: [' ◢◤    █    ◥◣  '], // 剣の構え
    desc: '戦うことを　決意した　スライム。'
  },
  {
    name: 'WIZARD SLIME',
    color: 'magentaBright',
    top:    ['      ◢◣        ', '     ◢██◣       ', '    ◢████◣      '], // 魔法使いの帽子
    bottom: ['                '],
    desc: 'いにしえの　魔法を　あやつる。'
  },
  {
    name: 'HEAVY SLIME',
    color: 'greenBright',
    top:    ['                ', '                '],
    bottom: ['  ████████████  ', '  ◥██████████◤  '], // 重装甲のベース
    desc: '鉄壁の　守りを　ほこる　重装型。'
  }
];

/**
 * メインアプリケーション
 */
const App = () => {
  const { exit } = useApp();
  const [idx, setIdx] = useState(0);

  // キー入力処理
  useInput((input, key) => {
    if (input === 'q') exit();
    if (key.rightArrow || input === ' ') setIdx(p => (p + 1) % SKINS.length);
    if (key.leftArrow) setIdx(p => (p - 1 + SKINS.length) % SKINS.length);
  });

  const s = SKINS[idx];

  return React.createElement(
    Box,
    { 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: 2, 
      width: 60 
    },
    
    // 1. ピクセルアート描画エリア
    React.createElement(
      Box,
      { 
        flexDirection: 'column', 
        alignItems: 'center', 
        height: 12, 
        justifyContent: 'center',
        marginBottom: 1
      },
      
      // 頭部パーツ (SKIN固有)
      s.top.map((line, i) => 
        React.createElement(Text, { key: `t-${i}`, color: s.color, bold: true }, line)
      ),

      // 共通ボディ
      BASE_BODY.map((line, i) => 
        React.createElement(Text, { key: `b-${i}`, color: s.color, bold: true }, line)
      ),

      // 足元パーツ (SKIN固有)
      s.bottom.map((line, i) => 
        React.createElement(Text, { key: `bt-${i}`, color: s.color, bold: true }, line)
      )
    ),

    // 2. ステータス・メッセージ
    React.createElement(
      Box,
      { 
        flexDirection: 'column', 
        alignItems: 'center', 
        borderStyle: 'bold', 
        borderColor: s.color, 
        paddingX: 4, 
        paddingY: 1,
        width: 46
      },
      React.createElement(
        Text, 
        { color: s.color, bold: true, invert: true }, 
        `  ${s.name}  `
      ),
      React.createElement(
        Box, { marginTop: 1 },
        React.createElement(Text, { color: 'white' }, s.desc)
      )
    ),

    // 3. ナビゲーション
    React.createElement(
      Box, { marginTop: 1 },
      React.createElement(Text, { color: 'gray', dimColor: true }, ' [ SPACE / ARROWS ] でスキン変更 • [q] 終了 ')
    )
  );
};

render(React.createElement(App));
