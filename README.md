# botapeer-front
botapeerのフロントエンドのリポジトリです。Next.jsで作られています。

## 基本技術
- cssフレームワーク
  - material-ui
- css
  - emotion
- 状態管理
  - redux-toolkit 
- 本番環境インフラ
  - App Runnerでホストしています。詳しくは[botapeer-infra](https://github.com/calmandhelp/botapeer-infra)をご確認ください　

## デザイン
レスポンシブに関しては工数の関係上対応しておりません。  
デザインに関してはfigmaでざっと行い、あとは作りながら考えています。
![スクリーンショット 2023-04-11 0 17 14](https://user-images.githubusercontent.com/39892315/230930911-d59eeb4b-8a97-4be5-9e9c-716be0844646.png)

## スキーマ駆動開発
botapeer-openapiで生成されたtypescriptのインターフェースとモデルをsrc/redux/sliceで読み込んでapiの呼び出しを行なっています。
openapiのサブモジュールはsrc/botapeer-openapiにインストールされます。

## SSR（サーバーサイドレンダリング）
Next.jsの場合、pages配下のディレクトリ構造はページURLの構造と一致します。ダイナミックルーティングを使用することで、plant_record/[plant_record]のようにするとplant_record/1のように動的にページを変更することが可能になります。  
基本的にダイナミックルーティングをしている箇所はSSRをしています。これはuseEffectを利用してコンポーネントがマウントされた後に404ページを表示させると、画面が一瞬表示されてしまい、見栄えが悪いからです。

## 認証
アクセストークンは認証後、ローカルストレージに保存されます。POSTなどのAPI呼び出しを行う際は、ローカルストレージに保存されているアクセストークンをAuthorization Headerに付与してサーバーサイドの認証を行います。　　
実際には以下のようにauthSliceでローカルストレージに保存されたアクセストークンは管理されているため、認証時にストアから取り出してヘッダーに付与します。
```typescript
const headers = new Headers({'Content-Type': 'application/json'})
  
const auth = store.getState().auth;
headers.append('Authorization', 'Bearer ' + auth.accessToken)
```
