# twitter-block

## Setup

### 1. ライブラリのインストール

```
npm install
```

### 2. Twitter のパラメータを準備

config.json ファイルを準備する

```
{
  "consumer_key": "...",
  "consumer_secret": "...",
  "access_token_key": "...",
  "access_token_secret": "..."
}
```

### 3. data.txt の作成

@なしのスクリーンネームを改行で区切る

```
hoge
fuga
...
```

### 4. 実行

```
node index.js
```

#### Options

- input
  - チェックするユーザーのスクリーンネームが改行(`\n`)で分けられたファイル
