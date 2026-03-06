import React, { useState } from 'react';
import { render, Text, Box, useInput, useApp } from 'ink';

// --- カスタマイズ用のデータセット ---
const COLORS = ['cyanBright', 'greenBright', 'magentaBright', 'yellowBright', 'redBright', 'white'];
const EXPRESSIONS = ['◕ ◡ ◕', 'o _ o', '> _ <', '^ _ ^', '(◡‿◡)', '● ▿ ●', '◉ ▿ ◉'];
const ACCESSORIES = ['👑', '🎩', '🎀', '⚔️', '🍀', '🐱', '🕶️', '🎓', '🎁'];

/**
 * スライムコンポーネント
 */
const Slime = ({ bodyColor, expression, accessory, showAccessory }) => {
  return React.createElement(
    Box,
    { flexDirection: 'column', alignItems: 'center', paddingY: 1 },
    
    // 1. アクセサリー（頭の上）
    // 重ね合わせを止めて、高さを1行固定にすることで確実に表示させます
    React.createElement(
      Box, 
      { height: 1, justifyContent: 'center', marginBottom: 0 }, 
      React.createElement(Text, {}, showAccessory ? accessory : ' ')
    ),

    // 2. 体（丸みのある枠線）
    React.createElement(
      Box,
      {
        flexDirection: 'column',
        alignItems: 'center',
        paddingX: 1,
        borderStyle: 'round', 
        borderColor: bodyColor,
      },
      // 3. 表情
      React.createElement(
        Text, 
        { color: 'white', bold: true }, 
        expression
      )
    ),

    // 4. 足元の装飾
    React.createElement(
      Text,
      { color: bodyColor, dimColor: true },
      '  "  "  '
    )
  );
};

/**
 * メインアプリケーション（インタラクティブ版）
 */
const App = () => {
  const { exit } = useApp();
  const [colorIdx, setColorIdx] = useState(0);
  const [exprIdx, setExprIdx] = useState(0);
  const [accIdx, setAccIdx] = useState(0);
  const [showAcc, setShowAcc] = useState(true);

  // キーボード入力を監視
  useInput((input, key) => {
    if (input === 'q' || key.escape) {
      exit();
    }
    // 数字キーの入力を確実に拾う
    if (input === '1') {
      setColorIdx((prev) => (prev + 1) % COLORS.length);
    }
    if (input === '2') {
      setExprIdx((prev) => (prev + 1) % EXPRESSIONS.length);
    }
    if (input === '3') {
      // インデックスを回す。もし最後なら一旦「なし」の状態（showAccをfalseにするなど）を作ることも可能ですが
      // ここではシンプルに配列を回します。
      setAccIdx((prev) => (prev + 1) % ACCESSORIES.length);
      setShowAcc(true);
    }
    if (input === '0') {
      setShowAcc((prev) => !prev);
    }
  });

  return React.createElement(
    Box,
    { 
      flexDirection: 'column', 
      alignItems: 'center', 
      borderStyle: 'double', 
      padding: 1, 
      width: 48,
      borderColor: 'white'
    },
    
    // ヘッダー
    React.createElement(
      Box,
      { marginBottom: 1 },
      React.createElement(Text, { color: 'yellow', bold: true }, '✨ Gi育: ぷるぷるカスタムルーム ✨')
    ),

    // メインのキャラクター表示
    React.createElement(Slime, {
      bodyColor: COLORS[colorIdx],
      expression: EXPRESSIONS[exprIdx],
      accessory: ACCESSORIES[accIdx],
      showAccessory: showAcc
    }),

    // ステータス表示
    React.createElement(
      Box,
      { marginTop: 1, marginBottom: 1 },
      React.createElement(
        Text, 
        { color: 'gray' }, 
        `Color: ${colorIdx + 1} | Expr: ${exprIdx + 1} | Acc: ${accIdx + 1} (${showAcc ? 'ON' : 'OFF'})`
      )
    ),

    // 操作説明ガイド
    React.createElement(
      Box,
      { 
        flexDirection: 'column', 
        borderStyle: 'single', 
        paddingX: 1, 
        borderColor: 'cyan',
        width: 42
      },
      [
        ['1', '体の色をかえる'],
        ['2', '表情をかえる'],
        ['3', 'アクセサリーをかえる'],
        ['0', 'アクセサリーの ON/OFF'],
        ['q', '終了して保存 (仮)']
      ].map(([key, label]) => 
        React.createElement(
          Box,
          { key, justifyContent: 'space-between' },
          React.createElement(Text, { bold: true, color: 'white' }, ` [${key}]`),
          React.createElement(Text, {}, ` ${label}`)
        )
      )
    )
  );
};

render(React.createElement(App));
