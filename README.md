

<hr>

##  初めに

***必要条件***

システムに以下の依存関係がインストールされていることを確認してください:

* **Node v18+**
* **Pnpm**
* **Docker Compose**

###  Installation

1. リポジトリをクローンします:

```sh
git clone https://github.com/ryutarote/rest-api-app
```

2. プロジェクトディレクトリに移動します:

```sh
cd rest-api-app
```

3. ライブラリをインストールします:

```sh
pnpm install
```

###  セットアップ

1. Docker を使用してポート5432で待ち受けるPostgresデータベースを起動します:

```sh
docker-compose up -d
```

2. ./apps/server/.env.developmentを作成します

```
cd ./apps/server
cp .env.example .env.development
```

ローカル開発用のデフォルトの認証情報で、データベースはすぐに動作するはずです。
ただし、メール機能については有効なSMTPアカウントが必要です。brevo.comで無料で取得できます。.

1. データベーステーブルを作成するためにマイグレーションを実行します

```sh
pnpm db:migrate
```

4. 初期データでデータベースを埋めるためにシードを実行します

```sh
pnpm db:seed
```

###  開発環境の実行

以下のコマンドを使用して、NestとNextの両方のサーバーを実行します

```sh
pnpm dev
```

これにより、Next.jsサーバーが http://localhost:3000 で、Nest.jsサーバーが http://localhost:3001 で起動します


###  テスト

以下のコマンドを使用してテストを実行します:

```sh
pnpm test
```

---
