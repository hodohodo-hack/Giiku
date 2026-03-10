import React from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';
import { translations } from '../assets/translations.js';
import { SKIN_DEFINITIONS } from '../assets/skins/definitions.js';

interface AppProps {
  state: GiikuState;
  renderer: ICharacterRenderer;
  userName: string;
  godMode?: boolean;
}

export const App: React.FC<AppProps> = ({ state, renderer, userName, godMode = false }) => {
  const lang = state.language || 'en';
  const t = translations[lang].labels;

  const availableBases = SKIN_DEFINITIONS.filter(b => godMode || state.unlockedSkinIds.includes(b.id));
  const currentIndex = availableBases.findIndex(b => b.id === state.currentSkinId) + 1;
  const totalAvailable = availableBases.length;

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
      <Box marginBottom={1} justifyContent="space-between">
        <Box flexDirection="row">
          <Text bold color="green">👾 Giiku (v0.1.0)</Text>
          {godMode && <Text color="red" bold> [GOD MODE]</Text>}
          <Text> - User: {userName}</Text>
        </Box>
        <Text color="gray">[{currentIndex}/{totalAvailable}]</Text>
      </Box>

      <Box flexDirection="row">
        <Box width={30} justifyContent="center" flexDirection="column" alignItems="center">
          {renderer.render(state)}
          <Box marginTop={1}>
            <Text color="cyan" inverse> {availableBases[currentIndex - 1]?.name} </Text>
          </Box>
        </Box>

        <Box flexDirection="column" paddingLeft={2}>
          <Text color="yellow" bold>{t.status}</Text>
          <Text>  {t.satiety}: {state.condition.satiety}%</Text>
          <Text>  {t.luster}:  {state.condition.luster}%</Text>
          
          <Box marginTop={1}>
            <Text color="white" dimColor>{t.totalCommits}: {state.totalCommits}</Text>
          </Box>
          <Box>
            <Text color="white" dimColor>{t.todayCommits}: {state.todayCommits}</Text>
          </Box>
          <Box>
            <Text color="white" dimColor>{t.activeDays}:   {state.daysActive}</Text>
          </Box>
          <Box marginTop={1}>
            <Text>{t.title}: <Text color="magenta" italic>{state.titles[0]}</Text></Text>
          </Box>
        </Box>
      </Box>

      <Box marginTop={1} borderStyle="single" borderColor="gray">
        <Text dimColor> {t.quit} </Text>
      </Box>
    </Box>
  );
};
