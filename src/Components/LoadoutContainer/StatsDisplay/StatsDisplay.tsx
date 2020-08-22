import React, { useContext } from "react";
import { useObserver } from "mobx-react-lite";
import { ShopkeeperContext } from "Context/ShopkeeperContext";
import { calculateFinalStatistic } from "Util/Shopkeeper";
// import { ChampionStatisticType, ChampionStatistics } from "../../typings/Shopkeeper";

interface StatsDisplayProps {
  level: number;
  stats: {[key: string]: number};
}

function StatsDisplay({ level, stats }: StatsDisplayProps) {
  const shopkeeperStore = useContext(ShopkeeperContext);

  // TODO: attack speed
  // const displayStats: Array<ChampionStatisticType> = [
  //   ChampionStatisticType.HealthPoints,
  //   ChampionStatisticType.Armor,
  //   ChampionStatisticType.MagicResist,
  //   ChampionStatisticType.AttackDamage,
  //   ChampionStatisticType.CriticalStrike,
  //   ChampionStatisticType.HealthPointsRegen,
  //   ChampionStatisticType.ManaPoints,
  //   ChampionStatisticType.ManaPointsRegen,
  // ];

  // Rounding methods
  // hp always rounds up
  // armor and MR round properly (check .5)

  // const items = shopkeeperStore.selectedItems;
  // const finalStats = displayStats.reduce((acc: any, statName: ChampionStatisticType) => {
  //   return {
  //     ...acc,
  //     [statName]: calculateFinalStatistic(statName, stats, level, items),
  //   };
  // }, {});

  return useObserver(() => (
    <table>
      <tbody>
        <tr>
          <td>level</td>
          <td>{level}</td>
        </tr>
        {/* {Object.keys(finalStats).map((stat: string) => (
          <tr key={stat}>
            <td>{stat}</td>
            <td>{finalStats[stat]}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  ));
}

export default StatsDisplay;
