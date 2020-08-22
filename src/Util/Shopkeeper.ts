import { ChampionStatistics, ChampionStatisticType, Item } from "Typings/Shopkeeper";

function calculateGrowthStatistic(
  baseValue: number,
  growthStatistic: number,
  championLevel: number
): number {
  const b = baseValue;
  const g = growthStatistic;
  const n = championLevel;
  return b + g * (n - 1) * (0.7025 + 0.0175 * (n - 1));
}

export function calculateFinalStatistic(
  statisticName: ChampionStatisticType,
  statistics: ChampionStatistics,
  championLevel: number,
  items: Array<Item>
): number {
  // const finalStatistic = calculateGrowthStatistic(
  //   statistics[statisticName],
  //   statistics[`${statisticName}perlevel`],
  //   championLevel
  // );

  // debugger;

  // items.forEach((item: Item) => {
  //   console.log(item)
  // });

  // return finalStatistic;#
  return 0;
}
