import React from "react";
import { useShopkeeperState } from "Context/ShopkeeperContext";
import { calculateFinalGrowthStatistic } from "Util/Shopkeeper";
import {
  ChampionGrowthStatisticTypes,
  ChampionStatistics,
} from "Typings/Shopkeeper";

interface StatsDisplayProps {
  level: number;
  stats: ChampionStatistics;
}

function StatsDisplay({ level, stats }: StatsDisplayProps) {
  const { selectedItems } = useShopkeeperState();

  // TODO: attack speed
  const displayStats: Array<ChampionGrowthStatisticTypes> = [
    ChampionGrowthStatisticTypes.HealthPoints,
    ChampionGrowthStatisticTypes.Armor,
    ChampionGrowthStatisticTypes.MagicResist,
    ChampionGrowthStatisticTypes.AttackDamage,
    ChampionGrowthStatisticTypes.CriticalStrike,
    ChampionGrowthStatisticTypes.HealthPointsRegen,
    ChampionGrowthStatisticTypes.ManaPoints,
    ChampionGrowthStatisticTypes.ManaPointsRegen,
  ];

  return (
    <table>
      <tbody>
        <tr>
          <td>level</td>
          <td>{level}</td>
        </tr>
        {displayStats.map((stat: ChampionGrowthStatisticTypes) => (
          <tr key={stat}>
            <td>{stat}</td>
            <td>
              {calculateFinalGrowthStatistic(stat, stats, level, selectedItems)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StatsDisplay;
