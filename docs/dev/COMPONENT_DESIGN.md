# コンポーネント設計方針

このドキュメントは、「ココロジック・カフェ」のフロントエンド開発におけるReactコンポーネントの設計方針を定義します。ユーザーからのフィードバックに基づき、ゲームの主要画面に **Canvas** を使用することを前提とした、より実践的な設計に改訂しました。

## 1. 基本アーキテクチャ：ハイブリッドモデル

本作では、**HTML DOM** と **HTML5 Canvas** を組み合わせたハイブリッドアーキテクチャを採用します。

- **Canvasレイヤー**: ゲームのメインビューとなるカフェ店内、キャラクター（ニャッジ、お客さん）、アニメーション、エフェクトなど、動的でグラフィカルな要素の描画を担当します。
- **DOMレイヤー**: ヘッダー、フッター、モーダルウィンドウ（レシピノートなど）、ボタンといった、静的なUI要素の描画を担当します。Canvasレイヤーの上に重ねて表示します。

この構成により、Canvasの描画性能と、DOMのUI構築のしやすさ・アクセシビリティという両方の利点を活かします。

## 2. Canvasレンダリングライブラリ

Canvasレイヤーの実装には、**[React Konva](https://konvajs.org/docs/react/index.html)** の採用を推奨します。

- **理由**:
  - Reactのコンポーネント構文で宣言的にCanvasのシーンを構築でき、React開発者にとって学習コストが低い。
  - パフォーマンスが最適化されており、インタラクティブな2Dゲームに適している。
  - Reactのステート管理やライフサイクルと自然に統合できる。

## 3. ディレクトリ構成

ハイブリッドモデルを反映し、ディレクトリ構成を以下のように定義します。

```
src
├── /assets/          # 画像、フォント、スプライトシートなどの静的ファイル
├── /canvas/          # Canvasレイヤーを構成するKonvaコンポーネント
│   ├── /characters/  # ニャッジ、お客さんなどのキャラクター
│   └── /stage/       # 背景、家具などのステージ要素
├── /components/      # DOMレイヤーを構成するReactコンポーネント
│   ├── /domain/      # ゲームのドメインに特化したコンポーネント (例: RecipeNote)
│   └── /ui/          # 汎用的なUIパーツ (例: Button, Modal)
├── /contexts/        # グローバルな状態を共有するためのReact Context
├── /hooks/           # UI/Canvas双方で利用するカスタムフック（ビジネスロジック）
├── /pages/           # アプリケーションの各ページに対応するコンポーネント
├── /styles/          # グローバルなCSSやテーマ定義
└── /types/           # プロジェクト全体で利用するTypeScriptの型定義
```

## 4. コンポーネント設計

### DOMコンポーネント (`/components`)
- `Button`や`Modal`などのUI要素です。
- 設計思想は旧版と同様、カスタムフック（`useHoge`）からロジックを受け取り、自身はUIのレンダリングに集中します。

### Canvasコンポーネント (`/canvas`)
- `react-konva`の`<Layer>`, `<Rect>`, `<Image>`, `<Sprite>`などを用いて、ゲーム世界の要素を表現します。
- これらもReactコンポーネントであるため、Propsを受け取ったり、Contextからグローバル状態を購読したりできます。

### 具体例：ニャッジの表示

**ロジック: `src/hooks/useNyadge.ts`**
```typescript
import { useState } from 'react';

// ニャッジの状態を管理し、座標や表示スプライトを返すフック
export const useNyadge = () => {
  const [pos, setPos] = useState({ x: 100, y: 150 });
  const [animation, setAnimation] = useState('idle'); // 'idle', 'walk', 'jump'

  // ゲームロジックに応じて座標やアニメーションを更新する...

  return { pos, animation };
};
```

**Canvasコンポーネント: `src/canvas/characters/Nyadge.tsx`**
```typescript
import React from 'react';
import { Sprite } from 'react-konva';
import { useNyadge } from '../../hooks/useNyadge';
import useImage from 'use-image';

// ニャッジのスプライトシートを読み込む
const NyadgeSpriteSheet: React.FC = () => {
  const { pos, animation } = useNyadge();
  const [image] = useImage('/assets/nyadge-sprite.png');

  // スプライトアニメーションの定義
  const animations = {
    idle: [0, 0, 48, 48,  48, 0, 48, 48], // x, y, w, h, ...
    walk: [0, 48, 48, 48,  48, 48, 48, 48],
  };

  return (
    <Sprite
      x={pos.x}
      y={pos.y}
      image={image}
      animation={animation}
      animations={animations}
      frameRate={7}
      frameIndex={0}
    />
  );
};
```
*（注: 上記は`react-konva`と`use-image`ライブラリの使用を想定したコード例です）*

## 5. 状態管理（State Management）
- 方針に変更はありません。`useState`によるローカルステートと、**Context API**によるグローバルステート（`gameState`）を使い分けます。
- `gameState`は、DOMコンポーネントとCanvasコンポーネントの両方から参照される、唯一の信頼できる情報源（Single Source of Truth）となります。
