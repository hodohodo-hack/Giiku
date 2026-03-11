#!/usr/bin/env node
import React, { useState, useMemo } from 'react';
import { render, useApp, useInput, Box } from 'ink';
import { App } from './components/App.js';
import { CommitReaction } from './components/CommitReaction.js';
import { UnlockNotification } from './components/UnlockNotification.js';
import { GiikuEngine } from './core/GiikuEngine.js';
import { GitProvider } from './infra/GitProvider.js';
import { ConfStateStore } from './infra/ConfStateStore.js';
import { CharacterRenderer } from './infra/CharacterRenderer.js';
import { SetupManager } from './core/SetupManager.js';
import { ICharacterRenderer, GiikuState } from './types.js';
import { translations } from './assets/translations.js';
import { SKIN_DEFINITIONS } from './assets/skins/definitions.js';

const TuiApp: React.FC<{ engine: GiikuEngine, renderer: ICharacterRenderer, userName: string, initialState: GiikuState, godMode?: boolean }> = ({ engine, renderer, userName, initialState, godMode }) => {
  const { exit } = useApp();
  const [state, setState] = useState(initialState);
  const [selectedSlot, setSelectedSlot] = useState(0); // 0: Skin, 1: Head, 2: Body, 3: Feet

  const unlockedBases = useMemo(() => 
    SKIN_DEFINITIONS.filter(b => godMode || state.unlockedSkinIds.includes(b.id)),
    [state.unlockedSkinIds, godMode]
  );

  const currentSkin = useMemo(() => 
    SKIN_DEFINITIONS.find(b => b.id === state.currentSkinId) || SKIN_DEFINITIONS[0],
    [state.currentSkinId]
  );

  useInput((input, key) => {
    if (input === 'q') {
      exit();
      return;
    }

    if (key.upArrow) {
      setSelectedSlot(prev => (prev > 0 ? prev - 1 : 3));
    }
    if (key.downArrow) {
      setSelectedSlot(prev => (prev < 3 ? prev + 1 : 0));
    }

    if (key.leftArrow || key.rightArrow) {
      if (selectedSlot === 0) {
        const currentIndex = unlockedBases.findIndex(b => b.id === state.currentSkinId);
        let nextIndex = key.rightArrow ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex >= unlockedBases.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = unlockedBases.length - 1;
        
        const nextSkinId = unlockedBases[nextIndex].id;
        engine.setSkin(nextSkinId);
        setState(prev => ({ ...prev, currentSkinId: nextSkinId, selectedHeadIndex: 0, selectedBodyIndex: 0, selectedFeetIndex: 0 }));
      } else if (selectedSlot === 1) {
        let nextIndex = key.rightArrow ? state.selectedHeadIndex + 1 : state.selectedHeadIndex - 1;
        if (nextIndex >= currentSkin.heads.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = currentSkin.heads.length - 1;
        engine.setPart('head', nextIndex);
        setState(prev => ({ ...prev, selectedHeadIndex: nextIndex }));
      } else if (selectedSlot === 2) {
        let nextIndex = key.rightArrow ? state.selectedBodyIndex + 1 : state.selectedBodyIndex - 1;
        if (nextIndex >= currentSkin.bodies.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = currentSkin.bodies.length - 1;
        engine.setPart('body', nextIndex);
        setState(prev => ({ ...prev, selectedBodyIndex: nextIndex }));
      } else if (selectedSlot === 3) {
        let nextIndex = key.rightArrow ? state.selectedFeetIndex + 1 : state.selectedFeetIndex - 1;
        if (nextIndex >= currentSkin.feet.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = currentSkin.feet.length - 1;
        engine.setPart('feet', nextIndex);
        setState(prev => ({ ...prev, selectedFeetIndex: nextIndex }));
      }
    }
  });

  return (
    <App 
      state={state} 
      renderer={renderer} 
      userName={userName} 
      godMode={godMode} 
      selectedSlot={selectedSlot}
    />
  );
};

const RichReaction: React.FC<{ result: any, language: 'en' | 'ja' }> = ({ result, language }) => {
  const renderer = new CharacterRenderer();
  return (
    <Box flexDirection="column">
      <CommitReaction state={result.state} renderer={renderer} message={result.message} />
      <UnlockNotification language={language} newSkins={result.newSkins} newTitles={result.newTitles} />
    </Box>
  );
};

const main = () => {
  const args = process.argv.slice(2);
  const gitProvider = new GitProvider();
  const stateStore = new ConfStateStore();
  const engine = new GiikuEngine(stateStore, gitProvider);
  const setupManager = new SetupManager();

  const currentState = stateStore.get();
  const lang = currentState.language || 'en';
  const t = translations[lang].cli;

  if (args.length > 0) {
    const cmd = args[0];

    if (cmd === '--setup') {
      const isJa = args.includes('--ja');
      const targetLang = isJa ? 'ja' : 'en';
      stateStore.save({ language: targetLang });
      setupManager.install(targetLang);
      process.exit(0);
    }
    if (cmd === '--remove-setup') {
      setupManager.uninstall(lang);
      process.exit(0);
    }
    if (cmd === '--startup') {
      const state = engine.refresh();
      const userName = gitProvider.getStats().userName;
      const greeting = state.condition.satiety < 30 ? t.hungry(userName, state.condition.satiety) : t.startup(userName, state.condition.satiety);
      console.log(greeting);
      process.exit(0);
    }
    if (cmd === '--commit-reaction') {
      const result = engine.processHook(args.slice(1));
      if (result) {
        render(<RichReaction result={result} language={lang} />);
      }
      process.exit(0);
    }
    if (cmd === '--debug-unlock') {
      const dummyResult = {
        state: engine.getState(),
        message: 'Debug Simulation',
        newSkins: ['MECHA-GENUS'],
        newTitles: ['Legendary Developer']
      };
      render(<RichReaction result={dummyResult} language={lang} />);
      process.exit(0);
    }
    if (cmd === '--status-line') {
      const state = engine.getState();
      const title = state.titles[0] || (lang === 'ja' ? '新米' : 'Novice');
      console.log(t.statusLine(state.condition.satiety, state.condition.luster, title));
      process.exit(0);
    }
    if (cmd === '--hook') {
      engine.processHook(args.slice(1));
      process.exit(0);
    }
    if (cmd === '--help' || cmd === '-h') {
      console.log(t.help);
      if (args.includes('--debug')) {
        console.log(t.debugHelp);
        console.log(`
  SIMULATION OPTIONS:
    --god-mode           Enable all skins temporarily in TUI.
    --debug-unlock       Show simulation of unlock notification.
        `);
      }
      process.exit(0);
    }
    if (cmd === '--version' || cmd === '-v') {
      console.log('giiku v0.1.0');
      process.exit(0);
    }
  }

  const renderer = new CharacterRenderer();
  const stats = gitProvider.getStats();
  const updatedState = engine.refresh();
  const godMode = args.includes('--god-mode');

  render(<TuiApp engine={engine} renderer={renderer} userName={stats.userName} initialState={updatedState} godMode={godMode} />);
};

main();
