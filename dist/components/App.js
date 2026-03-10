import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Box, Text } from 'ink';
import { translations } from '../assets/translations.js';
import { SKIN_DEFINITIONS } from '../assets/skins/definitions.js';
export const App = ({ state, renderer, userName, godMode = false, searchQuery = '', isSearchMode = false, searchResults = [], selectedIndex = 0 }) => {
    const lang = state.language || 'en';
    const t = translations[lang].labels;
    const unlockedBases = SKIN_DEFINITIONS.filter(b => godMode || state.unlockedSkinIds.includes(b.id));
    const currentSkin = searchResults.length > 0 ? searchResults[selectedIndex] : unlockedBases.find(b => b.id === state.currentSkinId) || unlockedBases[0];
    const totalAvailable = unlockedBases.length;
    const currentDisplayIndex = unlockedBases.indexOf(currentSkin) + 1;
    // スライディングウィンドウ（最大3件表示）の計算
    const windowSize = 3;
    let start = Math.max(0, selectedIndex - Math.floor(windowSize / 2));
    let end = start + windowSize;
    if (end > searchResults.length) {
        end = searchResults.length;
        start = Math.max(0, end - windowSize);
    }
    const visibleResults = searchResults.slice(start, end);
    return (_jsxs(Box, { flexDirection: "column", borderStyle: "round", borderColor: "cyan", padding: 1, children: [_jsxs(Box, { marginBottom: 1, justifyContent: "space-between", children: [_jsxs(Box, { flexDirection: "row", children: [_jsx(Text, { bold: true, color: "green", children: "\uD83D\uDC7E Giiku (v0.1.0)" }), godMode && _jsx(Text, { color: "red", bold: true, children: " [GOD MODE]" }), _jsxs(Text, { children: [" - User: ", userName] })] }), _jsxs(Text, { color: "gray", children: ["[", currentDisplayIndex, "/", totalAvailable, "]"] })] }), _jsxs(Box, { flexDirection: "row", children: [_jsx(Box, { width: 30, justifyContent: "center", flexDirection: "column", alignItems: "center", children: currentSkin ? (_jsxs(React.Fragment, { children: [renderer.render({ ...state, currentSkinId: currentSkin.id }), _jsx(Box, { marginTop: 1, children: _jsxs(Text, { color: "cyan", inverse: true, children: [" ", currentSkin.name, " "] }) })] })) : (_jsx(Text, { color: "red", children: t.noResults })) }), _jsxs(Box, { flexDirection: "column", paddingLeft: 2, children: [_jsx(Text, { color: "yellow", bold: true, children: t.status }), _jsxs(Text, { children: ["  ", t.satiety, ": ", state.condition.satiety, "%"] }), _jsxs(Text, { children: ["  ", t.luster, ":  ", state.condition.luster, "%"] }), _jsx(Box, { marginTop: 1, children: _jsxs(Text, { color: "white", dimColor: true, children: [t.totalCommits, ": ", state.totalCommits] }) }), _jsx(Box, { children: _jsxs(Text, { color: "white", dimColor: true, children: [t.todayCommits, ": ", state.todayCommits] }) }), _jsx(Box, { children: _jsxs(Text, { color: "white", dimColor: true, children: [t.activeDays, ":   ", state.daysActive] }) }), _jsx(Box, { marginTop: 1, children: _jsxs(Text, { children: [t.title, ": ", _jsx(Text, { color: "magenta", italic: true, children: state.titles[0] })] }) })] })] }), isSearchMode && (_jsxs(Box, { flexDirection: "column", marginTop: 1, children: [searchResults.length > 0 && (_jsxs(Box, { flexDirection: "column", paddingX: 1, marginBottom: 1, children: [start > 0 && _jsxs(Text, { dimColor: true, children: ["   \u2191 (", start, " more)"] }), visibleResults.map((res, i) => {
                                const globalIndex = start + i;
                                return (_jsxs(Text, { color: globalIndex === selectedIndex ? 'cyan' : 'white', children: [globalIndex === selectedIndex ? ' > ' : '   ', " ", res.name] }, res.id));
                            }), end < searchResults.length && _jsxs(Text, { dimColor: true, children: ["   \u2193 (", searchResults.length - end, " more)"] })] })), _jsxs(Box, { paddingX: 1, borderStyle: "single", borderColor: "yellow", children: [_jsx(Text, { bold: true, color: "yellow", children: t.searchPlaceholder }), _jsx(Text, { children: searchQuery }), _jsx(Text, { color: "yellow", bold: true, children: "_" })] })] })), _jsx(Box, { marginTop: 1, borderStyle: "single", borderColor: "gray", children: _jsxs(Text, { dimColor: true, children: [" ", t.quit, " "] }) })] }));
};
