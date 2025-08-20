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

## 3. セーブ/ロード機構

- **永続化技術**: ブラウザの `localStorage` を使用します。
- **保存タイミング**: プレイヤーが重要なアクション（メニュー開発、内装変更、チャプタークリアなど）を完了した際、および設定画面から手動でセーブした際に、`GameState`オブジェクト全体が自動的に保存されます。
- **データ形式**: `GameState` オブジェクトを `JSON.stringify()` で文字列にシリアライズし、キー `'cocologic-cafe-save-data'` の値として `localStorage` に保存します。
- **ロードタイミング**: ゲーム起動時に、`localStorage` に該当キーのデータが存在すれば、それを `JSON.parse()` でデシリアライズしてゲーム状態を復元します。データが存在しない場合は、下記の初期状態でゲームを開始します。

## 4. ゲームの初期状態

新規ゲーム開始時の `GameState` の初期値は以下のように定義されます。これは、最終的に `src/constants/initialGameState.ts` のような定数ファイルとして実装されることを想定しています。

```typescript
const initialGameState: GameState = {
  money: 1000,
  reputation: 0,
  currentChapterId: 'prologue',
  completedEventIds: [],
  discoveryMemo: [],
  developedMenus: [
    // 初期からあるメニューなど
  ],
  unlockedDecorations: [
    // 初期からある内装など
  ],
  currentLayout: {},
  unlockedRecipeHints: [],
};
```
