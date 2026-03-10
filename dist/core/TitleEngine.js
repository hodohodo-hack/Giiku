import { TITLE_DEFINITIONS } from '../assets/titles/index.js';
export class TitleEngine {
    evaluateTitles(state, lastCommand) {
        const lang = state.language || 'en';
        const activeTitles = [];
        // 各称号の条件をチェック
        for (const def of TITLE_DEFINITIONS) {
            if (def.check(state)) {
                activeTitles.push(def.names[lang]);
            }
        }
        // 動的な称号（isDynamic: true）が取得されている場合、それを先頭（メイン）に持ってくる
        const dynamicTitleIndex = TITLE_DEFINITIONS.findIndex(d => d.isDynamic && activeTitles.includes(d.names[lang]));
        if (dynamicTitleIndex !== -1) {
            const dynamicName = TITLE_DEFINITIONS[dynamicTitleIndex].names[lang];
            return [dynamicName, ...activeTitles.filter(t => t !== dynamicName)];
        }
        return activeTitles;
    }
}
