import { translations } from '../assets/translations.js';
import { GIIKU_CONFIG } from '../assets/config.js';
export class TitleEngine {
    evaluateTitles(state, lastCommand) {
        const lang = state.language || 'en';
        const t = translations[lang].titles;
        const cfg = GIIKU_CONFIG.TITLES;
        const titles = new Set([t.novice]);
        const history = state.history;
        // 早起きのエンジニア
        if (history.morningCommits >= cfg.MORNING_COUNT) {
            titles.add(t.earlyBird);
        }
        // デバッグの鬼
        if (history.fixCommits >= cfg.FIX_COUNT) {
            titles.add(t.debugDemon);
        }
        // 百戦錬磨
        if (state.totalCommits >= cfg.VETERAN_COUNT) {
            titles.add(t.veteran);
        }
        const diffCount = history.commandCounts['diff'] || 0;
        const commitCount = history.commandCounts['commit'] || 0;
        // 慎重派
        if (diffCount > commitCount * cfg.CAUTIOUS_RATIO && diffCount > cfg.CAUTIOUS_MIN_DIFF) {
            titles.add(t.cautious);
        }
        // 炎上中
        if (commitCount > cfg.BURNING_MIN_COMMIT && (new Date().getHours() >= cfg.BURNING_START || new Date().getHours() <= cfg.BURNING_END)) {
            titles.add(t.burning);
        }
        const titleArray = Array.from(titles);
        const dynamicTitle = titleArray.find(tStr => tStr.includes(':') || tStr.includes('：'));
        if (dynamicTitle) {
            return [dynamicTitle, ...titleArray.filter(tStr => tStr !== dynamicTitle)];
        }
        return titleArray.reverse();
    }
}
