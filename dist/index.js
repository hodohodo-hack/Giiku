import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { render, Text, useApp, useInput } from 'ink';
import { App } from './components/App.js';
import { GiikuEngine } from './core/GiikuEngine.js';
import { GitProvider } from './infra/GitProvider.js';
import { ConfStateStore } from './infra/ConfStateStore.js';
/**
 * A basic renderer as a placeholder for the "other person's implementation".
 * This is easily swappable by creating a new class that implements ICharacterRenderer.
 */
class SimpleRenderer {
    render(state) {
        // Determine the character's mood/look based on satiety
        let emoji = '👾';
        if (state.condition.satiety < 20)
            emoji = '💀 (Starving)';
        else if (state.condition.satiety < 50)
            emoji = '😧 (Hungry)';
        else if (state.condition.satiety > 90)
            emoji = '🤩 (Full)';
        return (_jsxs(Text, { children: [`   ___   \n`, `  | ${emoji} | \n`, `  |_____| \n`, `   /   \\  `] }));
    }
}
const Main = () => {
    const { exit } = useApp();
    // 1. Initialize dependencies
    const gitProvider = new GitProvider();
    const stateStore = new ConfStateStore();
    const engine = new GiikuEngine(stateStore, gitProvider);
    const renderer = new SimpleRenderer();
    // 2. Initial data fetch and update
    const stats = gitProvider.getStats();
    const updatedState = engine.refresh();
    // 3. Simple input handling for exit
    useInput((input) => {
        if (input === 'q')
            exit();
    });
    return (_jsx(App, { state: updatedState, renderer: renderer, userName: stats.userName }));
};
render(_jsx(Main, {}));
