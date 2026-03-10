import React from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';
import { SKIN_DEFINITIONS } from '../assets/skins/definitions.js';
import { GIIKU_CONFIG } from '../assets/config.js';

export class CharacterRenderer implements ICharacterRenderer {
  render(state: GiikuState) {
    const base = SKIN_DEFINITIONS.find(b => b.id === state.currentSkinId) || SKIN_DEFINITIONS[0];
    const head = base.heads[0];
    const body = base.bodies[0];
    const feet = base.feet[0];
    const color = base.color;
    const luster = state.condition.luster;
    const cfg = GIIKU_CONFIG.CONDITION.LUSTER;

    const getSparkleLine = (index: number, width: number, isTopBottom = false) => {
      if (luster < cfg.AURA_THRESHOLD / 2) return null;
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

    const lines = [...head.pixels, ...body.pixels, ...feet.pixels];
    const charWidth = lines[0].length;

    return (
      <Box flexDirection="column" alignItems="center">
        {luster >= cfg.AURA_THRESHOLD && (
          <Box height={1}><Text color="yellow">{getSparkleLine(-1, charWidth + 4, true)}</Text></Box>
        )}
        {lines.map((line, i) => (
          <Box key={i} flexDirection="row">
            <Text color="yellow">{getSparkleLine(i, 2)}</Text>
            <Box paddingX={1}><Text color={color} bold>{line}</Text></Box>
            <Text color="yellow">{getSparkleLine(i + 50, 2)}</Text>
          </Box>
        ))}
        {luster >= cfg.AURA_THRESHOLD && (
          <Box height={1}><Text color="yellow">{getSparkleLine(100, charWidth + 4, true)}</Text></Box>
        )}
      </Box>
    );
  }
}
