# Gi育 (Giiku) プロジェクト仕様書 & 開発ガイド

## 1. プロジェクト概要
「Gi育（ぎいく）」は、日々の開発（Git操作）をキャラクターの育成体験に変換するCLIツールです。
特定のレポジトリに限定されず、ローカルマシン全体のGitアクションをフックし、PC単位でキャラクターを成長させます。

### 主要な特徴
- **TypeScript & React (Ink)**: 型安全でモダンなCLI開発。
- **PCワイドな育成**: どのプロジェクトで作業しても、あなたのキャラクターは一貫して成長します。
- **多言語対応**: デフォルト英語、セットアップ時の指定で完全日本語化が可能。

---

## 2. プロジェクトのアーキテクチャ

本プロジェクトは、**クリーンアーキテクチャ**の思想を取り入れ、ビジネスロジックと外部依存（インフラ）を分離しています。これにより、描画エンジンの差し替えや、Git以外のイベントへの対応が容易になっています。

### ディレクトリ構造と責務

```text
src/
├── assets/             # 静的データ・アセット定義
│   ├── skins/          # スキン（キャラクター）定義。AAと解放条件を同梱。
│   ├── titles/         # 称号定義。名前と獲得条件ロジックを同梱。
│   ├── config.ts       # ゲームバランス（減衰率、閾値、UIサイズ）の設定。
│   └── translations.ts # 文言の辞書ファイル。
├── components/         # UIコンポーネント (React/Ink)
│   ├── App.tsx         # メインのTUI画面。
│   ├── CommitReaction.tsx # コミット成功時の演出。
│   └── UnlockNotification.tsx # 解放通知パネル。
├── core/               # ドメイン（ビジネス）ロジック
│   ├── GiikuEngine.ts  # 育成の計算、フック処理の司令塔。
│   ├── TitleEngine.ts  # 称号判定の実行エンジン。
│   └── SetupManager.ts # シェル(.zshrc等)への統合管理。
├── infra/              # 外部依存（インフラ）層
│   ├── GitProvider.ts  # Gitコマンドの実行と結果解析。
│   ├── ConfStateStore.ts # ローカルファイルへの状態保存 (conf)。
│   └── CharacterRenderer.tsx # ASCIIアート描画エンジン。
├── types.ts            # プロジェクト全体の型・インターフェース定義。
└── cli.tsx             # エントリーポイント。引数解析とDIの組み立て。
```

### 依存性注入 (DI) の流れ
`src/cli.tsx` にて各クラスのインスタンスを生成し、上位レイヤーへ注入します。
1.  `GitProvider` と `ConfStateStore` を生成。
2.  それらを `GiikuEngine` に注入。
3.  `GiikuEngine` をUI層（`App.tsx`）へ渡す。
これにより、テスト時には Mock の Provider を注入するだけでロジックの検証が可能になります。

---

## 3. 育成・ゲームシステム

### データのライフサイクル
1.  **フック発火**: ユーザーが `git commit` 等を実行。
2.  **更新計算**: `GiikuEngine.refresh()` が呼ばれ、時間経過による減衰を計算。
3.  **アクション適用**: 実行されたコマンドに応じて、満腹度やツヤを加算。
4.  **アンロック判定**: `SkinDefinition.checkUnlock()` と `TitleDefinition.check()` を全走査。
5.  **永続化**: `ConfStateStore` を通じて PC 固有の領域に JSON 保存。

### コンディション管理
- **満腹度 (Satiety)**: 1時間ごとに -2%。`git commit` で回復。
- **ツヤ (Luster)**: 1時間ごとに -1%。`git push` で上昇。オーラ演出に直結。

---

## 4. UI/UX 仕様

### 4つのタッチポイント
1.  **起動時 (`--startup`)**: シェル起動時に挨拶を表示。
2.  **日常 (`--status-line`)**: `git status` 実行後に現在の状態を表示。
3.  **達成時 (`--commit-reaction`)**: `git commit` 後にリッチUIで祝福。
4.  **管理 (TUI)**: `giiku` コマンドでフル画面モードを起動。

### TUIモードの操作
- **左右キー**: 獲得済みスキンの切り替え。
- **`/` キー (検索)**: 曖昧検索でスキンを絞り込み。
- **上下キー**: 検索結果リストから選択。

---

## 5. 開発者・チーム向けガイド

### 新規要素の追加
- **称号追加**: `src/assets/titles/` にファイル作成。`isDynamic: true` にするとメイン称号として優先表示されます。
- **スキン追加**: `src/assets/skins/` にファイル作成。`CHARACTER_FRAME_HEIGHT` (12行) 以内に収まるAAを推奨。

### デバッグ機能
`giiku --help --debug` で表示されるコマンドを活用してください。
- `--god-mode`: 全スキンを即時解放。UIレイアウト確認に便利です。
- `--hook starve/rust`: 状態変化のテスト用。

---

## 6. セットアップ
```bash
npm install
npm run build
npm run link-cli
giiku --setup --ja  # 日本語環境として構築
```
