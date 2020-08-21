import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useObserver } from "mobx-react-lite";
import { ShopkeeperContext } from "../ShopkeeperContext";

interface Item {
  name: string;
  image: {
    full: string;
  };
  gold: {
    purchasable: boolean;
    total: number;
  };
  tags: string[];
  maps: {
    [mapId: string]: boolean;
  };
  hideFromAll: boolean;
  requiredChampion?: string;
  requiredAlly?: string;
}

interface ItemsData {
  [itemId: string]: Item;
}

const hiddenItemsList = [
  "2420", // Stopwatch,
  "2422", // Slightly Magical Boots
  "2423", // Perfectly Timed Stopwatch
  "3042", // Muramana (duplicate)
  "3850", // Spellthief's Edge
  "3851", // Frostfang
  "3854", // Steel Shoulderguards
  "3855", // Runesteel Spaulders
  "3858", // Relic Shield
  "3859", // Targon's Buckler
  "3862", // Spectral Sickle
  "3863", // Harrowing Crescent
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
          requiredAlly,
        } = items[itemId];
        if (
          hideFromAll ||
          maps["11"] !== true ||
          requiredChampion || // TODO: bring back for certain champs
          requiredAlly || // ornn items?
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
          />
        );
      })}
    </div>
  ));
}

export default ItemsContainer;
