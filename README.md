# 照度センサー入退室通知

照度センサーから取得できる値を使って、状態が切り替わった時にチャットへポストするプログラムです。

## 必要環境

* 開発環境
    * node: v8.x
    * macOS
* デプロイ環境
    * Raspberry Pi Zero
    * node: v8.x
    * 照度センサー

## 開発環境の準備

開発PC上で下記を実行します。

```sh
cd /path/to/lights-sensor

# モジュールをインストールしてビルド
npm install

# .envファイルをコピーし、中身を編集します。
cp .env.example .env
vim .env

# ソースコードが変更されたらすぐにコンパイルされるよう、監視を開始します
npm run watch

# 別のターミナルを立ち上げて、プログラムの実行を開始します
npm start
# もし、ログも出力したい場合は、 npm start の代わりに下記を実行します
#npm run dev
```

## Raspberry Piへプログラムをデプロイする方法

Raspberry Piには、ビルドしたプログラムのみをアップロードする仕組みにしています。そのため、Raspberry Pi上にはTypeScript等のソースは含まれません。

開発PC上で下記を実行し、ビルド済およびアップロードをRaspberry Piへアップロードします。Raspberry Piと同じWi-Fiに接続されている必要があります。

```sh
cd /path/to/lights-sensor
./cmds.sh upload
```

Raspberry Piにログインし、下記を実行します。

```sh
cd /home/pi/lights

# もしpm2をインストールしていなければ、インストールします
npm i -g pm2

# 必要なモジュールをインストールします。(dependenciesのみ。 devDependenciesは含まない)
npm install --production

# .envファイルを編集します。ない場合は、.env.exampleを元に設定します
vi .env

# 再起動します
./cmds.sh stop
./cmds.sh start
```

## LICENSE
### [tsl2561.py](https://github.com/shinjimatsumoto/tsl2561) :

    MIT License

    Copyright (c) 2017 Shinji Matsumoto

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

