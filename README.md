# イベント情報を公開するIonicアプリケーション
アプリには[こちら](http://codeforchiba.github.io/IonicEventApp)から参照。

## 使用しているライブラリ
- [ionic](http://ionicframework.com/)
- [Apache Cordova](https://cordova.apache.org/)
- [AngularJS](https://angularjs.org/)
- [ngCordova](http://ngcordova.com/): GEOLOCATIONプラグインを利用
- [Angular Resource](https://docs.angularjs.org/api/ngResource/service/$resource): REST APIの実行
- [AngularUI](http://angular-ui.github.io/)
- [AngularUI UI Calendar](http://angular-ui.github.io/ui-calendar/): fullcalendarのAngularJS版
- [ion-tabs](http://ionicframework.com/docs/api/directive/ionTabs/): 画面下部のタブ
- [ionic-datepicker](https://github.com/rajeshwarpatlolla/ionic-datepicker): 検索条件設定用のDate Picker。日本語にカスタマイズ。
- [AngularUI UI-GMap](http://angular-ui.github.io/angular-google-maps/): Google Mapsのdirective

## TODO(やりたいこと)
- (完成)イベント情報の絞り込み機能(開催日、現在地からの距離で絞り込み)
- [デザイン](https://www.facebook.com/photo.php?fbid=846750738748215&set=pcb.916083841771587&type=1&relevant_count=2)の取り込み
- Instagram/Twitter画像の表示
- Google Analyticsの組み込み
- Ionic Pushの組み込み
- IBM Bluemix/MobileFirst Platformとの連携
- (ほかいろいろ)

## schema.org/EventベースのJSON-LDデータについて
Google検索結果のスニペットにイベント情報を表示するためにwww/index.htmlにJSON-LDデータを用意しました。

構造化データテストツールは問題なし([こちら](https://developers.google.com/structured-data/testing-tool/?url=http://codeforchiba.github.io/IonicEventApp/www))。

## 参考
Ionic学習用
- [Ionic Tutorial](https://ccoenraets.github.io/ionic-tutorial/index.html): 研修情報をリストして詳細表示したり、Facebookログインを実装するIonicアプリを作成します。
- [Advanced PhoneGap Hybrid App Tutorial](http://hollyschinsky.github.io/ConferenceTracker/index.html): Ionic Tutorialを成長させたチュートリアル。
- [Sample Mobile Application with Ionic and AngularJS](http://coenraets.org/blog/2014/02/sample-mobile-application-with-ionic-and-angularjs/): 従業員リストと詳細を表示するIonicアプリを作成します。
- [Build an App with Navigation and Routing](http://learn.ionicframework.com/formulas/navigation-and-routing-part-1/)

AngularJS学習用
- ionicのルーティングを実現する[ui-router](https://github.com/angular-ui/ui-router/wiki)

Google Analytics
- [Google Analytics + AngularJS](http://liginc.co.jp/web/js/other-js/137655)