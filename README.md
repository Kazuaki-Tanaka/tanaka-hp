# tanaka-hp

田中一成（Kazuaki Tanaka）の学術ホームページのソース。

- 公開 URL: https://tanaka.s-top.dev/ （英語: https://tanaka.s-top.dev/en/ ）
- ホスティング: GitHub Pages（`main` への push で `.github/workflows/deploy.yml` がビルド・デプロイ）

## 構成

- [Astro](https://astro.build/) + Tailwind CSS
- 日本語 / 英語の 2 言語（`src/pages/ja/`, `src/pages/en/`）
- 論文・講演の正本は `data/publications.yaml` と `data/talks.yaml`。ページはこの YAML から生成する
- プロフィール・受賞・助成は `src/pages/{ja,en}/index.astro` に直接記述

## 開発

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ を生成
npm run preview  # ビルド結果の確認
```

## ライセンス・著作権

本文・業績データ・画像の著作権は田中一成に帰属する。サイトの構築コード（`src/` 以下の Astro/TypeScript/CSS）は参考にしてよいが、コンテンツの転載は事前に連絡すること。

Copyright © Kazuaki Tanaka. All rights reserved.
