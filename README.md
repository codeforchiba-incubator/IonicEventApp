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

## 参考
Ionicの学習のために参考にしたサイト
- [Ionic Tutorial](https://ccoenraets.github.io/ionic-tutorial/index.html): 研修情報をリストして詳細表示したり、Facebookログインを実装するIonicアプリを作成します。
- [Advanced PhoneGap Hybrid App Tutorial](http://hollyschinsky.github.io/ConferenceTracker/index.html): Ionic Tutorialを成長させたチュートリアル。
- [Sample Mobile Application with Ionic and AngularJS](http://coenraets.org/blog/2014/02/sample-mobile-application-with-ionic-and-angularjs/): 従業員リストと詳細を表示するIonicアプリを作成します。