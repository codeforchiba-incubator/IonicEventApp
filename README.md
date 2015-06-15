# イベント情報を公開するIonicアプリケーション
アプリには[こちら](http://codeforchiba.github.io/IonicEventApp)から参照。

## schema.org/EventベースのJSON-LDデータについて
Google検索結果のスニペットにイベント情報を表示するためにwww/index.htmlにJSON-LDデータを用意した。
構造化データテストツールは問題なし([こちら](https://developers.google.com/structured-data/testing-tool/?url=http://codeforchiba.github.io/IonicEventApp/www))。

## TODO
- ログイン機能の実装
- ユーザ固有情報の保存・表示(イベントブックマーク)
- イベント情報の絞り込み機能(開催日、住所などで絞り込み)
- イベント詳細画面から地図への遷移の実装
- IBM Bluemix/MobileFirst Platformとの連携
- (ほかいろいろ)

## バグ?
- 緯度経度が同じ開催場所のイベント情報を地図上に複数表示できない
- ios版で地図のマーカーリンクがクリックできない
