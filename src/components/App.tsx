import React from 'react';
import { Box, Text } from 'ink';
import { GiikuState, ICharacterRenderer } from '../types.js';
import { translations } from '../assets/translations.js';
import { SKIN_DEFINITIONS, SkinDefinition } from '../assets/skins/definitions.js';

interface AppProps {
  state: GiikuState;
  renderer: ICharacterRenderer;
  userName: string;
  godMode?: boolean;
  searchQuery?: string;
  isSearchMode?: boolean;
  searchResults?: SkinDefinition[];
  selectedIndex?: number;
}

export const App: React.FC<AppProps> = ({ 
  state, renderer, userName, godMode = false, 
  searchQuery = '', isSearchMode = false,
  searchResults = [], selectedIndex = 0
}) => {
  const lang = state.language || 'en';
  const t = translations[lang].labels;

  const unlockedBases = SKIN_DEFINITIONS.filter(b => godMode || state.unlockedSkinIds.includes(b.id));
  const currentSkin = searchResults.length > 0 ? searchResults[selectedIndex] : unlockedBases.find(b => b.id === state.currentSkinId) || unlockedBases[0];
  
  const totalAvailable = unlockedBases.length;
  const currentDisplayIndex = unlockedBases.indexOf(currentSkin!) + 1;

  // スライディングウィンドウ（最大3件表示）の計算
  const windowSize = 3;
  let start = Math.max(0, selectedIndex - Math.floor(windowSize / 2));
  let end = start + windowSize;
  
  if (end > searchResults.length) {
    end = searchResults.length;
    start = Math.max(0, end - windowSize);
  }

  const visibleResults = searchResults.slice(start, end);

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
      <Box marginBottom={1} justifyContent="space-between">
        <Box flexDirection="row">
          <Text bold color="green">👾 Giiku (v0.1.0)</Text>
          {godMode && <Text color="red" bold> [GOD MODE]</Text>}
          <Text> - User: {userName}</Text>
        </Box>
        <Text color="gray">[{currentDisplayIndex}/{totalAvailable}]</Text>
      </Box>

      <Box flexDirection="row">
        <Box width={30} justifyContent="center" flexDirection="column" alignItems="center">
          {currentSkin ? (
            <React.Fragment>
              {renderer.render({ ...state, currentSkinId: currentSkin.id })}
              <Box marginTop={1}>
                <Text color="cyan" inverse> {currentSkin.name} </Text>
              </Box>
            </React.Fragment>
          ) : (
            <Text color="red">{t.noResults}</Text>
          )}
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

      {/* 検索候補ドロワー (スクロール対応版) */}
      {isSearchMode && (
        <Box flexDirection="column" marginTop={1}>
          {searchResults.length > 0 && (
            <Box flexDirection="column" paddingX={1} marginBottom={1}>
              {start > 0 && <Text dimColor>   ↑ ({start} more)</Text>}
              {visibleResults.map((res, i) => {
                const globalIndex = start + i;
                return (
                  <Text key={res.id} color={globalIndex === selectedIndex ? 'cyan' : 'white'}>
                    {globalIndex === selectedIndex ? ' > ' : '   '} {res.name}
                  </Text>
                );
              })}
              {end < searchResults.length && <Text dimColor>   ↓ ({searchResults.length - end} more)</Text>}
            </Box>
          )}
          
          <Box paddingX={1} borderStyle="single" borderColor="yellow">
            <Text bold color="yellow">{t.searchPlaceholder}</Text>
            <Text>{searchQuery}</Text>
            <Text color="yellow" bold>_</Text>
          </Box>
        </Box>
      )}

      <Box marginTop={1} borderStyle="single" borderColor="gray">
        <Text dimColor> {t.quit} </Text>
      </Box>
    </Box>
  );
};
