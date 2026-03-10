import { GiikuState } from '../types.js';
import { translations } from '../assets/translations.js';

export class TitleEngine {
  public evaluateTitles(state: GiikuState, lastCommand?: string): string[] {
    const lang = state.language || 'en';
    const t = translations[lang].titles;
    const titles = new Set<string>([t.novice]);
    const history = state.history;

    if (history.morningCommits >= 3) {
      titles.add(t.earlyBird);
    }
    if (history.fixCommits >= 5) {
      titles.add(t.debugDemon);
    }
    if (state.totalCommits >= 100) {
      titles.add(t.veteran);
    }

    const diffCount = history.commandCounts['diff'] || 0;
    const statusCount = history.commandCounts['status'] || 0;
    const commitCount = history.commandCounts['commit'] || 0;

    if (diffCount > commitCount * 2 && diffCount > 5) {
      titles.add(t.cautious);
    }
    if (commitCount > 10 && (new Date().getHours() > 22 || new Date().getHours() < 3)) {
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
