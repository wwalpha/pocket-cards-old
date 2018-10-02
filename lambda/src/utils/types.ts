export interface Word {
  setId: String;
  //  単語
  word: String;
  //  発音
  pronounce: String;
  //  語彙
  vocabulary: String;
  //  学習時間
  studyDate: String;
  //  次回学習時間
  nextDate: String;
  //  学習回数
  times: number;
}
