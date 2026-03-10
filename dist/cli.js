#!/usr/bin/env node
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, Text, Box, useApp, useInput } from 'ink';
import { App } from './components/App.js';
import { GiikuEngine } from './core/GiikuEngine.js';
import { GitProvider } from './infra/GitProvider.js';
import { ConfStateStore } from './infra/ConfStateStore.js';
import { SetupManager } from './core/SetupManager.js';
// --- 仮のレンダラー ---
class SimpleRenderer {
    render(state) {
        let emoji = '👾';
        const c = state.condition;
        if (c.satiety < 20)
            emoji = '💀';
        else if (c.satiety < 50)
            emoji = '😧';
        else if (c.luster > 80)
            emoji = '✨👾✨';
        return (_jsxs(Box, { flexDirection: "column", children: [_jsx(Text, { children: `   ___   ` }), _jsx(Text, { children: `  | ${emoji} | ` }), _jsx(Text, { children: `  |_____| ` }), _jsx(Text, { children: `   /   \\  ` })] }));
    }
}
const TuiApp = ({ engine, renderer, userName }) => {
    const { exit } = useApp();
    const state = engine.refresh();
    useInput((input) => { if (input === 'q')
        exit(); });
    return _jsx(App, { state: state, renderer: renderer, userName: userName });
};
const showHelp = () => {
    console.log(`
  👾 Giiku (Gi育) - Git操作でキャラクターを育てる育成ツール

  使い方:
    giiku [オプション]

  オプション:
    (なし)            TUI (フル画面モード) を起動します。衣装の確認などができます。
    --setup           シェルの設定ファイル (.bashrc/.zshrc) にフックと起動時挨拶を追加します。
    --remove-setup    シェルの設定ファイルからGiikuの設定を削除します。
    --startup         キャラクターからの挨拶を表示します (シェル起動時に自動実行されます)。
    --status-line     現在のステータスを1行で表示します (gitコマンド後に自動実行されます)。
    --help, -h        このヘルプを表示します。
    --version, -v     バージョン情報を表示します。

  育成のヒント:
    - git commit      お腹が空いたらご飯 (Satiety 回復)
    - git push        頑張ったら自分を磨く (Luster 上昇)
    - git status/diff 状況を把握して賢くなる (Intellect 上昇)
  `);
};
const main = () => {
    const args = process.argv.slice(2);
    const gitProvider = new GitProvider();
    const stateStore = new ConfStateStore();
    const engine = new GiikuEngine(stateStore, gitProvider);
    const setupManager = new SetupManager();
    if (args.length > 0) {
        const cmd = args[0];
        if (cmd === '--setup') {
            setupManager.install();
            process.exit(0);
        }
        if (cmd === '--remove-setup') {
            setupManager.uninstall();
            process.exit(0);
        }
        if (cmd === '--startup') {
            const state = engine.refresh();
            const userName = gitProvider.getStats().userName;
            const emoji = state.condition.satiety < 30 ? '🤤 (お腹すいた...)' : '👾';
            console.log(`\n${emoji} やあ ${userName}！ 今日の開発も頑張ろう！ [Satiety: ${state.condition.satiety}%]`);
            process.exit(0);
        }
        if (cmd === '--status-line') {
            const state = engine.getState();
            const title = state.titles[0] || '無題';
            console.log(`👾 [Satiety: ${state.condition.satiety}% | Luster: ${state.condition.luster}% | Intellect: ${state.condition.intellect}% | Title: ${title}]`);
            process.exit(0);
        }
        if (cmd === '--hook') {
            engine.processHook(args.slice(1));
            process.exit(0);
        }
        if (cmd === '--help' || cmd === '-h') {
            showHelp();
            process.exit(0);
        }
        if (cmd === '--version' || cmd === '-v') {
            console.log('giiku v0.1.0');
            process.exit(0);
        }
    }
    const renderer = new SimpleRenderer();
    const stats = gitProvider.getStats();
    render(_jsx(TuiApp, { engine: engine, renderer: renderer, userName: stats.userName }));
};
main();
