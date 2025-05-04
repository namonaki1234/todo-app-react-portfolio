# 🚀 React + TypeScript + Vite

## 📁 プロジェクト構成 - `todo-app-react-portfolio`

本アプリは、**React + Vite + Supabase** をベースにした ToDo アプリケーションです。  
**Jotai** による状態管理と **Tailwind CSS / ShadCN UI** によるモダンな UI を実装しています。

---

## 📂 ディレクトリ構成

<!-- <details> -->
<!-- <summary>展開して表示</summary> -->

```plaintext
todo-app-react-portfolio/
├── node_modules/            # 各種依存ライブラリ（自動生成）
├── public/                  # 静的ファイル（faviconなど）
├── src/                     # アプリのソースコード本体
│   ├── api/                 # API操作に関する関数（fetchやSupabase操作）
│   ├── atoms/               # Jotai によるグローバルステート管理ファイル
│   ├── components/          # 再利用可能なUI部品
│   │   └── ui/              # ShadCNベースのUIコンポーネント（Buttonなど）
│   ├── lib/                 # 補助的な関数・ユーティリティ
│   ├── routes/              # react-router-domによる画面構成とページコンポーネント
│   ├── supabase/            # Supabase クライアントの初期化設定など
│   └── types/               # TypeScript用の型定義ファイル
├── vite.config.ts           # Viteの設定ファイル
├── tailwind.config.ts       # Tailwind CSSのカスタマイズ設定
├── tsconfig.json            # TypeScriptの設定
├── .eslintrc.cjs            # ESLintのルール設定
├── .prettierrc              # Prettierのフォーマット設定
└── README.md                # 本ファイル（プロジェクト概要）
