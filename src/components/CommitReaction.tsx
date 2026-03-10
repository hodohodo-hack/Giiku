import React from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';
import { translations } from '../assets/translations.js';
import { GIIKU_CONFIG } from '../assets/config.js';

interface CommitReactionProps {
  state: GiikuState;
  renderer: ICharacterRenderer;
  message: string;
}

export const CommitReaction: React.FC<CommitReactionProps> = ({ state, renderer, message }) => {
  const lang = state.language || 'en';
  const t = translations[lang].labels;
  const title = state.titles[0] || (lang === 'ja' ? '新米' : 'Novice');

  return (
    <Box flexDirection="column" paddingY={1}>
      <Box marginBottom={1}>
        <Text bold color="green">🎉 {message}</Text>
      </Box>

      <Box flexDirection="row" alignItems="center">
        <Box 
          width={GIIKU_CONFIG.UI.CHARACTER_FRAME_WIDTH} 
          height={GIIKU_CONFIG.UI.CHARACTER_FRAME_HEIGHT} 
          justifyContent="center"
        >
          {renderer.render(state)}
        </Box>

        <Box flexDirection="column" paddingLeft={2} borderStyle="round" borderColor="yellow">
          <Text color="yellow" bold>NEW STATUS</Text>
          <Text>  {t.satiety}: {state.condition.satiety}%</Text>
          <Text>  {t.title}: <Text color="magenta">{title}</Text></Text>
        </Box>
      </Box>
    </Box>
  );
};
