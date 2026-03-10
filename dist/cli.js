#!/usr/bin/env node
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { render, useApp, useInput, Box } from 'ink';
import { App } from './components/App.js';
import { CommitReaction } from './components/CommitReaction.js';
import { UnlockNotification } from './components/UnlockNotification.js';
import { GiikuEngine } from './core/GiikuEngine.js';
import { GitProvider } from './infra/GitProvider.js';
import { ConfStateStore } from './infra/ConfStateStore.js';
import { CharacterRenderer } from './infra/CharacterRenderer.js';
import { SetupManager } from './core/SetupManager.js';
import { translations } from './assets/translations.js';
import { SKIN_DEFINITIONS } from './assets/skins/definitions.js';
const TuiApp = ({ engine, renderer, userName, initialState, godMode }) => {
    const { exit } = useApp();
    const [state, setState] = useState(initialState);
    useInput((input, key) => {
        if (input === 'q')
            exit();
        if (key.leftArrow || key.rightArrow) {
            const availableBases = SKIN_DEFINITIONS.filter(b => godMode || state.unlockedSkinIds.includes(b.id));
            const currentIndex = availableBases.findIndex(b => b.id === state.currentSkinId);
            let nextIndex = key.rightArrow ? currentIndex + 1 : currentIndex - 1;
            if (nextIndex >= availableBases.length)
                nextIndex = 0;
            if (nextIndex < 0)
                nextIndex = availableBases.length - 1;
            const nextSkinId = availableBases[nextIndex].id;
            engine.setSkin(nextSkinId);
            setState({ ...state, currentSkinId: nextSkinId });
        }
    });
    return _jsx(App, { state: state, renderer: renderer, userName: userName, godMode: godMode });
};
const RichReaction = ({ result, language }) => {
    const renderer = new CharacterRenderer();
    return (_jsxs(Box, { flexDirection: "column", children: [_jsx(CommitReaction, { state: result.state, renderer: renderer, message: result.message }), _jsx(UnlockNotification, { language: language, newSkins: result.newSkins, newTitles: result.newTitles })] }));
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
                render(_jsx(RichReaction, { result: result, language: lang }));
            }
            process.exit(0);
        }
        if (cmd === '--debug-unlock') {
            // Simulation of unlock notification
            const dummyResult = {
                state: engine.getState(),
                message: 'Debug Simulation',
                newSkins: ['MECHA-GENUS'],
                newTitles: ['Legendary Developer']
            };
            render(_jsx(RichReaction, { result: dummyResult, language: lang }));
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
    render(_jsx(TuiApp, { engine: engine, renderer: renderer, userName: stats.userName, initialState: updatedState, godMode: godMode }));
};
main();
