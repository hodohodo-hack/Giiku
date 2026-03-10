import React from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';
import { BASES } from '../assets/parts.js';
import { GIIKU_CONFIG } from '../assets/config.js';

export class CharacterRenderer implements ICharacterRenderer {
  render(state: GiikuState) {
    const base = BASES.find(b => b.id === state.currentSkinId) || BASES[0];
    const head = base.heads[0];
    const body = base.bodies[0];
    const feet = base.feet[0];
    const color = base.color;
    const luster = state.condition.luster;
    const cfg = GIIKU_CONFIG.CONDITION.LUSTER;

    // 輝きの粒子を生成する関数
    const getSparkleLine = (index: number, width: number, isTopBottom = false) => {
      if (luster < cfg.AURA_THRESHOLD / 2) return null; // 閾値の半分から予兆が出る
      
      const chars = luster > cfg.SPARKLE_THRESHOLD ? ['✧', '°', '*', '+', '·'] : ['*', '·', '°'];
      const density = Math.floor(luster / 20);
      
      let line = '';
      for (let i = 0; i < width; i++) {
        const seed = (i * 13 + index * 7 + Math.floor(luster)) % 100;
        if (seed < (isTopBottom ? density * 4 : density * 2)) {
          line += chars[seed % chars.length];
        } else {
          line += ' ';
        }
      }
      return line;
    };

    const lines = [
      ...head.pixels,
      ...body.pixels,
      ...feet.pixels
    ];
    const charWidth = lines[0].length;

    return (
      <Box flexDirection="column" alignItems="center">
        {/* 上部のキラキラ */}
        {luster >= cfg.AURA_THRESHOLD && (
          <Box height={1}>
            <Text color="yellow">{getSparkleLine(-1, charWidth + 4, true)}</Text>
          </Box>
        )}

        {/* キャラクター本体と側面のオーラ */}
        {lines.map((line, i) => (
          <Box key={i} flexDirection="row">
            <Text color="yellow">{getSparkleLine(i, 2)}</Text>
            <Box paddingX={1}>
              <Text color={color} bold>{line}</Text>
            </Box>
            <Text color="yellow">{getSparkleLine(i + 50, 2)}</Text>
          </Box>
        ))}

        {/* 下部のキラキラ */}
        {luster >= cfg.AURA_THRESHOLD && (
          <Box height={1}>
            <Text color="yellow">{getSparkleLine(100, charWidth + 4, true)}</Text>
          </Box>
        )}
      </Box>
    );
  }
}
