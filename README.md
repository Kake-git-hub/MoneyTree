# 金のなる木 🌳💰

資産形成を楽しく可視化するPWAアプリです。  
目標金額を設定し、証券口座の資産額を入力すると、達成度に応じて木が成長します。

## 機能

- **7段階の成長**: 種 → 芽 → 苗木 → 小さな木 → 大きな木 → 花が咲く → 実がなる
- **目標設定**: 資産目標額を自由に設定
- **金額入力**: 現在の資産額を随時入力（メモ付き）
- **履歴表示**: 入力履歴と増減額を表示
- **複数の木**: 複数の目標（老後資金、教育資金など）を管理
- **PWA対応**: スマホのホーム画面にインストール可能
- **オフライン対応**: データはブラウザに保存

## 使い方

1. アプリを開く
2. 木の名前（例: 老後資金）と目標金額を入力
3. 「木を植える」をタップ
4. 定期的に証券口座の資産額を入力
5. 木の成長を楽しむ！

## 技術スタック

- React 19 + TypeScript
- Vite
- vite-plugin-pwa (PWA対応)
- LocalStorage (データ保存)

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## PWAとしてインストール

### iPhone/iPad
1. Safariでアプリを開く
2. 共有ボタン → 「ホーム画面に追加」

### Android
1. Chromeでアプリを開く
2. メニュー → 「ホーム画面に追加」または「アプリをインストール」

### PC (Chrome/Edge)
1. アドレスバーのインストールアイコンをクリック

## ライセンス

MIT
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
