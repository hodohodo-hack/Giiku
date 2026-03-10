#!/usr/bin/env node
import React, { useState } from 'react';
import { render, useApp, useInput } from 'ink';
import { App } from './components/App.js';
import { CommitReaction } from './components/CommitReaction.js';
import { GiikuEngine } from './core/GiikuEngine.js';
import { GitProvider } from './infra/GitProvider.js';
import { ConfStateStore } from './infra/ConfStateStore.js';
import { CharacterRenderer } from './infra/CharacterRenderer.js';
import { SetupManager } from './core/SetupManager.js';
import { ICharacterRenderer, Language, GiikuState } from './types.js';
import { translations } from './assets/translations.js';
import { BASES } from './assets/parts.js';

const TuiApp: React.FC<{ engine: GiikuEngine, renderer: ICharacterRenderer, userName: string, initialState: GiikuState }> = ({ engine, renderer, userName, initialState }) => {
  const { exit } = useApp();
  const [state, setState] = useState(initialState);

  useInput((input, key) => {
    if (input === 'q') exit();

    // Skin switching with Left/Right arrows (only for unlocked skins)
    if (key.leftArrow || key.rightArrow) {
      const unlockedBases = BASES.filter(b => state.unlockedSkinIds.includes(b.id));
      const currentIndex = unlockedBases.findIndex(b => b.id === state.currentSkinId);
      
      let nextIndex = key.rightArrow ? currentIndex + 1 : currentIndex - 1;
      
      if (nextIndex >= unlockedBases.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = unlockedBases.length - 1;
      
      const nextSkinId = unlockedBases[nextIndex].id;
      engine.setSkin(nextSkinId);
      setState({ ...state, currentSkinId: nextSkinId });
    }
  });

  return <App state={state} renderer={renderer} userName={userName} />;
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
        const renderer = new CharacterRenderer();
        render(<CommitReaction state={result.state} renderer={renderer} message={result.message} />);
      }
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

  render(<TuiApp engine={engine} renderer={renderer} userName={stats.userName} initialState={updatedState} />);
};

main();
