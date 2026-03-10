import Conf from 'conf';
export class ConfStateStore {
    config;
    constructor() {
        this.config = new Conf({
            projectName: 'giiku-tui',
            defaults: {
                condition: { satiety: 80, luster: 50 },
                totalCommits: 0,
                todayCommits: 0,
                lastUpdate: new Date().toISOString(),
                currentSkinId: 'slime',
                daysActive: 1,
                titles: ['Novice Engineer'],
                history: {
                    commandCounts: {},
                    morningCommits: 0,
                    fixCommits: 0
                },
                language: 'en' // Default to English
            }
        });
    }
    get() {
        return this.config.store;
    }
    save(state) {
        const current = this.config.store;
        this.config.set({ ...current, ...state });
    }
}
