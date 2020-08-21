import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useObserver } from "mobx-react-lite";
import { ShopkeeperContext } from "../ShopkeeperContext";
import { Item } from "../typings/Shopkeeper";

interface ItemsData {
  [itemId: string]: Item;
}

const hiddenItemsList = [
  "2420", // Stopwatch,
  "2422", // Slightly Magical Boots
  "2423", // Perfectly Timed Stopwatch
  "3042", // Muramana (duplicate)
];

function ItemsContainer() {
  const shopkeeperStore = useContext(ShopkeeperContext);
  const [items, setItems] = useState<ItemsData>({});
  useEffect(() => {
    axios
      .get(
        `https://ddragon.leagueoflegends.com/cdn/${shopkeeperStore.dataDragonVersion}/data/en_US/item.json`
      )
      .then((res) => setItems(res.data.data));
  }, [shopkeeperStore]);

  // TODO: filter in champ specific items when they're selected

  return useObserver(() => (
    <div>
      {Object.keys(items).map((itemId) => {
        const {
          name,
          image,
          gold,
          tags,
          maps,
          hideFromAll,
          requiredChampion,
        } = items[itemId];
        if (
          hideFromAll ||
          requiredChampion ||
          maps["11"] !== true ||
          tags.includes("Consumable") || // TODO: elixirs
          tags.includes("Trinket") ||
          gold.total === 0 ||
          name.includes("(Quick Charge)") ||
          hiddenItemsList.includes(itemId)
        ) {
          return null;
        }

        return (
          <img
            key={itemId}
            src={`https://ddragon.leagueoflegends.com/cdn/${shopkeeperStore.dataDragonVersion}/img/item/${image.full}`}
            alt={name}
            onClick={() => shopkeeperStore.addSelectedItem(items[itemId])}
          />
        );
      })}
    </div>
  ));
}

export default ItemsContainer;
