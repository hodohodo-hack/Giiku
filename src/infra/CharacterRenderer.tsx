import React from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';
import { BASES } from '../assets/parts.js';

export class CharacterRenderer implements ICharacterRenderer {
  render(state: GiikuState) {
    // Find the base by skin ID or fallback to slime
    const base = BASES.find(b => b.id === state.currentSkinId) || BASES[0];
    
    // Choose parts based on state (simulated for now)
    // In a full implementation, parts indices could be stored in GiikuState
    const head = base.heads[0];
    const body = base.bodies[0];
    const feet = base.feet[0];
    const color = base.color;

    return (
      <Box flexDirection="column" alignItems="center">
        {/* Head */}
        {head.pixels.map((line, i) => (
          <Text key={`h-${i}`} color={color} bold>{line}</Text>
        ))}
        {/* Body */}
        {body.pixels.map((line, i) => (
          <Text key={`b-${i}`} color={color} bold>{line}</Text>
        ))}
        {/* Feet */}
        {feet.pixels.map((line, i) => (
          <Text key={`f-${i}`} color={color} bold>{line}</Text>
        ))}
      </Box>
    );
  }
}
