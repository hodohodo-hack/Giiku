import React, { useState } from 'react';
import { render, Text, Box, useInput, useApp } from 'ink';
import { BASES, COLORS } from './parts.js';

/**
 * 究極のカスタム・ピクセル・スタジオ
 * ベース種族を切り替えると、その種族専用のパーツがアンロックされます。
 */
const App = () => {
  const { exit } = useApp();
  
  // 状態管理
  const [bIdx, setBIdx] = useState(0); // ベース (左右キー)
  const [hIdx, setHIdx] = useState(0); // 専用頭パーツ (1キー)
  const [bodyIdx, setBodyIdx] = useState(0); // 専用胴パーツ (2キー)
  const [fIdx, setFIdx] = useState(0); // 専用足パーツ (3キー)
  const [cIdx, setCIdx] = useState(0); // カラー (4キー)

  // ベース切り替え時のリセット処理
  const switchBase = (newIdx) => {
    setBIdx(newIdx);
    setHIdx(0);
    setBodyIdx(0);
    setFIdx(0);
    // 色はベースのデフォルト色に合わせる (任意)
    const baseColorIdx = COLORS.indexOf(BASES[newIdx].color);
    if (baseColorIdx !== -1) setCIdx(baseColorIdx);
  };

  // キー入力
  useInput((input, key) => {
    if (input === 'q') exit();
    
    const base = BASES[bIdx];

    // ベース(種族)切り替え
    if (key.rightArrow) switchBase((bIdx + 1) % BASES.length);
    if (key.leftArrow) switchBase((bIdx - 1 + BASES.length) % BASES.length);
    
    // パーツ個別調整 (現在のベース内の配列から選択)
    if (input === '1') setHIdx(p => (p + 1) % base.heads.length);
    if (input === '2') setBodyIdx(p => (p + 1) % base.bodies.length);
    if (input === '3') setFIdx(p => (p + 1) % base.feet.length);
    if (input === '4') setCIdx(p => (p + 1) % COLORS.length);
  });

  const base = BASES[bIdx];
  const activeColor = COLORS[cIdx];

  // 現在選択中の各パーツデータ
  const currentHead = base.heads[hIdx];
  const currentBody = base.bodies[bodyIdx];
  const currentFeet = base.feet[fIdx];

  return React.createElement(
    Box, 
    { 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: 1, 
      width: 66, 
      borderStyle: 'double', 
      borderColor: 'gray' 
    },
    
    // ヘッダー: 種族ナビゲーション
    React.createElement(
      Box, 
      { width: 60, justifyContent: 'space-between', marginBottom: 1 },
      React.createElement(Text, { color: 'gray' }, '◀ PREV GENUS'),
      React.createElement(
        Box, { flexDirection: 'row' },
        BASES.map((_, i) => 
          React.createElement(Text, { key: i, color: i === bIdx ? activeColor : 'gray' }, i === bIdx ? ' ◈ ' : ' ◇ ')
        )
      ),
      React.createElement(Text, { color: 'gray' }, 'NEXT GENUS ▶')
    ),

    // メインコンテンツエリア
    React.createElement(
      Box,
      { flexDirection: 'row', width: 60, height: 15, borderStyle: 'round', borderColor: activeColor, paddingX: 2, alignItems: 'center' },
      
      // 左側: キャラクター表示 (専用パーツの組み合わせ)
      React.createElement(
        Box, 
        { flexDirection: 'column', alignItems: 'center', width: 26, justifyContent: 'center' },
        currentHead.pixels.map((l, i) => React.createElement(Text, { key: `h-${i}`, color: activeColor, bold: true }, l)),
        currentBody.pixels.map((l, i) => React.createElement(Text, { key: `b-${i}`, color: activeColor, bold: true }, l)),
        currentFeet.pixels.map((l, i) => React.createElement(Text, { key: `f-${i}`, color: activeColor, bold: true }, l))
      ),

      // 中央仕切り
      React.createElement(Text, { color: 'gray', dimColor: true }, ' │ '),

      // 右側: ステータス表示
      React.createElement(
        Box,
        { flexDirection: 'column', paddingLeft: 2, flexGrow: 1 },
        React.createElement(Text, { color: activeColor, bold: true, invert: true }, `  ${base.name}  `),
        React.createElement(Box, { marginTop: 1, height: 4 },
          React.createElement(Text, { color: 'white', dimColor: true }, base.desc)
        ),
        React.createElement(
          Box, { flexDirection: 'column' },
          React.createElement(Text, { color: 'yellow' }, `[1] HEAD: ${currentHead.name}`),
          React.createElement(Text, { color: 'yellow' }, `[2] BODY: ${currentBody.name}`),
          React.createElement(Text, { color: 'yellow' }, `[3] FEET: ${currentFeet.name}`)
        )
      )
    ),

    // 操作説明パネル
    React.createElement(
      Box, 
      { 
        flexDirection: 'row', 
        width: 60, 
        marginTop: 1, 
        borderStyle: 'single', 
        borderColor: 'cyan', 
        paddingX: 1,
        justifyContent: 'space-around'
      },
      React.createElement(Text, {}, '[1-3] Parts'),
      React.createElement(Text, { color: activeColor }, '[4] Theme'),
      React.createElement(Text, { color: 'red' }, '[q] Quit')
    ),

    // フッター
    React.createElement(
      Box, { marginTop: 1 },
      React.createElement(Text, { color: 'gray', dimColor: true }, 'Arrows: Switch Genus | Numbers: Genus-Specific Customize')
    )
  );
};

render(React.createElement(App));
