import React from 'react';
import { Box, Text } from 'ink';
import { translations } from '../assets/translations.js';

interface UnlockNotificationProps {
  language: 'en' | 'ja';
  newSkins: string[];
  newTitles: string[];
}

export const UnlockNotification: React.FC<UnlockNotificationProps> = ({ language, newSkins, newTitles }) => {
  if (newSkins.length === 0 && newTitles.length === 0) return null;

  const labels = {
    en: { title: '✨ UNLOCKED! ✨', skins: 'New Skins:', titles: 'New Titles:' },
    ja: { title: '✨ 解放されました！ ✨', skins: '新しいスキン:', titles: '新しい称号:' }
  };
  const l = labels[language];

  return (
    <Box flexDirection="column" borderStyle="double" borderColor="yellow" paddingX={2} paddingY={1} marginY={1}>
      <Box justifyContent="center" marginBottom={1}>
        <Text bold color="yellow">{l.title}</Text>
      </Box>

      {newSkins.length > 0 && (
        <Box flexDirection="column" marginBottom={1}>
          <Text dimColor>{l.skins}</Text>
          {newSkins.map(s => <Text key={s} color="cyan" bold>  ◈ {s}</Text>)}
        </Box>
      )}

      {newTitles.length > 0 && (
        <Box flexDirection="column">
          <Text dimColor>{l.titles}</Text>
          {newTitles.map(t => <Text key={t} color="magenta" bold>  ★ {t}</Text>)}
        </Box>
      )}
    </Box>
  );
};
