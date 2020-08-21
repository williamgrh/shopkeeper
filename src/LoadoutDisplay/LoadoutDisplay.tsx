import React, { useState } from "react";
import { Champion } from "../typings/Shopkeeper";
import { calculateGrowthStatistic } from "../util/Shopkeeper";
import { Select } from "@chakra-ui/core";

interface ChampionDisplayProps {
  champion: Champion;
}

function ChampionDisplay({ champion }: ChampionDisplayProps) {
  const [level, setLevel] = useState(3);

  const levelOptions = [];
  for (let i = 1; i <= 18; i++) {
    levelOptions.push(<option value={i} key={i}>{i}</option>);
  }

  // TODO: attack damage
  const displayStats = ['hp', 'armor', 'spellblock', 'attackdamage', 'crit', 'hpregen', 'mp', 'mpregen'];

  // Rounding methods
  // hp always rounds up
  // armor and MR round properly (check .5)

  return (
    <div>
      {champion.name}
      <Select onChange={(e) => setLevel(Number(e.target.value))}>
        {levelOptions}
      </Select>
      <table>
        <tbody>
          <tr>
            <td>level</td>
            <td>{level}</td>
          </tr>
          <tr>
            <td>health</td>
            <td>
              {calculateGrowthStatistic(
                champion.stats.hp,
                champion.stats.hpperlevel,
                level
              )}
            </td>
          </tr>
          {displayStats.map((stat) => (
            <tr>
              <td>{stat}</td>
              <td>
                {calculateGrowthStatistic(
                  champion.stats[stat],
                  champion.stats[`${stat}perlevel`],
                  level
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChampionDisplay;
