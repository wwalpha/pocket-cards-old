
export interface Hop {
  // ロットNo
  lotNo: string;
  // asis
  asis: number;
  // 添加量１
  amount1?: number;
  // 添加量２
  amount2?: number;
  // 添加量３
  amount3?: number;
  // 添加量４
  amount4?: number;
}

export interface Boiling {
  // 煮沸時間
  bco: number;
  // 1番ホップ煮沸時間
  bco01?: number;
  // 2番ホップ煮沸時間
  bco02?: number;
  // 3番ホップ煮沸時間
  bco03?: number;
  // 4番ホップ煮沸時間
  bco04?: number;
  // 煮沸後静置時間
  bco05?: number;
  // 麦汁揚げ時間
  bco06?: number;
  // WpT静置時間
  bco07?: number;
  // 煮沸率_合計
  bco08: number;
  // WP満量
  bco09: number;
}

const isEmpty = (value) => value === undefined || value === '';

/** 添加量合計計算 */
const amountSum = (key: string, time: number, hops: Hop[]): number => {
  let ret = 0;

  hops.forEach((hop) => {
    const amount = hop[key];
    const asis = hop.asis;

    if (!isEmpty(amount)) {
      // ホップ添加量[g] × α酸AsIs[%] × 0.01 × α酸利用率
      ret = amount * asis * 0.01 * rate(time) + ret;
    }
  });

  return ret;
}

/** α酸利用率 = 0.119 ×　ln(ﾎｯﾌﾟ経過時間) - 0.1764 */
const rate = (time: number) => 0.119 * Math.log(time) - 0.1764;

export const bu = (hops: Hop[], boc: Boiling, sugar: number) => {
  // 煮沸後静置時間 + 麦汁揚げ時間 + WpT静置時間
  const afterBoc = boc.bco05 + boc.bco06 + boc.bco07;
  // １番ホップ経過時間
  const hopTime1 = Math.abs(boc.bco01) + boc.bco02 + boc.bco03 + boc.bco04 + afterBoc;
  // ２番ホップ経過時間
  const hopTime2 = boc.bco02 + boc.bco03 + boc.bco04 + afterBoc;
  // ３番ホップ経過時間
  const hopTime3 = boc.bco03 + boc.bco04 + afterBoc;
  // ４番ホップ経過時間
  const hopTime4 = boc.bco04 + afterBoc;

  // ホップ添加量[g] × α酸AsIs[%] × 0.01 × α酸利用率 / WP満量[L] × 1000 × (100-予定煮沸率合計[%]) × 0.01
  const bu1 = amountSum('amount1', hopTime1, hops) / boc.bco09 * 1000 * (100 - boc.bco08) * 0.01;
  const bu2 = amountSum('amount2', hopTime2, hops) / boc.bco09 * 1000 * (100 - boc.bco08) * 0.01;
  const bu3 = amountSum('amount3', hopTime3, hops) / boc.bco09 * 1000 * (100 - boc.bco08) * 0.01;
  const bu4 = amountSum('amount4', hopTime4, hops) / boc.bco09 * 1000 * (100 - boc.bco08) * 0.01;

  // 小数点３桁まで四捨五入
  return Math.round((bu1 + bu2 + bu3 + bu4) * 10 / sugar * 1000);
};


// if (samples.length != values.size() - 1) {
//   System.err.println(String.format("NOT MATCH: %d %d", samples.length, values.size()));
//   return false;
// }

// int i = 0;
// for (double s : samples) {
//   String v = values.get(i + 1);

//   double d = (v.isEmpty() ? s : s - Double.parseDouble(v));

//   if (d >= 0.001 || d <= -0.001) {
//           return false;
//   }
//   i++;
// }
// if (excluded.contains(values.get(0))) {
//   return false;
// }
// lotId.add(values.get(0));
// return true;