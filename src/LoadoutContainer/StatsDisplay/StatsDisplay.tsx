import React from "react";
import { calculateGrowthStatistic } from "../../util/Shopkeeper";

interface StatsDisplayProps {
  level: number;
  stats: {
    [key: string]: number;
  };
}

function StatsDisplay({ level, stats }: StatsDisplayProps) {
  // TODO: attack damage
  const displayStats = [
    "hp",
    "armor",
    "spellblock",
    "attackdamage",
    "crit",
    "hpregen",
    "mp",
    "mpregen",
  ];

  // Rounding methods
  // hp always rounds up
  // armor and MR round properly (check .5)

  return (
    <table>
      <tbody>
        <tr>
          <td>level</td>
          <td>{level}</td>
        </tr>
        <tr>
          <td>health</td>
          <td>{calculateGrowthStatistic(stats.hp, stats.hpperlevel, level)}</td>
        </tr>
        {displayStats.map((stat) => (
          <tr key={stat}>
            <td>{stat}</td>
            <td>
              {calculateGrowthStatistic(
                stats[stat],
                stats[`${stat}perlevel`],
                level
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StatsDisplay;
