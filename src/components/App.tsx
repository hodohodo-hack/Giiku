import React from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';
import { translations } from '../assets/translations.js';
import { SKIN_DEFINITIONS, SkinDefinition } from '../assets/skins/definitions.js';
import { GIIKU_CONFIG } from '../assets/config.js';

interface AppProps {
  state: GiikuState;
  renderer: ICharacterRenderer;
  userName: string;
  godMode?: boolean;
  selectedSlot?: number;
}

export const App: React.FC<AppProps> = ({ 
  state, renderer, userName, godMode = false, 
  selectedSlot = 0
}) => {
  const lang = state.language || 'en';
  const t = translations[lang].labels;

  const unlockedBases = SKIN_DEFINITIONS.filter(b => godMode || state.unlockedSkinIds.includes(b.id));
  const currentSkin = unlockedBases.find(b => b.id === state.currentSkinId) || unlockedBases[0];
  
  const totalAvailable = unlockedBases.length;
  const currentDisplayIndex = unlockedBases.indexOf(currentSkin!) + 1;

  const getSlotColor = (index: number) => index === selectedSlot ? 'cyan' : 'white';
  const getSlotText = (index: number, label: string, value: string) => (
    <Text color={getSlotColor(index)}>
      {index === selectedSlot ? ' > ' : '   '} {label}: {value}
    </Text>
  );

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1} minWidth={60}>
      {/* Header */}
      <Box marginBottom={1} justifyContent="space-between">
        <Box flexDirection="row">
          <Text bold color="green">👾 Giiku (v0.1.0)</Text>
          {godMode && <Text color="red" bold> [GOD MODE]</Text>}
          <Text> - User: {userName}</Text>
        </Box>
        <Text color="gray">[{totalCountSafe(totalAvailable, currentDisplayIndex)}/{totalAvailable}]</Text>
      </Box>

      {/* Main Content: Character (Left) & Stats (Right) */}
      <Box flexDirection="row" minHeight={20}>
        {/* Character Display Area */}
        <Box 
          width={GIIKU_CONFIG.UI.CHARACTER_FRAME_WIDTH + 10} 
          flexDirection="column" 
          alignItems="center"
          justifyContent="center"
          borderStyle="single"
          borderColor="gray"
        >
          {currentSkin ? (
            <Box flexDirection="column" alignItems="center">
              {renderer.render({ ...state, currentSkinId: currentSkin.id })}
              <Box marginTop={1} flexDirection="column" alignItems="flex-start" paddingX={1}>
                {getSlotText(0, t.skin || 'Skin', currentSkin.name)}
                {getSlotText(1, t.head || 'Head', currentSkin.heads[state.selectedHeadIndex]?.name || 'N/A')}
                {getSlotText(2, t.body || 'Body', currentSkin.bodies[state.selectedBodyIndex]?.name || 'N/A')}
                {getSlotText(3, t.feet || 'Feet', currentSkin.feet[state.selectedFeetIndex]?.name || 'N/A')}
              </Box>
            </Box>
          ) : (
            <Text color="red">No Skin Data</Text>
          )}
        </Box>

        {/* Stats Area */}
        <Box flexDirection="column" paddingLeft={2} flexGrow={1} borderStyle="single" borderColor="gray">
          <Text color="yellow" bold inverse>{`  ${t.status}  `}</Text>
          <Box marginTop={1} flexDirection="column">
            <Text>  {t.satiety}: {state.condition.satiety}%</Text>
            <Text>  {t.luster}:  {state.condition.luster}%</Text>
          </Box>
          
          <Box marginTop={1} flexDirection="column" borderStyle="classic" borderColor="dim">
            <Text color="white" dimColor> {t.totalCommits}: {state.totalCommits}</Text>
            <Text color="white" dimColor> {t.todayCommits}: {state.todayCommits}</Text>
            <Text color="white" dimColor> {t.activeDays}:   {state.daysActive}</Text>
          </Box>

          <Box marginTop={1} paddingX={1}>
            <Text>{t.title}:</Text>
            <Text color="magenta" italic bold> {state.titles[0]}</Text>
          </Box>

          <Box marginTop={2} paddingX={1}>
             <Text color="cyan" dimColor>Skin Desc:</Text>
             <Text color="white" wrap="wrap"> {currentSkin?.desc[lang] || currentSkin?.desc.en}</Text>
          </Box>
        </Box>
      </Box>

      {/* Footer / Controls */}
      <Box marginTop={1} borderStyle="single" borderColor="gray" paddingX={1}>
        <Text dimColor> {t.quit} </Text>
      </Box>
    </Box>
  );
};

function totalCountSafe(total: number, index: number) {
  return total > 0 ? index : 0;
}
