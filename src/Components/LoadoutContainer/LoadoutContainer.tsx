import React, { useContext, useState } from "react";
import { useObserver } from "mobx-react-lite";
import { ShopkeeperContext } from "Context/ShopkeeperContext";
import { Select } from "@chakra-ui/core";
import StatsDisplay from "Components/LoadoutContainer/StatsDisplay/StatsDisplay";
import ItemsDisplay from "Components/LoadoutContainer/ItemsDisplay/ItemsDisplay";

function LoadoutContainer() {
  const shopkeeperStore = useContext(ShopkeeperContext);
  const [level, setLevel] = useState(1);

  const levelOptions: Array<any> = [];
  for (let i = 1; i <= 18; i++) {
    levelOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return useObserver(() => {
    if (!shopkeeperStore.selectedChampion.name) {
      return null;
    }

    return (
      <div>
        {shopkeeperStore.selectedChampion.name}
        <Select onChange={(e) => setLevel(Number(e.target.value))}>
          {levelOptions}
        </Select>
        <StatsDisplay
          level={level}
          stats={shopkeeperStore.selectedChampion.stats}
        />
        <ItemsDisplay />
      </div>
    );
  });
}

export default LoadoutContainer;
