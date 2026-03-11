// source/app.js
import React, { useState } from 'react';
import { Text, Box, useInput, useApp } from 'ink';

// 💡 解決策：おにぎりとハンバーガーの両方をインポートして...
import { BASES as ONIGIRI_BASES, COLORS as ONIGIRI_COLORS } from './parts.js';
import { BURGERS as HAMBURGER_BASES, COLORS as HAMBURGER_COLORS } from './hamburger.js';
import { SUSHI as SUSHI_BASES, COLORS as SUSHI_COLORS } from './sushi.js';

// 💡 ここで「すべての種族」として合体させる！
const ALL_BASES = [...ONIGIRI_BASES, ...HAMBURGER_BASES, ...SUSHI_BASES];

// 色のリストも合体（重複を省く）
const ALL_COLORS = [...new Set([...ONIGIRI_COLORS, ...HAMBURGER_COLORS, ...SUSHI_COLORS])];

const App = () => {
  const { exit } = useApp();
  
  // bIdx が 0 ならおにぎり、1 ならハンバーガーになる
  const [bIdx, setBIdx] = useState(0); 
  const [hIdx, setHIdx] = useState(0);
  const [bodyIdx, setBodyIdx] = useState(0);
  const [fIdx, setFIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);

  // 種族（おにぎり⇔ハンバーガー）を切り替える関数
  const switchBase = (newIdx) => {
    setBIdx(newIdx); 
    setHIdx(0); setBodyIdx(0); setFIdx(0); // パーツを初期化
    
    // 切り替えた先のデフォルトカラーを適用
    const baseColorIdx = ALL_COLORS.indexOf(ALL_BASES[newIdx].color);
    if (baseColorIdx !== -1) setCIdx(baseColorIdx);
  };

  useInput((input, key) => {
    if (input === 'q') exit();
    
    const base = ALL_BASES[bIdx];
    
    // 💡 左右の矢印キーで、おにぎり⇔ハンバーガーを切り替え！
    if (key.rightArrow) switchBase((bIdx + 1) % ALL_BASES.length);
    if (key.leftArrow) switchBase((bIdx - 1 + ALL_BASES.length) % ALL_BASES.length);
    
    // 1, 2, 3キーで各パーツ切り替え
    if (input === '1') setHIdx(p => (p + 1) % base.heads.length);
    if (input === '2') setBodyIdx(p => (p + 1) % base.bodies.length);
    if (input === '3') setFIdx(p => (p + 1) % base.feet.length);
    
    // 4キーで全体カラーの切り替え
    if (input === '4') setCIdx(p => (p + 1) % ALL_COLORS.length);
  });

  const base = ALL_BASES[bIdx];
  const activeColor = ALL_COLORS[cIdx];
  const currentHead = base.heads[hIdx];
  const currentBody = base.bodies[bodyIdx];
  const currentFeet = base.feet[fIdx];

  const renderPixels = (pixels) => {
    return pixels.map((line, i) => (
      <Text key={i}>
        {Array.isArray(line) 
          ? line.map((seg, j) => <Text key={j} color={seg.c}>{seg.t}</Text>)
          : <Text color={activeColor}>{line}</Text>}
      </Text>
    ));
  };

  return (
    <Box flexDirection="column" alignItems="center" padding={1} minWidth={70} borderStyle="double" borderColor="gray">
      
      {/* 💡 種族切り替えUI（おにぎり ⇔ ハンバーガー） */}
      <Box width="100%" justifyContent="space-between" marginBottom={1}>
        <Text color="gray">◀ PREV GENUS</Text>
        <Box flexDirection="row">
          {ALL_BASES.map((_, i) => (
            <Text key={i} color={i === bIdx ? activeColor : 'gray'}>
              {i === bIdx ? ' ◈ ' : ' ◇ '}
            </Text>
          ))}
        </Box>
        <Text color="gray">NEXT GENUS ▶</Text>
      </Box>

      <Box flexDirection="row" width="100%" minHeight={15} borderStyle="round" borderColor={activeColor} paddingX={2} alignItems="center">
        
        {/* キャラクター描画エリア */}
        <Box flexDirection="column" alignItems="center" width={30} justifyContent="center" marginRight={2}>
          {renderPixels(currentHead.pixels)}
          {renderPixels(currentBody.pixels)}
          {renderPixels(currentFeet.pixels)}
        </Box>

        <Text color="gray" dimColor> │ </Text>

        <Box flexDirection="column" paddingLeft={2} flexGrow={1}>
          <Text color={activeColor} bold invert>{`  ${base.name}  `}</Text>
          <Box marginTop={1} minHeight={4}>
            <Text color="white" dimColor>{base.desc}</Text>
          </Box>
          <Box flexDirection="column">
            <Text color="yellow">{`[1] HEAD: ${currentHead.name}`}</Text>
            <Text color="yellow">{`[2] BODY: ${currentBody.name}`}</Text>
            <Text color="yellow">{`[3] FEET: ${currentFeet.name}`}</Text>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="row" width="100%" marginTop={1} borderStyle="single" borderColor="cyan" paddingX={1} justifyContent="space-around">
        <Text>[1-3] Parts</Text>
        <Text color={activeColor}>[4] Theme</Text>
        <Text color="yellow">[←/→] Switch Genus</Text>
        <Text color="red">[q] Quit</Text>
      </Box>
    </Box>
  );
};

export default App;