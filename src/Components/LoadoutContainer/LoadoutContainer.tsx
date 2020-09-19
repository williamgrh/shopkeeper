import React from "react";
import { useShopkeeperState } from "Context/ShopkeeperContext";
import { Select } from "@chakra-ui/core";
import StatsDisplay from "Components/LoadoutContainer/StatsDisplay/StatsDisplay";
import ItemsDisplay from "Components/LoadoutContainer/ItemsDisplay/ItemsDisplay";

function LoadoutContainer() {
  const { selectedChampion } = useShopkeeperState();
  const [level, setLevel] = React.useState(1);

  if (!selectedChampion) {
    return null;
  }

  const levelOptions: Array<any> = [];
  for (let i = 1; i <= 18; i++) {
    levelOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      {selectedChampion.name}
      <Select onChange={(e) => setLevel(Number(e.target.value))}>
        {levelOptions}
      </Select>
      <StatsDisplay level={level} stats={selectedChampion.stats} />
      <ItemsDisplay />
    </div>
  );
}

export default LoadoutContainer;
