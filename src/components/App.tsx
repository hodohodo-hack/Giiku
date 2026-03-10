import React from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';
import { translations } from '../assets/translations.js';

interface AppProps {
  state: GiikuState;
  renderer: ICharacterRenderer;
  userName: string;
}

export const App: React.FC<AppProps> = ({ state, renderer, userName }) => {
  const lang = state.language || 'en';
  const t = translations[lang].labels;

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="green">👾 Giiku (v0.1.0) - User: {userName}</Text>
      </Box>

      <Box flexDirection="row">
        <Box width={30} justifyContent="center">
          {renderer.render(state)}
        </Box>

        <Box flexDirection="column" paddingLeft={2}>
          <Text color="yellow" bold>{t.status}</Text>
          <Text>  {t.satiety}: {state.condition.satiety}%</Text>
          <Text>  {t.luster}:  {state.condition.luster}%</Text>
          <Text>  {t.intellect}: {state.condition.intellect}%</Text>
          
          <Box marginTop={1}>
            <Text color="white" dimColor>{t.totalCommits}: {state.totalCommits}</Text>
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
