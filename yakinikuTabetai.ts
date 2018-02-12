import { OdnTweetData, OdnTweets } from "../../../odnTweets"
import { OdnPlugins, OdnPluginResultData } from "../../../odnPlugins";
import {Log, OdnUtils} from "../../../odnUtils";

export class YakinikuTabetai {
  constructor(private tweetData: OdnTweetData, private fullName: string) {}

  /**
   * プラグインのメイン処理を実行
   *
   * @param {(isProcessed?: boolean) => void} finish
   */
  run(finish: (isProcessed?: boolean) => void) {
    const tweets = new OdnTweets(this.tweetData.accountData);
    const niku = Resouces.getNiku();
    tweets.text = "🍖" + niku + "🍖食べたい";
    tweets.targetTweetId = this.tweetData.idStr;

    // ツイートを投稿
    tweets.postTweet((isSuccess) => {
      tweets.likeTweet();
      finish();
    });
  }

  /**
   * プラグインを実行するかどうか判定
   *
   * @param {OdnTweetData} tweetData
   * @returns {boolean}
   */
  static isValid(tweetData: OdnTweetData): boolean {
    return tweetData.text.match(/^(他)?人の(お)?(金|かね|財布)で(焼)?(き)?(肉|にく)(が|を)?(食べたい|たべたい)$/gi) ? true : false;
  }
}

class Resouces {
  private static nikuList: Array<string> = [
    "秘伝の塩ダレカルビ",
    "牛角カルビ",
    "ファミリーカルビ",
    "中落ちカルビ",
    "ガリバタカルビ",
    "ネギ塩カルビ",
    "やみつきカルビスター盛り",
    "黒毛和牛カルビ",
    "黒毛和牛上カルビ",
    "ネギタン塩",
    "霜降り上タン塩",
    "牛タン塩",
    "とんタン塩",
    "たっぷりねぎとんタン塩",
    "梅とんタン塩",
    "わさびとんタン",
    "黒毛和牛上ロース",
    "ロース",
    "みすじ",
    "熟成やわらかヒレ",
    "シャトーブリアン",
    "黒毛和牛特上カルビ",
    "黒毛和牛くらした",
    "キャベツ豚太郎",
    "ピートロ",
    "豚のえんがわ 唐辛子焼き",
    "豚のえんがわ にんにく黒胡椒焼き",
    "豚のえんがわ 焦がし味噌焼き",
    "三元豚のはちみつ黒胡椒焼き",
    "炎のけむり焼き",
    "ぼんちり",
    "もも",
    "とりとろ",
    "チキンバジル",
    "月見チキン",
    "梅チキン",
    "辛！！タンカルビ",
    "牛ホルモン",
    "豚ホルモン",
    "牛レバー",
    "牛上ミノ",
    "桜ユッケ",
    "とろレバー",
    "牛タンシチュー",
    "やみつき塩キャベツ",
    "黒糖おさつバター",
    "ハラミ",
    "にんにく塩ハラミ",
    "王様ハラミ",
    "熟成厚切り！サガリ",
    "カルビ専用ごはん",
    "牛角アイス"
  ];

  /**
   * 牛角のメニューをランダムで取得
   *
   * @returns {string}
   */
  static getNiku(): string {
    const index = OdnUtils.rand(0, this.nikuList.length - 1);
    return this.nikuList[index];
  }
}