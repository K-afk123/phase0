#!/bin/bash

# このスクリプトは、Vite+React+TSの標準的なプロジェクト構造と
# 必要な設定ファイルをすべて自動で作成します。

echo "プロジェクトのファイルを作成しています..."

# srcディレクトリを作成
mkdir -p src

# --- ルートファイルの作成 ---

echo "📄 .nvmrc を作成中"
cat << 'EOF' > .nvmrc
20
EOF

echo "📄 index.html を作成中"
cat << 'EOF' > index.html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

echo "📄 vite.config.ts を作成中"
cat << 'EOF' > vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
EOF

echo "📄 tsconfig.json を作成中"
cat << 'EOF' > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

echo "📄 tsconfig.node.json を作成中"
cat << 'EOF' > tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
EOF

echo "📄 .eslintrc.cjs を作成中"
cat << 'EOF' > .eslintrc.cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
EOF

# --- srcディレクトリ内のファイルの作成 ---

echo "📄 src/main.tsx を作成中"
cat << 'EOF' > src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

echo "📄 src/App.tsx を作成中"
cat << 'EOF' > src/App.tsx
function App() {
  return (
    <>
      <h1>Vite + React</h1>
    </>
  )
}

export default App
EOF

echo "📄 src/vite-env.d.ts を作成中"
cat << 'EOF' > src/vite-env.d.ts
/// <reference types="vite/client" />
EOF

echo "📄 src/index.css を作成中"
cat << 'EOF' > src/index.css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
EOF

echo "✅ プロジェクトのセットアップが完了しました。"
echo "次に、'npm install' を実行して依存関係をインストールしてください。"
