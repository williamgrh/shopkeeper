import {
  ChampionGrowthStatisticTypes,
  ChampionGrowthStatisticRateTypes,
  ChampionStatistics,
  Item,
  ItemStatistic,
} from "Typings/Shopkeeper";

const statisticModificationByItemStatistic: {
  [key: string]: (statisticValue: number, itemStatisticValue: number) => number;
} = {
  [ItemStatistic.FlatPhysicalDamageMod]: (
    statisticValue: number,
    itemStatisticValue: number
  ) => statisticValue + itemStatisticValue,
};

function getChampionGrowthStatisticRateTypeFromChampionGrowthStatisticType(
  championStatisticType: ChampionGrowthStatisticTypes
) {
  const grothStatisticDict: {
    [key in ChampionGrowthStatisticTypes]: ChampionGrowthStatisticRateTypes;
  } = {
    [ChampionGrowthStatisticTypes.HealthPoints]:
      ChampionGrowthStatisticRateTypes.HealthPointsPerLevel,
    [ChampionGrowthStatisticTypes.ManaPoints]:
      ChampionGrowthStatisticRateTypes.ManaPointsPerLevel,
    [ChampionGrowthStatisticTypes.Armor]:
      ChampionGrowthStatisticRateTypes.ArmorPerLevel,
    [ChampionGrowthStatisticTypes.MagicResist]:
      ChampionGrowthStatisticRateTypes.MagicResistPerLevel,
    [ChampionGrowthStatisticTypes.HealthPointsRegen]:
      ChampionGrowthStatisticRateTypes.HealthPointsRegenPerLevel,
    [ChampionGrowthStatisticTypes.ManaPointsRegen]:
      ChampionGrowthStatisticRateTypes.ManaPointsRegenPerLevel,
    [ChampionGrowthStatisticTypes.CriticalStrike]:
      ChampionGrowthStatisticRateTypes.CriticalStrikePerLevel,
    [ChampionGrowthStatisticTypes.AttackDamage]:
      ChampionGrowthStatisticRateTypes.AttackDamagePerLevel,
    [ChampionGrowthStatisticTypes.AttackSpeed]:
      ChampionGrowthStatisticRateTypes.AttackSpeedPerLevel,
  };

  return grothStatisticDict[championStatisticType];
}

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

function calculateStatisticWithItems(
  growthStatisticType: ChampionGrowthStatisticTypes,
  statisticValue: number,
  items: readonly Item[]
): number {
  items.forEach((item) => {
    Object.keys(item.stats).forEach((stat) => {});
  });
  return statisticValue;
}

// TODO: fix attack speed, and crit
export function calculateFinalGrowthStatistic(
  growthStatisticType: ChampionGrowthStatisticTypes,
  statistics: ChampionStatistics,
  championLevel: number,
  items: readonly Item[]
): number {
  const growthStatisticRateType = getChampionGrowthStatisticRateTypeFromChampionGrowthStatisticType(
    growthStatisticType
  );

  let growthStatisticValue = calculateGrowthStatistic(
    statistics[growthStatisticType],
    statistics[growthStatisticRateType],
    championLevel
  );

  growthStatisticValue = calculateStatisticWithItems(
    growthStatisticType,
    growthStatisticValue,
    items
  );

  // account for various rounding methods and change regen stats from per 5 seconds to per 1 second
  if (growthStatisticType === ChampionGrowthStatisticTypes.HealthPoints) {
    growthStatisticValue = Math.ceil(growthStatisticValue);
  } else if (
    growthStatisticType === ChampionGrowthStatisticTypes.HealthPointsRegen ||
    growthStatisticType === ChampionGrowthStatisticTypes.ManaPointsRegen
  ) {
    growthStatisticValue = Number((growthStatisticValue / 5).toFixed(1));
  } else {
    growthStatisticValue = Number(growthStatisticValue.toFixed(0));
  }

  return growthStatisticValue;
}
