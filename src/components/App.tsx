import React from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';
import { translations } from '../assets/translations.js';
import { BASES } from '../assets/parts.js';

interface AppProps {
  state: GiikuState;
  renderer: ICharacterRenderer;
  userName: string;
}

export const App: React.FC<AppProps> = ({ state, renderer, userName }) => {
  const lang = state.language || 'en';
  const t = translations[lang].labels;

  // Find index of current skin within unlocked ones
  const unlockedBases = BASES.filter(b => state.unlockedSkinIds.includes(b.id));
  const currentIndex = unlockedBases.findIndex(b => b.id === state.currentSkinId) + 1;
  const totalUnlocked = unlockedBases.length;

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
      <Box marginBottom={1} justifyContent="space-between">
        <Text bold color="green">👾 Giiku (v0.1.0) - User: {userName}</Text>
        <Text color="gray">[{currentIndex}/{totalUnlocked}]</Text>
      </Box>

      <Box flexDirection="row">
        <Box width={30} justifyContent="center" flexDirection="column" alignItems="center">
          {renderer.render(state)}
          <Box marginTop={1}>
            <Text color="cyan" inverse> {unlockedBases[currentIndex - 1]?.name} </Text>
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
