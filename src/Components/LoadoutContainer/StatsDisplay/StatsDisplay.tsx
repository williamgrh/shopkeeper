import React, { useContext } from "react";
import { useObserver } from "mobx-react-lite";
import { ShopkeeperContext } from "Context/ShopkeeperContext";
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
  const shopkeeperStore = useContext(ShopkeeperContext);

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

  // Rounding methods
  // hp always rounds up
  // armor and MR round properly (check .5)

  return useObserver(() => {
    if (shopkeeperStore.selectedItems.length > 0) {
      console.log(shopkeeperStore.selectedItems[0].name);
    }

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
                {calculateFinalGrowthStatistic(
                  stat,
                  stats,
                  level,
                  shopkeeperStore.selectedItems
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  });
}

export default StatsDisplay;
