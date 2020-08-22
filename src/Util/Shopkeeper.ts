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

export function calculateFinalGrowthStatistic(
  growthStatisticType: ChampionGrowthStatisticTypes,
  statistics: ChampionStatistics,
  championLevel: number,
  items: Array<Item>
): number {
  const growthStatisticRateType = getChampionGrowthStatisticRateTypeFromChampionGrowthStatisticType(
    growthStatisticType
  );

  const finalGrowthStatistic = calculateGrowthStatistic(
    statistics[growthStatisticType],
    statistics[growthStatisticRateType],
    championLevel
  );

  return finalGrowthStatistic;
}
