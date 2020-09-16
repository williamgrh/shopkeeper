import {
  ChampionGrowthStatisticTypes,
  ChampionGrowthStatisticRateTypes,
  ChampionStatistics,
  Item,
} from "Typings/Shopkeeper";

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
  statistic: number,
  items: Array<Item>
): number {
  console.log(items);
  return statistic;
}

// TODO: fix regens, attack speed, and crit
export function calculateFinalGrowthStatistic(
  growthStatisticType: ChampionGrowthStatisticTypes,
  statistics: ChampionStatistics,
  championLevel: number,
  items: Array<Item>
): number {
  const growthStatisticRateType = getChampionGrowthStatisticRateTypeFromChampionGrowthStatisticType(
    growthStatisticType
  );

  let growthStatistic = calculateGrowthStatistic(
    statistics[growthStatisticType],
    statistics[growthStatisticRateType],
    championLevel
  );

  growthStatistic = calculateStatisticWithItems(
    growthStatisticType,
    growthStatistic,
    items
  );

  // account for various rounding methods and change regen stats from per 5 seconds to per 1 second
  if (growthStatisticType === ChampionGrowthStatisticTypes.HealthPoints) {
    growthStatistic = Math.ceil(growthStatistic);
  } else if (
    growthStatisticType === ChampionGrowthStatisticTypes.HealthPointsRegen ||
    growthStatisticType === ChampionGrowthStatisticTypes.ManaPointsRegen
  ) {
    growthStatistic = Number((growthStatistic / 5).toFixed(1));
  } else {
    growthStatistic = Number(growthStatistic.toFixed(0));
  }

  return growthStatistic;
}
