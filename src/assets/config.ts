/**
 * Gi育 (Giiku) - 育成パラメータ・ゲームバランス設定ファイル
 * ==========================================================
 * このファイルの数値を調整することで、ゲームバランスを自由に変更できます。
 */

export const GIIKU_CONFIG = {
  // --- コンディション管理 (Condition Management) ---
  CONDITION: {
    // 満腹度 (Satiety) - git commit で回復
    SATIETY: {
      INITIAL: 80,          // 初期値
      MAX: 100,             // 最大値
      RECOVERY: 20,         // git commit 1回あたりの回復量
      DECAY_PER_HOUR: 2,    // 1時間あたりの減少量 (%)
      HUNGRY_THRESHOLD: 30, // 飢餓状態と見なす閾値 (これ以下で見た目が変化)
    },
    // ツヤ (Luster) - git push で上昇
    LUSTER: {
      INITIAL: 50,          // 初期値
      MAX: 100,             // 最大値
      RECOVERY: 15,         // git push 1回あたりの上昇量
      DECAY_PER_HOUR: 1,    // 1時間あたりの減少量 (%)
      AURA_THRESHOLD: 40,   // オーラが発生し始める閾値
      SPARKLE_THRESHOLD: 80, // 粒子が豪華になる閾値
    },
    // デバッグ用
    DEBUG: {
      DECREASE_AMOUNT: 20,  // starve/rust コマンドでの減少量
    }
  },

  // --- 称号判定 (Title System) ---
  TITLES: {
    MORNING_START: 5,       // 朝コミット判定の開始時間 (時)
    MORNING_END: 9,         // 朝コミット判定の終了時間 (時)
    MORNING_COUNT: 3,       // 「早起きのエンジニア」に必要な朝コミット数
    
    FIX_COUNT: 5,           // 「デバッグの鬼」に必要な "fix" コミット数
    VETERAN_COUNT: 100,     // 「百戦錬磨」に必要な累計コミット数
    
    CAUTIOUS_RATIO: 2,      // 「慎重派」判定用の比率 (diff/commit)
    CAUTIOUS_MIN_DIFF: 5,   // 「慎重派」に必要な最小 diff 数
    
    BURNING_START: 22,      // 「炎上中」判定の開始時間 (時)
    BURNING_END: 3,         // 「炎上中」判定の終了時間 (時)
    BURNING_MIN_COMMIT: 10, // 「炎上中」に必要な深夜コミット数
  }
};
