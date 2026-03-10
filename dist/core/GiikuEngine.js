import { TitleEngine } from './TitleEngine.js';
import { GIIKU_CONFIG } from '../assets/config.js';
export class GiikuEngine {
    stateStore;
    gitProvider;
    titleEngine;
    constructor(stateStore, gitProvider) {
        this.stateStore = stateStore;
        this.gitProvider = gitProvider;
        this.titleEngine = new TitleEngine();
    }
    processHook(args) {
        if (args.length === 0)
            return null;
        const command = args[0];
        let currentState = this.refresh();
        const history = currentState.history;
        const condition = currentState.condition;
        const cfg = GIIKU_CONFIG.CONDITION;
        history.commandCounts[command] = (history.commandCounts[command] || 0) + 1;
        let actionMessage = '';
        if (command === 'commit') {
            condition.satiety = Math.min(cfg.SATIETY.MAX, condition.satiety + cfg.SATIETY.RECOVERY);
            actionMessage = '🍔 満腹度が回復した！ (Satiety UP)';
            const hour = new Date().getHours();
            if (hour >= 5 && hour <= 9) {
                history.morningCommits += 1;
            }
            if (args.join(' ').toLowerCase().includes('fix')) {
                history.fixCommits += 1;
            }
            history.lastCommitTime = new Date().toISOString();
        }
        else if (command === 'push') {
            condition.luster = Math.min(cfg.LUSTER.MAX, condition.luster + cfg.LUSTER.RECOVERY);
            actionMessage = '✨ ツヤが出た！ (Luster UP)';
            history.lastPushTime = new Date().toISOString();
        }
        else if (command === 'starve') {
            condition.satiety = Math.max(0, condition.satiety - cfg.DEBUG.DECREASE_AMOUNT);
            actionMessage = '💀 お腹が空いてきた... (Satiety DOWN)';
        }
        else if (command === 'rust') {
            condition.luster = Math.max(0, condition.luster - cfg.DEBUG.DECREASE_AMOUNT);
            actionMessage = '🌫️ ツヤが失われた... (Luster DOWN)';
        }
        const newTitles = this.titleEngine.evaluateTitles(currentState, command);
        const updatedState = {
            ...currentState,
            condition,
            history,
            titles: newTitles,
        };
        this.stateStore.save(updatedState);
        if (!actionMessage && ['pull', 'checkout', 'branch', 'add'].includes(command)) {
            actionMessage = '👾 キャラクターはあなたの作業を見守っている...';
        }
        return { message: actionMessage, state: updatedState };
    }
    refresh() {
        const currentState = this.stateStore.get();
        const stats = this.gitProvider.getStats();
        const cfg = GIIKU_CONFIG.CONDITION;
        let newSatiety = currentState.condition.satiety;
        let newLuster = currentState.condition.luster;
        const lastUpdate = new Date(currentState.lastUpdate).getTime();
        const now = new Date().getTime();
        const hoursPassed = (now - lastUpdate) / (1000 * 60 * 60);
        if (hoursPassed > 1) {
            newSatiety = Math.max(0, newSatiety - Math.floor(hoursPassed * cfg.SATIETY.DECAY_PER_HOUR));
            newLuster = Math.max(0, newLuster - Math.floor(hoursPassed * cfg.LUSTER.DECAY_PER_HOUR));
        }
        const lastUpdateDate = new Date(currentState.lastUpdate).toLocaleDateString();
        const nowDate = new Date().toLocaleDateString();
        let daysActive = currentState.daysActive;
        if (lastUpdateDate !== nowDate) {
            daysActive += 1;
        }
        const updatedState = {
            ...currentState,
            totalCommits: stats.totalCommits,
            todayCommits: stats.todayCommits,
            lastUpdate: new Date().toISOString(),
            daysActive,
            condition: {
                ...currentState.condition,
                satiety: newSatiety,
                luster: newLuster,
            }
        };
        this.stateStore.save(updatedState);
        return updatedState;
    }
    getState() {
        return this.stateStore.get();
    }
    setSkin(skinId) {
        const currentState = this.stateStore.get();
        this.stateStore.save({
            ...currentState,
            currentSkinId: skinId
        });
    }
}
