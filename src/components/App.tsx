import React, { useMemo } from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';

interface AppProps {
  state: GiikuState;
  renderer: ICharacterRenderer;
  userName: string;
}

export const App: React.FC<AppProps> = ({ state, renderer, userName }) => {
  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="green">👾 Giiku (v0.1.0) - User: {userName}</Text>
      </Box>

      <Box flexDirection="row">
        {/* Character Illustration Area (Injectable Renderer) */}
        <Box width={30} justifyContent="center">
          {renderer.render(state)}
        </Box>

        {/* Stats Area */}
        <Box flexDirection="column" paddingLeft={2}>
          <Text color="yellow" bold>STATUS</Text>
          <Text>  Satiety (Fullness): {state.condition.satiety}%</Text>
          <Text>  Luster (Shine):    {state.condition.luster}%</Text>
          <Text>  Intellect:         {state.condition.intellect}%</Text>
          
          <Box marginTop={1}>
            <Text color="white" dimColor>Total Commits: {state.totalCommits}</Text>
          </Box>
          <Box>
            <Text color="white" dimColor>Active Days:   {state.daysActive}</Text>
          </Box>
          <Box marginTop={1}>
            <Text>Title: <Text color="magenta" italic>{state.titles[0]}</Text></Text>
          </Box>
        </Box>
      </Box>

      <Box marginTop={1} borderStyle="single" borderColor="gray">
        <Text dimColor> Press q to exit | Growth logic linked to your Git history </Text>
      </Box>
    </Box>
  );
};
