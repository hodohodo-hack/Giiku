/**
 * Gi育 (Giiku) - 育成パラメータ・ゲームバランス設定ファイル
 */

export const GIIKU_CONFIG = {
  // --- コンディション管理 (Condition Management) ---
  CONDITION: {
    SATIETY: {
      INITIAL: 80,
      MAX: 100,
      RECOVERY: 20,
      DECAY_PER_HOUR: 2,
      HUNGRY_THRESHOLD: 30,
    },
    LUSTER: {
      INITIAL: 50,
      MAX: 100,
      RECOVERY: 15,
      DECAY_PER_HOUR: 1,
      AURA_THRESHOLD: 40,
      SPARKLE_THRESHOLD: 80,
    },
    DEBUG: {
      DECREASE_AMOUNT: 20,
    }
  }
  // 称号設定は src/assets/titles/ 配下に移動しました
};
