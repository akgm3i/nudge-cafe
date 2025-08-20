# データ構造定義書

このドキュメントは、「ココロジック・カフェ」のゲーム状態（`gameState`）を管理するためのデータ構造を定義します。
ここで定義されるデータは、複数のドメイン（機能）をまたいで利用され、ゲームのセーブデータとして永続化されることを想定しています。

## 1. GameState (グローバルなゲーム状態)

ゲーム全体の状態を保持するトップレベルのインターフェースです。

```typescript
interface GameState {
  // プレイヤーの基本リソース
  money: number;
  reputation: number;

  // 物語の進行状況
  currentChapterId: string;
  completedEventIds: string[];

  // 発見メモの内容
  discoveryMemo: DiscoveryMemoEntry[];

  // 開発済みのメニュー
  developedMenus: Menu[];

  // 解放済みの内装アイテム
  unlockedDecorations: Decoration[];

  // 現在のカフェの内装レイアウト
  // keyは 'counter', 'window' などの配置エリアID
  currentLayout: Record<string, string>; // { [areaId: string]: decorationId; }

  // 解読済みのレシピノートのヒント
  unlockedRecipeHints: string[];
}
```

## 2. 各データ構造の詳細

### DiscoveryMemoEntry

「発見メモ」に記録される単一のエントリです。祖父の詩と、それに対応するプレイヤーの発見（行動経済学の概念）を紐付けます。

```typescript
interface DiscoveryMemoEntry {
  id: string; // 発見ID (例: 'decoy-effect')
  poem: string; // 祖父の詩
  discovery: string; // プレイヤーが発見した概念
  isNew: boolean; // 新しく発見した際にtrueとなり、通知などに使われる
}
```

### Menu

プレイヤーが開発したメニューの定義です。

```typescript
interface Menu {
  id: string; // メニューID
  base: string; // ベース (例: 'coffee', 'tea')
  arrangement: string; // アレンジ (例: 'milk', 'lemon')
  name: string; // プレイヤーが付けた名前
  price: number; // 価格
  description: string; // 説明文
}
```

### Decoration

カフェに配置可能な内装アイテムの定義です。

```typescript
interface Decoration {
  id: string; // アイテムID
  name: string; // アイテム名
  area: 'counter' | 'window' | 'wall'; // 配置可能なエリア
}
```
