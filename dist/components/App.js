import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Text } from 'ink';
import { translations } from '../assets/translations.js';
import { BASES } from '../assets/parts.js';
export const App = ({ state, renderer, userName }) => {
    const lang = state.language || 'en';
    const t = translations[lang].labels;
    // Find index of current skin within unlocked ones
    const unlockedBases = BASES.filter(b => state.unlockedSkinIds.includes(b.id));
    const currentIndex = unlockedBases.findIndex(b => b.id === state.currentSkinId) + 1;
    const totalUnlocked = unlockedBases.length;
    return (_jsxs(Box, { flexDirection: "column", borderStyle: "round", borderColor: "cyan", padding: 1, children: [_jsxs(Box, { marginBottom: 1, justifyContent: "space-between", children: [_jsxs(Text, { bold: true, color: "green", children: ["\uD83D\uDC7E Giiku (v0.1.0) - User: ", userName] }), _jsxs(Text, { color: "gray", children: ["[", currentIndex, "/", totalUnlocked, "]"] })] }), _jsxs(Box, { flexDirection: "row", children: [_jsxs(Box, { width: 30, justifyContent: "center", flexDirection: "column", alignItems: "center", children: [renderer.render(state), _jsx(Box, { marginTop: 1, children: _jsxs(Text, { color: "cyan", inverse: true, children: [" ", unlockedBases[currentIndex - 1]?.name, " "] }) })] }), _jsxs(Box, { flexDirection: "column", paddingLeft: 2, children: [_jsx(Text, { color: "yellow", bold: true, children: t.status }), _jsxs(Text, { children: ["  ", t.satiety, ": ", state.condition.satiety, "%"] }), _jsxs(Text, { children: ["  ", t.luster, ":  ", state.condition.luster, "%"] }), _jsx(Box, { marginTop: 1, children: _jsxs(Text, { color: "white", dimColor: true, children: [t.totalCommits, ": ", state.totalCommits] }) }), _jsx(Box, { children: _jsxs(Text, { color: "white", dimColor: true, children: [t.todayCommits, ": ", state.todayCommits] }) }), _jsx(Box, { children: _jsxs(Text, { color: "white", dimColor: true, children: [t.activeDays, ":   ", state.daysActive] }) }), _jsx(Box, { marginTop: 1, children: _jsxs(Text, { children: [t.title, ": ", _jsx(Text, { color: "magenta", italic: true, children: state.titles[0] })] }) })] })] }), _jsx(Box, { marginTop: 1, borderStyle: "single", borderColor: "gray", children: _jsxs(Text, { dimColor: true, children: [" ", t.quit, " "] }) })] }));
};
