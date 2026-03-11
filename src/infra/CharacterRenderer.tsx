import React from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';
import { SKIN_DEFINITIONS } from '../assets/skins/definitions.js';
import { GIIKU_CONFIG } from '../assets/config.js';

export class CharacterRenderer implements ICharacterRenderer {
  render(state: GiikuState) {
    const base = SKIN_DEFINITIONS.find(b => b.id === state.currentSkinId) || SKIN_DEFINITIONS[0];
    const head = base.heads[state.selectedHeadIndex] || base.heads[0];
    const body = base.bodies[state.selectedBodyIndex] || base.bodies[0];
    const feet = base.feet[state.selectedFeetIndex] || base.feet[0];
    const color = base.color;
    const luster = state.condition.luster;
    const cfg = GIIKU_CONFIG.CONDITION.LUSTER;

    // キャンバスサイズの固定設定
    const CANVAS_WIDTH = GIIKU_CONFIG.UI.CHARACTER_FRAME_WIDTH;
    const CANVAS_HEIGHT = GIIKU_CONFIG.UI.CHARACTER_FRAME_HEIGHT;

    const getSparkleLine = (index: number, width: number, isTopBottom = false) => {
      if (luster < cfg.AURA_THRESHOLD / 2) return ' '.repeat(width);
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
    
    // 上下の余白計算
    const actualHeight = lines.length;
    const topPadding = Math.max(0, Math.floor((CANVAS_HEIGHT - actualHeight) / 2));
    const bottomPadding = Math.max(0, CANVAS_HEIGHT - actualHeight - topPadding);

    return (
      <Box flexDirection="column" alignItems="center" width={CANVAS_WIDTH + 4}>
        {/* 上部オーラ */}
        <Box height={1}>
          <Text color="yellow" bold>
            {luster >= cfg.AURA_THRESHOLD ? getSparkleLine(-1, CANVAS_WIDTH + 4, true) : ' '.repeat(CANVAS_WIDTH + 4)}
          </Text>
        </Box>

        {/* 上部垂直余白 */}
        {Array.from({ length: topPadding }).map((_, i) => (
          <Box key={`top-${i}`} flexDirection="row" width={CANVAS_WIDTH + 4}>
            <Text color="yellow" bold>{getSparkleLine(i + 10, 2)}</Text>
            <Box flexGrow={1} />
            <Text color="yellow" bold>{getSparkleLine(i + 60, 2)}</Text>
          </Box>
        ))}

        {/* キャラクター描画 */}
        {lines.map((line, i) => (
          <Box key={`char-${i}`} flexDirection="row" width={CANVAS_WIDTH + 4} justifyContent="center">
            <Text color="yellow" bold>{getSparkleLine(i, 2)}</Text>
            
            <Box width={CANVAS_WIDTH} justifyContent="center">
              {typeof line === 'string' ? (
                <Text color={color} bold>{line}</Text>
              ) : (
                <Text bold>
                  {line.map((seg, j) => (
                    <Text key={j} color={seg.c === 'black' ? 'gray' : (seg.c.endsWith('Bright') ? seg.c : `${seg.c}Bright`)} bold>
                      {seg.t}
                    </Text>
                  ))}
                </Text>
              )}
            </Box>

            <Text color="yellow" bold>{getSparkleLine(i + 50, 2)}</Text>
          </Box>
        ))}

        {/* 下部垂直余白 */}
        {Array.from({ length: bottomPadding }).map((_, i) => (
          <Box key={`bottom-${i}`} flexDirection="row" width={CANVAS_WIDTH + 4}>
            <Text color="yellow" bold>{getSparkleLine(i + 30, 2)}</Text>
            <Box flexGrow={1} />
            <Text color="yellow" bold>{getSparkleLine(i + 80, 2)}</Text>
          </Box>
        ))}

        {/* 下部オーラ */}
        <Box height={1}>
          <Text color="yellow" bold>
            {luster >= cfg.AURA_THRESHOLD ? getSparkleLine(100, CANVAS_WIDTH + 4, true) : ' '.repeat(CANVAS_WIDTH + 4)}
          </Text>
        </Box>
      </Box>
    );
  }
}
